import { Router } from 'express'
import { register } from '../controllers/registerController'

const router = Router();
router.post("/signin", register);

export default router;