import { ChatOpenAI } from "@langchain/openai";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { StringOutputParser } from "@langchain/core/output_parsers";
import '../bootstrap';

const model = new ChatOpenAI({ model: "gpt-4" });
const parser = new StringOutputParser();


const messages = [
  new SystemMessage("Translate the following from English into German"),
  new HumanMessage("hi!"),
];

const run = async () => {
  const chain = model.pipe(parser);
  const response = await chain.invoke(messages);
  console.log('response:', response);
}

run()