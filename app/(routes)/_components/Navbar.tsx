import { UserButton } from '@clerk/nextjs'
import { TvIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import UserMenu from './UserMenu'

const Navbar = () => {
  return (
    <div className='pt-5 w-full bg-mycolor-100 border-b border-b-mycolor-300'>
        <div className='max-w-[1500px] mx-auto w-[90%] flex justify-between items-center
        pb-5'>
            <div>
                <Link href="/"
                className='flex gap-2 items-center text-2xl'>
                <h1 className='text-mycolor-300 font-bold'>QuizCode</h1>
                <TvIcon className='text-mycolor-300'/>

                </Link>

            </div>

            <div className='md:block hidden  text-nowrap'>
                <span className='text-mycolor-400 font-semibold bg-mycolor-300 p-3 rounded-md'>
                    Today Quiz  : Javascript
                </span>


            </div>

            <div className='flex items-center gap-3 justify-end'>
                <UserMenu/>
                <UserButton afterSignOutUrl='/'/>


            </div>

        </div>
    </div>
  )
}

export default Navbar