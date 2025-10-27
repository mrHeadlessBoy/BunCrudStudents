import { Pool } from "pg";

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "students",
    password: "nohe@d4pg?",
    port: 5432, 
})

export default pool;