import '../Styles/NavBar.css'

import { NavLink } from "react-router-dom";
function NavBar({darkMode,setDarkMode}){
    return(
        <nav className="navbar  navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <a className="navbar-brand" href="/">PenCraft
      <span className='brand-badge'>Blog</span>
    </a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div className="navbar-nav">
         <NavLink to= "/"className={({isActive})=> isActive ? "active-link" : ""}>Home</NavLink>
         <NavLink to= "/register"className={({isActive})=> isActive ? "active-link" : ""}>Register</NavLink>
          <NavLink to="/posts/new" className="new-post-btn">New Post</NavLink>
      </div>
    </div>
  </div>
</nav>
      
   
        
    )
}export default NavBar
 

