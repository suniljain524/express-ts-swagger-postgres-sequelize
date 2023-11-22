// src/controllers/userController.ts
import { Request, Response } from 'express';
import { User } from '../models/User';

export const createUser = async (req: Request, res: Response): Promise<void> => {
    try {
        console.log('Request body:', req.body);

        const { firstName, lastName, email } = req.body;

        // Validate request parameters (you might want to add more validation)
        if (!firstName || !lastName || !email) {
            res.status(400).json({ error: 'Missing required parameters' });
            return;
        }

        // Create a new user using the static method in the model
        const newUser = await User.createUser({
            firstName,
            lastName,
            email,
        });

        // Respond with the newly created user
        res.status(201).json(newUser);
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
