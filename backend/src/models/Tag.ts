import { and, eq } from 'drizzle-orm';
import { db } from '../db';
import { InsertTag, SelectTag, tagsTable } from '../db/schema';

class Tag {
  static async getBankTags(bankId: number) {
    const tags = await db
      .select()
      .from(tagsTable)
      .where(eq(tagsTable.bankId, bankId));

    return tags;
  }

  static async getTagByName(name: string, bankId: number) {
    const [tag] = await db
      .select()
      .from(tagsTable)
      .where(and(eq(tagsTable.name, name), eq(tagsTable.bankId, bankId)));

    return tag;
  }

  static async getTagById(tagId: number) {
    const [tag] = await db
      .select()
      .from(tagsTable)
      .where(eq(tagsTable.id, tagId));

    return tag;
  }

  static async createTag(data: InsertTag) {
    const [tag] = await db.insert(tagsTable).values(data).returning();
    return tag;
  }

  static async updateTag(tagId: number, data: Partial<Omit<SelectTag, 'id'>>) {
    const [tag] = await db
      .update(tagsTable)
      .set(data)
      .where(eq(tagsTable.id, tagId))
      .returning();
    return tag;
  }

  static async deleteTag(tagId: number) {
    await db.delete(tagsTable).where(eq(tagsTable.id, tagId));
  }
}

export default Tag;
