import type {NextFunction, Request, Response} from 'express';
import userSchema from '../models/user.ts';
import bcrypt from 'bcrypt';
import jwt, { type JwtPayload } from 'jsonwebtoken';

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user =  await userSchema.findOne({ email });

    if (!user) return res.json(409);

    const match = await bcrypt.compare(password, user.password);

    if (!match) return res.json(409);

    return res.json({
      token: jwt.sign({ email }, process.env.ACCESS_TOKEN_SECRET),
    });
  } catch (error) {
    console.error(error)
  }

  res.sendStatus(200);
};

export const registration = async (req: Request, res: Response) => {
  const { email, password, passwordRepeat } = req.body;
  const isAllFieldsNotEmpty = email && password && passwordRepeat;

  if (password !== passwordRepeat || !isAllFieldsNotEmpty) return res.sendStatus(400);

  try {
    const isUserExist = await userSchema.exists({ email });

    if (isUserExist) return res.json(409);

    const hashPassword = await bcrypt.hash(password, 10);

    await userSchema.create({ email, password: hashPassword });

    return res.json(200);
  } catch (error) {
    console.error(error);
  }
};

export const token = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, user: JwtPayload) => {
    if (err) return res.sendStatus(403);

    try {
      const { email } = user;
      const userData = await userSchema.findOne({ email });

      if (!userData) res.sendStatus(403);

      next();
    } catch (error) {
      console.error(error);
    }
  });
}
