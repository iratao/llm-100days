# Learnings

[Build a Retrieval Augmented Generation (RAG) App](https://js.langchain.com/docs/tutorials/rag/)

In day6 I follow the tutorial about and build a RAG app using `createStuffDocumentsChain`, which is a wrapper around `RunnableSequence` and provides a simple way to create a chain of runnable sequences.

This tutorial shows the basic steps required to build a RAG app:

Indexing

1. Load the data
2. Split the data into chunks
3. Store and indexing data chunks

Retrieval and generation

1. Retrieve relevant data chunks given user inputs. (Question: how to decide which data chunks are relevant?)
2. Using LLM to generate answers using prompts that include the question and the retrieved data chunks as context.

#### What is Retrieval Augmented Generation (RAG)?

RAG is a technique for augmenting LLM knowledge with additional data so that LLM can start answering questions for your own knowledge base.

"RAG is only as good as the retrieved documents' relevant and quality" - [Retrieval](https://js.langchain.com/docs/concepts/#retrieval)

So it it important to have a good retrieval system to get the best results.

There are many techniques to improve that.
![taxonomizing and summarizing of the techs that improve RAG system](https://js.langchain.com/assets/images/rag_landscape-627f1d0fd46b92bc2db0af8f99ec3724.png)
