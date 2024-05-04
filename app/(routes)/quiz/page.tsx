import { getData } from '@/actions/getData';
import { getByUserId } from '@/actions/getUser';
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation';
import React from 'react'
import Quiz from '../_components/Quiz';

const QuizPage = async() => {

  const {userId}= auth();

  if(!userId) redirect("/sign-in");
  
  const user = await getByUserId(userId);

  const questions = await getData();
  return (
    <Quiz questions={questions} userId={user.id}/>
  )
}

export default QuizPage