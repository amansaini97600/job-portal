import express from "express";
import mysql from "mysql2";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// const cors = require('cors');
// app.use(cors());


const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "", // change this if needed
  database: "job_portal" // your database name
});

// POST job
app.post("/api/jobs", (req, res) => {
  const { title, company, type, skills, salary, contact, location } = req.body;
  const sql = "INSERT INTO jobs (title, company, type, skills, salary, contact, location) VALUES (?, ?, ?, ?, ?, ?, ?)";
  db.query(sql, [title, company, type, skills, salary, contact, location], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ success: true, id: result.insertId });
  });
});

// GET all jobs
app.get("/api/jobs", (req, res) => {
  db.query("SELECT * FROM jobs ORDER BY id DESC", (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.status(200).json(results);
  });
});

app.listen(3000, () => {
  console.log("✅ Server running on port 3000");
});

app.get('/api/jobs', async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM jobs ORDER BY created_at DESC');
    res.json(rows);
  } catch (err) {
    console.error('Error fetching jobs:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/apply', async (req, res) => {
  const { jobId, name, email, resume } = req.body;

  try {
    const sql = 'INSERT INTO applications (job_id, name, email, resume) VALUES (?, ?, ?, ?)';
    await db.query(sql, [jobId, name, email, resume]);
    res.status(201).json({ message: 'Application submitted successfully' });
  } catch (err) {
    console.error("❌ Error inserting application:", err);
    res.status(500).json({ message: 'Failed to apply' });
  }
});


