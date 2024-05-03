import React from 'react'

interface AuthLayoutprops{
    children:React.ReactNode;
}

const AuthLayout = ({children}:AuthLayoutprops) => {
  return (
    <div className='flex items-center justify-center min-h-screen'>
        
        {children}
        
   </div>
  )
}

export default AuthLayout