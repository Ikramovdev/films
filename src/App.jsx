import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import CustomRoutes from "./routes"

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Navbar/>
    <div className='mt-[60px]'>
      <CustomRoutes/>
    </div>
    </>
  )
}

export default App
