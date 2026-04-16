const fs = require('fs');
const path = 'src/components/Sidebar.jsx';
let text = fs.readFileSync(path, 'utf8');
text = text.replace(/className=\{sidebar-overlay\s*\}/, "className={`sidebar-overlay ${isOpen ? 'open' : ''}`}");
text = text.replace(/className=\{sidebar\s*\}/, "className={`sidebar ${isOpen ? 'open' : ''}`}");
fs.writeFileSync(path, text);
