import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

// import User from './app/models/User';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import ProviderController from './app/controllers/ProviderController';
import AppointmentController from './app/controllers/AppointmentController';

import authMiddleware from './app/middlewares/auth';

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
routes.post('/files', upload.single('file'), FileController.store);
routes.get('/providers', ProviderController.index);
routes.post('/appointments', AppointmentController.store);
routes.get('/appointments', AppointmentController.index);

export default routes;
