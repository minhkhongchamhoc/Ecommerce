"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const User_1 = __importDefault(require("./models/User"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
// Load environment variables
dotenv_1.default.config();
class SeedData {
    static connectToDatabase() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield mongoose_1.default.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce');
                console.log('Connected to MongoDB');
            }
            catch (error) {
                console.error('Error connecting to MongoDB:', error);
                process.exit(1);
            }
        });
    }
    static seedUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Read users data from JSON file
                const dataPath = path.join(__dirname, 'data', 'users.json');
                const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
                for (const userData of data.users) {
                    // Check if user already exists
                    const existingUser = yield User_1.default.findOne({ email: userData.email });
                    if (existingUser) {
                        console.log(`User ${userData.email} already exists`);
                        continue;
                    }
                    // Create user
                    const user = new User_1.default({
                        email: userData.email,
                        password: userData.password,
                        role: userData.role
                    });
                    yield user.save();
                    console.log(`User ${userData.email} created successfully`);
                }
            }
            catch (error) {
                console.error('Error seeding users:', error);
                process.exit(1);
            }
        });
    }
    static seed() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.connectToDatabase();
                yield this.seedUsers();
                console.log('Seeding completed successfully');
                process.exit(0);
            }
            catch (error) {
                console.error('Error during seeding:', error);
                process.exit(1);
            }
        });
    }
}
// Run seeding
SeedData.seed();
