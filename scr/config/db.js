const mysql = require("mysql2/promise");

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "aisolabkh-db",
    // port: 3306,
    connectionLimit: 100,
    namedPlaceholders: true
});

// Connect to DB (arrow function)
const connectDB = async () => {
    try {
        const connection = await db.getConnection();
        console.log("✅ MySQL connected successfully");
        connection.release();
    } catch (err) {
        console.error("❌ MySQL connection failed:", err.message);
    }
};

connectDB();

module.exports = db;
