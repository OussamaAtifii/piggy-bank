import { db } from '../db/index';
import { eq, or } from 'drizzle-orm';
import { InsertUser, SelectUser, usersTable } from '../db/schema';

class User {
  static async getAll() {
    const users = await db.select().from(usersTable);

    return users.map((user) => {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });
  }

  static async getById(id: number) {
    const user = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, id));

    if (!user.length) {
      return null;
    }

    const { password, ...userWithoutPassword } = user[0];
    return userWithoutPassword;
  }

  static async getByUsernameOrEmail(username: string | null, email: string) {
    const user =
      username === null
        ? await db
            .select()
            .from(usersTable)
            .where(or(eq(usersTable.email, email)))
        : await db
            .select()
            .from(usersTable)
            .where(
              or(eq(usersTable.username, username), eq(usersTable.email, email))
            );

    if (!user.length) {
      return null;
    }

    return user[0];
  }

  static async create(data: InsertUser) {
    const [user] = await db.insert(usersTable).values(data).returning();
    return user;
  }

  static async update(id: number, data: Partial<Omit<SelectUser, 'id'>>) {
    const [user] = await db
      .update(usersTable)
      .set(data)
      .where(eq(usersTable.id, id))
      .returning();

    return user;
  }

  static async delete(id: number) {
    const [user] = await db
      .delete(usersTable)
      .where(eq(usersTable.id, id))
      .returning();
    return user;
  }
}

export default User;
