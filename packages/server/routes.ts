import express from 'express';
import { login, registration, token } from './controllers/authentication.ts';
import { users, user } from './controllers/user.ts';

const router = express.Router();

router.post('/login', login);
router.post('/registration', registration);
router.get('/users', token, users);
router.get('/user', token, user);

export default router;