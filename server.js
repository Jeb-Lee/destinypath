import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 5000;

// Enable CORS for all routes
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST']
}));

// Body parsing middleware
app.use(express.json());

// Test endpoint
app.get('/api/test', (req, res) => {
  res.json({ status: 'Server is running' });
});

// Calculation endpoint
app.post('/api/calculate', (req, res) => {
  try {
    console.log('Received data:', req.body);
    // Add your calculation logic here
    const mockResponse = {
      status: 'success',
      person1: {
        name: req.body.person1.name,
        saju: { /* your data */ },
        // ... other fields
      }
    };
    res.json(mockResponse);
  } catch (error) {
    console.error('Calculation error:', error);
    res.status(500).json({ error: 'Calculation failed' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});