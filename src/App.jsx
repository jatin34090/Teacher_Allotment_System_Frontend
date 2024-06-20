import { useState } from 'react'

import './App.css'
import { Outlet } from 'react-router-dom'
import Headers from './components/Headers'

function App() {
  const [count, setCount] = useState(0)

  return (
   <div>
     <Headers/>
    <main >
      <Outlet/>
    </main>
   </div>
  )
}

export default App
