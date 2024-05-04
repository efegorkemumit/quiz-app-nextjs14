import React from 'react'

interface StatCardProps{
    title:string;
    value:string | number | undefined;
}
const StatCard = ({title,value}:StatCardProps) => {
  return (
    <div  className='p-5 rounded-md bg-mycolor-100 text-white
    border-2 border-mycolor-300 text-center text-2xl m-2'>
        <h3 className='uppercase text-base mb-2'>{title}</h3>
        <span className='text-lg'>{value}</span>


    </div>
  )
}

export default StatCard