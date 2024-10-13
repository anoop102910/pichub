import express from 'express';
import { getImages, postImage, incrementViews } from '../controllers/image.controller.js';
const router = express.Router();
import authMiddleware from '../middleware/auth.middleware.js';

router.get('/', getImages);
router.post('/', authMiddleware, postImage);
router.put('/:id/inc-views', incrementViews);

export default router;
