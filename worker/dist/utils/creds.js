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
exports.getResults = exports.getSubmission = exports.createSubmission = void 0;
const axios_1 = __importDefault(require("axios"));
const createSubmission = (code) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const key = process.env.JUDGE0_KEY;
        const host = process.env.JUDGE_HOST;
        const options = {
            method: "POST",
            url: "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=true&wait=false&fields=*",
            headers: {
                "content-type": "application/json",
                "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
                "X-RapidAPI-Key": "5c47cd0144msh7d38df2c558f990p1132a5jsnb0b367924022",
            },
            data: {
                language_id: code.language_id,
                source_code: code.source_code,
            },
        };
        const response = yield axios_1.default.request(options);
        return response.data;
    }
    catch (error) {
        console.log(error);
        return error;
    }
});
exports.createSubmission = createSubmission;
const getSubmission = (token) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(token, "is here token");
    try {
        const options = {
            method: "GET",
            url: `https://judge0-ce.p.rapidapi.com/submissions/${token}`,
            params: {
                base64_encoded: "true",
                fields: "*",
            },
            headers: {
                "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
                "X-RapidAPI-Key": "5c47cd0144msh7d38df2c558f990p1132a5jsnb0b367924022",
            },
        };
        const response = yield axios_1.default.request(options);
        return response.data;
    }
    catch (error) {
        return error;
    }
});
exports.getSubmission = getSubmission;
const getResults = (response) => __awaiter(void 0, void 0, void 0, function* () {
    if ((response && response.status.id === 1) || response.status.id === 2) {
        console.log("processing........");
        setTimeout(() => {
            console.log("waiting");
        }, 2000);
    }
    else if (response && response.stdout) {
        const decodedOutput = atob(response === null || response === void 0 ? void 0 : response.stdout);
        return decodedOutput.toString();
    }
    else {
        console.log("no output available");
        return undefined;
    }
});
exports.getResults = getResults;
