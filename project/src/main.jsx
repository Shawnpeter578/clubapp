import { h, render } from 'preact';
import App from './app.jsx';
const Main = () => {
  return (
    <App />
  );
};

render(<Main />, document.getElementById('root'));