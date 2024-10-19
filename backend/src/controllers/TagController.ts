import { Request, Response } from 'express';
import Bank from '../models/Bank';
import Tag from '../models/Tag';
import { baseTagSchema, tagUpdateSchema } from '../validations/TagSchema';
import { z } from 'zod';

class TagController {
  static async getBankTags(req: Request, res: Response) {
    const id = Number(req.params.id);

    if (!id) {
      return res.status(400).json({ message: 'Invalid bank id' });
    }

    const bank = await Bank.getById(id);

    if (!bank) {
      return res.status(404).json({ message: 'Bank not found' });
    }

    const bankTags = await Tag.getBankTags(id);

    return res.json(bankTags);
  }

  static async createTag(req: Request, res: Response) {
    const data = req.body;
    const userId = req.session.user?.id;

    try {
      const validateTag = baseTagSchema.parse(data);
      const existingBank = await Bank.getById(validateTag.bankId);

      if (!existingBank) {
        return res.status(404).json({ message: 'Bank not found' });
      }

      if (existingBank.userId !== Number(userId)) {
        return res.status(403).json({
          message: 'You do not have permission to perform this action',
        });
      }

      const existingTag = await Tag.getTagByName(
        validateTag.name,
        validateTag.bankId
      );

      if (existingTag) {
        return res.status(409).json({ message: 'Tag already exists' });
      }

      const tag = await Tag.createTag(validateTag);

      return res.status(201).json({
        message: 'Tag created successfully',
        tag,
      });
    } catch (error) {
      console.error(error);

      if (error instanceof z.ZodError) {
        const errorMessages = error.errors.map((err) => err.message);
        return res.status(400).json({ error: errorMessages });
      }

      return res.status(500).json({ message: 'Error creating tag' });
    }
  }

  static async updateTag(req: Request, res: Response) {
    const data = req.body;
    const id = req.params.id;

    try {
      const validateTag = tagUpdateSchema.parse(data);
      const tag = await Tag.updateTag(Number(id), validateTag);

      return res.json({ message: 'Tag updated successfully', tag });
    } catch (error) {
      console.error(error);

      if (error instanceof z.ZodError) {
        const errorMessages = error.errors.map((err) => err.message);
        return res.status(400).json({ error: errorMessages });
      }

      return res.status(500).json({ message: 'Error updating tag' });
    }
  }

  static async deleteTag(req: Request, res: Response) {
    const id = req.params.id;

    try {
      await Tag.deleteTag(Number(id));
      return res.json({ message: 'Tag deleted successfully' });
    } catch (error) {
      console.error(error);

      if (error instanceof z.ZodError) {
        const errorMessages = error.errors.map((err) => err.message);
        return res.status(400).json({ error: errorMessages });
      }

      return res.status(500).json({ message: 'Error deleting tag' });
    }
  }
}

export default TagController;
