import { Request, Response } from 'express';
import User from '../models/User';
import {
  userRegisterSchema,
  userLoginSchema,
  userProfileUpdateSchema,
} from '../validations/UserSchema';
import { z } from 'zod';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { JWT_SECRET_KEY } from '../config/config';

class UserController {
  static async getAllUsers(req: Request, res: Response) {
    try {
      const users = await User.getAll();

      return res.status(200).json(users);
    } catch (error) {
      console.error(error);

      if (error instanceof z.ZodError) {
        const errorMessages = error.errors.map((err) => err.message);
        return res.status(400).json({ error: errorMessages });
      }

      return res.status(500).json({ message: 'Error fetching users' });
    }
  }

  static async getUserById(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const user = await User.getById(Number(id));

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      return res.status(200).json(user);
    } catch (error) {
      console.error(error);

      if (error instanceof z.ZodError) {
        const errorMessages = error.errors.map((err) => err.message);
        return res.status(400).json({ error: errorMessages });
      }

      return res.status(500).json({ message: 'Error fetching user' });
    }
  }

  static async register(req: Request, res: Response) {
    const data = req.body;
    let error = [];

    try {
      const validatedUser = userRegisterSchema.parse(data);
      const usernameExist = await User.getByUsername(validatedUser.username);
      const emailExist = await User.getByEmail(validatedUser.email);

      if (usernameExist) {
        error.push('Username already exists');
      }

      if (emailExist) {
        error.push('Email already exists');
      }

      if (error.length > 0) {
        return res.status(409).json({ error });
      }

      const saltRounds = 10;
      const hassedPassword = await bcrypt.hash(
        validatedUser.password,
        saltRounds
      );

      validatedUser.password = hassedPassword;

      const user = await User.create(validatedUser);
      const { password, ...userWithoutPassword } = user;

      const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        JWT_SECRET_KEY,
        {
          expiresIn: '1h',
        }
      );

      return res
        .status(201)
        .cookie('token', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'none',
          maxAge: 3600000,
        })
        .json(userWithoutPassword);
    } catch (error) {
      console.error(error);

      if (error instanceof z.ZodError) {
        const errorMessages = error.errors.map((err) => err.message);
        return res.status(400).json({ error: errorMessages });
      }

      return res.status(500).json({ message: 'Error updating user' });
    }
  }

  static async login(req: Request, res: Response) {
    const data = req.body;
    const password = req.body.password;
    try {
      const validatedUser = userLoginSchema.parse(data);
      const userExist = await User.getByEmail(validatedUser.email);
      const passwordCorrect =
        userExist === null
          ? false
          : await bcrypt.compare(password, userExist.password);

      if (!(userExist && passwordCorrect)) {
        return res
          .status(401)
          .json({ error: true, message: 'invalid user or password' });
      }
      const token = jwt.sign(
        { id: userExist.id, email: userExist.email, role: userExist.role },
        JWT_SECRET_KEY,
        {
          expiresIn: '1h',
        }
      );
      return res
        .status(200)
        .cookie('token', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'none',
          maxAge: 3600000,
        })
        .json({ message: 'User logged in' });
    } catch (error) {
      console.error(error);
      if (error instanceof z.ZodError) {
        const errorMessages = error.errors.map((err) => err.message);
        return res.status(400).json({ error: errorMessages });
      }
      return res.status(500).json({ message: 'Error on login' });
    }
  }

  static async updateUser(req: Request, res: Response) {
    const { id } = req.params;
    const data = req.body;

    try {
      const validatedUser = userProfileUpdateSchema.parse(data);
      const user = await User.update(Number(id), validatedUser);
      const { password, ...userWithoutPassword } = user;

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      return res.status(200).json(userWithoutPassword);
    } catch (error) {
      console.error(error);

      if (error instanceof z.ZodError) {
        const errorMessages = error.errors.map((err) => err.message);
        return res.status(400).json({ error: errorMessages });
      }

      return res.status(500).json({ message: 'Error updating user' });
    }
  }

  static async deleteUser(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const user = await User.delete(Number(id));

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      return res.status(204).send();
    } catch (error) {
      console.error(error);

      if (error instanceof z.ZodError) {
        const errorMessages = error.errors.map((err) => err.message);
        return res.status(400).json({ error: errorMessages });
      }

      return res.status(500).json({ message: 'Error deleting user' });
    }
  }
}

export default UserController;
