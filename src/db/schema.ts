import { index, integer, real, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const meals = ['breakfast', 'lunch', 'dinner', 'snacks'] as const;
export const units = ['g', 'ml'] as const;
export const productSources = ['off', 'label', 'manual'] as const;
export const portionKinds = ['amount', 'serving', 'package'] as const;

const timestamps = () => ({
  createdAt: integer({ mode: 'timestamp_ms' })
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: integer({ mode: 'timestamp_ms' })
    .notNull()
    .$defaultFn(() => new Date())
    .$onUpdateFn(() => new Date()),
});

export const products = sqliteTable(
  'products',
  {
    id: integer().primaryKey({ autoIncrement: true }),
    name: text().notNull(),
    brand: text(),
    barcode: text().unique(),
    source: text({ enum: productSources }).notNull(),
    unit: text({ enum: units }).notNull(),

    // Nutrition Facts per 100 g or ml
    kcal: real().notNull(),
    protein: real().notNull(),
    carbs: real().notNull(),
    fat: real().notNull(),
    sugars: real(),
    saturatedFat: real(),
    fibre: real(),
    salt: real(),

    servingSize: real(),
    servingLabel: text(),
    packageSize: real(),
    labelPhotoPath: text(),

    lastUsedAt: integer({ mode: 'timestamp_ms' }),
    ...timestamps(),
  },
  (table) => [index('products_name_idx').on(table.name), index('products_last_used_at_idx').on(table.lastUsedAt)],
);

export const logEntries = sqliteTable(
  'log_entries',
  {
    id: integer().primaryKey({ autoIncrement: true }),
    date: text().notNull(),
    meal: text({ enum: meals }).notNull(),
    productId: integer().references(() => products.id, { onDelete: 'set null' }),
    name: text().notNull(),

    // Portion, empty for a Quick Entry
    portionKind: text({ enum: portionKinds }),
    portionValue: real(),
    amount: real(),
    unit: text({ enum: units }),

    // Copy of the Product's Nutrition Facts per 100 at logging time, empty for a Quick Entry
    kcalPer100: real(),
    proteinPer100: real(),
    carbsPer100: real(),
    fatPer100: real(),
    sugarsPer100: real(),
    saturatedFatPer100: real(),
    fibrePer100: real(),
    saltPer100: real(),
    servingSize: real(),
    packageSize: real(),

    kcal: real().notNull(),
    protein: real(),
    carbs: real(),
    fat: real(),

    ...timestamps(),
  },
  (table) => [index('log_entries_date_idx').on(table.date)],
);

export const dailyGoals = sqliteTable('daily_goals', {
  id: integer().primaryKey({ autoIncrement: true }),
  startsOn: text().notNull().unique(),
  kcal: real().notNull(),
  proteinG: real().notNull(),
  carbsG: real().notNull(),
  fatG: real().notNull(),
  ...timestamps(),
});

export type Meal = (typeof meals)[number];
export type Product = typeof products.$inferSelect;
export type LogEntry = typeof logEntries.$inferSelect;
export type DailyGoal = typeof dailyGoals.$inferSelect;
