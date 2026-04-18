const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// --- ADMIN SCHEMA ---
const AdminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Date }
});

// Single Admin Check (Middleware to prevent more than one admin)
AdminSchema.pre('save', async function(next) {
  if (this.isNew) {
    const count = await this.constructor.countDocuments();
    if (count > 0) return next(new Error('Only one admin record can exist.'));
  }

  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

const Admin = mongoose.model('Admin', AdminSchema);

// --- BLOG / CASE STUDY SCHEMA ---
const BlogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  imageUrl: { type: String },
  type: { type: String, enum: ['Blog', 'Case Study'], default: 'Blog' },
  date: { type: Date, default: Date.now },
  author: { type: String, default: 'Admin' }
});

const Blog = mongoose.model('Blog', BlogSchema);


// --- STUDENT SCHEMA ---
const StudentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  resumeUrl: { type: String, required: true },
  appliedRole: { type: String }, // Job Title
  appliedJobId: { type: mongoose.Schema.Types.ObjectId, ref: 'JobRole' },
  jobResponses: [{
    questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'JobQuestion' },
    answer: { type: String }
  }],
  atsScore: { type: Number, default: 0 },
  skills: [String],
  testScore: { type: Number, default: -1 }, // Percentage
  correctCount: { type: Number, default: 0 },
  totalQuestions: { type: Number, default: 0 },
  appliedDate: { type: Date, default: Date.now }
});

const Student = mongoose.model('Student', StudentSchema);


// --- CATEGORY SCHEMA ---
const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now }
});

const Category = mongoose.model('Category', CategorySchema);

// --- GALLERY SCHEMA ---
const GallerySchema = new mongoose.Schema({
  imageUrl: { type: String, required: true },
  caption: { type: String },
  category: { type: String, required: true },
  contentType: { type: String, enum: ['image', 'video'], default: 'image' },
  uploadDate: { type: Date, default: Date.now }
});

const Gallery = mongoose.model('Gallery', GallerySchema);

// --- JOB ROLE SCHEMA ---
const JobRoleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  responsibilities: { type: String },
  skills: { type: String },
  minExperience: { type: Number, default: 0 },
  maxExperience: { type: Number, default: 0 },
  jdFileUrl: { type: String },
  status: { type: String, enum: ['Draft', 'Published'], default: 'Published' },
  postedDate: { type: Date, default: Date.now }
});

const JobRole = mongoose.model('JobRole', JobRoleSchema);

// --- JOB-SPECIFIC QUESTIONS ---
const JobQuestionSchema = new mongoose.Schema({
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'JobRole', required: true },
  questionText: { type: String, required: true },
  questionType: { type: String, enum: ['text', 'mcq', 'boolean'], default: 'text' },
  options: [{ type: String }], // For MCQ
  correctAnswer: { type: mongoose.Schema.Types.Mixed }, // String for text/boolean, Number for MCQ
  isMandatory: { type: Boolean, default: true }
});

const JobQuestion = mongoose.model('JobQuestion', JobQuestionSchema);

module.exports = { Admin, Blog, Student, Gallery, JobRole, JobQuestion, Category };
