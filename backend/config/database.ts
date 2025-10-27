import { Pool } from "pg";

const pool = new Pool({
    user: "postgress",
    host: "dpg-d3vef5je5dus73aaov0g-a.singapore-postgres.render.com",
    database: "students_o2g2",
    password: "xfVx6E8MR3CNKM6Sqn8DEEGQATZOWAqt",
    port: 5432, 
    ssl: { rejectUnauthorized: false }
})

export default pool;
//dpg-d3vef5je5dus73aaov0g-a.singapore-postgres.render.com
//postgresql://postgress:xfVx6E8MR3CNKM6Sqn8DEEGQATZOWAqt@dpg-d3vef5je5dus73aaov0g-a.singapore-postgres.render.com/students_o2g2