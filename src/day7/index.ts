import "../bootstrap";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { formatDocumentsAsString } from "langchain/util/document";
import {
  RunnableSequence,
  RunnablePassthrough,
} from "@langchain/core/runnables";
import { Document } from "@langchain/core/documents";
import { CheerioWebBaseLoader } from "@langchain/community/document_loaders/web/cheerio";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { ChatOpenAI, OpenAIEmbeddings } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { pull } from "langchain/hub";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { VectorStoreRetriever } from "@langchain/core/vectorstores";

// Indexing: Load
const load = async () => {
  const pTagSelector = "p";
  const cheerioLoader = new CheerioWebBaseLoader(
    "https://lilianweng.github.io/posts/2023-06-23-agent/",
    {
      selector: pTagSelector,
    }
  );

  const loadedDocs = await cheerioLoader.load();
  console.log(loadedDocs[0].pageContent.length);
  return loadedDocs;
};

// Indexing: Split
const split = async (loadedDocs: Document<Record<string, any>>[]) => {
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200, // The overlap helps mitigate the possibility of separating a statement from important context related to it.
  });
  const allSplits = await splitter.splitDocuments(loadedDocs);
  return allSplits;
};

// Indexing: Store
const store = async (splits: Document<Record<string, any>>[]) => {
  const inMemoryVectorStore = await MemoryVectorStore.fromDocuments(
    splits,
    new OpenAIEmbeddings()
  );
  return inMemoryVectorStore;
};

// Retrieval & Generation: Retrieve
const retrieve = async (
  query: string,
  inMemoryVectorStore: MemoryVectorStore
) => {
  const vectorStoreRetriever = inMemoryVectorStore.asRetriever({
    k: 6,
    searchType: "similarity",
  });
  // const retrievedDocuments = await vectorStoreRetriever.invoke(query);
  // return retrievedDocuments;
  return vectorStoreRetriever;
};

const llm = new ChatOpenAI({
  model: "gpt-4o-mini",
  temperature: 0,
});

// Retrieval & Generation: Generate
const generate = async (
  vectorStoreRetriever: VectorStoreRetriever<MemoryVectorStore>,
  query: string
) => {
  const ragPrompt = await pull<ChatPromptTemplate>("rlm/rag-prompt");
  const runnableRagChain = RunnableSequence.from([
    {
      context: vectorStoreRetriever.pipe(formatDocumentsAsString),
      question: new RunnablePassthrough(),
    },
    ragPrompt,
    llm,
    new StringOutputParser(),
  ]);

  for await (const chunk of await runnableRagChain.stream(query)) {
    console.log(chunk);
  }
};

const run = async () => {
  const loadedDocs = await load();
  const splits = await split(loadedDocs);
  const vectorStore = await store(splits);
  const retriever = await retrieve("What is task decomposition?", vectorStore);
  await generate(retriever, "What is task decomposition?");
};

run();
