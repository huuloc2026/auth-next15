import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { body, validationResult } from 'express-validator';

const app = express();
const port = 3000;

app.use(express.json());

const SECRET_KEY = 'your_secret_key';

interface User {
  id: number;
  username: string;
  passwordHash: string;
}

let users: User[] = [];
let nextId = 1;

function authenticateToken(req: any, res: any, next: any) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, SECRET_KEY, (err: any, user: any) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

app.post('/register',
  body('username').isString(),
  body('password').isLength({ min: 5 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;

    const existingUser = users.find(u => u.username === username);
    if (existingUser) {
      return res.status(400).json({ message: 'Username already taken' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user: User = { id: nextId++, username, passwordHash };
    users.push(user);

    res.status(201).json({ message: 'User registered successfully' });
  }
);

app.post('/login',
  body('username').isString(),
  body('password').isString(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;
    const user = users.find(u => u.username === username);

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const match = await bcrypt.compare(password, user.passwordHash);

    if (!match) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
  }
);

app.get('/profile', authenticateToken, (req: any, res) => {
  const user = users.find(u => u.id === req.user.id);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  res.json({ id: user.id, username: user.username });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
