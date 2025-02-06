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
exports.getUserSubmissions = exports.getAllSubmissions = exports.createSubmission = exports.subClient = void 0;
const requestQueue = "requestqueue";
const responseQueue = "responsequeue";
const extra_1 = require("../utils/extra");
const __1 = require("..");
const prisma_1 = __importDefault(require("../utils/prisma"));
const uuid_1 = require("uuid");
const redis_1 = require("redis");
const subscribe_1 = require("../utils/subscribe");
const match_1 = require("../utils/match");
exports.subClient = (0, redis_1.createClient)({
    url: process.env.REDIS_URL || "redis://localhost:6379",
});
const createSubmission = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("starting test");
        const userId = req.user.id;
        const { id, code, languageId, problemId } = req.body;
        if (!code || !languageId || !problemId || !id) {
            return res.status(403).json({
                message: "credentials are unavailble",
            });
        }
        console.log("checking");
        const { language, problem } = yield (0, extra_1.findProblemAndLanguage)(languageId, problemId);
        const queueId = (0, uuid_1.v4)();
        console.log("input");
        const inputRedis = {
            queueId: queueId,
            language_id: parseInt(language.id),
            source_code: code,
        };
        console.log("listning on id:", inputRedis.queueId, queueId);
        const finalOutput = (0, subscribe_1.handleSubcribe)(queueId, 5000);
        yield __1.redisClient.lPush(requestQueue, JSON.stringify(inputRedis));
        const response = yield finalOutput;
        const st = JSON.parse(response);
        const message = st.replace(/[^\x20-\x7E]+/g, "").trim();
        console.log(message, "is here");
        const output = yield (0, match_1.matchResults)(problem.output, message);
        const submission = yield prisma_1.default.submission.create({
            data: {
                languageId: languageId,
                userId: userId,
                problemId: problemId,
                status: "Pending",
                code: code,
            },
        });
        yield prisma_1.default.user.update({
            where: { id: userId },
            data: {
                totalSubmissions: {
                    increment: 1,
                },
            },
        });
        return res.status(200).json({
            answer: JSON.parse(JSON.stringify(output)),
        });
    }
    catch (error) {
        return res.status(400).json({
            message: error,
        });
    }
});
exports.createSubmission = createSubmission;
//this is the submissions from all the users for a given ps
const getAllSubmissions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { problemId } = req.params;
        const submissions = yield prisma_1.default.submission.findMany({
            where: {
                problemId: problemId,
            },
        });
        if (!submissions) {
            return res.status(404).json({
                message: "no submissions found",
            });
        }
        return res.status(200).json({
            submissions: submissions,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(404).json(error);
    }
});
exports.getAllSubmissions = getAllSubmissions;
const getUserSubmissions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = yield req.user.id;
        const problemId = yield req.body.problemId;
        if (!userId) {
            return res.status(404).json({
                message: "user isnot logged in",
            });
        }
        const submissions = yield prisma_1.default.submission.findMany({
            where: {
                userId: userId,
                problemId: problemId,
            },
        });
        return res.status(200).json({ userSubmissions: submissions });
    }
    catch (error) {
        return res.status(404).json(error);
    }
});
exports.getUserSubmissions = getUserSubmissions;
