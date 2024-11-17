import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Category from './pages/Category'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/auth/login" element={<Login />} />
          <Route path="/categories" element={<Category />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
