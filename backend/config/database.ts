import { Pool } from "pg";

const pool = new Pool({
    connectionString:
        "postgresql://neondb_owner:npg_vTO16BEILdnz@ep-lucky-truth-a1i3xp0e-pooler.ap-southeast-1.aws.neon.tech/students?sslmode=require",
    ssl: {
        rejectUnauthorized: false
    }
});

export default pool;
