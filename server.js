import express from 'express';
import cors from 'cors';
import moment from 'moment-timezone';
import * as lunarCalendar from 'lunar-calendar';

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

    if (!person1?.birthDate) {
      return res.status(400).json({ error: 'Birthdate is required' });
    }

    // Validate birth dates
    if (!isValidDate(person1.birthDate)) {
      return res.status(400).json({ error: 'Invalid birth date for person 1' });
    }

    if (analysisType === 'compatibility' && person2 && !isValidDate(person2.birthDate)) {
      return res.status(400).json({ error: 'Invalid birth date for person 2' });
    }

    // Deep analysis calculation
    const result = {
      status: 'success',
      analysisType,
      timestamp: new Date().toISOString(),
      person1: await calculateDetailedAnalysis(person1),
      ...(analysisType === 'compatibility' && person2 && { 
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
function isValidDate(dateString) {
  return moment(dateString, 'YYYY-MM-DD', true).isValid();
}

async function calculateDetailedAnalysis(person) {
  const birthDate = new Date(person.birthDate);
  const birthTime = person.birthTime || '12:00';
  const birthYear = birthDate.getFullYear();
  
  // Chinese Zodiac calculations
  const chineseZodiac = calculateChineseZodiac(birthDate, person.birthPlace);
  const zodiacElement = calculateZodiacElement(birthYear);
  const yinYang = calculateYinYang(birthYear);
  
  // Western Astrology
  const westernZodiac = calculateWesternZodiac(birthDate, person.birthPlace, birthTime);
  const natalChart = calculateNatalChart(birthDate, birthTime, person.birthPlace);
  
  // Numerology
  const lifePathNumber = calculateLifePathNumber(birthDate);
  
  return {
    personalAnalysis: {
      // Chinese Astrology
      chineseZodiac,
      zodiacElement,
      yinYang,
      bazi: calculateBazi(birthDate, birthTime, person.birthPlace),
      ziWeiStars: calculateZiWeiStars(birthDate, birthTime, person.gender),
      luckPillars: calculateLuckPillars(birthYear, person.gender),
      
      // Western Astrology
      westernZodiac,
      natalChart,
      personalityTraits: getPersonalityTraits(westernZodiac),
      communicationStyle: getCommunicationStyle(westernZodiac),
      emotionalTendencies: getEmotionalTendencies(westernZodiac),
      
      // Numerology
      lifePathNumber,
      lifePathDesc: getNumerologyDescription(lifePathNumber),
    },
    lifePathAnalysis: {
      currentCycle: calculateCurrentLifeCycle(birthDate),
      challengesOpportunities: identifyChallenges(birthDate),
    },
    recommendations: {
      careerSuggestions: suggestCareers(westernZodiac, chineseZodiac),
      healthAdvice: generateHealthAdvice(westernZodiac, chineseZodiac),
    }
  };
}

// Chinese Zodiac calculations
function calculateChineseZodiac(birthDate, birthPlace) {
  const animals = ['Rat', 'Ox', 'Tiger', 'Rabbit', 'Dragon', 'Snake', 'Horse', 'Goat', 'Monkey', 'Rooster', 'Dog', 'Pig'];
  const year = birthDate.getFullYear();
  
  try {
    // Try using lunar calendar library first
    const lunarDate = lunarCalendar.solarToLunar(year, birthDate.getMonth() + 1, birthDate.getDate());
    return animals[(lunarDate.lunarYear - 4) % 12];
  } catch (e) {
    // Fallback to simplified calculation
    const newYearDate = getChineseNewYearDate(year);
    const birthDateTime = new Date(birthDate);
    const timezoneOffset = getTimezoneOffset(birthPlace);
    birthDateTime.setHours(birthDateTime.getHours() + timezoneOffset);
    
    return animals[(birthDateTime < newYearDate ? year - 1 : year - 4) % 12];
  }
}

function getChineseNewYearDate(year) {
  try {
    const lunarDate = lunarCalendar.solarToLunar(year, 2, 1); // Approximate Chinese New Year
    return new Date(`${year}-02-${lunarDate.lunarDay}T00:00:00+08:00`);
  } catch (e) {
    // Default to February 1st if lunar calculation fails
    return new Date(`${year}-02-01T00:00:00+08:00`);
  }
}

function calculateZodiacElement(year) {
  const elements = ['Wood', 'Fire', 'Earth', 'Metal', 'Water'];
  return elements[Math.floor((year - 4) % 10 / 2)];
}

function calculateYinYang(year) {
  return year % 2 === 0 ? 'Yang' : 'Yin';
}

function calculateBazi(birthDate, birthTime, birthPlace) {
  const heavenlyStems = ['Jia', 'Yi', 'Bing', 'Ding', 'Wu', 'Ji', 'Geng', 'Xin', 'Ren', 'Gui'];
  const earthlyBranches = ['Zi', 'Chou', 'Yin', 'Mao', 'Chen', 'Si', 'Wu', 'Wei', 'Shen', 'You', 'Xu', 'Hai'];

  const year = birthDate.getFullYear();
  const month = birthDate.getMonth() + 1;
  const day = birthDate.getDate();
  const hour = birthTime ? parseInt(birthTime.split(':')[0]) : 12;

  // Year Pillar
  const yearStem = heavenlyStems[(year - 4) % 10];
  const yearBranch = earthlyBranches[(year - 4) % 12];

  // Month Pillar (simplified)
  const monthStem = heavenlyStems[((year - 4) * 12 + month - 1) % 10];
  const monthBranch = earthlyBranches[(month + 1) % 12];

  // Day Pillar (simplified)
  const dayNumber = Math.floor((birthDate - new Date(birthDate.getFullYear(), 0, 1)) / (1000 * 60 * 60 * 24)) + 1;
  const dayStem = heavenlyStems[dayNumber % 10];
  const dayBranch = earthlyBranches[dayNumber % 12];

  // Hour Pillar
  const hourIndex = Math.floor((hour + 1) / 2) % 12;
  const hourStem = heavenlyStems[(dayNumber * 12 + hourIndex) % 10];
  const hourBranch = earthlyBranches[hourIndex];

  return {
    yearPillar: `${yearStem} ${yearBranch}`,
    monthPillar: `${monthStem} ${monthBranch}`,
    dayPillar: `${dayStem} ${dayBranch}`,
    hourPillar: `${hourStem} ${hourBranch}`,
  };
}

function calculateZiWeiStars(birthDate, birthHour, gender) {
  const month = birthDate.getMonth() + 1;
  const hour = birthHour ? parseInt(birthHour.split(':')[0]) : 12;

  const monthMainStars = [
    'Purple Star', 'Heavenly Star', 'Sun', 'Wu Qu',
    'Tian Ji', 'Tai Yang', 'Wu Qu', 'Tian Tong',
    'Lian Zhen', 'Tian Liang', 'Zi Wei', 'Tai Yin',
  ];

  const hourDeputyStars = [
    'Wen Chang', 'Wen Qu', 'Left Assistant', 'Right Assistant',
    'Tian Kui', 'Tian Yue', 'Zuo Fu', 'You Bi',
    'Tian Fu', 'Tian Xiang', 'Huo Xing', 'Ling Xing',
  ];

  const mainStar = monthMainStars[(month - 1) % 12];
  const deputyStar = hourDeputyStars[Math.floor(hour / 2) % 12];

  const yearLastDigit = birthDate.getFullYear() % 10;
  const luckyStars = [];
  const unluckyStars = [];

  if (gender === 'male') {
    luckyStars.push(yearLastDigit % 2 === 0 ? 'Lu Cun' : 'Qing Yang');
    unluckyStars.push(yearLastDigit % 2 === 0 ? 'Huo Xing' : 'Ling Xing');
  } else {
    luckyStars.push(yearLastDigit % 2 === 0 ? 'Qing Yang' : 'Lu Cun');
    unluckyStars.push(yearLastDigit % 2 === 0 ? 'Ling Xing' : 'Huo Xing');
  }

  if (birthDate.getDate() % 3 === 0) luckyStars.push('Tian Ma');
  if (birthDate.getDate() % 5 === 0) unluckyStars.push('Da Hao');

  return {
    mainStar,
    deputyStar,
    luckyStars: luckyStars.join(', '),
    unluckyStars: unluckyStars.join(', '),
  };
}

function calculateLuckPillars(birthYear, gender) {
  const currentYear = new Date().getFullYear();
  const age = currentYear - birthYear;
  const startAge = gender === 'male' ? 1 : 0;
  const pillars = [];

  for (let i = startAge; i <= age + 10; i += 10) {
    pillars.push({
      ageRange: `${i}-${i + 9}`,
      element: calculateZodiacElement(birthYear + i),
    });
  }

  return pillars;
}

// Western Astrology calculations
function calculateWesternZodiac(date, birthPlace, birthTime) {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = birthTime ? parseInt(birthTime.split(':')[0]) : 12;
  const minute = birthTime ? parseInt(birthTime.split(':')[1]) : 0;

  const dateObj = new Date(date);
  dateObj.setHours(hour, minute);

  if (birthPlace) {
    const offset = getTimezoneOffset(birthPlace);
    dateObj.setHours(dateObj.getHours() + offset);
  }

  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return 'Aries';
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return 'Taurus';
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return 'Gemini';
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return 'Cancer';
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return 'Leo';
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return 'Virgo';
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return 'Libra';
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return 'Scorpio';
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return 'Sagittarius';
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return 'Capricorn';
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return 'Aquarius';
  return 'Pisces';
}

function calculateNatalChart(birthDate, birthTime, birthPlace) {
  const sunSign = calculateWesternZodiac(birthDate, birthPlace, birthTime);
  // Simplified moon and ascendant calculations
  const moonSign = calculateMoonSign(birthDate);
  const ascendant = calculateAscendant(birthDate, birthPlace);

  return {
    sun: sunSign,
    moon: moonSign,
    ascendant,
  };
}

function calculateMoonSign(date) {
  // Simplified moon sign calculation (should use ephemeris in production)
  const signs = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 
                'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];
  return signs[(date.getDate() + date.getMonth()) % 12];
}

function calculateAscendant(date, birthPlace) {
  // Simplified ascendant calculation (should use exact coordinates in production)
  const signs = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 
                'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];
  const offset = birthPlace ? getTimezoneOffset(birthPlace) : 0;
  return signs[(date.getHours() + offset) % 12];
}

function getPersonalityTraits(zodiacSign) {
  const traits = {
    Aries: {
      strengths: ['Courageous', 'Determined', 'Confident', 'Enthusiastic', 'Optimistic', 'Honest', 'Passionate'],
      challenges: ['Impatient', 'Short-tempered', 'Impulsive', 'Aggressive', 'Self-centered', 'Blunt'],
      description: 'Aries are bold and ambitious, diving headfirst into even the most challenging situations.',
    },
    Taurus: {
      strengths: ['Reliable', 'Patient', 'Practical', 'Devoted', 'Responsible', 'Stable', 'Persistent'],
      challenges: ['Stubborn', 'Possessive', 'Uncompromising', 'Materialistic', 'Resistant to change'],
      description: 'Taurus is a grounded sign that values security and comfort above all else.',
    },
    Gemini: {
      strengths: ['Adaptable', 'Outgoing', 'Intelligent', 'Eloquent', 'Youthful', 'Energetic', 'Witty'],
      challenges: ['Nervous', 'Inconsistent', 'Indecisive', 'Superficial', 'Nosy', 'Manipulative'],
      description: 'Gemini is characterized by curiosity and expressed through lively, intelligent conversation.',
    },
    Cancer: {
      strengths: ['Loyal', 'Emotional', 'Sympathetic', 'Persuasive', 'Intuitive', 'Compassionate', 'Protective'],
      challenges: ['Moody', 'Pessimistic', 'Suspicious', 'Manipulative', 'Insecure', 'Clingy'],
      description: 'Cancer is deeply intuitive and sentimental, making them extremely sympathetic and attached.',
    },
    Leo: {
      strengths: ['Generous', 'Warmhearted', 'Creative', 'Cheerful', 'Humorous', 'Dramatic', 'Confident'],
      challenges: ['Arrogant', 'Stubborn', 'Self-centered', 'Lazy', 'Inflexible', 'Domineering'],
      description: 'Leos are natural leaders who enjoy the spotlight and have big, open hearts.',
    },
    Virgo: {
      strengths: ['Loyal', 'Analytical', 'Kind', 'Hardworking', 'Practical', 'Meticulous', 'Modest'],
      challenges: ['Worrying', 'Critical', 'Overthinking', 'Shy', 'Perfectionist', 'Judgmental'],
      description: 'Virgos are logical, practical, and systematic in their approach to life.',
    },
    Libra: {
      strengths: ['Diplomatic', 'Graceful', 'Idealistic', 'Peaceful', 'Fair', 'Social', 'Cooperative'],
      challenges: ['Indecisive', 'Self-pitying', 'Avoids confrontations', 'Easily influenced', 'Unrealistic'],
      description: 'Libras strive for balance and harmony in all aspects of their lives.',
    },
    Scorpio: {
      strengths: ['Determined', 'Passionate', 'Resourceful', 'Brave', 'Dynamic', 'Intense', 'Loyal'],
      challenges: ['Jealous', 'Secretive', 'Violent', 'Resentful', 'Manipulative', 'Obsessive'],
      description: 'Scorpios are passionate and assertive with determination and focus.',
    },
    Sagittarius: {
      strengths: ['Generous', 'Idealistic', 'Great sense of humor', 'Optimistic', 'Honest', 'Adventurous'],
      challenges: ['Impatient', 'Tactless', 'Restless', 'Irresponsible', 'Overconfident', 'Forgetful'],
      description: 'Sagittarius values freedom and exploration both physically and intellectually.',
    },
    Capricorn: {
      strengths: ['Responsible', 'Disciplined', 'Self-controlled', 'Good managers', 'Patient', 'Ambitious'],
      challenges: ['Know-it-all', 'Unforgiving', 'Condescending', 'Pessimistic', 'Rigid', 'Stubborn'],
      description: 'Capricorns are practical and ambitious, valuing discipline and responsibility.',
    },
    Aquarius: {
      strengths: ['Progressive', 'Original', 'Independent', 'Humanitarian', 'Inventive', 'Friendly'],
      challenges: ['Unemotional', 'Contrary', 'Fixed opinions', 'Aloof', 'Unpredictable', 'Detached'],
      description: 'Aquarius is forward-thinking and innovative, often ahead of their time.',
    },
    Pisces: {
      strengths: ['Compassionate', 'Adaptable', 'Accepting', 'Devoted', 'Imaginative', 'Sensitive'],
      challenges: ['Escapist', 'Overly trusting', 'Sad', 'Fearful', 'Weak-willed', 'Self-pitying'],
      description: 'Pisces are exceptionally receptive and the most compassionate of all zodiac signs.',
    }
  };
  return traits[zodiacSign] || { strengths: [], challenges: [], description: '' };
}

function getCommunicationStyle(zodiacSign) {
  const elementMap = {
    fire: ['Aries', 'Leo', 'Sagittarius'],
    earth: ['Taurus', 'Virgo', 'Capricorn'],
    air: ['Gemini', 'Libra', 'Aquarius'],
    water: ['Cancer', 'Scorpio', 'Pisces'],
  };

  for (const [element, signs] of Object.entries(elementMap)) {
    if (signs.includes(zodiacSign)) {
      switch (element) {
        case 'fire':
          return {
            style: 'Direct and enthusiastic communicator who speaks from the heart',
            tips: [
              'Be direct but mindful of others\' feelings',
              'Channel your passion into constructive discussions',
              'Practice active listening to balance your natural expressiveness',
            ],
          };
        case 'earth':
          return {
            style: 'Practical and grounded communicator who values facts',
            tips: [
              'Provide concrete examples to support your points',
              'Be patient with more abstract thinkers',
              'Remember to express emotions along with facts',
            ],
          };
        case 'air':
          return {
            style: 'Intellectual and social communicator who enjoys debate',
            tips: [
              'Ensure your conversations have depth as well as breadth',
              'Be mindful of others who may need more time to process',
              'Balance intellectual discussions with emotional connection',
            ],
          };
        case 'water':
          return {
            style: 'Intuitive and emotional communicator who reads between the lines',
            tips: [
              'Trust your intuition but verify assumptions',
              'Express your needs clearly to avoid misunderstandings',
              'Protect your sensitive nature in challenging conversations',
            ],
          };
        default:
          return {
            style: 'Adaptable communicator who adjusts to the situation',
            tips: [],
          };
      }
    }
  }
  return {
    style: 'Adaptable communicator who adjusts to the situation',
    tips: [],
  };
}

function getEmotionalTendencies(zodiacSign) {
  const emotionalMap = {
    Aries: {
      description: 'Passionate and quick to react emotionally',
      management: [
        'Practice pausing before reacting to emotional triggers',
        'Channel fiery energy into physical activity',
        'Learn to express anger constructively',
      ],
    },
    Taurus: {
      description: 'Steady emotions but deeply affected by security',
      management: [
        'Create stable routines for emotional grounding',
        'Express feelings through creative or physical outlets',
        'Be open to change to avoid stubborn emotional patterns',
      ],
    },
    Gemini: {
      description: 'Intellectual approach to emotions, can seem detached',
      management: [
        'Practice connecting feelings with thoughts',
        'Journaling can help process emotions',
        'Share feelings verbally to deepen connections',
      ],
    },
    Cancer: {
      description: 'Deeply emotional and sensitive to environment',
      management: [
        'Create safe emotional spaces for self-expression',
        'Practice healthy boundaries to avoid emotional overwhelm',
        'Use nurturing activities to self-soothe',
      ],
    },
    Leo: {
      description: 'Dramatic expressions of emotion, wears heart on sleeve',
      management: [
        'Channel dramatic energy into creative pursuits',
        'Practice humility to balance emotional expression',
        'Recognize others\' emotional needs',
      ],
    },
    Virgo: {
      description: 'Analytical about emotions, can be critical',
      management: [
        'Balance analysis with acceptance of feelings',
        'Practice self-compassion to reduce self-criticism',
        'Express care through practical support',
      ],
    },
    Libra: {
      description: 'Seeks emotional harmony, avoids conflict',
      management: [
        'Practice assertiveness in expressing needs',
        'Recognize that some conflict is healthy',
        'Balance others\' emotions with your own needs',
      ],
    },
    Scorpio: {
      description: 'Intense emotions, keeps true feelings hidden',
      management: [
        'Practice vulnerability with trusted individuals',
        'Channel intensity into transformative activities',
        'Release control to experience emotional freedom',
      ],
    },
    Sagittarius: {
      description: 'Optimistic emotions, avoids heavy emotional scenes',
      management: [
        'Balance optimism with realistic emotional processing',
        'Practice staying present with difficult emotions',
        'Share philosophical perspectives to process feelings',
      ],
    },
    Capricorn: {
      description: 'Controls emotions, appears reserved',
      management: [
        'Create safe spaces for emotional expression',
        'Recognize that vulnerability is not weakness',
        'Balance responsibility with self-care',
      ],
    },
    Aquarius: {
      description: 'Detached approach to emotions, values freedom',
      management: [
        'Connect emotions with humanitarian causes',
        'Practice grounding techniques to connect with feelings',
        'Balance independence with emotional connection',
      ],
    },
    Pisces: {
      description: 'Absorbs others emotions, highly empathetic',
      management: [
        'Practice energetic protection techniques',
        'Create clear emotional boundaries',
        'Channel empathy into creative or healing work',
      ],
    },
  };
  return emotionalMap[zodiacSign] || {
    description: 'Emotional responses vary based on situation',
    management: [],
  };
}

// Numerology calculations
function calculateLifePathNumber(birthDate) {
  const day = birthDate.getDate();
  const month = birthDate.getMonth() + 1;
  const year = birthDate.getFullYear();

  const reduceNumber = (num) => {
    if (num === 11 || num === 22) return num; // Master numbers
    while (num > 9) {
      num = num.toString().split('').reduce((sum, digit) => sum + parseInt(digit), 0);
    }
    return num;
  };

  const dayNum = reduceNumber(day);
  const monthNum = reduceNumber(month);
  const yearNum = reduceNumber(year);

  return reduceNumber(dayNum + monthNum + yearNum);
}

function getNumerologyDescription(lifePathNumber) {
  const descriptions = {
    1: 'Independent and individualistic. Natural born leader with strong drive.',
    2: 'Cooperative and diplomatic. Natural mediator with intuitive nature.',
    3: 'Creative and expressive. Natural entertainer with optimistic outlook.',
    4: 'Practical and methodical. Natural organizer with strong work ethic.',
    5: 'Adventurous and freedom-loving. Natural explorer with versatile skills.',
    6: 'Responsible and nurturing. Natural caretaker with harmonious approach.',
    7: 'Analytical and introspective. Natural philosopher with spiritual depth.',
    8: 'Ambitious and authoritative. Natural manager with material focus.',
    9: 'Compassionate and selfless. Humanitarian with universal perspective.',
    11: 'Intuitive and inspirational. Spiritual messenger with heightened awareness.',
    22: 'Practical visionary. Master builder with tremendous potential.',
    33: 'Compassionate teacher. Nurturing mentor with selfless service.',
  };
  return descriptions[lifePathNumber] || 'Unknown life path number';
}

// Life Path Analysis
function calculateCurrentLifeCycle(birthDate) {
  const now = new Date();
  const age = now.getFullYear() - birthDate.getFullYear();
  
  // Simplified life cycle calculation
  if (age < 28) return 'First Cycle (0-27): Foundation Building';
  if (age < 56) return 'Second Cycle (28-55): Productivity';
  return 'Third Cycle (56+): Reflection and Legacy';
}

function identifyChallenges(birthDate) {
  const lifePathNumber = calculateLifePathNumber(birthDate);
  
  const challenges = {
    1: 'Learning to cooperate and consider others',
    2: 'Developing confidence and independence',
    3: 'Focusing energy and avoiding superficiality',
    4: 'Being flexible and embracing change',
    5: 'Developing discipline and commitment',
    6: 'Setting boundaries and avoiding martyrdom',
    7: 'Connecting with others and avoiding isolation',
    8: 'Balancing material and spiritual values',
    9: 'Avoiding burnout from over-giving',
    11: 'Managing sensitivity and nervous energy',
    22: 'Avoiding overwhelm from big visions',
    33: 'Balancing personal needs with service',
  };
  
  return challenges[lifePathNumber] || 'Personal growth through life experiences';
}

// Recommendations
function suggestCareers(westernZodiac, chineseZodiac) {
  const westernCareers = {
    Aries: ['Entrepreneur', 'Athlete', 'Pioneer', 'Military'],
    Taurus: ['Banker', 'Artist', 'Chef', 'Real Estate'],
    Gemini: ['Writer', 'Teacher', 'Journalist', 'Sales'],
    Cancer: ['Nurse', 'Social Worker', 'Historian', 'Interior Designer'],
    Leo: ['Actor', 'Politician', 'CEO', 'Event Planner'],
    Virgo: ['Accountant', 'Researcher', 'Editor', 'Health Practitioner'],
    Libra: ['Lawyer', 'Diplomat', 'Counselor', 'Fashion Designer'],
    Scorpio: ['Detective', 'Psychologist', 'Surgeon', 'Researcher'],
    Sagittarius: ['Travel Guide', 'Professor', 'Philosopher', 'Explorer'],
    Capricorn: ['Manager', 'Engineer', 'Architect', 'Financial Advisor'],
    Aquarius: ['Scientist', 'Inventor', 'Astronomer', 'Humanitarian'],
    Pisces: ['Artist', 'Musician', 'Healer', 'Spiritual Counselor'],
  };
  
  const chineseCareers = {
    Rat: ['Business', 'Finance', 'Politics', 'Public Relations'],
    Ox: ['Agriculture', 'Construction', 'Engineering', 'Banking'],
    Tiger: ['Military', 'Police', 'Athlete', 'Adventure Guide'],
    Rabbit: ['Diplomat', 'Artist', 'Designer', 'Counselor'],
    Dragon: ['CEO', 'Inventor', 'Performer', 'Public Speaker'],
    Snake: ['Scientist', 'Detective', 'Researcher', 'Philosopher'],
    Horse: ['Explorer', 'Journalist', 'Sales', 'Athlete'],
    Goat: ['Artist', 'Musician', 'Chef', 'Florist'],
    Monkey: ['Entertainer', 'Writer', 'Inventor', 'Engineer'],
    Rooster: ['Public Relations', 'Performer', 'Journalist', 'Critic'],
    Dog: ['Police', 'Social Worker', 'Teacher', 'Counselor'],
    Pig: ['Chef', 'Artist', 'Philanthropist', 'Entertainer'],
  };
  
  return [
    ...(westernCareers[westernZodiac] || []),
    ...(chineseCareers[chineseZodiac] || [])
  ].slice(0, 5);
}

function generateHealthAdvice(westernZodiac, chineseZodiac) {
  const westernAdvice = {
    Aries: 'Watch for stress-related issues, especially headaches and tension',
    Taurus: 'Focus on throat and neck health, maintain regular exercise',
    Gemini: 'Pay attention to nervous system and lung health',
    Cancer: 'Focus on digestive health and emotional well-being',
    Leo: 'Watch for heart and circulatory system health',
    Virgo: 'Pay attention to digestive system and nervous tension',
    Libra: 'Focus on kidney health and maintaining balance',
    Scorpio: 'Watch for reproductive system and elimination system health',
    Sagittarius: 'Pay attention to liver and hip health',
    Capricorn: 'Focus on bones, joints, and skin health',
    Aquarius: 'Watch for circulatory system and nervous system health',
    Pisces: 'Pay attention to feet and lymphatic system health',
  };
  
  const chineseAdvice = {
    Rat: 'Pay attention to nervous system and stress levels',
    Ox: 'Focus on digestive health and maintain regular routines',
    Tiger: 'Watch for liver health and emotional balance',
    Rabbit: 'Pay attention to immune system and emotional well-being',
    Dragon: 'Focus on heart health and stress management',
    Snake: 'Watch for reproductive system and emotional balance',
    Horse: 'Pay attention to circulatory system and stress levels',
    Goat: 'Focus on digestive system and emotional health',
    Monkey: 'Watch for nervous system and respiratory health',
    Rooster: 'Pay attention to lung health and emotional balance',
    Dog: 'Focus on skeletal system and stress management',
    Pig: 'Watch for lymphatic system and emotional well-being',
  };
  
  return [
    westernAdvice[westernZodiac],
    chineseAdvice[chineseZodiac]
  ].filter(Boolean).join(' ');
}

// Compatibility calculations
function calculateCompatibility(person1, person2) {
  const birthDate1 = new Date(person1.birthDate);
  const birthDate2 = new Date(person2.birthDate);

  const westernZodiac1 = calculateWesternZodiac(birthDate1, person1.birthPlace, person1.birthTime);
  const westernZodiac2 = calculateWesternZodiac(birthDate2, person2.birthPlace, person2.birthTime);

  const chineseZodiac1 = calculateChineseZodiac(birthDate1, person1.birthPlace);
  const chineseZodiac2 = calculateChineseZodiac(birthDate2, person2.birthPlace);

  const zodiacCompatibility = calculateZodiacCompatibility(westernZodiac1, westernZodiac2);
  const chineseCompatibility = calculateChineseZodiacCompatibility(chineseZodiac1, chineseZodiac2);

  const lifePathNumber1 = calculateLifePathNumber(birthDate1);
  const lifePathNumber2 = calculateLifePathNumber(birthDate2);

  const numerologyCompatibility = Math.abs(lifePathNumber1 - lifePathNumber2) <= 2 ?
    { score: 85, description: 'Strong numerological harmony' } :
    { score: 60, description: 'Average numerological connection' };

  const overallScore = Math.round((zodiacCompatibility.score + chineseCompatibility.score + numerologyCompatibility.score) / 3);

  return {
    western: zodiacCompatibility,
    chinese: chineseCompatibility,
    numerology: numerologyCompatibility,
    overall: {
      score: overallScore,
      description: overallScore >= 80 ? 'Exceptional match with strong harmony' :
        overallScore >= 70 ? 'Very good match with natural connection' :
        overallScore >= 60 ? 'Good match with some complementary aspects' :
        overallScore >= 50 ? 'Average match requiring understanding' :
        'Challenging match requiring significant effort',
    },
  };
}

function calculateZodiacCompatibility(sign1, sign2) {
  const elements = {
    fire: ['Aries', 'Leo', 'Sagittarius'],
    earth: ['Taurus', 'Virgo', 'Capricorn'],
    air: ['Gemini', 'Libra', 'Aquarius'],
    water: ['Cancer', 'Scorpio', 'Pisces'],
  };

  let element1 = '';
  let element2 = '';

  for (const [element, signs] of Object.entries(elements)) {
    if (signs.includes(sign1)) element1 = element;
    if (signs.includes(sign2)) element2 = element;
  }

  let score = 50;

  if (element1 === element2) score += 20;

  if (
    (element1 === 'fire' && element2 === 'air') ||
    (element1 === 'air' && element2 === 'fire') ||
    (element1 === 'earth' && element2 === 'water') ||
    (element1 === 'water' && element2 === 'earth')
  ) {
    score += 25;
  }

  if (
    (element1 === 'fire' && element2 === 'water') ||
    (element1 === 'water' && element2 === 'fire') ||
    (element1 === 'earth' && element2 === 'air') ||
    (element1 === 'air' && element2 === 'earth')
  ) {
    score += 10;
  }

  const specialCombos = {
    'Aries-Leo': 15,
    'Leo-Sagittarius': 15,
    'Aries-Sagittarius': 15,
    'Taurus-Virgo': 15,
    'Virgo-Capricorn': 15,
    'Taurus-Capricorn': 15,
    'Gemini-Libra': 15,
    'Libra-Aquarius': 15,
    'Gemini-Aquarius': 15,
    'Cancer-Scorpio': 15,
    'Scorpio-Pisces': 15,
    'Cancer-Pisces': 15,
    'Aries-Libra': 10,
    'Taurus-Scorpio': 10,
    'Gemini-Sagittarius': 10,
    'Cancer-Capricorn': 10,
    'Leo-Aquarius': 10,
    'Virgo-Pisces': 10,
  };

  const combo1 = `${sign1}-${sign2}`;
  const combo2 = `${sign2}-${sign1}`;

  if (specialCombos[combo1]) score += specialCombos[combo1];
  if (specialCombos[combo2]) score += specialCombos[combo2];

  if (score > 100) score = 100;

  let description = '';
  if (score >= 90) {
    description = 'Exceptional compatibility! This connection has natural harmony and understanding.';
  } else if (score >= 75) {
    description = 'Strong compatibility. You complement each other well with minimal effort.';
  } else if (score >= 60) {
    description = 'Good compatibility. With communication, this can be a fulfilling relationship.';
  } else if (score >= 40) {
    description = 'Average compatibility. You\'ll need to work on understanding each other\'s differences.';
  } else {
    description = 'Challenging compatibility. This relationship may require significant compromise.';
  }

  return {
    score,
    description,
    element1,
    element2,
  };
}

function calculateChineseZodiacCompatibility(animal1, animal2) {
  const compatibilityMatrix = {
    'Rat': { 'Dragon': 90, 'Monkey': 85, 'Ox': 40, 'Horse': 