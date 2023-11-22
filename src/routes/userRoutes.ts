// src/routes/userRoutes.ts
import express from 'express';
import { User } from '../models/User';
import { createUser } from '../controllers/userController';

const router = express.Router();

/**
 * @swagger
 * /users:
 *   get:
 *     description: Get all users
 *     responses:
 *       200:
 *         description: Successful response
 */
router.get('/', async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});


// Define route to create a user
router.post('/', createUser);


// Define other user routes and controllers here

export default router;
