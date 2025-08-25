import React from 'react'
import "../style/NotFoundPage.css"
import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <main className='not-found'>
      <div className="not-found-text">
        <h1 className='not-found-number'>404</h1>
        <h3>page not found</h3>
      </div>
      <Link to="/"><p className='not-found-btn'>Back to main page</p></Link>
    </main>
  )
}

export default NotFoundPage