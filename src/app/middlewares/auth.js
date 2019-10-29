import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import authConfig from '../../config/auth';

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token not provided' });
  }

  // estratégia de pegar a segunda parte do array é começar com uma vírgula
  const [, token] = authHeader.split(' ');

  /**
   * jwt.verify usa o método de callback, a biblioteca promisify do note transforma
   * o jeito de callback em promises. A ideia é pegar a funçao que usa callback e passar no
   * primiero parâmetro, o retorno da função deve ser passado no segundo parâmetro
   */
  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);
    req.userId = decoded.id; // decoded tem as três partes decodificadas
    return next();
  } catch (err) {
    res.status(401).json({ error: 'Token invalid' });
  }

  return next();
};
