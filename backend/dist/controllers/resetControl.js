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
exports.reset = void 0;
const prisma_1 = __importDefault(require("../utils/prisma"));
const reset = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleteUsers = yield prisma_1.default.user.deleteMany();
        const deleteSubmissions = yield prisma_1.default.submission.deleteMany();
        const deleteProblems = yield prisma_1.default.problem.deleteMany();
        const deleteBoilerPlates = yield prisma_1.default.boilerplate.deleteMany();
        return res.status(200).json({
            message: "done",
        });
    }
    catch (error) {
        return res.status(400).json({
            message: error,
        });
    }
});
exports.reset = reset;
