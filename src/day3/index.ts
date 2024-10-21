// @ts-nocheck
import '../bootstrap';
import { app } from './app'

import { v4 as uuidv4 } from "uuid";


const inputs = [
  {
    messages: [{
      role: "user",
      content: "Hi! I'm Bob.",
    }],
    language: 'Chinese'
    
  },
  {
    messages: [{
      role: "user",
      content: "What's my name?"
    }],
    langage: 'Chinese'
  }
];

const config = { configurable: { thread_id: uuidv4() } }

const next = async (input: string) => {
  return await app.invoke(input, config );
}

const run = async () => {
  for (const input of inputs) {
    const output = await next(input);
    console.log(output.messages[output.messages.length - 1]);
  }
}

run()


