'use client'

import Link from 'next/link';
import React, { useState } from 'react'
import { CgMenuGridO } from "react-icons/cg";

const UserMenu = () => {

    const [openUserMenu, setOpenUserMenu] = useState(false);

    const useMenuHandler = () => {
        setOpenUserMenu(!openUserMenu);
      };


    const links = [
        { name: "Stats", path: "/stats" },
        { name: "Leaderboards", path: "/leaderboards" },
      ];


  return (
    <div className='text-xl mt-1 cursor-pointer p-2'
    onMouseEnter={()=>setOpenUserMenu(true)}
    onMouseLeave={()=>setOpenUserMenu(false)}
    
    >
        <div className='relative'>
            <CgMenuGridO className="text-mycolor-300" />

            {openUserMenu && (
                <ul className='absolute text-sm bg-mycolor-400 z-50 top-7 left-[-80px] p-4 text-white rounded-lg'>
                {links.map((link, index)=>
                    <Link key={index}
                    href={link.path}
                    onClick={()=>setOpenUserMenu(false)}>
                        <li className=' hover:underline p-3'>
                            {link.name}

                        </li>
                    
                    </Link>
                
                )}

                </ul>
            )}

        </div>


    </div>
  )
}

export default UserMenu