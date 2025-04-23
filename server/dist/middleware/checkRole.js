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
exports.checkRole = void 0;
const User_1 = __importDefault(require("../models/User"));
const checkRole = (role) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (!req.user) {
                return res.status(401).json({ message: 'Not authorized' });
            }
            const user = yield User_1.default.findById(req.user._id);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            if (user.role !== role) {
                return res.status(403).json({ message: 'Access denied' });
            }
            next();
        }
        catch (error) {
            res.status(500).json({ message: 'Server error' });
        }
    });
};
exports.checkRole = checkRole;
