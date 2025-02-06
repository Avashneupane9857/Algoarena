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
exports.getProblem = exports.getProblems = exports.createProblem = void 0;
const prisma_1 = __importDefault(require("../utils/prisma"));
const createProblem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { boilerPlateId, input, output, statement } = req.body;
        if (!boilerPlateId || !input || !output || !statement) {
            return res.status(404).json({
                message: "creds arent available",
            });
        }
        const problem = yield prisma_1.default.problem.create({
            data: {
                input: input,
                statement: statement,
                boilerplateId: boilerPlateId,
                output: output,
            },
        });
        if (!problem) {
            return res.status(403).json({
                message: "error creating the problem",
            });
        }
        return res.status(200).json({
            message: `problem ${problem.id} is created`,
            data: problem,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({
            message: error,
        });
    }
});
exports.createProblem = createProblem;
const getProblems = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const problems = yield prisma_1.default.problem.findMany();
        if (!problems) {
            return res.status(404).json({
                message: "no problems are available",
            });
        }
        return res.status(200).json({
            problems: [problems],
        });
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({
            message: error,
        });
    }
});
exports.getProblems = getProblems;
const getProblem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const problem = yield prisma_1.default.problem.findUnique({
            where: {
                id: req.params.problemId,
            },
        });
        if (!problem) {
            return res.status(404).json({
                message: "problem not availbale",
            });
        }
        return res.status(200).json({
            data: problem,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({
            message: error,
        });
    }
});
exports.getProblem = getProblem;
