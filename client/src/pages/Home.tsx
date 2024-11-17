import { useEffect, useState } from 'react'

function Home() {
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/message`)
      .then((response) => response.json())
      .then((data) => setMessage(data.message))
      .catch((error) => console.error('Error fetching the message:', error))
  }, [])

  return (
    <div>
      <h1>Home Page</h1>
      <p>Connected to Backend:</p>
      <p>{message}</p>
    </div>
  )
}

export default Home
