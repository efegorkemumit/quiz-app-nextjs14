'use client'

import { Button } from '@/components/ui/button';
import React, { useEffect, useState } from 'react'
import StatCard from './StatCard';

interface QuizProps{
    questions:{
        question:string;
        answers:string[];
        correctAnswer:string;
    }[];
    userId:string | undefined;
}

const Quiz = ({questions,userId}:QuizProps) => {
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [checked, setChecked] = useState(false);
  const [selectedAnswerIndex, setSelectedAnswerIndex] =
    useState<number | null>(null);


  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState({
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
  });

  const  {question,answers,correctAnswer}  = questions[activeQuestion]
  const [timeRemaining, setTimeRemaining] = useState(25);
  const [timerRunning, setTimerRunning] = useState(false);

  useEffect(()=>{
    let timer :NodeJS.Timeout;
    if(timerRunning && timeRemaining> 0){
      timer = setTimeout(()=>{
        setTimeRemaining((prevTime)=>prevTime-1);
      }, 1000)
    }else if (timeRemaining === 0){
      handleTimeUp();
    }
    return ()=>clearTimeout(timer);
  }, [timerRunning, timeRemaining])

  const startTimer = ()=>{
    setTimerRunning(true);
  }
  const stopTimer = ()=>{
    setTimerRunning(false);
  }
  const resetTimer = ()=>{
    setTimeRemaining(25);
  }

  const handleTimeUp=()=>{
    stopTimer();
    resetTimer();
    nextQuestion();

  }

  useEffect(()=>{
    startTimer();
    
    return()=>{
      stopTimer();
    }
  },[]);


  ///// event

  const onAnswerSelected =(answer:string, idx:number)=>{
    setChecked(true);
    setSelectedAnswerIndex(idx);
    if(answer===correctAnswer){
      setSelectedAnswer(answer);
    }else{
      setSelectedAnswer("")
    }

  }

  const  nextQuestion=()=>{
    setSelectedAnswerIndex(null);
    setChecked(false);
    resetTimer();
    startTimer();
    setResults((prev)=>
    selectedAnswer ? {
      ...prev,
      score:prev.score+5,
      correctAnswers:prev.correctAnswers+1

    }:{
      ...prev,
      wrongAnswers:prev.wrongAnswers+1

    });

    if(activeQuestion !=questions.length-1){
      setActiveQuestion((prev)=>prev+1);
    }
    else{
      setShowResults(true);
      stopTimer();

      fetch("/api/quizresult",{
        method:"POST",
        headers:{
          "Content-Type": "application/json",
        },
        body:JSON.stringify({
          userId: userId,
          quizScore: results.score,
          correctAnswers: results.correctAnswers,
          wrongAnswers: results.wrongAnswers,
        })
      }).then((response)=>{
        if(!response.ok){
          throw new Error(
            "Network response was not working fam"
          );
          
        }
        return response.json();
      }).then((data)=>{
        console.log("Quiz", data)
      }).catch((error)=>{
        console.error("Error", error)
      })

      ///

    }

  }


  return (
    <div className='min-h-[600px]'>
      <div className='max-w-[1500px] mx-auto w-[90%] flex  justify-center py-10 flex-col'>
      {!showResults ?
      (
        <>
        <div className='flex justify-between mb-10 items-center'>
          <div className='bg-mycolor-400 text-white px-4  rounded-lg py-1'>
            <h2>
              Question {activeQuestion +1}
              <span>/{questions.length}</span>
            </h2>
          </div>
          <div className='bg-mycolor-400  text-white px-4  rounded-lg py-1'>
          {timeRemaining } seconds to answer
          </div>
        
        </div>

        <div className=''>
          <h3 className='mb-5 text-2xl font-bold text-mycolor-300'>
            {question}
          </h3>

          <ul>
           {answers.map((answer:string, idx:number)=>(
            <li
            key={idx}
            onClick={()=>
                onAnswerSelected(answer, idx)
            }
            className={`cursor-pointer mb-5 p-2 py-3 border text-white border-mycolor-500
            rounded-lg hover:bg-mycolor-100 px-4 
            ${selectedAnswerIndex === idx && "text-white hover:bg-sky-700 bg-sky-700 font-semibold"}
          
            `}
            >

             <span>{answer}</span>
            </li>
           ))}



          </ul>
            <Button
            variant="nextquestion"
            size="xl"
            onClick={nextQuestion}
            disabled={!checked}
            >
             {activeQuestion === questions.length - 1
                  ? "Finish"
                  : "Next Question →"}


            </Button>
          
        </div>
        
        </>
       

      ):(
        <div className='text-center'>
          <h3 className='text-white text-3xl font-serif mb-5'>Results</h3>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>

            <StatCard
            title='Percentage'
            value={`${(results.score/50)*100}%`}
            />

          <StatCard
            title='Total Questions'
            value={questions.length}
            />

<StatCard
            title='Total Score'
            value={results.score}
            />

<StatCard
            title='Correct Answers'
            value={results.correctAnswers}
            />


            <StatCard
            title='Wrong Answers'
            value={results.wrongAnswers}
            />



          </div>

          <Button 
          onClick={()=>window.location.reload()}
          variant="nextquestion" size="xl" className='w-full mt-4'>
            Restart Quiz
          </Button>



        </div>
      )
    
    
    }


      </div>


    </div>
  )
}

export default Quiz