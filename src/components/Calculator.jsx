import React, { useState, useReducer } from 'react';
import moment from 'moment-timezone';

// State management with useReducer
const initialPersonState = {
  name: '',
  birthDate: '',
  birthTime: '12:00',
  birthPlace: '',
  birthTimezone: 'UTC',
  gender: 'female',
};

const personReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_FIELD':
      return { ...state, [action.field]: action.value };
    case 'RESET':
      return initialPersonState;
    default:
      return state;
  }
};

// Reusable styled components
const FormContainer = ({ children }) => (
  <div className="p-6 bg-white rounded-lg shadow-lg mb-8">{children}</div>
);

const SectionTitle = ({ children }) => (
  <h2 className="text-xl font-semibold mb-4">{children}</h2>
);

// Helper components
const InputField = ({ label, type = 'text', value, onChange, helpText = null }) => (
  <div className="mb-4">
    <label className="block mb-1 text-sm font-medium text-gray-700" htmlFor={label}>
      {label}
    </label>
    <input
      id={label}
      type={type}
      className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
      value={value}
      onChange={onChange}
      required
      aria-describedby={helpText ? `${label}-help` : undefined}
    />
    {helpText && (
      <p id={`${label}-help`} className="mt-1 text-xs text-gray-500">
        {helpText}
      </p>
    )}
  </div>
);

const SelectField = ({ label, value, onChange, options, helpText = null }) => (
  <div className="mb-4">
    <label className="block mb-1 text-sm font-medium text-gray-700" htmlFor={label}>
      {label}
    </label>
    <select
      id={label}
      className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
      value={value}
      onChange={onChange}
      required
      aria-describedby={helpText ? `${label}-help` : undefined}
    >
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
    {helpText && (
      <p id={`${label}-help`} className="mt-1 text-xs text-gray-500">
        {helpText}
      </p>
    )}
  </div>
);

const Calculator = () => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [analysisType, setAnalysisType] = useState('single');
  const [person1, dispatchPerson1] = useReducer(personReducer, initialPersonState);
  const [person2, dispatchPerson2] = useReducer(personReducer, { ...initialPersonState, gender: 'male' });

  // Validate date input
  const isValidDate = (dateString) => {
    return moment(dateString, 'YYYY-MM-DD', true).isValid();
  };

  // Calculate timezone offset in hours for a given place (simplified)
  const getTimezoneOffset = (place) => {
    if (!place) return 0;
    if (place.toLowerCase().includes('new york')) return -5;
    if (place.toLowerCase().includes('london')) return 0;
    if (place.toLowerCase().includes('tokyo')) return 9;
    return 0; // Default to UTC
  };

  // Lookup table for Chinese New Year dates (simplified, covers 1990-2000 for example)
  const chineseNewYearDates = {
    1990: '1990-01-27',
    1991: '1991-02-15',
    1992: '1992-02-04',
    1993: '1993-01-23',
    1994: '1994-02-10',
    1995: '1995-01-31',
    1996: '1996-02-19',
    1997: '1997-02-07',
    1998: '1998-01-28',
    1999: '1999-02-16',
    2000: '2000-02-05',
  };

  // Get Chinese New Year date for a given year
  const getChineseNewYearDate = (year) => {
    const dateString = chineseNewYearDates[year] || `${year}-02-01`; // Fallback to Feb 1 if year not in table
    return new Date(dateString);
  };

  // Calculate Chinese Zodiac Animal with precise lunar calendar consideration
  const calculateZodiac = (dateString, birthPlace) => {
    const animals = ['Rat', 'Ox', 'Tiger', 'Rabbit', 'Dragon', 'Snake', 'Horse', 'Goat', 'Monkey', 'Rooster', 'Dog', 'Pig'];
    if (!dateString || !isValidDate(dateString)) throw new Error('Invalid birth date provided');

    const birthDate = new Date(dateString);
    const year = birthDate.getFullYear();
    const newYearDate = getChineseNewYearDate(year);

    const birthDateTime = new Date(dateString);
    const timezoneOffset = getTimezoneOffset(birthPlace);
    birthDateTime.setHours(birthDateTime.getHours() + timezoneOffset);

    // If birth date is before Chinese New Year, use previous year's zodiac
    const zodiacYear = birthDateTime < newYearDate ? year - 1 : year;
    return animals[(zodiacYear - 4) % 12];
  };

  // Alternative method for validation (simplified, aligns with primary method)
  const calculateZodiacWithLibrary = (dateString) => {
    if (!dateString || !isValidDate(dateString)) throw new Error('Invalid birth date provided');
    const date = new Date(dateString);
    const year = date.getFullYear();
    const newYearDate = getChineseNewYearDate(year);
    const zodiacYear = date < newYearDate ? year - 1 : year;
    const animals = ['Rat', 'Ox', 'Tiger', 'Rabbit', 'Dragon', 'Snake', 'Horse', 'Goat', 'Monkey', 'Rooster', 'Dog', 'Pig'];
    return animals[(zodiacYear - 4) % 12];
  };

  // Calculate Western Zodiac Sign with precise degree calculation
  const calculateWesternZodiac = (date, birthPlace, birthTime) => {
    if (!(date instanceof Date) || isNaN(date)) throw new Error('Invalid date object');
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
  };

  // Simplified Moon Sign calculation (approximation)
  const calculateMoonSign = (date, birthPlace) => {
    if (!(date instanceof Date) || isNaN(date)) throw new Error('Invalid date object');
    const dayOfYear = Math.floor((date - new Date(date.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
    const moonCycle = 29.53; // Synodic month in days
    const approximateSignIndex = Math.floor((dayOfYear % moonCycle) / 2.5) % 12;
    const signs = [
      'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
      'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
    ];
    return signs[approximateSignIndex];
  };

  // Simplified Ascendant calculation (approximation)
  const calculateAscendant = (date, birthPlace) => {
    if (!(date instanceof Date) || isNaN(date)) throw new Error('Invalid date object');
    const hour = date.getHours();
    const approximateSignIndex = Math.floor(hour / 2) % 12; // Roughly 2 hours per sign
    const signs = [
      'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
      'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
    ];
    return signs[approximateSignIndex];
  };

  // Calculate Chinese Zodiac Element
  const calculateZodiacElement = (year) => {
    const elements = ['Wood', 'Fire', 'Earth', 'Metal', 'Water'];
    return elements[Math.floor((year - 4) % 10 / 2)];
  };

  // Calculate Chinese Zodiac Yin/Yang
  const calculateYinYang = (year) => {
    return year % 2 === 0 ? 'Yang' : 'Yin';
  };

  // Calculate Chinese Zodiac Luck Pillars
  const calculateLuckPillars = (birthYear, gender) => {
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
  };

  // Calculate Bazi (Four Pillars of Destiny)
  const calculateBazi = (birthDate, birthTime, birthPlace) => {
    if (!isValidDate(birthDate)) throw new Error('Invalid birth date');
    const date = new Date(birthDate);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = birthTime ? parseInt(birthTime.split(':')[0]) : 12;

    const heavenlyStems = ['Jia', 'Yi', 'Bing', 'Ding', 'Wu', 'Ji', 'Geng', 'Xin', 'Ren', 'Gui'];
    const earthlyBranches = ['Zi', 'Chou', 'Yin', 'Mao', 'Chen', 'Si', 'Wu', 'Wei', 'Shen', 'You', 'Xu', 'Hai'];

    const yearStem = heavenlyStems[(year - 4) % 10];
    const yearBranch = earthlyBranches[(year - 4) % 12];
    const monthStem = heavenlyStems[((year - 4) * 12 + month - 1) % 10];
    const monthBranch = earthlyBranches[(month + 1) % 12];
    const dayNumber = Math.floor((date - new Date(date.getFullYear(), 0, 1)) / (1000 * 60 * 60 * 24)) + 1;
    const dayStem = heavenlyStems[dayNumber % 10];
    const dayBranch = earthlyBranches[dayNumber % 12];
    const hourIndex = Math.floor((hour + 1) / 2) % 12;
    const hourStem = heavenlyStems[(dayNumber * 12 + hourIndex) % 10];
    const hourBranch = earthlyBranches[hourIndex];

    return {
      yearPillar: `${yearStem} ${yearBranch}`,
      monthPillar: `${monthStem} ${monthBranch}`,
      dayPillar: `${dayStem} ${dayBranch}`,
      hourPillar: `${hourStem} ${hourBranch}`,
    };
  };

  // Calculate Zi Wei Dou Shu components
  const calculateZiWeiStars = (birthDate, birthHour, gender) => {
    if (!(birthDate instanceof Date) || isNaN(birthDate)) throw new Error('Invalid birth date');
    const month = birthDate.getMonth() + 1;
    const day = birthDate.getDate();

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

    const mainStarIndex = (month - 1) % 12;
    const mainStar = monthMainStars[mainStarIndex];

    const deputyStarIndex = Math.floor(birthHour / 2) % 12;
    const deputyStar = hourDeputyStars[deputyStarIndex];

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

    if (day % 3 === 0) luckyStars.push('Tian Ma');
    if (day % 5 === 0) unluckyStars.push('Da Hao');

    return {
      mainStar,
      deputyStar,
      luckyStars: luckyStars.join(', '),
      unluckyStars: unluckyStars.join(', '),
    };
  };

  const calculateLifePalace = (month, day) => {
    const palaces = [
      'Wealth Palace', 'Brothers Palace', 'Life Palace',
      'Parents Palace', 'Career Palace', 'Property Palace',
      'Spouse Palace', 'Children Palace', 'Health Palace',
      'Travel Palace', 'Friends Palace', 'Spirit Palace',
    ];

    const index = (month + day - 2) % 12;
    return palaces[index];
  };

  const calculateBodyPalace = (lifePalace) => {
    const palaceMapping = {
      'Wealth Palace': 'Physical Body',
      'Brothers Palace': 'Emotional Body',
      'Life Palace': 'Spiritual Body',
      'Parents Palace': 'Ancestral Body',
      'Career Palace': 'Professional Body',
      'Property Palace': 'Material Body',
      'Spouse Palace': 'Relational Body',
      'Children Palace': 'Creative Body',
      'Health Palace': 'Vital Body',
      'Travel Palace': 'Mobile Body',
      'Friends Palace': 'Social Body',
      'Spirit Palace': 'Psychic Body',
    };

    return palaceMapping[lifePalace] || 'Physical Body';
  };

  // Calculate Natal Chart (Western Astrology)
  const calculateNatalChart = (birthDate, birthTime, birthPlace) => {
    if (!isValidDate(birthDate)) throw new Error('Invalid birth date');
    const date = new Date(birthDate);
    const time = birthTime || '12:00';
    const [hours, minutes] = time.split(':').map(Number);
    date.setHours(hours, minutes);

    const sunSign = calculateWesternZodiac(date, birthPlace, birthTime);
    const moonSign = calculateMoonSign(date, birthPlace);
    const ascendant = calculateAscendant(date, birthPlace);

    return {
      sun: sunSign,
      moon: moonSign,
      ascendant,
    };
  };

  // Generate personality traits based on zodiac
  const getPersonalityTraits = (zodiacSign) => {
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
      },
    };
    return traits[zodiacSign] || { strengths: [], challenges: [], description: '' };
  };

  // Generate communication style based on zodiac elements
  const getCommunicationStyle = (zodiacSign) => {
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
  };

  // Generate emotional tendencies based on zodiac
  const getEmotionalTendencies = (zodiacSign) => {
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
  };

  // Calculate Life Path Number (Numerology)
  const calculateLifePathNumber = (birthDate) => {
    if (!isValidDate(birthDate)) throw new Error('Invalid birth date');
    const date = new Date(birthDate);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

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
  };

  // Get numerology description
  const getNumerologyDescription = (lifePathNumber) => {
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
  };

  // Calculate compatibility between two zodiac signs
  const calculateZodiacCompatibility = (sign1, sign2) => {
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
  };

  // Calculate Chinese zodiac compatibility
  const calculateChineseZodiacCompatibility = (animal1, animal2) => {
    const compatibilityMatrix = {
      'Rat': { 'Dragon': 90, 'Monkey': 85, 'Ox': 40, 'Horse': 30, 'Goat': 50 },
      'Ox': { 'Snake': 90, 'Rooster': 85, 'Rat': 40, 'Goat': 30, 'Dragon': 50 },
      'Tiger': { 'Horse': 90, 'Dog': 85, 'Monkey': 40, 'Snake': 30, 'Pig': 50 },
      'Rabbit': { 'Goat': 90, 'Pig': 85, 'Rooster': 40, 'Dragon': 30, 'Dog': 50 },
      'Dragon': { 'Rat': 90, 'Monkey': 85, 'Dog': 40, 'Rabbit': 30, 'Dragon': 50 },
      'Snake': { 'Ox': 90, 'Rooster': 85, 'Tiger': 40, 'Pig': 30, 'Snake': 50 },
      'Horse': { 'Tiger': 90, 'Dog': 85, 'Rat': 40, 'Ox': 30, 'Horse': 50 },
      'Goat': { 'Rabbit': 90, 'Pig': 85, 'Ox': 40, 'Dog': 30, 'Goat': 50 },
      'Monkey': { 'Dragon': 90, 'Rat': 85, 'Tiger': 40, 'Pig': 30, 'Monkey': 50 },
      'Rooster': { 'Snake': 90, 'Ox': 85, 'Rabbit': 40, 'Dog': 30, 'Rooster': 50 },
      'Dog': { 'Tiger': 90, 'Horse': 85, 'Dragon': 40, 'Rooster': 30, 'Dog': 50 },
      'Pig': { 'Rabbit': 90, 'Goat': 85, 'Snake': 40, 'Monkey': 30, 'Pig': 50 },
    };

    let score = 60;

    if (compatibilityMatrix[animal1] && compatibilityMatrix[animal1][animal2]) {
      score = compatibilityMatrix[animal1][animal2];
    } else if (compatibilityMatrix[animal2] && compatibilityMatrix[animal2][animal1]) {
      score = compatibilityMatrix[animal2][animal1];
    }

    if (animal1 === animal2) score = 70;

    let description = '';
    if (score >= 85) {
      description = 'Highly compatible! These animals naturally bring out the best in each other.';
    } else if (score >= 70) {
      description = 'Good match with natural understanding.';
    } else if (score >= 50) {
      description = 'Average compatibility that requires some compromise.';
    } else {
      description = 'Challenging compatibility that requires significant adaptation.';
    }

    return {
      score,
      description,
    };
  };

  // Submit handler for analysis
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (analysisType === 'single') {
        if (!person1.name || !isValidDate(person1.birthDate)) {
          throw new Error('Please provide a valid name and birth date');
        }
      } else {
        if (!person1.name || !isValidDate(person1.birthDate) || !person2.name || !isValidDate(person2.birthDate)) {
          throw new Error('Please provide valid names and birth dates for both people');
        }
      }

      if (analysisType === 'single') {
        const birthDate = new Date(person1.birthDate);
        const birthYear = birthDate.getFullYear();
        const birthHour = person1.birthTime ? parseInt(person1.birthTime.split(':')[0]) : 12;

        const westernZodiac = calculateWesternZodiac(birthDate, person1.birthPlace, person1.birthTime);
        const chineseZodiac = calculateZodiac(person1.birthDate, person1.birthPlace);
        const element = calculateZodiacElement(birthYear);
        const yinYang = calculateYinYang(birthYear);
        const lifePathNumber = calculateLifePathNumber(person1.birthDate);
        const natalChart = calculateNatalChart(person1.birthDate, person1.birthTime, person1.birthPlace);
        const bazi = calculateBazi(person1.birthDate, person1.birthTime, person1.birthPlace);
        const personalityTraits = getPersonalityTraits(westernZodiac);
        const communicationStyle = getCommunicationStyle(westernZodiac);
        const emotionalTendencies = getEmotionalTendencies(westernZodiac);
        const ziWeiStars = calculateZiWeiStars(birthDate, birthHour, person1.gender);
        const lifePathDesc = getNumerologyDescription(lifePathNumber);
        const luckPillars = calculateLuckPillars(birthYear, person1.gender);
        const lifePalace = calculateLifePalace(birthDate.getMonth() + 1, birthDate.getDate());
        const bodyPalace = calculateBodyPalace(lifePalace);

        setResult({
          type: 'single',
          person: person1.name,
          westernZodiac,
          chineseZodiac,
          element,
          yinYang,
          lifePathNumber,
          lifePathDesc,
          natalChart,
          bazi,
          personalityTraits,
          communicationStyle,
          emotionalTendencies,
          ziWeiStars,
          luckPillars,
          lifePalace,
          bodyPalace,
        });
      } else {
        const birthDate1 = new Date(person1.birthDate);
        const birthDate2 = new Date(person2.birthDate);

        const westernZodiac1 = calculateWesternZodiac(birthDate1, person1.birthPlace, person1.birthTime);
        const westernZodiac2 = calculateWesternZodiac(birthDate2, person2.birthPlace, person2.birthTime);

        const chineseZodiac1 = calculateZodiac(person1.birthDate, person1.birthPlace);
        const chineseZodiac2 = calculateZodiac(person2.birthDate, person2.birthPlace);

        const zodiacCompatibility = calculateZodiacCompatibility(westernZodiac1, westernZodiac2);
        const chineseCompatibility = calculateChineseZodiacCompatibility(chineseZodiac1, chineseZodiac2);

        const lifePathNumber1 = calculateLifePathNumber(person1.birthDate);
        const lifePathNumber2 = calculateLifePathNumber(person2.birthDate);

        const numerologyCompatibility = Math.abs(lifePathNumber1 - lifePathNumber2) <= 2 ?
          { score: 85, description: 'Strong numerological harmony' } :
          { score: 60, description: 'Average numerological connection' };

        const overallScore = Math.round((zodiacCompatibility.score + chineseCompatibility.score + numerologyCompatibility.score) / 3);

        setResult({
          type: 'compatibility',
          person1: {
            name: person1.name,
            westernZodiac: westernZodiac1,
            chineseZodiac: chineseZodiac1,
            lifePathNumber: lifePathNumber1,
          },
          person2: {
            name: person2.name,
            westernZodiac: westernZodiac2,
            chineseZodiac: chineseZodiac2,
            lifePathNumber: lifePathNumber2,
          },
          compatibility: {
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
          },
        });
      }
    } catch (err) {
      setError(err.message || 'An error occurred during analysis');
    } finally {
      setLoading(false);
    }
  };

  // Reset form
  const handleReset = () => {
    dispatchPerson1({ type: 'RESET' });
    dispatchPerson2({ type: 'RESET' });
    setResult(null);
    setError(null);
  };

  // Timezone options for SelectField
  const timezoneOptions = [
    { value: 'UTC', label: 'UTC' },
    { value: 'America/New_York', label: 'America/New_York' },
    { value: 'Europe/London', label: 'Europe/London' },
    { value: 'Asia/Tokyo', label: 'Asia/Tokyo' },
    { value: 'Australia/Sydney', label: 'Australia/Sydney' },
  ];

  // Analysis type options for dropdown
  const analysisTypeOptions = [
    { value: 'single', label: 'Individual Analysis' },
    { value: 'compatibility', label: 'Compatibility Analysis' },
  ];

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">DestinyPath</h1>

      <FormContainer>
        <SelectField
          label="Analysis Type"
          value={analysisType}
          onChange={(e) => setAnalysisType(e.target.value)}
          options={analysisTypeOptions}
        />

        {analysisType === 'single' ? (
          <form onSubmit={handleSubmit}>
            <SectionTitle>Enter Your Details</SectionTitle>
            <InputField
              label="Your Name"
              value={person1.name}
              onChange={(e) => dispatchPerson1({ type: 'UPDATE_FIELD', field: 'name', value: e.target.value })}
            />
            <InputField
              label="Birth Date"
              type="date"
              value={person1.birthDate}
              onChange={(e) => dispatchPerson1({ type: 'UPDATE_FIELD', field: 'birthDate', value: e.target.value })}
            />
            <InputField
              label="Birth Time (if known)"
              type="time"
              value={person1.birthTime}
              onChange={(e) => dispatchPerson1({ type: 'UPDATE_FIELD', field: 'birthTime', value: e.target.value })}
              helpText="More accurate results with birth time"
            />
            <InputField
              label="Birth Place (City, Country)"
              value={person1.birthPlace}
              onChange={(e) => dispatchPerson1({ type: 'UPDATE_FIELD', field: 'birthPlace', value: e.target.value })}
            />
            <SelectField
              label="Birth Timezone"
              value={person1.birthTimezone}
              onChange={(e) => dispatchPerson1({ type: 'UPDATE_FIELD', field: 'birthTimezone', value: e.target.value })}
              options={timezoneOptions}
            />
            <SelectField
              label="Gender"
              value={person1.gender}
              onChange={(e) => dispatchPerson1({ type: 'UPDATE_FIELD', field: 'gender', value: e.target.value })}
              options={[
                { value: 'female', label: 'Female' },
                { value: 'male', label: 'Male' },
                { value: 'non-binary', label: 'Non-binary' },
              ]}
              helpText="Used for certain calculations in Traditional Chinese Astrology"
            />
            <div className="mt-8 flex justify-center space-x-4">
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={loading}
              >
                {loading ? 'Calculating...' : 'Calculate'}
              </button>
              <button
                type="button"
                className="px-6 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                onClick={handleReset}
              >
                Reset
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <SectionTitle>Person 1</SectionTitle>
                <InputField
                  label="Name"
                  value={person1.name}
                  onChange={(e) => dispatchPerson1({ type: 'UPDATE_FIELD', field: 'name', value: e.target.value })}
                />
                <InputField
                  label="Birth Date"
                  type="date"
                  value={person1.birthDate}
                  onChange={(e) => dispatchPerson1({ type: 'UPDATE_FIELD', field: 'birthDate', value: e.target.value })}
                />
                <InputField
                  label="Birth Time (if known)"
                  type="time"
                  value={person1.birthTime}
                  onChange={(e) => dispatchPerson1({ type: 'UPDATE_FIELD', field: 'birthTime', value: e.target.value })}
                />
                <InputField
                  label="Birth Place (City, Country)"
                  value={person1.birthPlace}
                  onChange={(e) => dispatchPerson1({ type: 'UPDATE_FIELD', field: 'birthPlace', value: e.target.value })}
                />
                <SelectField
                  label="Birth Timezone"
                  value={person1.birthTimezone}
                  onChange={(e) => dispatchPerson1({ type: 'UPDATE_FIELD', field: 'birthTimezone', value: e.target.value })}
                  options={timezoneOptions}
                />
                <SelectField
                  label="Gender"
                  value={person1.gender}
                  onChange={(e) => dispatchPerson1({ type: 'UPDATE_FIELD', field: 'gender', value: e.target.value })}
                  options={[
                    { value: 'female', label: 'Female' },
                    { value: 'male', label: 'Male' },
                    { value: 'non-binary', label: 'Non-binary' },
                  ]}
                />
              </div>
              <div>
                <SectionTitle>Person 2</SectionTitle>
                <InputField
                  label="Name"
                  value={person2.name}
                  onChange={(e) => dispatchPerson2({ type: 'UPDATE_FIELD', field: 'name', value: e.target.value })}
                />
                <InputField
                  label="Birth Date"
                  type="date"
                  value={person2.birthDate}
                  onChange={(e) => dispatchPerson2({ type: 'UPDATE_FIELD', field: 'birthDate', value: e.target.value })}
                />
                <InputField
                  label="Birth Time (if known)"
                  type="time"
                  value={person2.birthTime}
                  onChange={(e) => dispatchPerson2({ type: 'UPDATE_FIELD', field: 'birthTime', value: e.target.value })}
                />
                <InputField
                  label="Birth Place (City, Country)"
                  value={person2.birthPlace}
                  onChange={(e) => dispatchPerson2({ type: 'UPDATE_FIELD', field: 'birthPlace', value: e.target.value })}
                />
                <SelectField
                  label="Birth Timezone"
                  value={person2.birthTimezone}
                  onChange={(e) => dispatchPerson2({ type: 'UPDATE_FIELD', field: 'birthTimezone', value: e.target.value })}
                  options={timezoneOptions}
                />
                <SelectField
                  label="Gender"
                  value={person2.gender}
                  onChange={(e) => dispatchPerson2({ type: 'UPDATE_FIELD', field: 'gender', value: e.target.value })}
                  options={[
                    { value: 'female', label: 'Female' },
                    { value: 'male', label: 'Male' },
                    { value: 'non-binary', label: 'Non-binary' },
                  ]}
                />
              </div>
            </div>
            <div className="mt-8 flex justify-center space-x-4">
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={loading}
              >
                {loading ? 'Calculating...' : 'Calculate'}
              </button>
              <button
                type="button"
                className="px-6 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                onClick={handleReset}
              >
                Reset
              </button>
            </div>
          </form>
        )}

        {error && (
          <div className="mt-6 p-4 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}
      </FormContainer>

      {result && (
        <FormContainer>
          <h2 className="text-2xl font-bold mb-6 text-center">
            {result.type === 'single' ?
              `Analysis Results for ${result.person}` :
              `Compatibility Analysis: ${result.person1.name} & ${result.person2.name}`}
          </h2>

          {result.type === 'single' ? (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h3 className="text-xl font-semibold mb-2">Western Astrology</h3>
                  <p className="text-lg mb-1"><span className="font-medium">Sun Sign:</span> {result.westernZodiac}</p>
                  <p className="text-lg mb-1"><span className="font-medium">Moon Sign:</span> {result.natalChart.moon}</p>
                  <p className="text-lg mb-3"><span className="font-medium">Ascendant:</span> {result.natalChart.ascendant}</p>
                  <p className="text-sm italic">{result.personalityTraits.description}</p>
                </div>

                <div className="p-4 bg-amber-50 rounded-lg">
                  <h3 className="text-xl font-semibold mb-2">Chinese Astrology</h3>
                  <p className="text-lg mb-1"><span className="font-medium">Animal Sign:</span> {result.chineseZodiac}</p>
                  <p className="text-lg mb-1"><span className="font-medium">Element:</span> {result.element}</p>
                  <p className="text-lg mb-1"><span className="font-medium">Yin/Yang:</span> {result.yinYang}</p>
                  <p className="text-lg mb-1"><span className="font-medium">Life Palace:</span> {result.lifePalace}</p>
                  <p className="text-lg mb-1"><span className="font-medium">Body Palace:</span> {result.bodyPalace}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="p-4 bg-purple-50 rounded-lg">
                  <h3 className="text-xl font-semibold mb-2">Numerology</h3>
                  <p className="text-lg mb-1"><span className="font-medium">Life Path Number:</span> {result.lifePathNumber}</p>
                  <p className="text-sm italic">{result.lifePathDesc}</p>
                </div>

                <div className="p-4 bg-green-50 rounded-lg">
                  <h3 className="text-xl font-semibold mb-2">Ba Zi (Four Pillars)</h3>
                  <p className="text-lg mb-1"><span className="font-medium">Year Pillar:</span> {result.bazi.yearPillar}</p>
                  <p className="text-lg mb-1"><span className="font-medium">Month Pillar:</span> {result.bazi.monthPillar}</p>
                  <p className="text-lg mb-1"><span className="font-medium">Day Pillar:</span> {result.bazi.dayPillar}</p>
                  <p className="text-lg mb-1"><span className="font-medium">Hour Pillar:</span> {result.bazi.hourPillar}</p>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Personality Profile</h3>

                <div className="mb-4">
                  <h4 className="text-lg font-medium mb-2">Key Strengths</h4>
                  <ul className="list-disc pl-5">
                    {result.personalityTraits.strengths.map((strength, index) => (
                      <li key={index} className="mb-1">{strength}</li>
                    ))}
                  </ul>
                </div>

                <div className="mb-4">
                  <h4 className="text-lg font-medium mb-2">Potential Challenges</h4>
                  <ul className="list-disc pl-5">
                    {result.personalityTraits.challenges.map((challenge, index) => (
                      <li key={index} className="mb-1">{challenge}</li>
                    ))}
                  </ul>
                </div>

                <div className="mb-6">
                  <h4 className="text-lg font-medium mb-2">Communication Style</h4>
                  <p className="mb-2">{result.communicationStyle.style}</p>
                  <h5 className="font-medium mb-1">Communication Tips:</h5>
                  <ul className="list-disc pl-5">
                    {result.communicationStyle.tips.map((tip, index) => (
                      <li key={index} className="mb-1">{tip}</li>
                    ))}
                  </ul>
                </div>

                <div className="mb-6">
                  <h4 className="text-lg font-medium mb-2">Emotional Tendencies</h4>
                  <p className="mb-2">{result.emotionalTendencies.description}</p>
                  <h5 className="font-medium mb-1">Emotional Management:</h5>
                  <ul className="list-disc pl-5">
                    {result.emotionalTendencies.management.map((tip, index) => (
                      <li key={index} className="mb-1">{tip}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-4">Zi Wei Dou Shu (Purple Star Astrology)</h3>
                <p className="mb-1"><span className="font-medium">Main Star:</span> {result.ziWeiStars.mainStar}</p>
                <p className="mb-1"><span className="font-medium">Deputy Star:</span> {result.ziWeiStars.deputyStar}</p>
                <p className="mb-1"><span className="font-medium">Lucky Stars:</span> {result.ziWeiStars.luckyStars}</p>
                <p className="mb-1"><span className="font-medium">Challenging Stars:</span> {result.ziWeiStars.unluckyStars}</p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4">Luck Pillars</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white">
                    <thead>
                      <tr>
                        <th className="py-2 px-4 border-b">Age Range</th>
                        <th className="py-2 px-4 border-b">Element</th>
                      </tr>
                    </thead>
                    <tbody>
                      {result.luckPillars.map((pillar, index) => (
                        <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                          <td className="py-2 px-4 border-b">{pillar.ageRange}</td>
                          <td className="py-2 px-4 border-b">{pillar.element}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex justify-center mb-8">
                <div className="w-64 h-64 relative">
                  <div className="absolute inset-4 rounded-full bg-white flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-blue-600">
                        {result.compatibility.overall.score}%
                      </div>
                      <div className="text-sm text-gray-600 mt-2">
                        Compatibility Score
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center mb-8">
                <h3 className="text-xl font-semibold mb-2">Overall Compatibility</h3>
                <p className="text-lg">{result.compatibility.overall.description}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="text-lg font-semibold mb-2">Western Zodiac</h4>
                  <p className="mb-1">
                    <span className="font-medium">{result.person1.name}:</span> {result.person1.westernZodiac}
                  </p>
                  <p className="mb-1">
                    <span className="font-medium">{result.person2.name}:</span> {result.person2.westernZodiac}
                  </p>
                  <div className="mt-3">
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-500"
                        style={{ width: `${result.compatibility.western.score}%` }}
                      ></div>
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                      {result.compatibility.western.score}% - {result.compatibility.western.description}
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-amber-50 rounded-lg">
                  <h4 className="text-lg font-semibold mb-2">Chinese Zodiac</h4>
                  <p className="mb-1">
                    <span className="font-medium">{result.person1.name}:</span> {result.person1.chineseZodiac}
                  </p>
                  <p className="mb-1">
                    <span className="font-medium">{result.person2.name}:</span> {result.person2.chineseZodiac}
                  </p>
                  <div className="mt-3">
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-amber-500"
                        style={{ width: `${result.compatibility.chinese.score}%` }}
                      ></div>
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                      {result.compatibility.chinese.score}% - {result.compatibility.chinese.description}
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-purple-50 rounded-lg">
                  <h4 className="text-lg font-semibold mb-2">Numerology</h4>
                  <p className="mb-1">
                    <span className="font-medium">{result.person1.name}:</span> {result.person1.lifePathNumber}
                  </p>
                  <p className="mb-1">
                    <span className="font-medium">{result.person2.name}:</span> {result.person2.lifePathNumber}
                  </p>
                  <div className="mt-3">
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-purple-500"
                        style={{ width: `${result.compatibility.numerology.score}%` }}
                      ></div>
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                      {result.compatibility.numerology.score}% - {result.compatibility.numerology.description}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Elemental Compatibility</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="text-lg font-semibold mb-2">Western Elements</h4>
                    <p className="mb-1">
                      <span className="font-medium">{result.person1.name}:</span> {result.compatibility.western.element1}
                    </p>
                    <p className="mb-1">
                      <span className="font-medium">{result.person2.name}:</span> {result.compatibility.western.element2}
                    </p>
                    <p className="mt-3">
                      {result.compatibility.western.element1 === result.compatibility.western.element2 ?
                        "Same elements create harmony but may lack dynamism" :
                        result.compatibility.western.element1 + " and " + result.compatibility.western.element2 +
                        (["fire", "air"].includes(result.compatibility.western.element1) && ["fire", "air"].includes(result.compatibility.western.element2) ?
                          " complement each other well" :
                          (["earth", "water"].includes(result.compatibility.western.element1) && ["earth", "water"].includes(result.compatibility.western.element2)) ?
                            " create a stable foundation" : " have potential for growth through challenge"
                        )
                      }
                    </p>
                  </div>
                  <div className="p-4 bg-red-50 rounded-lg">
                    <h4 className="text-lg font-semibold mb-2">Relationship Dynamics</h4>
                    <p className="mb-2">
                      {result.compatibility.overall.score >= 80 ?
                        "This relationship has natural chemistry and understanding. Communication flows easily and you complement each other's strengths." :
                        result.compatibility.overall.score >= 70 ?
                          "You have good compatibility with areas of natural connection. With mutual understanding, this can be a fulfilling relationship." :
                          result.compatibility.overall.score >= 60 ?
                            "There are both complementary and challenging aspects to this relationship. Growth comes through understanding differences." :
                            "This relationship may require significant effort and compromise to find harmony. Differences can be sources of growth if approached with patience."}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4">Relationship Advice</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-4 bg-indigo-50 rounded-lg">
                    <h4 className="text-lg font-semibold mb-2">Strengths to Build On</h4>
                    <ul className="list-disc pl-5">
                      <li className="mb-1">Shared values in {result.compatibility.western.score >= 70 ? "many" : "some"} areas</li>
                      <li className="mb-1">Complementary personality traits</li>
                      {result.compatibility.overall.score >= 70 && (
                        <li className="mb-1">Natural emotional understanding</li>
                      )}
                      {result.compatibility.chinese.score >= 70 && (
                        <li className="mb-1">Supportive Chinese zodiac combination</li>
                      )}
                    </ul>
                  </div>
                  <div className="p-4 bg-yellow-50 rounded-lg">
                    <h4 className="text-lg font-semibold mb-2">Areas for Growth</h4>
                    <ul className="list-disc pl-5">
                      {result.compatibility.overall.score < 70 && (
                        <li className="mb-1">Different communication styles may require adjustment</li>
                      )}
                      <li className="mb-1">Potential conflicts around {result.compatibility.western.element1 === result.compatibility.western.element2 ?
                        "similar blind spots" : "different approaches"}</li>
                      {result.compatibility.chinese.score < 60 && (
                        <li className="mb-1">Chinese zodiac indicates some challenging dynamics</li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </FormContainer>
      )}
    </div>
  );
};

export default Calculator;