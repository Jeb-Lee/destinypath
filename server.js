import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 5000;

// Enhanced CORS configuration
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type']
}));

// Body parsing middleware
app.use(express.json());

// Test endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

// Calculation endpoint with better error handling
app.post('/api/calculate', (req, res) => {
  try {
    console.log('Received data:', req.body);
    
    // Validate required fields
    if (!req.body.person1?.name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    // Mock response structure that matches your frontend expectations
    const response = {
      status: 'success',
      person1: {
        name: req.body.person1.name,
        saju: {
          yearStem: 'Wood',
          yearBranch: 'Rat',
          monthStem: 'Fire',
          monthBranch: 'Horse',
          dayStem: 'Earth',
          dayBranch: 'Dragon',
          hourStem: 'Metal',
          hourBranch: 'Monkey'
        },
        ziWeiDouShu: {
          mainStar: 'Zi Wei',
          palace: 'Life'
        },
        destinyMatrix: {
          strength: 8,
          wisdom: 7,
          charisma: 6
        },
        astrology: {
          sunSign: 'Leo'
        },
        fengShui: {
          kuaNumber: 3,
          bestDirection: 'East'
        },
        advice: "This is a sample advice based on your destiny path"
      }
    };

    if (req.body.analysisType === 'couple' && req.body.person2) {
      response.person2 = {
        /* similar structure for person2 */
      };
      response.compatibility = {
        score: 85,
        details: "Good compatibility in communication"
      };
    }

    res.json(response);
  } catch (error) {
    console.error('Calculation error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});