# Learnings

[Build a Retrieval Augmented Generation (RAG) App](https://js.langchain.com/docs/tutorials/rag/)

Day 7 keeps working on the RAG app built in day 6. The tutorial shows how to use the `createStuffDocumentsChain` to build a chain of runnable sequences to index and retrieve data chunks. It also shows how to use the `RunnableSequence` to build a more complex and customized RAG chain.

### Embedding

- Definition: An embedding is a dense vector representation of data. In the context of text, it transforms words, phrases, or even entire documents into numerical vectors that can be processed by machine learning models.

- Purpose: The primary purpose of embeddings is to capture semantic relationships between pieces of text. Words or phrases that are semantically similar are represented by vectors that are close together in the embedding space.

- Creation: Embeddings are usually created using models like Word2Vec, GloVe, or more advanced methods like Transformer-based models (e.g., BERT, GPT). These models learn embeddings by predicting word contexts or through other objectives during training.

- Usage: In the realm of LLMs, embeddings are used for a variety of tasks such as similarity search, clustering, classification, sentiment analysis, and more. They serve as the input to many downstream NLP applications, providing a way to quantify the semantic content of text.

### Vector Store

- Definition: A vector store is a specialized database designed to efficiently store and retrieve embeddings. It supports operations required for managing large-scale embeddings, such as similarity search.

- Functionality: Vector stores provide efficient indexing and querying capabilities for high-dimensional vectors, enabling operations like nearest neighbor search (finding vectors that are most similar) and clustering.

- Components: Key components of a vector store include:

  Indexing: Various methods like KD-trees, locality-sensitive hashing, or more advanced structures are used to index the vectors for fast retrieval.

  Storage: The underlying storage engine stores the vectors and associated metadata.

  Querying: Provides APIs or interfaces to retrieve vectors based on similarity metrics.

- Use Cases: Vector stores are used in applications requiring fast and scalable semantic searches, such as recommendation systems, search engines, and any AI applications leveraging LLMs that involve handling large numbers of embeddings.

# Problem Solving Notes

Today when I try to run the code, I got this error.

```bash
node:internal/deps/undici/undici:13178
      Error.captureStackTrace(err);
            ^

TypeError: fetch failed
    at node:internal/deps/undici/undici:13178:13
    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)
    at async RetryOperation._fn (/root/project/langchain/node_modules/p-retry/index.js:50:12) {
  [cause]: AggregateError [ETIMEDOUT]:
      at internalConnectMultiple (node:net:1118:18)
      at internalConnectMultiple (node:net:1186:5)
      at Timeout.internalConnectMultipleTimeout (node:net:1712:5)
      at listOnTimeout (node:internal/timers:583:11)
      at process.processTimers (node:internal/timers:519:7) {
    code: 'ETIMEDOUT',
    [errors]: [
      Error: connect ETIMEDOUT 185.199.109.153:443
          at createConnectionError (node:net:1648:14)
          at Timeout.internalConnectMultipleTimeout (node:net:1707:38)
          at listOnTimeout (node:internal/timers:583:11)
          at process.processTimers (node:internal/timers:519:7) {
        errno: -110,
        code: 'ETIMEDOUT',
        syscall: 'connect',
        address: '185.199.109.153',
        port: 443
      },
      Error: connect ENETUNREACH 2606:50c0:8002::153:443 - Local (:::0)
          at internalConnectMultiple (node:net:1182:16)
          at Timeout.internalConnectMultipleTimeout (node:net:1712:5)
          at listOnTimeout (node:internal/timers:583:11)
          at process.processTimers (node:internal/timers:519:7) {
        errno: -101,
        code: 'ENETUNREACH',
        syscall: 'connect',
        address: '2606:50c0:8002::153',
        port: 443
      },
      Error: connect ETIMEDOUT 185.199.108.153:443
          at createConnectionError (node:net:1648:14)
          at Timeout.internalConnectMultipleTimeout (node:net:1707:38)
          at listOnTimeout (node:internal/timers:583:11)
          at process.processTimers (node:internal/timers:519:7) {
        errno: -110,
        code: 'ETIMEDOUT',
        syscall: 'connect',
        address: '185.199.108.153',
        port: 443
      },
      Error: connect ENETUNREACH 2606:50c0:8003::153:443 - Local (:::0)
          at internalConnectMultiple (node:net:1182:16)
          at Timeout.internalConnectMultipleTimeout (node:net:1712:5)
          at listOnTimeout (node:internal/timers:583:11)
          at process.processTimers (node:internal/timers:519:7) {
        errno: -101,
        code: 'ENETUNREACH',
        syscall: 'connect',
        address: '2606:50c0:8003::153',
        port: 443
      },
      Error: connect ETIMEDOUT 185.199.111.153:443
          at createConnectionError (node:net:1648:14)
          at Timeout.internalConnectMultipleTimeout (node:net:1707:38)
          at listOnTimeout (node:internal/timers:583:11)
          at process.processTimers (node:internal/timers:519:7) {
        errno: -110,
        code: 'ETIMEDOUT',
        syscall: 'connect',
        address: '185.199.111.153',
        port: 443
      },
      Error: connect ENETUNREACH 2606:50c0:8000::153:443 - Local (:::0)
          at internalConnectMultiple (node:net:1182:16)
          at Timeout.internalConnectMultipleTimeout (node:net:1712:5)
          at listOnTimeout (node:internal/timers:583:11)
          at process.processTimers (node:internal/timers:519:7) {
        errno: -101,
        code: 'ENETUNREACH',
        syscall: 'connect',
        address: '2606:50c0:8000::153',
        port: 443
      },
      Error: connect ETIMEDOUT 185.199.110.153:443
          at createConnectionError (node:net:1648:14)
          at Timeout.internalConnectMultipleTimeout (node:net:1707:38)
          at listOnTimeout (node:internal/timers:583:11)
          at process.processTimers (node:internal/timers:519:7) {
        errno: -110,
        code: 'ETIMEDOUT',
        syscall: 'connect',
        address: '185.199.110.153',
        port: 443
      },
      Error: connect ENETUNREACH 2606:50c0:8001::153:443 - Local (:::0)
          at internalConnectMultiple (node:net:1182:16)
          at Timeout.internalConnectMultipleTimeout (node:net:1712:5)
          at listOnTimeout (node:internal/timers:583:11)
          at process.processTimers (node:internal/timers:519:7) {
        errno: -101,
        code: 'ENETUNREACH',
        syscall: 'connect',
        address: '2606:50c0:8001::153',
        port: 443
      }
    ]
  }
}
```

It looks ike it has problem connecting to `185.199.111.153:443`. To figure out what service this ip is associated with, I used the `whois` command.

```bash
whois 185.199.109.153
```

The output shows that the ip is associated with `github.com`. I think the error is due to the fact that the ip is blocked by the firewall. Rerun the code usually solve the problem.
