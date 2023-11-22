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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/index.ts
const express_1 = __importDefault(require("express"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const body_parser_1 = __importDefault(require("body-parser"));
const swaggerDocument = __importStar(require("../swagger.json"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const sequelize_typescript_1 = require("sequelize-typescript");
const User_1 = require("./models/User");
const OpenApiValidator = __importStar(require("express-openapi-validator"));
const path_1 = __importDefault(require("path"));
console.log(`__dirname=`, __dirname);
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use(OpenApiValidator.middleware({
    apiSpec: path_1.default.resolve(__dirname, '../swagger.json'), // Provide the path to your OpenAPI spec file
    validateRequests: true, // Enable request validation
    validateResponses: true, // Enable response validation
}));
const port = 3000;
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// Initialize Sequelize instance
const sequelize = new sequelize_typescript_1.Sequelize({
    "username": "postgres",
    "password": "mysecretpassword",
    "database": "sj_test",
    "host": "127.0.0.1",
    "dialect": "postgres"
});
// Add models to Sequelize instance
sequelize.addModels([User_1.User]); // Make sure to import your User model
// Use user routes
app.use('/users', userRoutes_1.default);
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocument));
app.use((err, req, res, next) => {
    // Custom error handling logic
    res.status(err.status || 500).json({
        error: {
            message: err.message,
        },
    });
});
const server = app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
// Handle graceful shutdown
// process.on('SIGTERM', () => {
//     console.log('Received SIGTERM. Closing server...');
//     // server.close(() => {
//     //     console.log('Server closed. Exiting process.');
//     //     // process.exit(0);
//     // });
// });
// process.on('SIGINT', () => {
//     console.log('Received SIGINT. Closing server...');
//     // server.close(() => {
//     //     console.log('Server closed. Exiting process.');
//     //     // process.exit(0);
//     // });
// });
// Handle unhandled rejections
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    // You might want to log the error or perform additional cleanup
    // Note: Exiting the process might not be necessary, but it depends on your use case
    // process.exit(1);
});
// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
    // You might want to log the error or perform additional cleanup
    // Note: Exiting the process might not be necessary, but it depends on your use case
    // process.exit(1);
});
