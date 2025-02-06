"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.boilerPlateRouter = void 0;
const express_1 = __importDefault(require("express"));
const jwt_1 = require("../utils/jwt");
const boilerplateController_1 = require("../controllers/boilerplateController");
exports.boilerPlateRouter = express_1.default.Router();
exports.boilerPlateRouter.post("/create", [jwt_1.verifyToken, jwt_1.checkRole], boilerplateController_1.createBoilerPlate);
