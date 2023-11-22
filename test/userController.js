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
// __tests__/userController.test.ts
const supertest_1 = __importDefault(require("supertest"));
const express_1 = __importDefault(require("express"));
const sequelize_typescript_1 = require("sequelize-typescript");
const body_parser_1 = __importDefault(require("body-parser"));
const User_1 = require("../src/models/User");
const userRoutes_1 = __importDefault(require("../src/routes/userRoutes"));
const app = (0, express_1.default)();
// Initialize Sequelize instance
const sequelize = new sequelize_typescript_1.Sequelize({
// Your Sequelize configuration
});
// Add models to Sequelize instance
sequelize.addModels([User_1.User]);
app.use(body_parser_1.default.json());
// Use user routes
app.use('/users', userRoutes_1.default);
describe('User Controller Tests', () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        // Sync the database before running tests
        yield sequelize.sync({ force: true });
    }));
    it('should create a new user', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app)
            .post('/users')
            .send({
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@example.com',
        });
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
        expect(response.body.firstName).toBe('John');
        expect(response.body.lastName).toBe('Doe');
        expect(response.body.email).toBe('john.doe@example.com');
    }));
    it('should return an error for missing parameters', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app)
            .post('/users')
            .send({
        // Missing required parameters
        });
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error', 'Missing required parameters');
    }));
});
