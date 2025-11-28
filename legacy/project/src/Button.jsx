import { h } from 'preact';

const Button = ({ text = 'Click me', onClick, variant = 'primary' }) => {
  const buttonStyle = {
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    backgroundColor: variant === 'primary' ? '#007bff' : '#6c757d',
    color: 'white',
    fontSize: '16px'
  };

  return (
    <button style={buttonStyle} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;