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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findProblemAndLanguage = void 0;
const languages_1 = require("./languages");
const prisma_1 = __importDefault(require("./prisma"));
const findProblemAndLanguage = (languageId, problemId) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("inside finding problem");
    const problem = yield prisma_1.default.problem.findUnique({
        where: {
            id: problemId,
        },
    });
    console.log("found the problem", problem);
    const language = languages_1.languages.find((l) => l.id === languageId);
    return { language, problem };
});
exports.findProblemAndLanguage = findProblemAndLanguage;
