import openai from '@/openai';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  //todos in the body of the post req
  const { todos } = await request.json();

  // communicate with openAI GPT
  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    temperature: 0.7,
    n: 1,
    stream: false,
    messages: [
      {
        role: 'system',
        content: `When responding, welcome the user always as Hello, Brigita! and welcome them to the Trello Clone! Limit
            the response to 500 characters.`,
      },
      {
        role: 'user',
        content: `Hi there, provide a summary of the following todos for the current day. Count how many todos are in each category such as To do,
            in progress and done; followed by motivational quote (without saying that explicitly) in a new row
            and then tell the user to have a productive day!
            Here is the data: ${JSON.stringify(todos)}`,
      },
    ],
  });

  const { data } = response;

  console.log('DATA IS: ', data);
  console.log(data.choices[0].message);

  return NextResponse.json(data.choices[0].message);
}
