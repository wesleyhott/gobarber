import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';


// import User from './app/models/User';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

import authMiddleware from './app/middlewares/auth'
const routes = new Router();
const upload = multer(multerConfig);

// routes.get('/', (req, res) => {
//   return res.json({ message: 'hello world' });
// });
// routes.get('/', async (req, res) => {
//   const user = await User.create({
//     name: 'Wesley',
//     email: 'wesley.hott@gmail.com',
//     password_hash: '1231242q31234',
//   });
//   return res.json(user);
// });
routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware); // somente as rotas que vem depois usam esse middleware
routes.put('/users', UserController.update);
routes.post('/files', upload.single('file'), (req, res) => {
    return res.json({ ok: true });
})

export default routes;