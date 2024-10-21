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
exports.app = void 0;
const langgraph_1 = require("@langchain/langgraph");
const openai_1 = require("@langchain/openai");
const llm = new openai_1.ChatOpenAI({
    model: "gpt-4o-mini",
    temperature: 0
});
// Define the function that calls the model
const callModel = (state) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield llm.invoke(state.messages);
    return { messages: response };
});
// Define a new graph
const workflow = new langgraph_1.StateGraph(langgraph_1.MessagesAnnotation)
    // Define the node and edge
    .addNode("model", callModel)
    .addEdge(langgraph_1.START, "model")
    .addEdge("model", langgraph_1.END);
// Add memory
const memory = new langgraph_1.MemorySaver();
exports.app = workflow.compile({ checkpointer: memory });
//# sourceMappingURL=app.js.map