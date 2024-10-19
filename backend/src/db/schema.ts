import { relations, sql } from 'drizzle-orm';
import { integer, real, sqliteTable, text } from 'drizzle-orm/sqlite-core';

// Users table
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

// Users relations
export const usersRelations = relations(usersTable, ({ many }) => ({
  banks: many(banksTable),
}));

// -----------------------------------------------------------------------------
// Banks table
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

// Banks relations
export const banksRelations = relations(banksTable, ({ one, many }) => ({
  user: one(usersTable, {
    fields: [banksTable.userId],
    references: [usersTable.id],
  }),
  tags: many(tagsTable),
}));

// -----------------------------------------------------------------------------
// Tags table
export const tagsTable = sqliteTable('tags', {
  id: integer('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  color: text('color').notNull().default('#FFFFFF'),
  bankId: integer('bank_id').notNull(),
  createdAt: text('created_at')
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text('updated_at')
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});

export type InsertTag = typeof tagsTable.$inferInsert;
export type SelectTag = typeof tagsTable.$inferSelect;

// Tags relations
export const tagsRelations = relations(tagsTable, ({ one }) => ({
  bank: one(banksTable, {
    fields: [tagsTable.bankId],
    references: [banksTable.id],
  }),
}));
