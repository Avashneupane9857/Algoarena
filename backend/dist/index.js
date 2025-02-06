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
exports.pullClient = exports.redisClient = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const redis_1 = require("redis");
const authRoutes_1 = require("./routes/authRoutes");
const jwt_1 = require("./utils/jwt");
const problemRoutes_1 = require("./routes/problemRoutes");
const submissionRoutes_1 = require("./routes/submissionRoutes");
const submissionController_1 = require("./controllers/submissionController");
exports.redisClient = (0, redis_1.createClient)({
    url: process.env.REDIS_URL || "redis://localhost:6379",
});
exports.pullClient = (0, redis_1.createClient)({
    url: process.env.REDIS_URL || "redis://localhost:6379",
});
const app = (0, express_1.default)();
app.use(express_1.default.json());
dotenv_1.default.config();
app.use("/api/v1", authRoutes_1.userRouter);
app.use("/api/v1", problemRoutes_1.problemRouter);
app.use("/api/v1", submissionRoutes_1.submitRouter);
app.get("/test", [jwt_1.verifyToken, jwt_1.verifyToken], () => {
    console.log("working good");
});
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        yield exports.redisClient.connect();
        yield exports.pullClient.connect();
        yield submissionController_1.subClient.connect();
        app.listen(3000, () => {
            console.log("working on server");
        });
    });
}
startServer();
