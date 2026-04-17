const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const pdf = require('pdf-parse');
const dotenv = require('dotenv');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const { Admin: MongooseAdmin, Blog: MongooseBlog, Student: MongooseStudent, Gallery: MongooseGallery, JobRole: MongooseJobRole, JobQuestion: MongooseJobQuestion, Category: MongooseCategory } = require('./models/Schemas');
const mockDb = require('./mockDb');

dotenv.config();

const app = express();
let DB = { Admin: MongooseAdmin, Blog: MongooseBlog, Student: MongooseStudent, Gallery: MongooseGallery, JobRole: MongooseJobRole, JobQuestion: MongooseJobQuestion, Category: MongooseCategory };
let isMockMode = false;

const PORT = process.env.PORT || 5000;
const SECRET = process.env.JWT_SECRET || 'LASER_EXPERT_SECRET_KEY';

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve uploaded files with absolute path

// --- EMAIL TRANSPORTER ---
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || "smtp.gmail.com",
  port: parseInt(process.env.EMAIL_PORT) || 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER || 'harshuchethu3@gmail.com',
    pass: process.env.EMAIL_PASS || 'gychdfekijpkaymz' // Removed spaces for reliability
  },
  tls: {
    rejectUnauthorized: false
  }
});

// Verify Transporter
transporter.verify((error, success) => {
    if (error) console.error("Email Transporter Error:", error);
    else console.log("Email Transporter Ready.");
});

// MongoDB Connection
// --- SEEDING ENGINE ---
const seedInitialData = async () => {
    try {
        console.log("--- SEEDING ENGINE ---");
        
        // Comprehensive Count Log
        const counts = {
            admins: await DB.Admin.countDocuments(),
            blogs: await DB.Blog.countDocuments(),
            students: await DB.Student.countDocuments(),
            jobs: await DB.JobRole.countDocuments(),
            questions: await DB.JobQuestion.countDocuments(),
            gallery: await DB.Gallery.countDocuments(),
            categories: await DB.Category.countDocuments()
        };
        console.log("Database Stats:", counts);
        
        // Admin Seed
        if (counts.admins === 0) {
            if (isMockMode) {
               await DB.Admin.save({ username: 'admin', password: 'password123', email: 'info@laserxprts.com' });
            } else {
               const admin = new DB.Admin({ username: 'admin', password: 'password123', email: 'info@laserxprts.com' });
               await admin.save();
            }
            console.log('Seed Admin Created - Username: admin, Password: password123');
        }

        // Blog Seed
        if (counts.blogs === 0) {
            await DB.Blog.insertMany([
                { title: 'Welcome to Raitoopto News', content: 'We are excited to launch our new News section! Stay tuned for updates on laser technology and industrial automation.', author: 'Admin' },
                { title: 'The Future of Fiber Lasers', content: 'Fiber laser technology is evolving rapidly. Learn how it is replacing traditional CO2 lasers in metal processing.', author: 'Admin' }
            ]);
            console.log('Initial blogs seeded');
        }

        // Categories Seed
        if (counts.categories === 0) {
            const initialCats = ['Workspace', 'Production', 'Automation', 'Service', 'UAE', 'Maintenance', 'Team Events'];
            await DB.Category.insertMany(initialCats.map(name => ({ name })));
            console.log('Initial categories seeded');
        }

        // Job Roles & Questions Seed
        if (counts.jobs === 0) {
            const sampleJobs = [
                { title: "Senior Laser Service Engineer", description: "Maintenance of high-power laser systems.", responsibilities: "Onshore/Offshore service.", skills: "Optics, PLC, Electronics", minExperience: 5, maxExperience: 10, status: 'Published' },
                { title: "CNC Programmer (CAD/CAM)", description: "Prepare machine codes for laser cutting.", responsibilities: "Nesting, toolpaths.", skills: "AutoCAD, Lantek", minExperience: 2, maxExperience: 5, status: 'Published' },
                { title: "Graduate Trainee", description: "Freshers for engineering.", responsibilities: "Assembly.", skills: "Tech drawing, basic electronics", minExperience: 0, maxExperience: 1, status: 'Published' }
            ];
            const savedJobs = await DB.JobRole.insertMany(sampleJobs);
            console.log('Job Roles seeded');

            // Seed questions for the first job
            const laserJob = savedJobs[0];
            await DB.JobQuestion.insertMany([
                { jobId: laserJob._id, questionText: "Fiber vs CO2 lasers?", questionType: "mcq", options: ["Wavelength", "Coolant only", "Size", "None"], correctAnswer: 0 },
                { jobId: laserJob._id, questionText: "PLC = Programmable Logic Controller?", questionType: "boolean", correctAnswer: "true" }
            ]);
            console.log('Sample Questions seeded');

            // Student Seed
            if (counts.students === 0) {
                await DB.Student.insertMany([
                    { name: "Rahul Sharma", email: "rahul@example.com", resumeUrl: "http://example.com/r1.pdf", appliedRole: laserJob.title, appliedJobId: laserJob._id, atsScore: 88, testScore: 75, correctCount: 3, totalQuestions: 4 },
                    { name: "Anita Desai", email: "anita@example.com", resumeUrl: "http://example.com/r2.pdf", appliedRole: "CNC Programmer", atsScore: 62, testScore: -1 }
                ]);
                console.log('Sample students seeded');
            }
        }

        // Gallery Seed
        if (counts.gallery === 0) {
            await DB.Gallery.insertMany([
                { imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format", caption: "Robotic Assembly Unit", category: "Automation" },
                { imageUrl: "https://images.unsplash.com/photo-1565173386916-4292c00e7661?auto=format", caption: "High Precision Cutting", category: "Production" },
                { imageUrl: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format", caption: "Training Session", category: "Workspace" }
            ]);
            console.log('Gallery starters seeded');
        }
    } catch (e) {
        console.error("Seeding failed critically:", e);
    }
};

// MongoDB Connection
const MONGO_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/raitoopto';
console.log(`📡 Connecting to: ${MONGO_URI.split('@')[1] || MONGO_URI}`); 

mongoose.connect(MONGO_URI)
  .then(async () => {
    const dbName = mongoose.connection.name;
    console.log(`✅ CONNECTED: MongoDB Atlas | Database: ${dbName}`);
    
    if (dbName === 'test') {
        console.warn('⚠️ WARNING: Connected to the default "test" database. If your data is in a different database, ensure your connection string ends with "/YourDatabaseName" before the "?"');
    }
    
    await seedInitialData();
  })
  .catch(async err => {
    console.error('❌ ERROR: MongoDB Atlas failed. Switching to Local JSON DB.', err.message);
    DB = mockDb;
    isMockMode = true;
    await seedInitialData();
  });


// --- CLOUDINARY SETUP ---
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const useCloudinary = !!(process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET);

// --- MULTER SETUP ---
let storage;
let galleryStorage;

if (useCloudinary) {
  storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'lei-resumes',
      resource_type: 'auto'
    }
  });

  galleryStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'lei-gallery',
        resource_type: 'auto'
    }
  });
} else {
  storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (!fs.existsSync('./uploads')) fs.mkdirSync('./uploads');
        cb(null, './uploads');
    },
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
  });

  galleryStorage = multer.diskStorage({
    destination: (req, file, cb) => {
         if (!fs.existsSync('uploads/')) fs.mkdirSync('uploads/');
         cb(null, 'uploads/');
    },
    filename: (req, file, cb) => cb(null, `gallery-${Date.now()}${path.extname(file.originalname)}`)
  });
}

const galleryUpload = multer({
  storage: galleryStorage,
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|webp|mp4|webm|avi|mov/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) return cb(null, true);
    cb(new Error("Only professional visuals allowed (JPG/PNG/MP4/WEBM)"));
  }
});

const fileFilter = (req, file, cb) => {
  const allowed = ['.pdf', '.doc', '.docx'];
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowed.includes(ext)) cb(null, true);
  else cb(new Error('Only PDF, DOC, and DOCX files are allowed'), false);
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB Limit
});

// JD Upload specific filter (only PDF/DOC)
const jdUpload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 10 * 1024 * 1024 } // 10MB Limit
});

// --- AUTH MIDDLEWARE ---
const authenticateAdmin = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).json({ message: 'No token, authorization denied' });
  try {
    const decoded = jwt.verify(token, SECRET);
    req.admin = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

// --- AUTH ROUTES ---

// 1. ADMIN - LOGIN
app.post('/api/admin/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const admin = await DB.Admin.findOne({ username });
    if (!admin) return res.status(400).json({ message: 'Invalid credentials' });

    if (isMockMode) {
        if(username === 'admin' && password === 'password123') {
           const token = jwt.sign({ id: 'mock-admin' }, SECRET, { expiresIn: '1d' });
           return res.json({ token, admin: { username: 'admin', email: 'info@laserxprts.com' }, isMock: true });
        }
        return res.status(400).json({ message: 'Invalid credentials (Mock Mode)' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: admin._id }, SECRET, { expiresIn: '1d' });
    res.json({ token, admin: { username: admin.username, email: admin.email } });
  } catch (err) {
    console.error('Login Error:', err);
    res.status(500).json({ message: 'Database/Server Error' });
  }
});

// 2. ADMIN - FORGOT PASSWORD
app.post('/api/admin/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;
    const admin = await DB.Admin.findOne({ email });
    if (!admin) return res.status(404).json({ message: 'Admin with this email does not exist' });

    const token = crypto.randomBytes(20).toString('hex');
    admin.resetPasswordToken = token;
    admin.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await admin.save();

    const resetUrl = `${process.env.FRONTEND_URL || 'https://raitoopto.netlify.app'}/reset-password/${token}`;
    
    const mailOptions = {
      from: '"Laser Experts India" <harshuchethu3@gmail.com>',
      to: admin.email,
      subject: 'Password Reset Request',
      html: `
        <div style="font-family: sans-serif; padding: 20px;">
          <h2>Password Reset Request</h2>
          <p>You are receiving this because you (or someone else) have requested the reset of the password for your account.</p>
          <p>Please click on the following link, or paste this into your browser to complete the process:</p>
          <a href="${resetUrl}" style="background: #FFEF00; color: #000; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">Reset Password</a>
          <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    res.json({ message: 'Recovery email sent successfully' });
  } catch (err) {
    console.error('Forgot Password Error:', err);
    res.status(500).json({ message: 'Error sending recovery email' });
  }
});

// 3. ADMIN - RESET PASSWORD
app.post('/api/admin/reset-password/:token', async (req, res) => {
  try {
    const admin = await DB.Admin.findOne({
      resetPasswordToken: req.params.token,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!admin) return res.status(400).json({ message: 'Password reset token is invalid or has expired' });

    admin.password = req.body.password;
    admin.resetPasswordToken = undefined;
    admin.resetPasswordExpires = undefined;
    await admin.save();

    res.json({ message: 'Password has been updated successfully' });
  } catch (err) {
    console.error('Reset Password Error:', err);
    res.status(500).json({ message: 'Error resetting password' });
  }
});

// --- BLOG ROUTES ---

// 1. GET ALL BLOGS (Public)
app.get('/api/blogs', async (req, res) => {
  try {
    const blogs = await DB.Blog.find().sort({ date: -1 });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch blogs' });
  }
});

// 2. GET SINGLE BLOG (Public)
app.get('/api/blogs/:id', async (req, res) => {
  try {
    const blog = await DB.Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch blog' });
  }
});

// 3. CREATE BLOG (Admin)
app.post('/api/admin/blogs', authenticateAdmin, galleryUpload.single('poster'), async (req, res) => {
  try {
    const { title, content } = req.body;
    const blogData = {
      title,
      content,
      imageUrl: req.file ? (process.env.CLOUDINARY_CLOUD_NAME ? req.file.path : `uploads/${req.file.filename}`) : '',
      author: 'Admin'
    };
    const newBlog = new DB.Blog(blogData);
    await newBlog.save();
    res.json(newBlog);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create blog' });
  }
});

// 4. UPDATE BLOG (Admin)
app.put('/api/admin/blogs/:id', authenticateAdmin, galleryUpload.single('poster'), async (req, res) => {
  try {
    const updates = { ...req.body };
    if (req.file) {
      updates.imageUrl = process.env.CLOUDINARY_CLOUD_NAME ? req.file.path : `uploads/${req.file.filename}`;
    }
    const updatedBlog = await DB.Blog.findByIdAndUpdate(req.params.id, updates, { new: true });
    res.json(updatedBlog);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update blog' });
  }
});

// 5. DELETE BLOG (Admin)
app.delete('/api/admin/blogs/:id', authenticateAdmin, async (req, res) => {
  try {
    await DB.Blog.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Blog deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete blog' });
  }
});

// 2. CAREER MODULE - APPLY
app.post('/api/career/apply', upload.single('resume'), async (req, res) => {
  try {
    const { name, email, jobRole, jobId, jobResponses } = req.body;
    if (!req.file) return res.status(400).json({ message: 'Resume upload required' });

    let atsScore = 0;
    let savedCorrectCount = 0;
    let savedTotalQuestions = 0;
    try {
        const dataBuffer = fs.readFileSync(req.file.path);
        const parseFunc = typeof pdf === 'function' ? pdf : (pdf.PDFParse || pdf.default);
        const pdfData = await parseFunc(dataBuffer);
        const pdfText = pdfData.text.toLowerCase();
        
        // --- DYNAMIC ATS ALGORITHM (Keyword Extraction from JD) ---
        let job = null;
        if (jobId && mongoose.Types.ObjectId.isValid(jobId)) {
            job = await DB.JobRole.findById(jobId);
        }

        let jdKeywords = [];
        if (job) {
            // Extract keywords from all job fields
            const combinedJD = `${job.title} ${job.description} ${job.responsibilities} ${job.skills}`.toLowerCase();
            // Simple keyword extractor (words > 3 chars, removing common stopwords)
            const words = combinedJD.match(/\b(\w{4,})\b/g) || [];
            const stopWords = new Set(['this', 'that', 'with', 'from', 'your', 'their', 'about', 'would', 'should', 'could', 'which', 'where', 'there']);
            jdKeywords = [...new Set(words.filter(w => !stopWords.has(w)))];
        }

        // Fallback or additional tech stack keywords
        const techStack = ['laser', 'cnc', 'fiber', 'co2', 'automation', 'service', 'maintenance', 'repair', 'calibration', 'retrofitting', 'engineering', 'it', 'support'];
        const allTargetKeywords = [...new Set([...jdKeywords, ...techStack])];
        
        let matches = 0;
        let matchedKeywords = [];
        allTargetKeywords.forEach(k => { 
            if(pdfText.includes(k)) {
                matches++; 
                matchedKeywords.push(k);
            }
        });
        
        // Calculate Weighted Score
        // Match Ratio = matches / total keywords (weighted towards job-specific keywords)
        const matchRatio = allTargetKeywords.length > 0 ? (matches / allTargetKeywords.length) : 0.45;
        atsScore = Math.round(matchRatio * 100);
        
        // Realistic mapping: 45% is floor for clean files, 85%+ is high match
        if (atsScore < 35) atsScore = 35 + Math.floor(Math.random() * 10);
        if (atsScore > 98) atsScore = 98;

        console.log(`ATS Result for ${name}: Score ${atsScore}% (Matched ${matches}/${allTargetKeywords.length} keys)`);
    } catch (err) {
        console.error("ATS Error:", err);
        atsScore = 45; // Fallback
    }

    let parsedResponses = [];
    try {
        if (jobResponses) parsedResponses = JSON.parse(jobResponses);
    } catch(e) {}

    // Evaluate Test Score
    let testScore = 0;
    try {
        const searchJobId = jobId; 
        console.log("Evaluating test for Job ID:", searchJobId);
        
        let questions = [];
        if (mongoose.Types.ObjectId.isValid(searchJobId)) {
            const objId = new mongoose.Types.ObjectId(searchJobId);
            questions = await DB.JobQuestion.find({ $or: [{ jobId: objId }, { jobId: searchJobId }] });
        } else {
            questions = await DB.JobQuestion.find({ jobId: searchJobId });
        }
        
        console.log(`Found ${questions.length} questions for this job.`);
        let correctCount = 0;
        if (questions.length > 0) {
            parsedResponses.forEach(resp => {
                const q = questions.find(i => i._id.toString() === resp.questionId.toString());
                if (q) {
                    const sAns = (resp.answer || "").toString().toLowerCase().trim();
                    const cAns = (q.correctAnswer || "").toString().toLowerCase().trim();

                    if (q.questionType === 'mcq') {
                        const correctVal = q.options[q.correctAnswer] ? q.options[q.correctAnswer].toLowerCase().trim() : "";
                        const directVal = (q.correctAnswer || "").toString().toLowerCase().trim();
                        if (sAns === correctVal || sAns === directVal) {
                            correctCount++;
                        }
                    } else {
                        if (sAns === cAns) correctCount++;
                    }
                }
            });
            testScore = Math.round((correctCount / questions.length) * 100);
            savedCorrectCount = correctCount;
        } else {
            testScore = 100;
        }
        savedTotalQuestions = questions.length;
    } catch (err) {
        console.error("Scoring Error:", err);
    }

    const studentData = {
      name,
      email,
      resumeUrl: process.env.CLOUDINARY_CLOUD_NAME ? req.file.path : `uploads/${req.file.filename}`,
      appliedRole: jobRole,
      appliedJobId: jobId,
      jobResponses: parsedResponses,
      atsScore: atsScore,
      testScore: testScore,
      correctCount: savedCorrectCount,
      totalQuestions: savedTotalQuestions
    };

    let student;
    if (isMockMode) {
        student = await DB.Student.save(studentData);
    } else {
        student = new DB.Student(studentData);
        await student.save();
    }
    
    res.json({ 
        success: true, 
        studentId: student._id, 
        testScore, 
        correctCount: savedCorrectCount, 
        totalQuestions: savedTotalQuestions 
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


// 5. GALLERY - FETCH
app.get('/api/gallery', async (req, res) => {
  try {
    let items;
    if (isMockMode) {
      items = await DB.Gallery.find().sort();
    } else {
      items = await DB.Gallery.find().sort({ uploadDate: -1 });
    }
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch gallery' });
  }
});

// 5b. CATEGORY - FETCH (Public)
app.get('/api/categories', async (req, res) => {
  try {
    const cats = await DB.Category.find().sort({ name: 1 });
    res.json(cats);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch categories' });
  }
});

// 5c. CATEGORY - ADD (Admin)
// 5c. CATEGORY - ADD (Admin)
app.post('/api/admin/categories', authenticateAdmin, async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: 'Category name required' });
    
    if (isMockMode) {
        // Mock mode: implement if needed, or just return success
        res.json({ name, _id: Date.now() });
    } else {
        const newCat = new DB.Category({ name });
        await newCat.save();
        res.json(newCat);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 5d. CATEGORY - DELETE (Admin)
app.delete('/api/admin/categories/:name', authenticateAdmin, async (req, res) => {
  try {
    const { name } = req.params;
    if (isMockMode) {
        res.json({ success: true, message: 'Mock category hidden' });
    } else {
        await DB.Category.findOneAndDelete({ name });
        res.json({ success: true, message: 'Category removed' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// a. ADMIN DASHBOARD - GET STUDENTS
app.get('/api/admin/students', authenticateAdmin, async (req, res) => {
  try {
    let students;
    if (isMockMode) {
      students = await DB.Student.find().sort();
    } else {
      students = await DB.Student.find().sort({ atsScore: -1, testScore: -1 });
    }
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch students. Database error.' });
  }
});

// a2. ADMIN - SEND INTERVIEW EMAIL
app.post('/api/admin/send-selection-email', authenticateAdmin, async (req, res) => {
    try {
        const { studentId, email, name } = req.body;
        if (!email) return res.status(400).json({ message: 'Student email is required.' });
        
        console.log(`Sending Interview Selection email to: ${email} (${name})`);

        const mailOptions = {
            from: '"Laser Experts India" <harshuchethu3@gmail.com>',
            to: email,
            subject: 'Interview Selection - Laser Experts India',
            html: `
                <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 30px; background: #fafafa;">
                    <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #eeeeee; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
                        <div style="background: #0A0A0C; padding: 20px; text-align: center;">
                            <h1 style="color: #FFEF00; margin: 0; font-size: 24px;">LASER EXPERTS INDIA</h1>
                        </div>
                        <div style="padding: 30px; color: #333333; line-height: 1.6;">
                            <h2 style="color: #0A0A0C; font-size: 20px; margin-top: 0;">Dear ${name},</h2>
                            <p style="font-size: 16px;">
                                Congratulations! You have been selected for the final round of the interview at <strong>Laser Experts India</strong>.
                            </p>
                            <p style="font-size: 14px; background: #FFF9C4; padding: 15px; border-left: 4px solid #FBC02D; margin: 20px 0;">
                                Our Recruiting team will contact you shortly with the schedule and further details for the virtual/in-person session.
                            </p>
                            <p style="font-size: 14px;">
                                Best Regards,<br>
                                <strong>HR Department</strong><br>
                                Laser Experts India
                            </p>
                        </div>
                        <div style="background: #f4f4f4; padding: 15px; text-align: center; border-top: 1px solid #eeeeee;">
                            <p style="font-size: 11px; color: #999999; margin: 0;">
                                This is an automated notification. Please do not reply directly to this email.
                            </p>
                        </div>
                    </div>
                </div>
            `
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully:', info.messageId);
        res.json({ success: true, message: 'Interview selection email sent successfully!' });
    } catch (err) {
        console.error('CRITICAL SMTP ERROR:', err);
        // Provide more detailed feedback to admin
        let errorMsg = err.message;
        if (err.code === 'EAUTH') errorMsg = "Authentication Failed: Check Gmail App Password.";
        if (err.code === 'ESOCKET') errorMsg = "Network Error: Could not connect to SMTP server.";
        
        res.status(500).json({ 
            success: false, 
            message: `Mail Error: ${errorMsg}`,
            technical: err.stack 
        });
    }
});

// a3. ADMIN - SEND REJECTION EMAIL
app.post('/api/admin/send-rejection-email', authenticateAdmin, async (req, res) => {
    try {
        const { studentId, email, name } = req.body;
        if (!email) return res.status(400).json({ message: 'Student email is required.' });
        
        console.log(`Sending Interview Rejection email to: ${email} (${name})`);

        const mailOptions = {
            from: '"Laser Experts India" <harshuchethu3@gmail.com>',
            to: email,
            subject: 'Application Status Update - Laser Experts India',
            html: `
                <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 30px; background: #fafafa;">
                    <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #eeeeee; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
                        <div style="background: #0A0A0C; padding: 20px; text-align: center;">
                            <h1 style="color: #FFEF00; margin: 0; font-size: 24px;">LASER EXPERTS INDIA</h1>
                        </div>
                        <div style="padding: 30px; color: #333333; line-height: 1.6;">
                            <h2 style="color: #0A0A0C; font-size: 20px; margin-top: 0;">Dear ${name},</h2>
                            <p style="font-size: 16px;">
                                Thank you for your interest in joining <strong>Laser Experts India</strong> and for taking the time to go through our application process.
                            </p>
                            <p style="font-size: 16px;">
                                After careful consideration of your profile and assessment results, we regret to inform you that we will not be moving forward with your application at this time.
                            </p>
                            <p style="font-size: 14px; background: #FFF9C4; padding: 15px; border-left: 4px solid #FBC02D; margin: 20px 0;">
                                We encourage you to apply for future openings that match your skills. We wish you the best in your career endeavors.
                            </p>
                            <p style="font-size: 14px;">
                                Best Regards,<br>
                                <strong>HR Department</strong><br>
                                Laser Experts India
                            </p>
                        </div>
                        <div style="background: #f4f4f4; padding: 15px; text-align: center; border-top: 1px solid #eeeeee;">
                            <p style="font-size: 11px; color: #999999; margin: 0;">
                                This is an automated notification. Please do not reply directly to this email.
                            </p>
                        </div>
                    </div>
                </div>
            `
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Rejection email sent successfully:', info.messageId);
        res.json({ success: true, message: 'Rejection email sent successfully!' });
    } catch (err) {
        console.error('CRITICAL SMTP ERROR:', err);
        let errorMsg = err.message;
        if (err.code === 'EAUTH') errorMsg = "Authentication Failed: Check Gmail App Password.";
        if (err.code === 'ESOCKET') errorMsg = "Network Error: Could not connect to SMTP server.";
        
        res.status(500).json({ 
            success: false, 
            message: `Mail Error: ${errorMsg}`,
            technical: err.stack 
        });
    }
});


// e. GALLERY MANAGEMENT - UPLOAD IMAGE
app.post('/api/admin/gallery/upload', authenticateAdmin, galleryUpload.single('image'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'Image file required' });
    
    const contentType = req.file.mimetype.startsWith('video') ? 'video' : 'image';
    const itemData = {
      imageUrl: process.env.CLOUDINARY_CLOUD_NAME ? req.file.path : `uploads/${req.file.filename}`,
      caption: req.body.caption,
      category: req.body.category,
      contentType: contentType
    };
    
    if(isMockMode) {
        const item = await DB.Gallery.save(itemData);
        res.json(item);
    } else {
        const newItem = new DB.Gallery(itemData);
        await newItem.save();
        res.json(newItem);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// f. GALLERY MANAGEMENT - DELETE
app.delete('/api/admin/gallery/:id', authenticateAdmin, async (req, res) => {
    await DB.Gallery.findByIdAndDelete(req.params.id);
    res.json({ success: true });
});

// g. GALLERY MANAGEMENT - UPDATE
app.put('/api/admin/gallery/:id', authenticateAdmin, async (req, res) => {
    await DB.Gallery.findByIdAndUpdate(req.params.id, req.body);
    res.json({ success: true });
});

// h. JOB QUESTIONS - UPDATE
app.put('/api/admin/questions/:id', authenticateAdmin, async (req, res) => {
    await DB.JobQuestion.findByIdAndUpdate(req.params.id, req.body);
    res.json({ success: true });
});

// i. JOB ROLES - FETCH (Public)
app.get('/api/jobs', async (req, res) => {
  try {
    const jobs = await DB.JobRole.find(isMockMode ? {} : { status: 'Published' });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch job roles' });
  }
});

// j. ADMIN JOBS - FULL LIST
app.get('/api/admin/jobs', authenticateAdmin, async (req, res) => {
  try {
    const jobs = await DB.JobRole.find();
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: 'Failed' });
  }
});

// k. ADMIN JOB - GET SINGLE
app.get('/api/admin/jobs/:id', authenticateAdmin, async (req, res) => {
  const job = await DB.JobRole.findById(req.params.id);
  res.json(job);
});

// l. ADMIN JOB - CREATE
app.post('/api/admin/jobs', authenticateAdmin, jdUpload.single('jdFile'), async (req, res) => {
  const jobData = { ...req.body };
  if (req.file) {
    jobData.jdFileUrl = process.env.CLOUDINARY_CLOUD_NAME ? req.file.path : `uploads/${req.file.filename}`;
  }
  
  if (isMockMode) {
    const job = await DB.JobRole.save(jobData);
    res.json(job);
  } else {
    const newJob = new DB.JobRole(jobData);
    await newJob.save();
    res.json(newJob);
  }
});

// m. ADMIN JOB - UPDATE
app.put('/api/admin/jobs/:id', authenticateAdmin, jdUpload.single('jdFile'), async (req, res) => {
    const updates = { ...req.body };
    if (req.file) {
        updates.jdFileUrl = process.env.CLOUDINARY_CLOUD_NAME ? req.file.path : `uploads/${req.file.filename}`;
    }
    await DB.JobRole.findByIdAndUpdate(req.params.id, updates);
    res.json({ success: true });
});

// n. JOB QUESTIONS - GET (Public - Hides Correct Answer)
app.get('/api/jobs/:jobId/questions', async (req, res) => {
    const questions = await DB.JobQuestion.find({ jobId: req.params.jobId }).select('-correctAnswer');
    res.json(questions);
});

// n2. JOB QUESTIONS - GET (Admin - Returns Correct Answer)
app.get('/api/admin/jobs/:jobId/questions', authenticateAdmin, async (req, res) => {
    const questions = await DB.JobQuestion.find({ jobId: req.params.jobId });
    res.json(questions);
});

// o. JOB QUESTIONS - ADD
app.post('/api/admin/jobs/:jobId/questions', authenticateAdmin, async (req, res) => {
    const qData = { ...req.body, jobId: req.params.jobId };
    if (isMockMode) {
        const q = await DB.JobQuestion.save(qData);
        res.json(q);
    } else {
        const q = new DB.JobQuestion(qData);
        await q.save();
        res.json(q);
    }
});

// q. JOB QUESTIONS - UPDATE
app.put('/api/admin/questions/:id', authenticateAdmin, async (req, res) => {
    try {
        if (isMockMode) {
            const q = await DB.JobQuestion.update(req.params.id, req.body);
            res.json(q);
        } else {
            const q = await DB.JobQuestion.findByIdAndUpdate(req.params.id, req.body, { new: true });
            res.json(q);
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// p. JOB QUESTIONS - DELETE
app.delete('/api/admin/questions/:id', authenticateAdmin, async (req, res) => {
    await DB.JobQuestion.findByIdAndDelete(req.params.id);
    res.json({ success: true });
});


// n. JOB QUESTIONS - GET ALL (Admin)
app.get('/api/admin/all-questions', authenticateAdmin, async (req, res) => {
    try {
        const questions = await DB.JobQuestion.find();
        res.json(questions);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// --- RECALCULATE SCRIPTS ---
app.post('/api/admin/recalculate-all', authenticateAdmin, async (req, res) => {
    try {
        const students = await DB.Student.find();
        const questions = await DB.JobQuestion.find();
        
        const jobs = await DB.JobRole.find();
        
        let debugLogs = [];
        for (let s of students) {
            let jobQs = questions.filter(q => q.jobId?.toString() === s.appliedJobId?.toString());
            if (jobQs.length === 0 && s.appliedRole) {
                const job = jobs.find(j => j.title === s.appliedRole);
                if (job) jobQs = questions.filter(q => q.jobId?.toString() === job._id?.toString());
            }

            let cCount = 0;
            if (jobQs.length > 0 && s.jobResponses) {
                s.jobResponses.forEach(resp => {
                        let qData = jobQs.find(q => q._id.toString() === resp.questionId?.toString());
                        
                        // Smart Fallback: Match by Question Text if ID changed/deleted
                        if (!qData && s.appliedRole) {
                            const studentQText = resp.questionText?.toLowerCase().trim();
                            qData = jobQs.find(q => q.questionText?.toLowerCase().trim() === studentQText);
                        }

                        if (qData) {
                            const sAns = (resp.answer || "").toString().toLowerCase().trim();
                            const cAns = (qData.correctAnswer || "").toString().toLowerCase().trim();
                            const correctTxt = qData.options && qData.options[qData.correctAnswer] ? qData.options[qData.correctAnswer].toLowerCase().trim() : "";
                            
                            let isCorrect = false;
                            if (qData.questionType === 'mcq') {
                                if (sAns === correctTxt || sAns === cAns) isCorrect = true;
                            } else {
                                if (sAns === cAns) isCorrect = true;
                            }
                            
                            if (isCorrect) cCount++;
                        }
                });
                s.correctCount = cCount;
                s.totalQuestions = jobQs.length;
                s.testScore = Math.round((cCount / jobQs.length) * 100);
            }
            if (!isMockMode) await s.save();
            else await DB.Student.findByIdAndUpdate(s._id, { correctCount: s.correctCount, totalQuestions: s.totalQuestions, testScore: s.testScore });
        }
        res.json({ success: true, message: "Sync complete.", logs: debugLogs.slice(0, 10) });
    } catch(err) { res.status(500).send(err.message); }
});

// --- FORCE RESTORE ROUTE ---
app.post('/api/admin/force-restore', authenticateAdmin, async (req, res) => {
    try {
        console.log("Force Restore Triggered...");
        
        // Seed Categories if empty
        const catCount = await DB.Category.countDocuments();
        if (catCount === 0) {
            const initialCats = ['Workspace', 'Production', 'Automation', 'Service', 'UAE', 'Maintenance', 'Team Events'];
            await DB.Category.insertMany(initialCats.map(name => ({ name })));
        }

        // Seed Jobs if empty
        const jobCount = await DB.JobRole.countDocuments();
        if (jobCount === 0) {
            const sampleJobs = [
                { title: "Senior Laser Service Engineer", description: "Maintenance/repair of laser systems.", responsibilities: "Install, diagnosis.", skills: "Laser, Electronics", minExperience: 5, maxExperience: 10, status: 'Published' },
                { title: "Production Supervisor", description: "CNC laser department.", responsibilities: "Quality, Shifts.", skills: "CNC, CAD", minExperience: 3, maxExperience: 8, status: 'Published' },
                { title: "Graduate Trainee", description: "Fresher role for graduates.", responsibilities: "Assembly, logs.", skills: "Electronics, CAD", minExperience: 0, maxExperience: 2, status: 'Published' }
            ];
            const savedJobs = await DB.JobRole.insertMany(sampleJobs);
            
            // Link questions
            const laserJob = savedJobs[0];
            await DB.JobQuestion.insertMany([
                { jobId: laserJob._id, questionText: "Fiber vs CO2 lasers?", questionType: "mcq", options: ["Wavelength", "Speed", "Color", "N/A"], correctAnswer: 0 },
                { jobId: laserJob._id, questionText: "PLC = Programmable Logic Controller?", questionType: "boolean", correctAnswer: "true" }
            ]);

            // Link Students
            await DB.Student.insertMany([
                { name: "Rahul Sharma", email: "rahul@example.com", resumeUrl: "http://example.com/r1.pdf", appliedRole: laserJob.title, appliedJobId: laserJob._id, atsScore: 88, testScore: 75, correctCount: 3, totalQuestions: 4 },
                { name: "Anita Desai", email: "anita@example.com", resumeUrl: "http://example.com/r2.pdf", appliedRole: "Production Supervisor", atsScore: 62, testScore: -1 }
            ]);
        }

        // Seed Gallery if empty
        const galleryCount = await DB.Gallery.countDocuments();
        if (galleryCount === 0) {
            await DB.Gallery.insertMany([
                { imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format", caption: "Robotic Welding", category: "Automation" },
                { imageUrl: "https://images.unsplash.com/photo-1565173386916-4292c00e7661?auto=format", caption: "Laser Cut Finish", category: "Production" }
            ]);
        }

        res.json({ success: true, message: "Sample data restored successfully." });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// --- DIAGNOSTIC ROUTE ---
app.get('/api/admin/db-health', authenticateAdmin, async (req, res) => {
    try {
        const jobs = await DB.JobRole.find();
        const jCount = Array.isArray(jobs) ? jobs.length : (await DB.JobRole.countDocuments());
        const questions = await DB.JobQuestion.find();
        const qCount = Array.isArray(questions) ? questions.length : (await DB.JobQuestion.countDocuments());
        res.json({ jobs: jCount, questions: qCount, isMock: isMockMode });
    } catch(err) { res.status(500).send(err.message); }
});

// START SERVER
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
