import React from 'react'
import Navbar from './_components/Navbar'


interface RouteLayoutProps{
    children:React.ReactNode
}

const RouteLayout = ({children}:RouteLayoutProps) => {
  return (
    <>
    <Navbar/>
    
    <div className='py-5'>
        {children}
    </div>

    </>
  )
}

export default RouteLayout