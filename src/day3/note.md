# Learnings
Learn about how to build a chatbot using Langchain.
https://js.langchain.com/docs/tutorials/chatbot#prompt-templates

## JS
#### `await` can be used in `for of` loop
```js
const array = [1, 2, 3, 4, 5];

async function asyncForEach(array, callback) {
  for (const item of array) {
    await callback(item);
  }
}
```

#### TypeScript Constructor Overloads
[example](https://github.com/langchain-ai/langchainjs/blob/c1181111287ca21a4e5b2620ab441b5c4695029c/langchain-core/src/prompts/chat.ts#L114)

When checking the code of langchain, I found a constructor overload in TypeScript. I was not aware of this feature. I have seen constructor overloads in Java but not in TypeScript. I found it interesting and note it here.

In TypeScript, you can define multiple constructor signatures (also called overloads). These signatures allow you to specify different ways the class can be instantiated, helping provide better type safety and clarity about how objects of the class can be constructed. However, you still have just one implementation of the constructor that handles all of these signatures.

```js
class MessagesPlaceholder {
  constructor(variableName: Extract<keyof RunInput, string>);

  constructor(
    fields: MessagesPlaceholderFields<Extract<keyof RunInput, string>>
  );

  constructor(
    fields:
      | Extract<keyof RunInput, string>
      | MessagesPlaceholderFields<Extract<keyof RunInput, string>>
  ) {
    if (typeof fields === "string") {
      // eslint-disable-next-line no-param-reassign
      fields = { variableName: fields };
    }
    super(fields);
    this.variableName = fields.variableName;
    this.optional = fields.optional ?? false;
  }
}
```

## Langchain
* MessagesAnnotation
* GraphAnnotation


# Todos
* [ ] Make the repo a monorepo
