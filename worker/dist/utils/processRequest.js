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
Object.defineProperty(exports, "__esModule", { value: true });
exports.processRequest = void 0;
const __1 = require("..");
const local_1 = require("./local");
function handleResponse(ans, id) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = JSON.stringify(ans);
        console.log(typeof result);
        console.log("Publishing result to API: and id", result, id);
        console.log(__1.pushClient.isOpen);
        yield __1.pushClient.publish(id, result);
    });
}
const processRequest = (element) => __awaiter(void 0, void 0, void 0, function* () {
    const langId = element.language_id.toString();
    console.log("Language ID:", langId, "\nRequest ID:", element.queueId);
    console.log("Processing Element:", element);
    try {
        let ans;
        switch (langId) {
            case "1":
                console.log("Starting execution of Python code");
                ans = yield (0, local_1.execute_python)(element.source_code);
                break;
            case "2":
                console.log("Starting execution of JavaScript code");
                ans = yield (0, local_1.execute_js)(element.source_code);
                break;
            case "3":
                console.log("Starting execution of C code");
                ans = yield (0, local_1.executeCode_c)(element.source_code);
                break;
            case "4":
                console.log("Starting execution of C++ code");
                ans = yield (0, local_1.executeCode_cpp)(element.source_code);
                break;
            case "5":
                console.log("Starting execution of Go code");
                ans = yield (0, local_1.executeCode_go)(element.source_code);
                break;
            case "6":
                console.log("Starting execution of Java code");
                ans = yield (0, local_1.executeCode_java)(element.source_code);
                break;
            default:
                console.log("Unknown language");
                ans = { error: "Unsupported language" };
        }
        handleResponse(ans, element.queueId);
    }
    catch (error) {
        console.error(`Error executing code for language ID ${langId}:`, error);
        yield handleResponse({ error: error.message || "Execution error" }, element.queueId);
    }
});
exports.processRequest = processRequest;
