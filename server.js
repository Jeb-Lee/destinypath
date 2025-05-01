import express from 'express';
import cors from 'cors';
import { calculateDetailedAnalysis } from './astrologyEngine.js';

const app = express();
const PORT = 5000;

// Enhanced CORS configuration
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001'],
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json());

// Detailed Analysis Endpoint
app.post('/api/calculate', async (req, res) => {
  try {
    const { person1, person2, analysisType } = req.body;

    if (!person1?.birthdate) {
      return res.status(400).json({ error: 'Birthdate is required' });
    }

    // Deep analysis calculation
    const result = {
      status: 'success',
      analysisType,
      timestamp: new Date().toISOString(),
      person1: await calculateDetailedAnalysis(person1),
      ...(analysisType === 'couple' && person2 && { 
        person2: await calculateDetailedAnalysis(person2),
        compatibility: calculateCompatibility(person1, person2)
      })
    };

    res.json(result);

  } catch (error) {
    console.error('Analysis error:', error);
    res.status(500).json({ 
      error: 'Detailed analysis failed',
      details: error.message 
    });
  }
});

// Helper functions
async function calculateDetailedAnalysis(person) {
  const birthDate = new Date(person.birthdate);
  const birthTime = person.birthTime || '12:00';
  
  return {
    personalAnalysis: {
      // Chinese Astrology
      bazi: calculateBazi(birthDate, birthTime),
      ziWeiDouShu: calculateZiWeiChart(birthDate),
      
      // Western Astrology
      natalChart: calculateNatalChart(birthDate, person.birthplace),
      elementsBalance: calculateElements(birthDate),
      
      // Numerology
      destinyNumber: calculateDestinyNumber(birthDate),
      kuaNumber: calculateKuaNumber(person.gender, birthDate),
      
      // Personality Analysis
      personalityProfile: generatePersonalityProfile(birthDate),
      strengthsWeaknesses: identifyStrengthsWeaknesses(birthDate)
    },
    lifePathAnalysis: {
      currentCycle: calculateCurrentLifeCycle(birthDate),
      challengesOpportunities: identifyChallenges(birthDate),
      yearlyForecast: generateYearlyForecast(birthDate)
    },
    recommendations: {
      careerSuggestions: suggestCareers(birthDate),
      healthAdvice: generateHealthAdvice(birthDate),
      relationshipGuidance: generateRelationshipAdvice(birthDate)
    }
  };
}

function calculateCompatibility(person1, person2) {
  return {
    relationshipAnalysis: {
      compatibilityScore: calculateCompatibilityScore(person1, person2),
      strengths: identifyRelationshipStrengths(person1, person2),
      challenges: identifyRelationshipChallenges(person1, person2),
      synastryAspects: calculateSynastryAspects(person1, person2)
    },
    growthOpportunities: {
      communicationStyle: compareCommunicationStyles(person1, person2),
      emotionalConnection: analyzeEmotionalBond(person1, person2),
      longTermPotential: assessLongTermPotential(person1, person2)
    }
  };
}

app.listen(PORT, () => {
  console.log(`Deep Analysis Server running on port ${PORT}`);
});