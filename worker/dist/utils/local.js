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
exports.execute_python = execute_python;
exports.execute_js = execute_js;
exports.executeCode_c = executeCode_c;
exports.executeCode_cpp = executeCode_cpp;
exports.executeCode_go = executeCode_go;
exports.executeCode_java = executeCode_java;
const runner_1 = require("./runner");
function execute_python(code) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Outside exec");
        const python_code_ans = yield (0, runner_1.executeCode_python_code)(code);
        return python_code_ans;
    });
}
function execute_js(code) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Outside js docker");
        const js_code_ans = yield (0, runner_1.execute_js_code)(code);
        return js_code_ans;
    });
}
function executeCode_c(code) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Starting C code ");
        const c_code_ans = yield (0, runner_1.executeCode_c_code)(code);
        return c_code_ans;
    });
}
function executeCode_cpp(code) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Starting C code ");
        const cpp_code_ans = yield (0, runner_1.executeCode_cpp_code)(code);
        return cpp_code_ans;
    });
}
function executeCode_go(code) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Starting C code ");
        const go_ans = yield (0, runner_1.executeCode_go_code)(code);
        return go_ans;
    });
}
function executeCode_java(code) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Starting C code ");
        const java_ans = yield (0, runner_1.executeCode_java_code)(code);
        return java_ans;
    });
}
