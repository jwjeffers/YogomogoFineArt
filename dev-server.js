import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import multer from 'multer';
import { fileURLToPath } from 'url';
import { exec } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

const DATA_FILE = path.join(__dirname, 'public', 'data.json');
const UPLOADS_DIR = path.join(__dirname, 'public', 'uploads');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOADS_DIR),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

if (!fs.existsSync(UPLOADS_DIR)) fs.mkdirSync(UPLOADS_DIR, { recursive: true });

const readData = () => JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
const writeData = (data) => fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');

app.get('/api/data', (req, res) => res.json(readData()));

app.post('/api/data', (req, res) => {
  writeData(req.body);
  res.json({ success: true });
});

app.post('/api/upload', upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  res.json({ url: '/uploads/' + req.file.filename });
});

app.post('/api/publish', (req, res) => {
  exec('git add .', (err1) => {
    if (err1) return res.status(500).json({ success: false, error: "git add failed" });
    
    exec('git commit -m "Auto-publish from dashboard"', (err2, stdout) => {
      // It's okay if commit fails (e.g. nothing to commit)
      exec('git push', (err3, stdout3, stderr3) => {
        if (err3) {
          console.error(err3);
          return res.status(500).json({ success: false, error: "git push failed: " + (stderr3 || err3.message) });
        }
        res.json({ success: true, message: "Published successfully!" });
      });
    });
  });
});

app.listen(3001, () => console.log('Dev server running on http://localhost:3001'));
