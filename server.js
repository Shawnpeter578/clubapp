const port = process.env.PORT || 3000;
const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
require('dotenv').config();//important to load secret variables from .env


// MongoDB setup
const { MongoClient, ServerApiVersion } = require('mongodb');
const dbUrl = process.env.DATABASE_URL || "mongodb://localhost:27017"; // Placeholder; use real URI in production
const DATABASE_NAME = "clubspot";
const COLLECTION_NAME = "reg";

const client = new MongoClient(dbUrl, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

let db;
let accounts;

async function connectToMongoDB() {
    try {
        await client.connect();
        console.log("Connected to MongoDB successfully!");
       
        db = client.db(DATABASE_NAME);
        accounts = db.collection(COLLECTION_NAME);
       
        // Create indexes for efficient duplicate checking for registrations
        // Enforce uniqueness at the database level. This is the strongest protection.
        await accounts.createIndex({ contactNumber: 1 }, { unique: true });
       
        return true;
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        return false;
    }
}

async function readRegistrations() {
    try {
        if (!accounts) {
            throw new Error('MongoDB connection not established');
        }
       
        const registrations = await accounts.find({}).toArray();
        return registrations;
    } catch (error) {
        console.error('Error reading registrations from MongoDB:', error);
        return [];
    }
}

async function writeRegistration(registration) {
    try {
        if (!accounts) {
            throw new Error('MongoDB connection not established');
        }
       
        const result = await accounts.insertOne(registration);
        return result.acknowledged;
    } catch (error) {
        console.error('Error writing registration to MongoDB:', error);
        return false;
    }
}

const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon',
  default: 'application/octet-stream'
};

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;

    // Handle API routes
    if (pathname.startsWith('/api/')) {
        if (pathname === '/api/registrations') {
            if (req.method === 'GET') {
                readRegistrations().then(registrations => {
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify(registrations));
                }).catch(err => {
                    console.error('Error in GET /api/registrations:', err);
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'Internal Server Error' }));
                });
            } else if (req.method === 'POST') {
                let body = '';
                req.on('data', chunk => {
                    body += chunk.toString();
                });
                req.on('end', () => {
                    try {
                        const registration = JSON.parse(body);
                        writeRegistration(registration).then(success => {
                            if (success) {
                                res.writeHead(201, { 'Content-Type': 'application/json' });
                                res.end(JSON.stringify({ success: true }));
                            } else {
                                res.writeHead(500, { 'Content-Type': 'application/json' });
                                res.end(JSON.stringify({ error: 'Failed to register' }));
                            }
                        }).catch(err => {
                            console.error('Error in POST /api/registrations:', err);
                            res.writeHead(500, { 'Content-Type': 'application/json' });
                            res.end(JSON.stringify({ error: 'Internal Server Error' }));
                        });
                    } catch (parseErr) {
                        console.error('JSON parse error in POST /api/registrations:', parseErr);
                        res.writeHead(400, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ error: 'Invalid JSON' }));
                    }
                });
            } else {
                res.writeHead(405, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Method Not Allowed' }));
            }
        } else {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Not Found' }));
        }
        return;
    }

    // Serve static files
    let filePath = path.join(__dirname, 'dist', pathname === '/' ? 'index.html' : pathname);

    // Ensure the file path doesn't go outside the public directory
    const normalizedPath = path.normalize(filePath);
    if (normalizedPath.indexOf(path.resolve(__dirname, 'dist')) !== 0) {
        res.writeHead(403, { 'Content-Type': 'text/html' });
        res.end('<h1>403 - Forbidden</h1>');
        return;
    }

    fs.stat(filePath, (err, stats) => {
        if (err || !stats.isFile()) {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end('<h1>404 - Page Not Found</h1>');
            return;
        }

        const ext = path.extname(filePath);
        const contentType = mimeTypes[ext] || mimeTypes.default;

        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/html' });
                res.end('<h1>500 - Internal Server Error</h1>');
                return;
            }

            res.writeHead(200, { 'Content-Type': contentType });
            res.end(data);
        });
    });
});

connectToMongoDB().then(success => {
    if (success) {
        server.listen(port, () => {
            console.log(`Server running on http://localhost:${port}`);
        });
    } else {
        console.error('Failed to connect to MongoDB. Server not started.');
        process.exit(1);
    }
});