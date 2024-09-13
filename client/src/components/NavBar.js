import React from 'react'
import cdLogo from '../assets/career_desire_logo.jpg'
import { Link } from 'react-router-dom'
import '../css/NavBar.css'

function NavBar() {
    const token = localStorage.getItem('token')

    const handleLogout = ()=>{
        localStorage.removeItem('token')
    }
  return (
    <nav className='nav animate__animated animate__fadeInDown'>
        <Link to='/'>
            <div className='cd-logo'>
                <img src={cdLogo} alt="career desire logo" className='cd-logo-img'/>
                <h4>Career Desire</h4>
            </div>
        </Link>
        <section className='nav-btns'>
            {!token ? 
            ( 
                <Link to='/login'><button className="btn">Login</button></Link>
            ):(
                <Link to='/login' onClick={handleLogout}><button className="btn">Logout</button></Link>
            )
            }
        </section>
    </nav>
  )
}

export default NavBar