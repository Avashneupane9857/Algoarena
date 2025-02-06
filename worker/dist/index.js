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
exports.pushClient = exports.redisClient = exports.redis_url = void 0;
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const redis_1 = require("redis");
const dotenv_1 = __importDefault(require("dotenv"));
const processRequest_1 = require("./utils/processRequest");
const redisQueue = "requestqueue";
dotenv_1.default.config();
exports.redis_url = process.env.REDIS_URL || "redis://localhost:6379";
console.log(exports.redis_url);
exports.redisClient = (0, redis_1.createClient)({
    url: exports.redis_url,
});
exports.pushClient = (0, redis_1.createClient)({
    url: exports.redis_url,
});
function connectRedis() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield exports.redisClient.connect();
            yield exports.pushClient.connect();
            exports.redisClient.on("error", (err) => {
                console.log("error while joining redis", err);
            });
            executeProcess();
        }
        catch (error) {
            console.log(error);
        }
    });
}
connectRedis();
function executeProcess() {
    return __awaiter(this, void 0, void 0, function* () {
        while (true) {
            const request = yield exports.redisClient.brPop(redisQueue, 0);
            console.log(request === null || request === void 0 ? void 0 : request.element, "element is received");
            yield (0, processRequest_1.processRequest)(JSON.parse(request.element));
        }
    });
}
app.listen(3002, () => {
    console.log("working on port 3002");
});
