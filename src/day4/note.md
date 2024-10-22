# Learnings
Build a Reason + Act Agent (often called a ReAct Agent) that can search the web using Tavily Search API. 

https://langchain-ai.github.io/langgraphjs/tutorials/quickstart/

### Tavily
Tavily is a search engine that allows you to search the web using a simple API. It is a part of the Langchain ecosystem and is built on top of Langchain's graph database.

### What is a Checkpoint?
A checkpoint is a point in the conversation where the agent can pause and wait for the user to provide more information. This is useful when the agent needs to ask the user for more information before it can proceed.

# Todos
### configurable does not exists
```js
const agentFinalState = await agent.invoke(
  { messages: [new HumanMessage("what is the current weather in sf")] },
  { configurable: { thread_id: uuidv4() } },
);
```