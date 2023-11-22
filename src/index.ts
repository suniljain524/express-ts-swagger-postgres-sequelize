// src/index.ts
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import bodyParser from 'body-parser';
import * as swaggerDocument from '../swagger.json';

import userRoutes from './routes/userRoutes';
import { Sequelize } from 'sequelize-typescript';
import { User } from './models/User';

import * as OpenApiValidator from 'express-openapi-validator';
import path from 'path';


console.log(`__dirname=`, __dirname);


const app = express();

app.use(bodyParser.json());

app.use(
    OpenApiValidator.middleware(
        {
            apiSpec: path.resolve(__dirname, '../swagger.json'), // Provide the path to your OpenAPI spec file
            validateRequests: true, // Enable request validation
            validateResponses: true, // Enable response validation
        }
    ));

const port = 3000;

// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));




// Initialize Sequelize instance
const sequelize =
    new Sequelize({
        "username": "postgres",
        "password": "mysecretpassword",
        "database": "sj_test",
        "host": "127.0.0.1",
        "dialect": "postgres"
    });

// Add models to Sequelize instance
sequelize.addModels([User]);  // Make sure to import your User model

// Use user routes
app.use('/users', userRoutes);


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.use((err: any, req: any, res: any, next: any) => {
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

