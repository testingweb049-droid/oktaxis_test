import { config } from "dotenv";
import { neon } from "@neondatabase/serverless";

config({ path: ".env" });

const sql = neon(process.env.DATABASE_URL!);

// Define all columns from schema.ts with their types
const schemaColumns = [
  { name: "id", type: "uuid", nullable: false, default: "gen_random_uuid()", primary: true },
  { name: "category", type: "varchar", nullable: false },
  { name: "price", type: "varchar", nullable: false },
  { name: "car", type: "varchar", nullable: false },
  { name: "distance", type: "varchar", nullable: true },
  { name: "stops", type: "text[]", nullable: true },
  { name: "pickup_date", type: "timestamp", nullable: true },
  { name: "pickup_time", type: "varchar", nullable: true },
  { name: "return_date", type: "timestamp", nullable: true },
  { name: "return_time", type: "varchar", nullable: true },
  { name: "is_return", type: "boolean", nullable: true },
  { name: "pickup_location", type: "varchar", nullable: false },
  { name: "dropoff_location", type: "varchar", nullable: true },
  { name: "passengers", type: "integer", nullable: false },
  { name: "bags", type: "integer", nullable: false },
  { name: "name", type: "varchar", nullable: false },
  { name: "email", type: "varchar", nullable: false },
  { name: "phone", type: "varchar", nullable: false },
  { name: "flight_name", type: "varchar", nullable: true },
  { name: "flight_number", type: "varchar", nullable: true },
  { name: "is_airport_pickup", type: "boolean", nullable: true },
  { name: "payment_id", type: "varchar", nullable: true },
  { name: "payment_method", type: "varchar", nullable: true },
  { name: "duration", type: "integer", nullable: true },
  { name: "flight_track", type: "boolean", nullable: true },
  { name: "meet_greet", type: "boolean", nullable: true },
  { name: "extra_stops_count", type: "integer", nullable: true },
  { name: "return_flight_track", type: "boolean", nullable: true },
  { name: "return_meet_greet", type: "boolean", nullable: true },
  { name: "return_extra_stops_count", type: "integer", nullable: true },
  { name: "instructions", type: "text", nullable: true },
  { name: "updated_at", type: "timestamp", nullable: false, default: "now()" },
  { name: "created_at", type: "timestamp", nullable: false, default: "now()" },
];

async function getExistingColumns(): Promise<Set<string>> {
  const result = await sql`
    SELECT column_name 
    FROM information_schema.columns 
    WHERE table_name = 'okataxis_orders'
  `;
  return new Set(result.map((row: any) => row.column_name));
}

async function addColumn(column: typeof schemaColumns[0]) {
  // Skip primary key column (id) - it should already exist
  if (column.primary) {
    return;
  }

  const nullable = column.nullable ? "" : " NOT NULL";
  const defaultClause = column.default ? ` DEFAULT ${column.default}` : "";
  const columnDef = `${column.name} ${column.type}${nullable}${defaultClause}`;

  try {
    await sql(`ALTER TABLE okataxis_orders ADD COLUMN ${columnDef}`);
    console.log(`✅ Added column: ${column.name} (${column.type})`);
    return true;
  } catch (error: any) {
    // Column might already exist or there's another issue
    if (error.message?.includes("already exists") || error.message?.includes("duplicate")) {
      console.log(`⏭️  Column already exists: ${column.name}`);
      return false;
    }
    throw error;
  }
}

async function syncSchema() {
  try {
    console.log("🔄 Starting schema synchronization...\n");

    // Check if table exists
    const tableExists = await sql`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_name = 'okataxis_orders'
      )
    `;

    if (!tableExists[0]?.exists) {
      console.error("❌ Table 'okataxis_orders' does not exist!");
      console.log("💡 Please run the initial migration first.");
      process.exit(1);
    }

    // Get existing columns
    const existingColumns = await getExistingColumns();
    console.log(`📊 Found ${existingColumns.size} existing columns in database\n`);

    // Find missing columns
    const missingColumns = schemaColumns.filter(
      (col) => !existingColumns.has(col.name) && !col.primary
    );

    if (missingColumns.length === 0) {
      console.log("✅ All columns are up to date! No changes needed.");
      return;
    }

    console.log(`📝 Found ${missingColumns.length} missing column(s):\n`);
    missingColumns.forEach((col) => {
      console.log(`   - ${col.name} (${col.type})`);
    });
    console.log();

    // Add missing columns
    let addedCount = 0;
    for (const column of missingColumns) {
      const added = await addColumn(column);
      if (added) addedCount++;
    }

    console.log(`\n✅ Schema synchronization complete!`);
    console.log(`   Added ${addedCount} new column(s)`);
  } catch (error) {
    console.error("❌ Error synchronizing schema:", error);
    throw error;
  }
}

syncSchema()
  .then(() => {
    console.log("\n🎉 Migration completed successfully!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("\n💥 Migration failed:", error);
    process.exit(1);
  });

