import { useState } from 'react'
import '../src/Styles/App.css'
import ArticlesPage  from './pages/ArticlesPage'
import Card from './pages/Card'
import NavBar from './HomePage/NavBar'
import { Route, Routes, useLocation } from 'react-router-dom'
import PostForm from './pages/PostForm'
import Footer from './HomePage/footer'
import Register from './pages/Register'
import Login from './pages/Login'


function App() {
  const location=useLocation()
  const showFooter=['/','/categories'].includes(location.pathname)

  return (
    <div className='app'>
      <NavBar />
      <main className='main-content'>
      <Routes>
        <Route path='/' element={<Card/>}/>
        <Route path='/article' element={<ArticlesPage/>}/>
        <Route path='/posts/new' element={<PostForm/>}/>
        <Route path='/posts/edit/:id'element={<PostForm/>}/>
        <Route path='/posts/:id' element={<ArticlesPage />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
      </Routes>
      </main>
      {showFooter && <Footer/>}
       </div>
  );
}

export default App
