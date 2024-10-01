/**
 * Try to use PromtTemplates to format promts.
 */
import { ChatOpenAI } from "@langchain/openai";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { ChatPromptTemplate } from "@langchain/core/prompts";

import '../bootstrap';

const model = new ChatOpenAI({ model: "gpt-4" });
const parser = new StringOutputParser();

const systemTemplate = "Given an example of how the text is used in a sentence: {context}, translate the following text into {language}. ";

const promptTemplate = ChatPromptTemplate.fromMessages([
  ["system", systemTemplate],
  ["user", "{text}"],
]);

const run = async () => {
  const llmChain = promptTemplate.pipe(model).pipe(parser);
  const response = await llmChain.invoke({ language: "english", text: "眼耳鼻喉科", context: "喉咙有点疼，需要去眼耳鼻喉科看病" });
  console.log('response:', response);
}

run()