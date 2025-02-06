"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.submitRouter = void 0;
const express_1 = __importDefault(require("express"));
const jwt_1 = require("../utils/jwt");
const submissionController_1 = require("../controllers/submissionController");
exports.submitRouter = express_1.default.Router();
exports.submitRouter.post("/submissions/create", [jwt_1.verifyToken], submissionController_1.createSubmission);
exports.submitRouter.get("/submissions/problem/:problemId", [jwt_1.verifyToken], submissionController_1.getAllSubmissions);
exports.submitRouter.get("/submissions/user/:problemId", [jwt_1.verifyToken], submissionController_1.getUserSubmissions);
