import { Pool } from "pg";

const pool = new Pool({
    user: "postgres",
    host: "ep-lucky-truth-a1i3xp0e-pooler.ap-southeast-1.aws.neon.tech",
    database: "students",
    password: "npg_vTO16BEILdnz",
    port: 5432,
    ssl: {
        rejectUnauthorized: false
    }
});

export default pool;
