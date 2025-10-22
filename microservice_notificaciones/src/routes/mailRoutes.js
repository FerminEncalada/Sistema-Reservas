import { Router } from 'express';
import { sendMail } from '../controllers/mailController.js';

const router = Router();

router.post('/send', sendMail);

export default router;
