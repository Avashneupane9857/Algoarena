"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleSubcribe = void 0;
const submissionController_1 = require("../controllers/submissionController");
const handleSubcribe = (uid, timeoutMs) => {
    return new Promise((resolve, reject) => {
        const channel = uid;
        const timeout = setTimeout(() => {
            submissionController_1.subClient.unsubscribe(channel);
            reject(new Error("Response timed out"));
        }, timeoutMs);
        submissionController_1.subClient.subscribe(channel, (data) => {
            console.log("received:", data);
            clearTimeout(timeout);
            submissionController_1.subClient.unsubscribe(channel);
            resolve(data);
        });
    });
};
exports.handleSubcribe = handleSubcribe;
