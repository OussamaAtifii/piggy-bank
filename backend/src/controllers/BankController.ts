import { Request, Response } from 'express';
import Bank from '../models/Bank';
import { baseBankSchema } from '../validations/BankSchema';
import { z } from 'zod';

class BankController {
  static async getAllUserBanks(req: Request, res: Response) {
    try {
      const userId = req.session.user?.id;
      const userBanks = await Bank.getAllUserBanks(Number(userId));

      return res.status(200).json(userBanks);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error fetching user banks' });
    }
  }

  static async createBank(req: Request, res: Response) {
    const data = req.body;
    const userId = req.session.user?.id;

    try {
      const validateBank = baseBankSchema.parse({ ...data, userId });
      const existingBank = await Bank.getByName(
        Number(userId),
        validateBank.name
      );

      if (existingBank) {
        return res.status(409).json({ message: 'Bank already exists' });
      }

      const bank = await Bank.create(validateBank);
      return res.json({ message: 'Bank created successfully', bank });
    } catch (error) {
      console.error(error);

      if (error instanceof z.ZodError) {
        const errorMessages = error.errors.map((err) => err.message);
        return res.status(400).json({ error: errorMessages });
      }

      return res.status(500).json({ message: 'Error creating bank' });
    }
  }
}

export default BankController;
