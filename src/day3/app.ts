import {
  START,
  END,
  MessagesAnnotation,
  Annotation,
  StateGraph,
  MemorySaver,
} from "@langchain/langgraph";
import {
  ChatPromptTemplate,
  MessagesPlaceholder,
} from "@langchain/core/prompts";
import { ChatOpenAI } from "@langchain/openai";

const llm = new ChatOpenAI({
  model: "gpt-4o-mini",
  temperature: 0
});

const GraphAnnotation = Annotation.Root({
  ...MessagesAnnotation.spec,
  language: Annotation<string>(),
});

const prompt = ChatPromptTemplate.fromMessages([
  [
    "system",
    "You are a helpful assistant. Answer all questions to the best of your ability in {language}."
  ],
  new MessagesPlaceholder("messages"),
]);

// Define the function that calls the model
const callModel = async (state: typeof GraphAnnotation.State) => {
  const chain = prompt.pipe(llm);
  const response = await chain.invoke(state);
  return { messages: [response] };
};

// Define a new graph
const workflow = new StateGraph(GraphAnnotation)
  // Define the node and edge
  .addNode("model", callModel)
  .addEdge(START, "model")
  .addEdge("model", END);

// Add memory
const memory = new MemorySaver();
export const app = workflow.compile({ checkpointer: memory });