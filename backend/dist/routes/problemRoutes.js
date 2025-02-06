"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.problemRouter = void 0;
const express_1 = __importDefault(require("express"));
const problemController_1 = require("../controllers/problemController");
const jwt_1 = require("../utils/jwt");
exports.problemRouter = express_1.default.Router();
exports.problemRouter.post("/problems/create", [jwt_1.verifyToken], problemController_1.createProblem);
exports.problemRouter.get("/problems/all", problemController_1.getProblems);
exports.problemRouter.get("/problems/:problemId", [jwt_1.verifyToken], problemController_1.getProblem);
