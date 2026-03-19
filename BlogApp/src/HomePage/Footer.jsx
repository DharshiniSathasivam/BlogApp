import React from 'react'
import { Link } from 'react-router-dom'
import '../Styles/Footer.css'
import {FaSquareXTwitter,FaGithub,FaLinkedin} from 'react-icons/fa6'
function Footer() {
  return (
         <footer className="footer">
      <div className="footer-top">
        <div className="footer-brand">
          <div className="footer-logo">
            Pencraft
            <span className="brand-badge">Blog</span>
          </div>
          <p className="footer-tagline">Stories worth reading. Ideas worth sharing.</p>
        </div>
        <div className="footer-links">
          <div className="footer-col">
            <h4>Navigate</h4>
            <Link to="/">Home</Link>
            <Link to="/article">Articles</Link>
            <Link to="/categories">Categories</Link>
            <Link to="/about">About</Link>
          </div>

          <div className="footer-col">
            <h4>Create</h4>
            <Link to="/posts/new">Write a Post</Link>
            <Link to="/register">Join Us</Link>
            <Link to="/login">Login</Link>
          </div>
        </div>
      </div>

      
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Pencraft. All rights reserved.</p>
        <div className="footer-socials">
          <a href="https://x.com/DHARSHINI200307" title="Twitter">
               <FaSquareXTwitter size={20} />
          </a>
          <a href="https://github.com/DharshiniSathasivam" title="GitHub">
              <FaGithub size={20} />
          </a>
          <a href="www.linkedin.com/in/dharshini-sathasivam" title="LinkedIn">
              <FaLinkedin size={20} />
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer