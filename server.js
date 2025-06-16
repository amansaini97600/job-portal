import express, { Router } from "express";
import mysql from "mysql2";
import cors from "cors";
import multer from "multer";
import path from "path";
import bcrypt from "bcrypt";



const app = express();
app.use(cors());
app.use(express.json());

// ✅ Serve uploaded files statically
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));


const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "job_portal"
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

// GET jobs
app.get('/api/jobs', async (req, res) => {
  try {
    const [rows] = await db.promise().execute('SELECT * FROM jobs ORDER BY id DESC');
    res.status(200).json(rows);
  } catch (err) {
    console.error('Error fetching jobs:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST application
// Setup folder to store resumes
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/resumes");
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const filename = Date.now() + ext;
    cb(null, filename);
  }
});

const upload = multer({ storage: storage });

// Serve uploaded files statically
app.post("/api/apply", upload.single("resume"), (req, res) => {
  const { jobId, name, email } = req.body;
  const resumePath = `/uploads/resumes/${req.file.filename}`;

  if (!jobId || !name || !email || !req.file) {
    return res.status(400).json({ message: "Missing fields" });
  }

  const sql = 'INSERT INTO applications (job_id, name, email, resume) VALUES (?, ?, ?, ?)';
  db.query(sql, [jobId, name, email, resumePath], (err, result) => {
    if (err) {
      console.error("❌ Error inserting application:", err);
      return res.status(500).json({ message: "DB insert failed" });
    }

    console.log("✅ Application Inserted:", result.insertId);
    res.status(201).json({ message: "Application submitted successfully" });
  });
});



app.delete("/api/jobs/:id", (req, res) => {
  const jobId = req.params.id;
  db.query("DELETE FROM jobs WHERE id = ?", [jobId], (err, result) => {
    if (err) return res.status(500).json({ error: "Failed to delete job" });
    res.status(200).json({ message: "Job deleted successfully" });
  });
});


// app.get("/api/applications", (req, res) => {
//   db.query("SELECT * FROM applications ORDER BY id DESC", (err, result) => {
//     if (err) return res.status(500).json({ error: "Failed to fetch applications" });
//     res.status(200).json(result);
//   });
// });

app.get("/api/applications", (req, res) => {
  const sql = `
    SELECT a.id, a.name, a.email, a.resume, a.created_at, j.title AS job_title
    FROM applications a
    LEFT JOIN jobs j ON a.job_id = j.id
    ORDER BY a.created_at DESC
  `;
  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error fetching applications:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.status(200).json(result);
  });
});

// admin login

app.post("/api/admin/login", (req, res) => {
  const { username, password } = req.body;

  // Replace this with DB check if needed
  const ADMIN_USERNAME = "admin";
  const ADMIN_PASSWORD = "123456";

  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    return res.json({ success: true });
  } else {
    return res.json({ success: false });
  }
});


// user login

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password required" });
  }

  try {
    // Check if user exists
    const [users] = await db.promise().query("SELECT * FROM users WHERE email = ?", [email]);
    if (users.length === 0) {
      return res.status(401).json({ error: "Invalid credentials" });
      
    }
    
    const user = users[0];
    
    // Check password
    const isMatch = await bcrypt.compare(password.trim(), user.password);
    if (!isMatch) {
  //     console.log("Entered Password:", password);
  // console.log("Hashed Password:", user.password);
      return res.status(401).json({ error: "Invalid credentials" });
    }

    return res.json({
      success: true,
      message: "Login successful",
      user: {
        id: user.id,
        name: user.name,
        email: user.email
        // Token bhi bhej sakte ho agar JWT use karna chahe
      }
    });

  } catch (error) {
    console.error("❌ Login Error:", error);
    return res.status(500).json({ error: "Server error" });
  }
});

// Registration route
app.post("/api/register", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ success: false, error: "Missing fields" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
    db.query(sql, [name, email, hashedPassword], (err, result) => {
      if (err) {
        console.error("❌ Registration DB Error:", err);
        return res.status(500).json({ success: false, error: "Database error" });
      }
      res.status(201).json({ success: true, message: "User registered" });
    });
  } catch (err) {
    res.status(500).json({ success: false, error: "Uare Are allready registered" });
  }
});

// POST /api/google-login
app.post("/api/google-login", async (req, res) => {
  const { name, email, picture } = req.body;

  if (!email || !name) {
    return res.status(400).json({ error: "Missing fields" });
  }

  try {
    const [rows] = await db.promise().query("SELECT * FROM users WHERE email = ?", [email]);

    let user;
    if (rows.length === 0) {
      // Register new user
      const [result] = await db
        .promise()
        .query("INSERT INTO users (name, email, picture) VALUES (?, ?, ?)", [name, email, picture]);
      user = { id: result.insertId, name, email, picture };
    } else {
      user = rows[0];
    }

    return res.json({ success: true, user });
  } catch (err) {
    console.error("Google login error:", err);
    res.status(500).json({ error: "Server error" });
  }
});








// ✅ Start server
app.listen(3000, () => {
  console.log("✅ Server running at http://localhost:3000");
});