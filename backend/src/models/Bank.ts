import { and, eq } from 'drizzle-orm';
import { db } from '../db';
import { banksTable, InsertBank } from '../db/schema';

class Bank {
  static async getAllUserBanks(userId: number) {
    const userBanks = await db
      .select()
      .from(banksTable)
      .where(eq(banksTable.userId, userId));

    return userBanks;
  }

  static async create(data: InsertBank) {
    const [bank] = await db.insert(banksTable).values(data).returning();
    return bank;
  }

  static async getByName(userId: number, bankName: string) {
    const [bank] = await db
      .select()
      .from(banksTable)
      .where(and(eq(banksTable.userId, userId), eq(banksTable.name, bankName)));

    return bank;
  }

  static async getById(id: number) {
    const [bank] = await db
      .select()
      .from(banksTable)
      .where(eq(banksTable.id, id));

    return bank;
  }
}

export default Bank;
