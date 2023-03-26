import { Fragment, useState } from 'react'
import { Routes, Route, BrowserRouter as Router } from "react-router-dom"
import './styles/App.css'
import './styles/myBG.css'
import { Home } from './pages/Home'
import { About } from './pages/About'
import { Store } from './pages/Store'
import Login from './pages/Login'
import { Navbar } from './components/navbar'
import { PrivateRoutes } from './utils/PrivateRoutes'
import { AuthProvider } from './context/AuthContext'
import { ShoppingCartProvider } from './context/shoppingCartContext'
import { Cart } from './pages/Cart'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Fragment>
      <Router>
        <AuthProvider>
          <ShoppingCartProvider>
            <Navbar />
            <div className='container text-light mt-2'>
              <Routes>
                <Route path='/' element={<Home />} />
                <Route element={<PrivateRoutes />}>
                  <Route path='/about' element={<About />} />
                  <Route path='/cart' element={<Cart />} />
                </Route>
                <Route path='/store' element={<Store />} />
                <Route path='/login' element={<Login />} />
              </Routes>
            </div>
          </ShoppingCartProvider>
        </AuthProvider>
      </Router>
    </Fragment >
  )
}

export default App
