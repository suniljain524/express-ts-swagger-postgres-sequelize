// __tests__/userController.test.ts
import request from 'supertest';
import express from 'express';
import { Sequelize } from 'sequelize-typescript';
import bodyParser from 'body-parser';
import { User } from '../src/models/User';
import userRoutes from '../src/routes/userRoutes';

const app = express();

// Initialize Sequelize instance
const sequelize = new Sequelize({
    // Your Sequelize configuration
});

// Add models to Sequelize instance
sequelize.addModels([User]);

app.use(bodyParser.json());

// Use user routes
app.use('/users', userRoutes);

describe('User Controller Tests', () => {
    beforeAll(async () => {
        // Sync the database before running tests
        await sequelize.sync({ force: true });
    });

    it('should create a new user', async () => {
        const response = await request(app)
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
    });

    it('should return an error for missing parameters', async () => {
        const response = await request(app)
            .post('/users')
            .send({
                // Missing required parameters
            });

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error', 'Missing required parameters');
    });
});
