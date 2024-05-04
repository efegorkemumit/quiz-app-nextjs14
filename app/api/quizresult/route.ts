import { prismadb } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req:NextRequest) {
    const body = await req.json();
    const {userId, quizScore, correctAnswers, wrongAnswers} = body

    try {
        let exitingUser = await prismadb.user.findUnique({
            where:{id:userId},
            include:{quizResults:true},
        });

        if(exitingUser && exitingUser.quizResults && exitingUser.quizResults.length > 0){
            const updateUserStats = await prismadb.quizResult.update({
                where:{
                    id:exitingUser.quizResults[0].id
                },
                data:{
                    quizScore:exitingUser.quizResults[0].quizScore + quizScore,
                    correctAnswers:exitingUser.quizResults[0].correctAnswers + correctAnswers,
                    wrongAnswers:exitingUser.quizResults[0].wrongAnswers+ wrongAnswers
                }
            })
            return NextResponse.json({updateUserStats});
        }
        else{

            const newUser = await prismadb.user.update({
                where:{
                    id:userId,
                },
                data:{
                    quizResults:{
                        create:{
                            quizScore:quizScore,
                            correctAnswers:correctAnswers,
                            wrongAnswers:wrongAnswers
                        }
                    }
                }
            })
            return NextResponse.json({newUser});


        }
        
    } catch (error) {
        console.error(error)
        return
        
    }

    
}