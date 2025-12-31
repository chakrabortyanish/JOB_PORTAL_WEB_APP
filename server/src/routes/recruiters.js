import express from 'express';

import { handleRecruiterRegistration, handleRecruiterLogin } from '../controllers/recruiter.js';

import {upload} from '../middlewares/upload.js';

const router = express.Router();

router.post('/register',upload.single("companyImage"), handleRecruiterRegistration);
router.post('/login', handleRecruiterLogin);

export default router;