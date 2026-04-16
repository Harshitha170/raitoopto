const fs = require('fs');
const path = 'src/pages/Contact.jsx';
let content = fs.readFileSync(path, 'utf8');
// Use a robust regex to find the problematic unclosed comment and variable declaration
content = content.replace(/\/\*.*Branch data.*const BRANCHES = \[/, '/* Branch data with verified addresses and direct search links */\nconst BRANCHES = [');
fs.writeFileSync(path, content, 'utf8');
console.log('Fixed Contact.jsx');
