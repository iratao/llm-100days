"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Try to use PromtTemplates to format promts.
 */
const openai_1 = require("@langchain/openai");
const output_parsers_1 = require("@langchain/core/output_parsers");
const prompts_1 = require("@langchain/core/prompts");
require("../bootstrap");
const model = new openai_1.ChatOpenAI({ model: "gpt-4" });
const parser = new output_parsers_1.StringOutputParser();
const systemTemplate = "Given an example of how the text is used in a sentence: {context}, translate the following text into {language}. ";
const promptTemplate = prompts_1.ChatPromptTemplate.fromMessages([
    ["system", systemTemplate],
    ["user", "{text}"],
]);
const run = () => __awaiter(void 0, void 0, void 0, function* () {
    const llmChain = promptTemplate.pipe(model).pipe(parser);
    const response = yield llmChain.invoke({ language: "english", text: "眼耳鼻喉科", context: "喉咙有点疼，需要去眼耳鼻喉科看病" });
    console.log('response:', response);
});
run();
//# sourceMappingURL=index.js.map