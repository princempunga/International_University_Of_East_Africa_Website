const fs = require('fs');
const path = require('path');

function search(dir, keyword) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            if (file !== 'node_modules' && file !== '.next' && file !== '.git') {
                search(fullPath, keyword);
            }
        } else {
            const content = fs.readFileSync(fullPath, 'utf8');
            if (content.toLowerCase().includes(keyword.toLowerCase())) {
                console.log(fullPath);
            }
        }
    }
}

search('.', 'document.body.style');
search('.', 'overflow: hidden');
search('.', 'SplashScreen');
