import express from 'express';
import { getImages, postImage, incrementViews } from '../controllers/image.controller.js';
const router = express.Router();

router.get('/', getImages);
router.post('/', postImage);
router.put('/:id/inc-views', incrementViews);

export default router;
