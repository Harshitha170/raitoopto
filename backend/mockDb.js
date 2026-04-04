const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, 'db.json');

// Initial Data
const initialData = {
  admins: [{ username: 'admin', password: '$2b$10$wN3M0U7h3Y1vI.vU.XW6euG6p6G1P2R3Z4R5R6R7R8R9R0R1R2R3R', email: 'info@laserxprts.com' }], // admin/password123
  students: [],
  gallery: [],
  jobRoles: [],
  jobQuestions: [],
  categories: []
};

// Ensure File Exists
if (!fs.existsSync(DB_PATH)) {
  fs.writeFileSync(DB_PATH, JSON.stringify(initialData, null, 2));
}

const getDb = () => JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
const saveDb = (data) => fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));

const MockDb = {
  Admin: {
    findOne: async ({ username }) => getDb().admins.find(a => a.username === username),
    countDocuments: async () => (getDb().admins || []).length
  },
  Student: {
    find: () => ({ sort: () => (getDb().students || []).sort((a,b) => (b.atsScore || 0) - (a.atsScore || 0)) }),
    countDocuments: async () => (getDb().students || []).length,
    findByIdAndUpdate: async (id, data) => {
        const db = getDb();
        const idx = db.students.findIndex(s => s._id === id);
        if(idx !== -1) db.students[idx] = { ...db.students[idx], ...data };
        saveDb(db);
        return db.students[idx];
    },
    save: async (student) => {
        const db = getDb();
        const newS = { ...student, _id: Date.now().toString() };
        db.students.push(newS);
        saveDb(db);
        return newS;
    },
    insertMany: async (students) => {
        const db = getDb();
        const newS = students.map((s, idx) => ({ ...s, _id: (Date.now() + idx).toString() }));
        db.students.push(...newS);
        saveDb(db);
        return newS;
    }
  },
  Gallery: {
    find: () => ({ sort: () => (getDb().gallery || []).sort((a,b) => (new Date(b.uploadDate || 0)) - (new Date(a.uploadDate || 0))) }),
    countDocuments: async () => (getDb().gallery || []).length,
    save: async (item) => {
        const db = getDb();
        const newI = { ...item, _id: Date.now().toString(), uploadDate: new Date().toISOString() };
        db.gallery.push(newI);
        saveDb(db);
        return newI;
    },
    insertMany: async (items) => {
        const db = getDb();
        const newI = items.map((item, idx) => ({ ...item, _id: (Date.now() + idx).toString(), uploadDate: new Date().toISOString() }));
        db.gallery.push(...newI);
        saveDb(db);
        return newI;
    },
    findByIdAndDelete: async (id) => {
        const db = getDb();
        db.gallery = db.gallery.filter(g => g._id !== id);
        saveDb(db);
    }
  },
  JobRole: {
    find: () => getDb().jobRoles || [],
    countDocuments: async () => (getDb().jobRoles || []).length,
    save: async (job) => {
        const db = getDb();
        if(!db.jobRoles) db.jobRoles = [];
        const newJ = { ...job, _id: Date.now().toString(), postedDate: new Date().toISOString() };
        db.jobRoles.push(newJ);
        saveDb(db);
        return newJ;
    },
    insertMany: async (jobs) => {
        const db = getDb();
        if(!db.jobRoles) db.jobRoles = [];
        const newJobs = jobs.map((j, idx) => ({ ...j, _id: (Date.now() + idx).toString(), postedDate: new Date().toISOString() }));
        db.jobRoles.push(...newJobs);
        saveDb(db);
        return newJobs;
    },
    findByIdAndDelete: async (id) => {
        const db = getDb();
        if(!db.jobRoles) return;
        db.jobRoles = db.jobRoles.filter(j => j._id !== id);
        saveDb(db);
    },
    findByIdAndUpdate: async (id, data) => {
        const db = getDb();
        const idx = db.jobRoles.findIndex(j => j._id === id);
        if(idx !== -1) db.jobRoles[idx] = { ...db.jobRoles[idx], ...data };
        saveDb(db);
        return db.jobRoles[idx];
    },
    findById: async (id) => getDb().jobRoles.find(j => j._id === id)
  },
  JobQuestion: {
    find: (query) => {
        const db = getDb();
        if(!db.jobQuestions) return [];
        if (!query) return db.jobQuestions;
        
        // Handle $or query
        if (query.$or) {
            const ids = query.$or.map(o => (o.jobId || "").toString());
            return db.jobQuestions.filter(q => ids.includes((q.jobId || "").toString()));
        }
        
        if (query.jobId) return db.jobQuestions.filter(q => q.jobId.toString() === query.jobId.toString());
        return db.jobQuestions;
    },
    countDocuments: async (query) => {
        const db = getDb();
        if(!db.jobQuestions) return 0;
        if(!query) return db.jobQuestions.length;
        if(query.jobId) return db.jobQuestions.filter(q => q.jobId.toString() === query.jobId.toString()).length;
        return db.jobQuestions.length;
    },
    save: async (q) => {
        const db = getDb();
        if(!db.jobQuestions) db.jobQuestions = [];
        const newQ = { ...q, _id: Date.now().toString() };
        db.jobQuestions.push(newQ);
        saveDb(db);
        return newQ;
    },
    insertMany: async (qs) => {
        const db = getDb();
        if(!db.jobQuestions) db.jobQuestions = [];
        const newQs = qs.map((q, idx) => ({ ...q, _id: (Date.now() + idx).toString() }));
        db.jobQuestions.push(...newQs);
        saveDb(db);
        return newQs;
    },
    findByIdAndDelete: async (id) => {
        const db = getDb();
        db.jobQuestions = db.jobQuestions.filter(q => q._id !== id);
        saveDb(db);
    },
    findByIdAndUpdate: async (id, data) => {
        const db = getDb();
        const idx = db.jobQuestions.findIndex(q => q._id === id);
        if(idx !== -1) db.jobQuestions[idx] = { ...db.jobQuestions[idx], ...data };
        saveDb(db);
    }
  },
  Category: {
    find: () => ({ sort: () => (getDb().categories || []).sort((a,b) => a.name.localeCompare(b.name)) }),
    countDocuments: async () => (getDb().categories || []).length,
    insertMany: async (cats) => {
        const db = getDb();
        if(!db.categories) db.categories = [];
        const newCats = cats.map(c => ({ ...c, _id: Math.random().toString(36).substr(2, 9) }));
        db.categories.push(...newCats);
        saveDb(db);
        return newCats;
    },
    save: async (cat) => {
        const db = getDb();
        if(!db.categories) db.categories = [];
        const newC = { ...cat, _id: Date.now().toString() };
        db.categories.push(newC);
        saveDb(db);
        return newC;
    }
  }
};

module.exports = MockDb;
