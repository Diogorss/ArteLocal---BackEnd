
import Art from '../models/Art.js';
import User from '../models/User.js'; // Import User model if needed for associations

const artController = {
  // GET /arts - Retrieve all arts
  getAllArts: async (req, res) => {
    try {
      const arts = await Art.findAll({
        include: [{ model: User, as: 'author', attributes: ['id', 'name', 'email'] }] // Include author details
      });
      res.status(200).json(arts);
    } catch (error) {
      console.error('Error fetching arts:', error);
      res.status(500).json({ message: 'Error fetching arts', error: error.message });
    }
  },

  // GET /arts/:id - Retrieve a specific art by ID
  getArtById: async (req, res) => {
    try {
      const art = await Art.findByPk(req.params.id, {
        include: [{ model: User, as: 'author', attributes: ['id', 'name', 'email'] }]
      });
      if (!art) {
        return res.status(404).json({ message: 'Art not found' });
      }
      res.status(200).json(art);
    } catch (error) {
      console.error('Error fetching art by ID:', error);
      res.status(500).json({ message: 'Error fetching art by ID', error: error.message });
    }
  },

  // POST /arts - Create a new art (requires authentication)
  createArt: async (req, res) => {
    try {
      const { title, description, imageUrl } = req.body;
      const userId = req.userId; // Assumes authMiddleware adds userId to req

      if (!title || !imageUrl) {
        return res.status(400).json({ message: 'Title and imageUrl are required' });
      }

      const newArt = await Art.create({
        title,
        description,
        imageUrl,
        userId, // Associate art with the logged-in user
      });

      // Optionally fetch the created art with author details
      const createdArtWithAuthor = await Art.findByPk(newArt.id, {
          include: [{ model: User, as: 'author', attributes: ['id', 'name', 'email'] }]
      });

      res.status(201).json(createdArtWithAuthor);
    } catch (error) {
      console.error('Error creating art:', error);
      res.status(500).json({ message: 'Error creating art', error: error.message });
    }
  },

  // PUT /arts/:id - Update an art (requires authentication and ownership)
  updateArt: async (req, res) => {
    try {
      const { title, description, imageUrl } = req.body;
      const artId = req.params.id;
      const userId = req.userId; // Assumes authMiddleware adds userId to req

      const art = await Art.findByPk(artId);

      if (!art) {
        return res.status(404).json({ message: 'Art not found' });
      }

      // Authorization check: Ensure the user owns the art
      if (art.userId !== userId) {
        return res.status(403).json({ message: 'Forbidden: You do not own this art' });
      }

      // Update the art
      art.title = title ?? art.title; // Use nullish coalescing to update only provided fields
      art.description = description ?? art.description;
      art.imageUrl = imageUrl ?? art.imageUrl;

      await art.save();

      // Optionally fetch the updated art with author details
       const updatedArtWithAuthor = await Art.findByPk(art.id, {
          include: [{ model: User, as: 'author', attributes: ['id', 'name', 'email'] }]
      });

      res.status(200).json(updatedArtWithAuthor);
    } catch (error) {
      console.error('Error updating art:', error);
      res.status(500).json({ message: 'Error updating art', error: error.message });
    }
  },

  // DELETE /arts/:id - Delete an art (requires authentication and ownership)
  deleteArt: async (req, res) => {
    try {
      const artId = req.params.id;
      const userId = req.userId; // Assumes authMiddleware adds userId to req

      const art = await Art.findByPk(artId);

      if (!art) {
        return res.status(404).json({ message: 'Art not found' });
      }

      // Authorization check: Ensure the user owns the art
      if (art.userId !== userId) {
        return res.status(403).json({ message: 'Forbidden: You do not own this art' });
      }

      await art.destroy();
      res.status(204).send(); // No content response for successful deletion
    } catch (error) {
      console.error('Error deleting art:', error);
      res.status(500).json({ message: 'Error deleting art', error: error.message });
    }
  },
};

export default artController;

