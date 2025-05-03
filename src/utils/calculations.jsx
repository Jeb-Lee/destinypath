import moment from 'moment-timezone';
import * as lunarCalendar from 'lunar-calendar';

const CHINESE_NEW_YEAR_DATES = {
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
  2001: '2001-01-24',
  2002: '2002-02-12',
  2003: '2003-02-01',
  2004: '2004-01-22',
  2005: '2005-02-09',
  2006: '2006-01-29',
  2007: '2007-02-18',
  2008: '2008-02-07',
  2009: '2009-01-26',
  2010: '2010-02-14',
  2011: '2011-02-03',
  2012: '2012-01-23',
  2013: '2013-02-10',
  2014: '2014-01-31',
  2015: '2015-02-19',
  2016: '2016-02-08',
  2017: '2017-01-28',
  2018: '2018-02-16',
  2019: '2019-02-05',
  2020: '2020-01-25',
  2021: '2021-02-12',
  2022: '2022-02-01',
  2023: '2023-01-22',
  2024: '2024-02-10',
  2025: '2025-01-29',
};

const isValidDate = (dateString) => {
  return moment(dateString, 'YYYY-MM-DD', true).isValid();
};

const getTimezoneOffset = (place) => {
  if (!place) return 0;
  if (place.includes('New York')) return -5;
  if (place.includes('London')) return 0;
  if (place.includes('Tokyo')) return 9;
  return 0;
};

const getChineseNewYearDate = (year) => {
  try {
    const dateString = CHINESE_NEW_YEAR_DATES[year];
    if (dateString) {
      return new Date(`${dateString}T00:00:00+08:00`);
    }
    const lunarDate = lunarCalendar.solarToLunar(year, 2, 1);
    return new Date(`${year}-02-${lunarDate.lunarDay}T00:00:00+08:00`);
  } catch (e) {
    throw new Error('Failed to calculate Chinese New Year date');
  }
};

const calculateZodiac = (dateString, birthPlace) => {
  const animals = ['Rat', 'Ox', 'Tiger', 'Rabbit', 'Dragon', 'Snake', 'Horse', 'Goat', 'Monkey', 'Rooster', 'Dog', 'Pig'];
  if (!dateString || !isValidDate(dateString)) throw new Error('Invalid birth date provided');

  const birthDate = new Date(dateString);
  const year = birthDate.getFullYear();
  const newYearDate = getChineseNewYearDate(year);

  const birthDateTime = new Date(dateString);
  const timezoneOffset = getTimezoneOffset(birthPlace);
  birthDateTime.setHours(birthDateTime.getHours() + timezoneOffset);

  return animals[(birthDateTime < newYearDate ? year - 1 : year - 4) % 12];
};

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

const calculateMoonSign = (date, birthPlace) => {
  if (!(date instanceof Date) || isNaN(date)) throw new Error('Invalid date object');
  const dayOfYear = Math.floor((date - new Date(date.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
  const moonCycle = 29.53;
  const approximateSignIndex = Math.floor((dayOfYear % moonCycle) / 2.5) % 12;
  const signs = [
    'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
    'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
  ];
  return signs[approximateSignIndex];
};

const calculateAscendant = (date, birthPlace) => {
  if (!(date instanceof Date) || isNaN(date)) throw new Error('Invalid date object');
  const hour = date.getHours();
  const approximateSignIndex = Math.floor(hour / 2) % 12;
  const signs = [
    'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
    'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
  ];
  return signs[approximateSignIndex];
};

const calculateZodiacElement = (year) => {
  const elements = ['Wood', 'Fire', 'Earth', 'Metal', 'Water'];
  return elements[Math.floor((year - 4) % 10 / 2)];
};

const calculateYinYang = (year) => {
  return year % 2 === 0 ? 'Yang' : 'Yin';
};

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

const calculateZiWeiStars = (birthDate, birthHour, gender) => {
  if (!(birthDate instanceof Date) || isNaN(birthDate)) throw new Error('Invalid birth date');
  const year = birthDate.getFullYear();
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

  const yearLastDigit = year % 10;
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

const calculateLifePathNumber = (birthDate) => {
  if (!isValidDate(birthDate)) throw new Error('Invalid birth date');
  const date = new Date(birthDate);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const reduceNumber = (num) => {
    if (num === 11 || num === 22) return num;
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

const generatePersonAnalysis = (personData) => {
  if (!personData.name || !isValidDate(personData.birthDate)) {
    throw new Error('Please provide a valid name and birth date');
  }

  const birthDate = new Date(personData.birthDate);
  const birthYear = birthDate.getFullYear();
  const birthHour = personData.birthTime ? parseInt(personData.birthTime.split(':')[0]) : 12;

  const westernZodiac = calculateWesternZodiac(birthDate, personData.birthPlace, personData.birthTime);
  const chineseZodiac = calculateZodiac(personData.birthDate, personData.birthPlace);
  const element = calculateZodiacElement(birthYear);
  const yinYang = calculateYinYang(birthYear);
  const lifePathNumber = calculateLifePathNumber(personData.birthDate);
  const natalChart = calculateNatalChart(personData.birthDate, personData.birthTime, personData.birthPlace);
  const bazi = calculateBazi(personData.birthDate, personData.birthTime, personData.birthPlace);
  const personalityTraits = getPersonalityTraits(westernZodiac);
  const communicationStyle = getCommunicationStyle(westernZodiac);
  const emotionalTendencies = getEmotionalTendencies(westernZodiac);
  const ziWeiStars = calculateZiWeiStars(birthDate, birthHour, personData.gender);
  const lifePathDesc = getNumerologyDescription(lifePathNumber);
  const luckPillars = calculateLuckPillars(birthYear, personData.gender);
  const lifePalace = calculateLifePalace(birthDate.getMonth() + 1, birthDate.getDate());
  const bodyPalace = calculateBodyPalace(lifePalace);

  return {
    type: 'single',
    person: personData.name,
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
  };
};

export {
  generatePersonAnalysis,
  calculateZodiac,
  calculateWesternZodiac,
  calculateMoonSign,
  calculateAscendant,
  calculateZodiacElement,
  calculateYinYang,
  calculateLuckPillars,
  calculateBazi,
  calculateZiWeiStars,
  calculateLifePalace,
  calculateBodyPalace,
  calculateNatalChart,
  calculateLifePathNumber,
  getNumerologyDescription,
  getPersonalityTraits,
  getCommunicationStyle,
  getEmotionalTendencies,
};