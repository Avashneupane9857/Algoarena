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
exports.createBoilerPlate = void 0;
const prisma_1 = __importDefault(require("../utils/prisma"));
const createBoilerPlate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { code, languageId } = req.body;
        if (!code || !languageId) {
            return res.status(404).json({
                message: "creds not found",
            });
        }
        const boilerPlate = yield prisma_1.default.boilerplate.create({
            data: {
                code: code,
                languageId: languageId,
            },
        });
        if (!boilerPlate) {
            return res.status(401).json({
                message: "couldnt create the boilerplate",
            });
        }
        return res.status(200).json({
            message: `${boilerPlate.id} is created`,
            data: [boilerPlate],
        });
    }
    catch (error) {
        return res.status(400).json({
            message: error,
        });
    }
});
exports.createBoilerPlate = createBoilerPlate;
