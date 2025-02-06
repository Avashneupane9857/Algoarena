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
exports.matchResults = void 0;
const matchResults = (expected, actual) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(expected, actual);
        if (expected === actual) {
            const output = {
                expectedOutput: expected,
                actualOutput: actual,
                status: "done",
                statusCode: 200,
            };
            return {
                expectedOutput: output.expectedOutput,
                actualOutput: output.actualOutput,
                status: output.status,
                statusCode: output.statusCode,
            };
        }
        const output = {
            expectedOutput: expected,
            actualOutput: actual,
            status: "error here",
            statusCode: 400,
        };
        return {
            expectedOutput: output.expectedOutput,
            actualOutput: output.actualOutput,
            status: output.status,
            statusCode: output.statusCode,
        };
    }
    catch (error) {
        console.log(error);
        return error;
    }
});
exports.matchResults = matchResults;
