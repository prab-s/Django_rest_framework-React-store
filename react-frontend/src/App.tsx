import { Fragment, useState } from 'react'
import { Routes, Route, BrowserRouter as Router } from "react-router-dom"
import './styles/App.css'
import './styles/myBG.css'
import { Home } from './pages/Home'
import { About } from './pages/About'
import { Store } from './pages/Store'
import Login from './pages/Login'
import { Navbar } from './components/navbar'
import { Sidebar } from './components/sidebar'
import PrivateRoute from './utils/PrivateRoute'
import { AuthProvider } from './context/AuthContext'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Fragment>
      <AuthProvider>
        <Navbar />
        <Sidebar />
        <div className='container text-light mt-2'>
          <Routes>
            <Route path='/' element={<Home />} />
            {/* <Route path='/about' element={<About />} /> */}
            <Route element={<PrivateRoute/>}>
              <Route path='/about' element={<About />} />
            </Route>
            <Route path='/store' element={<Store />} />
            <Route path='/login' element={<Login />} />
          </Routes>
        </div>
      </AuthProvider>
    </Fragment >
  )
}

export default App
