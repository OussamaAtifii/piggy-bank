import { NextFunction, Request, Response } from 'express';
import Tag from '../models/Tag';
import Bank from '../models/Bank';

export default async function tagMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const id = Number(req.params.id);
  const userId = req.session.user?.id;

  try {
    if (!id) {
      return res.status(400).json({ message: 'Invalid tag id' });
    }

    const tag = await Tag.getTagById(Number(id));

    if (!tag) {
      return res.status(404).json({ message: 'Tag not found' });
    }

    const bank = await Bank.getById(tag.bankId);

    // Check if the session user is the owner of the bank
    if (bank.userId !== Number(userId)) {
      return res.status(403).json({
        message: 'You do not have permission to perform this action',
      });
    }

    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message:
        'An unexpected error occurred while processing the tag request. Please try again later.',
    });
  }
}
