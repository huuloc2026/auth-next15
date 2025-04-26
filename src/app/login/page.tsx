import React from 'react'
import LoginUI from '../../components/LoginUI'

const LoginPage = () => {
  return (
    <div>
      <a href="/" className="bg-blue-500 text-white text-center p-2">
        back to homepage
      </a>
      <LoginUI/>
    </div>
  )
}

export default LoginPage