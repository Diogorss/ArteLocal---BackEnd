
import express from 'express';
import artController from '../controller/art.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js'; // Assuming auth middleware exists

const router = express.Router();

// Public routes
router.get('/', artController.getAllArts); // Get all arts
router.get('/:id', artController.getArtById); // Get a specific art by ID

// Protected routes (require authentication)
router.post('/', authMiddleware, artController.createArt); // Create a new art
router.put('/:id', authMiddleware, artController.updateArt); // Update an art (requires ownership)
router.delete('/:id', authMiddleware, artController.deleteArt); // Delete an art (requires ownership)

export default router;

