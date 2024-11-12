import { useEffect, useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL;
console.log("API_URL:", API_URL);

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch(`${API_URL}/api/message`)
      .then(response => response.json())
      .then(data => setMessage(data.message))
      .catch(error => console.error('Error fetching the message:', error));
  }, []);

  return (
    <div className="App">
      <h1>Message from Backend:</h1>
      <p>{message}</p>
    </div>
  );
}

export default App;
