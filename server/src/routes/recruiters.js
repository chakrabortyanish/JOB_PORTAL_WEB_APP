import express from 'express';
import { verifyToken } from '../middlewares/auth.js';

import { handleRecruiterRegistration, handleRecruiterLogin, handleRecruiterEdit } from '../controllers/recruiter.js';

import {upload} from '../middlewares/upload.js';

const router = express.Router();

router.post('/register',upload.single("companyImage"), handleRecruiterRegistration);
router.post('/login', handleRecruiterLogin);
router.put('/editprofile', verifyToken, handleRecruiterEdit);

export default router;