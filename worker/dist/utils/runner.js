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
exports.executeCode_python_code = executeCode_python_code;
exports.executeCode_cpp_code = executeCode_cpp_code;
exports.execute_js_code = execute_js_code;
exports.executeCode_c_code = executeCode_c_code;
exports.executeCode_go_code = executeCode_go_code;
exports.executeCode_java_code = executeCode_java_code;
const dockerode_1 = __importDefault(require("dockerode"));
const fs_1 = __importDefault(require("fs"));
const os_1 = __importDefault(require("os"));
const path_1 = __importDefault(require("path"));
const uuid_1 = require("uuid");
const docker = new dockerode_1.default();
function executeCode_python_code(code) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Starting COde exe");
        const tempFilePath = path_1.default.join(__dirname, `${(0, uuid_1.v4)()}.py`);
        fs_1.default.writeFileSync(tempFilePath, code);
        console.log("File Write Complete");
        try {
            const container = yield docker.createContainer({
                Image: 'python',
                Cmd: ['python', `/app/${path_1.default.basename(tempFilePath)}`],
                Volumes: {
                    '/app': {}, // Mounting the code file to /app inside the container
                },
                HostConfig: {
                    Binds: [`${path_1.default.dirname(tempFilePath)}:/app`], // Mapping the temp directory
                },
                AttachStdout: true,
                AttachStderr: true,
                Tty: false,
            });
            yield container.start();
            const stream = yield container.logs({
                stdout: true,
                stderr: true,
                follow: true,
            });
            let output = '';
            stream.on('data', (chunk) => {
                output += chunk.toString();
            });
            yield container.wait();
            yield container.remove();
            return output;
        }
        catch (error) {
            return `Error during execution: ${error.message}`;
        }
        finally {
            fs_1.default.unlinkSync(tempFilePath);
        }
    });
}
function executeCode_cpp_code(code) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Starting C++ Code Execution");
        const tempFilePath = path_1.default.join(__dirname, `code.cpp`);
        fs_1.default.writeFileSync(tempFilePath, code);
        console.log("File Write Complete");
        try {
            const container = yield docker.createContainer({
                Image: 'gcc',
                Cmd: ['sh', '-c', 'g++ /app/code.cpp -o /app/code && /app/code'],
                Volumes: {
                    '/app': {},
                },
                HostConfig: {
                    Binds: [`${path_1.default.dirname(tempFilePath)}:/app`],
                },
                AttachStdout: true,
                AttachStderr: true,
                Tty: false,
            });
            yield container.start();
            const stream = yield container.logs({
                stdout: true,
                stderr: true,
                follow: true,
            });
            let output = '';
            stream.on('data', (chunk) => {
                output += chunk.toString();
            });
            yield container.wait();
            yield container.remove();
            return output;
        }
        catch (error) {
            return `Error during execution: ${error.message}`;
        }
        finally {
            fs_1.default.unlinkSync(tempFilePath);
        }
    });
}
function execute_js_code(code) {
    return __awaiter(this, void 0, void 0, function* () {
        const tempFilePath = path_1.default.join(os_1.default.tmpdir(), `${(0, uuid_1.v4)()}.js`);
        fs_1.default.writeFileSync(tempFilePath, code);
        console.log("File Write Complete");
        try {
            const container = yield docker.createContainer({
                Image: 'node', // Docker image for Node.js
                Cmd: ['node', `/app/${path_1.default.basename(tempFilePath)}`],
                Volumes: {
                    '/app': {}
                },
                HostConfig: {
                    Binds: [`${path_1.default.dirname(tempFilePath)}:/app`]
                },
                AttachStdout: true,
                AttachStderr: true,
                Tty: false,
            });
            yield container.start();
            const stream = yield container.logs({
                stdout: true,
                stderr: true,
                follow: true
            });
            let output = '';
            stream.on('data', (chunk) => {
                output += chunk.toString();
            });
            yield container.wait();
            yield container.remove();
            return output;
        }
        catch (error) {
            return `Error during execution: ${error.message}`;
        }
        finally {
            fs_1.default.unlinkSync(tempFilePath);
        }
    });
}
function executeCode_c_code(code) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Starting C Code Execution");
        const tempFilePath = path_1.default.join(__dirname, `code.c`);
        fs_1.default.writeFileSync(tempFilePath, code);
        console.log("File Write Complete");
        try {
            const container = yield docker.createContainer({
                Image: 'gcc',
                Cmd: ['sh', '-c', 'gcc /app/code.c -o /app/code && /app/code'],
                Volumes: {
                    '/app': {},
                },
                HostConfig: {
                    Binds: [`${path_1.default.dirname(tempFilePath)}:/app`],
                },
                AttachStdout: true,
                AttachStderr: true,
                Tty: false,
            });
            yield container.start();
            const stream = yield container.logs({
                stdout: true,
                stderr: true,
                follow: true,
            });
            let output = '';
            stream.on('data', (chunk) => {
                output += chunk.toString();
            });
            yield container.wait();
            yield container.remove();
            return output;
        }
        catch (error) {
            return `Error during execution: ${error.message}`;
        }
        finally {
            fs_1.default.unlinkSync(tempFilePath);
        }
    });
}
function executeCode_go_code(code) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Starting Go Code Execution");
        const tempFilePath = path_1.default.join(__dirname, `code.go`);
        fs_1.default.writeFileSync(tempFilePath, code);
        console.log("File Write Complete");
        try {
            const container = yield docker.createContainer({
                Image: 'golang',
                Cmd: ['go', 'run', `/app/${path_1.default.basename(tempFilePath)}`],
                Volumes: {
                    '/app': {},
                },
                HostConfig: {
                    Binds: [`${path_1.default.dirname(tempFilePath)}:/app`],
                },
                AttachStdout: true,
                AttachStderr: true,
                Tty: false,
            });
            yield container.start();
            const stream = yield container.logs({
                stdout: true,
                stderr: true,
                follow: true,
            });
            let output = '';
            stream.on('data', (chunk) => {
                output += chunk.toString();
            });
            yield container.wait();
            yield container.remove();
            return output;
        }
        catch (error) {
            return `Error during execution: ${error.message}`;
        }
        finally {
            fs_1.default.unlinkSync(tempFilePath);
        }
    });
}
function executeCode_java_code(code) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Starting Java Code Execution");
        const tempFilePath = path_1.default.join(__dirname, `Main.java`);
        fs_1.default.writeFileSync(tempFilePath, code);
        console.log("File Write Complete");
        try {
            const container = yield docker.createContainer({
                Image: 'openjdk',
                Cmd: ['sh', '-c', 'javac /app/Main.java && java -cp /app Main'],
                Volumes: {
                    '/app': {},
                },
                HostConfig: {
                    Binds: [`${path_1.default.dirname(tempFilePath)}:/app`],
                },
                AttachStdout: true,
                AttachStderr: true,
                Tty: false,
            });
            yield container.start();
            const stream = yield container.logs({
                stdout: true,
                stderr: true,
                follow: true,
            });
            let output = '';
            stream.on('data', (chunk) => {
                output += chunk.toString();
            });
            yield container.wait();
            yield container.remove();
            return output;
        }
        catch (error) {
            return `Error during execution: ${error.message}`;
        }
        finally {
            fs_1.default.unlinkSync(tempFilePath);
        }
    });
}
