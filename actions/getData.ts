import { client } from "@/sanity/lib/client";


export async function getData() {

    const query = `*[_type == "questions"]{
        question,
        answers,
        correctAnswer
      }`;

    const data = await client.fetch(query);

    return data;
    
}