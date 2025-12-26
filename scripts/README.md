# Database Migration Scripts

## Schema Synchronization

The `sync-schema.ts` script automatically synchronizes your database schema with the Drizzle schema definition. It compares the columns defined in `db/schema.ts` with the actual database columns and adds any missing ones.

### Usage

```bash
# Using npm script (recommended)
npm run db:sync

# Or directly with tsx
npx tsx scripts/sync-schema.ts
```

### What it does

1. ✅ Checks if the `okataxis_orders` table exists
2. ✅ Reads all existing columns from the database
3. ✅ Compares with the schema definition in `db/schema.ts`
4. ✅ Adds any missing columns with the correct data types
5. ✅ Skips columns that already exist (safe to run multiple times)

### Benefits

- **Scalable**: Run anytime to ensure database matches schema
- **Safe**: Only adds missing columns, never modifies existing ones
- **Idempotent**: Can be run multiple times without issues
- **Automatic**: No manual SQL needed

### When to use

- After adding new columns to `db/schema.ts`
- When deploying to a new environment
- To fix schema drift between environments
- As part of your deployment process

### Alternative: Drizzle Kit Push

You can also use Drizzle Kit's push command:

```bash
npm run db:push
```

This uses `drizzle-kit push` which is more interactive but requires manual confirmation for each change.

