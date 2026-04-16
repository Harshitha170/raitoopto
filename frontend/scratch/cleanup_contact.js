const fs = require('fs');
const path = 'src/pages/Contact.jsx';
let content = fs.readFileSync(path, 'utf8');

// Match the specific garbage lines that were introduced
const garbageRegex = /\];[\r\n]+aser\+Experts\+India\+Ajman\+UAE\/'[\r\n]+\s+\}[\r\n]+\];/g;
if (garbageRegex.test(content)) {
    content = content.replace(garbageRegex, '];');
    fs.writeFileSync(path, content, 'utf8');
    console.log('Fixed garbage lines in Contact.jsx');
} else {
    console.log('Garbage lines not found, trying fallback matching...');
    // Fallback if the string is slightly different
    const lines = content.split(/\r?\n/);
    const newLines = [];
    let skip = false;
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes("aser+Experts+India+Ajman+UAE/'")) {
            // Skip this and the next few lines if they look like the garbage
            if (lines[i+1] && lines[i+1].trim() === '}') i++;
            if (lines[i+1] && lines[i+1].trim() === '];') i++;
            continue;
        }
        newLines.push(lines[i]);
    }
    fs.writeFileSync(path, newLines.join('\n'), 'utf8');
    console.log('Applied fallback fix to Contact.jsx');
}
