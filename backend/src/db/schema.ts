import { relations, sql } from 'drizzle-orm';
import { integer, real, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const usersTable = sqliteTable('users', {
  id: integer('id').primaryKey(),
  username: text('username').unique().notNull(),
  firstName: text('first_name'),
  lastName: text('last_name'),
  email: text('email').unique().notNull(),
  password: text('password').notNull(),
  avatar: text('avatar').notNull().default('default.jpg'),
  role: text('role').notNull().default('user'),
  createdAt: text('created_at')
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text('updated_at')
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});

export type InsertUser = typeof usersTable.$inferInsert;
export type SelectUser = typeof usersTable.$inferSelect;

export const usersRelations = relations(usersTable, ({ many }) => ({
  banks: many(banksTable),
}));

export const banksTable = sqliteTable('banks', {
  id: integer('id').primaryKey(),
  name: text('name').notNull(),
  totalSavings: real('total_savings').notNull().default(0),
  description: text('description'),
  goal: real('goal').notNull().default(0),
  visibility: integer('visibility', { mode: 'boolean' }).default(true),
  userId: integer('user_id').notNull(),
  createdAt: text('created_at')
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text('updated_at')
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});

export type InsertBank = typeof banksTable.$inferInsert;
export type SelectBank = typeof banksTable.$inferSelect;

export const banksRelations = relations(banksTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [banksTable.userId],
    references: [usersTable.id],
  }),
}));
