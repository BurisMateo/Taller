import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function AuthButtons() {

    const navigate = useNavigate()

  return (
    <div>
        <button type="button" className="btn btn-primary me-2" onClick={()=>navigate('/login')}>Login</button>                        
        <button type="button" className="btn btn-success" onClick={()=>navigate('/register')}>Sign Up</button>
    </div>
  )
}
