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
const openai_1 = require("@langchain/openai");
const messages_1 = require("@langchain/core/messages");
const output_parsers_1 = require("@langchain/core/output_parsers");
require("../bootstrap");
const model = new openai_1.ChatOpenAI({ model: "gpt-4" });
const parser = new output_parsers_1.StringOutputParser();
const messages = [
    new messages_1.SystemMessage("Translate the following from English into German"),
    new messages_1.HumanMessage("hi!"),
];
const run = () => __awaiter(void 0, void 0, void 0, function* () {
    const chain = model.pipe(parser);
    const response = yield chain.invoke(messages);
    console.log('response:', response);
});
run();
//# sourceMappingURL=index.js.map