import type { Request, Response } from 'express';
import userSchema from '../models/user.ts';
import jwt, { type JwtPayload } from 'jsonwebtoken';

export const users = async (req: Request, res: Response) => {
  const { qty } = req.query;

  if (!qty) return res.sendStatus(400);

  let numberOfUsers = Number(qty);

  if (numberOfUsers > 10) numberOfUsers = 10;
  if (numberOfUsers < 1) numberOfUsers = 1;

  try {
    const users =  await userSchema
      .find({}, { _id: 0, email: 1, created_date: 1 }, { limit: numberOfUsers})
      .sort([['created_date', 'desc']]);

    return res.json(users);
  } catch (error) {
    console.error(error)
  }
};

export const user = async (req: Request, res: Response) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, user: JwtPayload) => {
    if (err) return res.sendStatus(403);

    try {
      const {email} = user;
      const userData = await userSchema.findOne({email}, {_id: 0, email: 1, created_date: 1});

      if (!userData) res.sendStatus(403);

      return res.json(userData);
    } catch (error) {
      console.error(error);
    }
  })
};
