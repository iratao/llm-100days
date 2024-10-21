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
// @ts-nocheck
require("../bootstrap");
const app_1 = require("./app");
const uuid_1 = require("uuid");
const inputs = [
    {
        messages: [{
                role: "user",
                content: "Hi! I'm Bob.",
            }],
        language: 'Chinese'
    },
    {
        messages: [{
                role: "user",
                content: "What's my name?"
            }],
        langage: 'Chinese'
    }
];
const config = { configurable: { thread_id: (0, uuid_1.v4)() } };
const next = (input) => __awaiter(void 0, void 0, void 0, function* () {
    return yield app_1.app.invoke(input, config);
});
const run = () => __awaiter(void 0, void 0, void 0, function* () {
    for (const input of inputs) {
        const output = yield next(input);
        console.log(output.messages[output.messages.length - 1]);
    }
});
run();
//# sourceMappingURL=index.js.map