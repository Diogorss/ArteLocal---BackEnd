
import express from 'express';
import artController from '../controller/art.controller.js';
import verifyToken from '../middleware/jwt.token.middleware.js'; 



const router = express.Router();

// Public routes
router.get('/', artController.getAllArts); // Get all arts
router.get('/:id', artController.getArtById); // Get a specific art by ID

// Protected routes (require authentication)
router.post('/', verifyToken, artController.createArt); 
router.put('/:id', verifyToken, artController.updateArt); 
router.delete('/:id', verifyToken, artController.deleteArt); 


export default router;

