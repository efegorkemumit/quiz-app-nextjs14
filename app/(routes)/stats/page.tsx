import { getByUserId } from '@/actions/getUser';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import React from 'react'
import StatCard from '../_components/StatCard';

const StatsPage = async() => {

    const {userId}= auth();

    if(!userId) redirect("/sign-in");
    
    const currentUser = await getByUserId(userId);
    console.log(currentUser)
  
  return (
    <div className='py-20'>
        <div className='text-center mb-10 text-2xl'>
            <h3 className='text-white text-3xl font-serif mb-5'>
                {currentUser?.username}'s Stats
            </h3>

        <div className='max-w-[1500px] mx-auto w-[90%] flex  justify-center py-10 flex-col'>
                <StatCard
                title='Total Points'
                value={currentUser?.quizResults[0].quizScore}
                />

<StatCard
                title='Correct Answers'
                value={currentUser?.quizResults[0].correctAnswers}
                />

<StatCard
                title='Wrong Answers'
                value={currentUser?.quizResults[0].wrongAnswers}
                />

        </div>


        </div>
    </div>
  )
}

export default StatsPage