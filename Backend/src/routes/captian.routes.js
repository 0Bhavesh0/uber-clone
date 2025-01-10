import express from 'express';
import { getCaptainProfile, loginCaptain, logoutCaptain, registerCaptain } from '../controllers/captain.controller.js';
import { authCaptain } from '../middlewares/auth.middleware.js';

const router = express.Router()


router.post('/register', registerCaptain)
router.post('/login', loginCaptain)
router.get('/profile', authCaptain, getCaptainProfile)
router.get('/logout', authCaptain, logoutCaptain)



export default router