"use server"

import { prismadb } from "@/lib/db"

export const getByUserId = async(id:string)=>{

    const user = await prismadb.user.findUnique({
        where:{
            clerkUserId:id
        },
        include:{
            quizResults:true
        }
    })

    return user
}