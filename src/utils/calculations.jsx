// Chinese Zodiac Animals
const zodiacAnimals = ['Rat', 'Ox', 'Tiger', 'Rabbit', 'Dragon', 'Snake', 'Horse', 'Goat', 'Monkey', 'Rooster', 'Dog', 'Pig'];

// Chinese New Year dates from 1924-2024
const chineseNewYearDates = {
  1924: '1924-02-05', 1925: '1925-01-25', 1926: '1926-02-13', 1927: '1927-02-02',
  1928: '1928-01-23', 1929: '1929-02-10', 1930: '1930-01-30', 1931: '1931-02-17',
  1932: '1932-02-06', 1933: '1933-01-26', 1934: '1934-02-14', 1935: '1935-02-04',
  1936: '1936-01-24', 1937: '1937-02-11', 1938: '1938-01-31', 1939: '1939-02-19',
  1940: '1940-02-08', 1941: '1941-01-27', 1942: '1942-02-15', 1943: '1943-02-05',
  1944: '1944-01-25', 1945: '1945-02-13', 1946: '1946-02-02', 1947: '1947-01-22',
  1948: '1948-02-10', 1949: '1949-01-29', 1950: '1950-02-17', 1951: '1951-02-06',
  1952: '1952-01-26', 1953: '1953-02-14', 1954: '1954-02-03', 1955: '1955-01-24',
  1956: '1956-02-12', 1957: '1957-01-31', 1958: '1958-02-18', 1959: '1959-02-08',
  1960: '1960-01-28', 1961: '1961-02-15', 1962: '1962-02-05', 1963: '1963-01-25',
  1964: '1964-02-13', 1965: '1965-02-02', 1966: '1966-01-21', 1967: '1967-02-09',
  1968: '1968-01-30', 1969: '1969-02-17', 1970: '1970-02-06', 1971: '1971-01-27',
  1972: '1972-02-15', 1973: '1973-02-03', 1974: '1974-01-23', 1975: '1975-02-11',
  1976: '1976-01-31', 1977: '1977-02-18', 1978: '1978-02-07', 1979: '1979-01-28',
  1980: '1980-02-16', 1981: '1981-02-05', 1982: '1982-01-25', 1983: '1983-02-13',
  1984: '1984-02-02', 1985: '1985-02-20', 1986: '1986-02-09', 1987: '1987-01-29',
  1988: '1988-02-17', 1989: '1989-02-06', 1990: '1990-01-27', 1991: '1991-02-15',
  1992: '1992-02-04', 1993: '1993-01-23', 1994: '1994-02-10', 1995: '1995-01-31',
  1996: '1996-02-19', 1997: '1997-02-07', 1998: '1998-01-28', 1999: '1999-02-16',
  2000: '2000-02-05', 2001: '2001-01-24', 2002: '2002-02-12', 2003: '2003-02-01',
  2004: '2004-01-22', 2005: '2005-02-09', 2006: '2006-01-29', 2007: '2007-02-18',
  2008: '2008-02-07', 2009: '2009-01-26', 2010: '2010-02-14', 2011: '2011-02-03',
  2012: '2012-01-23', 2013: '2013-02-10', 2014: '2014-01-31', 2015: '2015-02-19',
  2016: '2016-02-08', 2017: '2017-01-28', 2018: '2018-02-16', 2019: '2019-02-05',
  2020: '2020-01-25', 2021: '2021-02-12', 2022: '2022-02-01', 2023: '2023-01-22',
  2024: '2024-02-10'
};

// Western Zodiac signs with date ranges
const westernZodiacs = [
  { name: 'Aquarius', dates: ['01-20', '02-18'] },
  { name: 'Pisces', dates: ['02-19', '03-20'] },
  { name: 'Aries', dates: ['03-21', '04-19'] },
  { name: 'Taurus', dates: ['04-20', '05-20'] },
  { name: 'Gemini', dates: ['05-21', '06-20'] },
  { name: 'Cancer', dates: ['06-21', '07-22'] },
  { name: 'Leo', dates: ['07-23', '08-22'] },
  { name: 'Virgo', dates: ['08-23', '09-22'] },
  { name: 'Libra', dates: ['09-23', '10-22'] },
  { name: 'Scorpio', dates: ['10-23', '11-21'] },
  { name: 'Sagittarius', dates: ['11-22', '12-21'] },
  { name: 'Capricorn', dates: ['12-22', '01-19'] }
];

// Heavenly Stems and Earthly Branches for Bazi calculation
const heavenlyStems = ['Jia', 'Yi', 'Bing', 'Ding', 'Wu', 'Ji', 'Geng', 'Xin', 'Ren', 'Gui'];
const earthlyBranches = ['Zi', 'Chou', 'Yin', 'Mao', 'Chen', 'Si', 'Wu', 'Wei', 'Shen', 'You', 'Xu', 'Hai'];

// Chinese Zodiac Compatibility Matrix
const compatibilityMatrix = {
  'Rat': { good: ['Dragon', 'Monkey', 'Ox'], bad: ['Horse'] },
  'Ox': { good: ['Rat', 'Rooster', 'Snake'], bad: ['Goat'] },
  'Tiger': { good: ['Horse', 'Dog'], bad: ['Monkey'] },
  'Rabbit': { good: ['Goat', 'Pig', 'Dog'], bad: ['Rooster'] },
  'Dragon': { good: ['Rat', 'Monkey', 'Rooster'], bad: ['Dog'] },
  'Snake': { good: ['Ox', 'Rooster'], bad: ['Pig'] },
  'Horse': { good: ['Tiger', 'Dog', 'Goat'], bad: ['Rat'] },
  'Goat': { good: ['Rabbit', 'Horse', 'Pig'], bad: ['Ox'] },
  'Monkey': { good: ['Rat', 'Dragon'], bad: ['Tiger'] },
  'Rooster': { good: ['Ox', 'Snake'], bad: ['Rabbit'] },
  'Dog': { good: ['Tiger', 'Horse', 'Rabbit'], bad: ['Dragon'] },
  'Pig': { good: ['Rabbit', 'Goat'], bad: ['Snake'] }
};

/**
 * Calculates the Chinese Zodiac animal for a given date
 * @param {Date} date - Birth date
 * @returns {string} Zodiac animal
 */
export const calculateZodiac = (date) => {
  const year = date.getFullYear();
  let zodiacYear = year;
  
  // Adjust for Chinese New Year
  if (chineseNewYearDates[year] && date < new Date(chineseNewYearDates[year])) {
    zodiacYear = year - 1;
  }
  
  const zodiacIndex = (zodiacYear - 4) % 12;
  return zodiacAnimals[zodiacIndex >= 0 ? zodiacIndex : 12 + zodiacIndex];
};

/**
 * Calculates the Four Pillars of Destiny (Bazi)
 * @param {Date} date - Birth date
 * @param {string} hour - Birth time in 'HH:MM' format
 * @returns {Object} Saju object with stems and branches
 */
export const calculateSaju = (date, hour) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hourNum = parseInt(hour.split(':')[0]);

  // Adjust year for Chinese New Year
  let adjustedYear = year;
  if (chineseNewYearDates[year] && date < new Date(chineseNewYearDates[year])) {
    adjustedYear = year - 1;
  }

  // Calculate pillars
  const yearStem = heavenlyStems[(adjustedYear - 4) % 10];
  const yearBranch = earthlyBranches[(adjustedYear - 4) % 12];
  
  // Month pillar (simplified calculation)
  const monthIndex = (adjustedYear - 4) * 12 + month + 12;
  const monthStem = heavenlyStems[Math.floor(monthIndex / 2) % 10];
  const monthBranch = earthlyBranches[(month + 1) % 12];
  
  // Day pillar (Gregorian to Julian day number simplified)
  const a = Math.floor((14 - month) / 12);
  const y = year + 4800 - a;
  const m = month + 12 * a - 3;
  const jdn = day + Math.floor((153 * m + 2) / 5) + 365 * y + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) - 32045;
  const dayStem = heavenlyStems[(jdn + 9) % 10];
  const dayBranch = earthlyBranches[(jdn + 1) % 12];
  
  // Hour pillar
  const hourIndex = Math.floor((hourNum + 1) / 2) % 12;
  const hourStemIndex = (dayStem.charCodeAt(0) - 'Jia'.charCodeAt(0)) * 2 + hourIndex;
  const hourStem = heavenlyStems[hourStemIndex % 10];
  const hourBranch = earthlyBranches[hourIndex];

  return {
    yearStem,
    yearBranch,
    monthStem,
    monthBranch,
    dayStem,
    dayBranch,
    hourStem,
    hourBranch,
    zodiacAnimal: calculateZodiac(date)
  };
};

/**
 * Calculates Destiny Number (similar to Life Path Number)
 * @param {Date} date - Birth date
 * @returns {number} Destiny number (1-9)
 */
export const calculateDestinyNumber = (date) => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  
  const reduceToDigit = num => {
    while (num > 9 && num !== 11 && num !== 22 && num !== 33) {
      num = Math.floor(num / 10) + (num % 10);
    }
    return num;
  };
  
  const dayNum = reduceToDigit(day);
  const monthNum = reduceToDigit(month);
  const yearNum = reduceToDigit(year);
  
  return reduceToDigit(dayNum + monthNum + yearNum);
};

/**
 * Calculates Destiny Matrix attributes based on Destiny Number
 * @param {number} destinyNumber 
 * @returns {Object} Matrix attributes
 */
export const calculateDestinyMatrix = (destinyNumber) => {
  const matrixValues = {
    1: { strength: 8, wisdom: 6, charisma: 7, career: 'Leadership', health: 'Strong' },
    2: { strength: 5, wisdom: 8, charisma: 6, career: 'Diplomacy', health: 'Sensitive' },
    3: { strength: 7, wisdom: 5, charisma: 8, career: 'Creativity', health: 'Nervous' },
    4: { strength: 6, wisdom: 7, charisma: 5, career: 'Organization', health: 'Digestive' },
    5: { strength: 9, wisdom: 4, charisma: 8, career: 'Adventure', health: 'Active' },
    6: { strength: 7, wisdom: 8, charisma: 6, career: 'Service', health: 'Respiratory' },
    7: { strength: 4, wisdom: 9, charisma: 7, career: 'Analysis', health: 'Mental' },
    8: { strength: 8, wisdom: 5, charisma: 6, career: 'Business', health: 'Stress' },
    9: { strength: 5, wisdom: 7, charisma: 9, career: 'Humanitarian', health: 'Circulatory' },
    11: { strength: 6, wisdom: 9, charisma: 8, career: 'Inspiration', health: 'Nervous' },
    22: { strength: 8, wisdom: 8, charisma: 7, career: 'Master Builder', health: 'Balanced' },
    33: { strength: 7, wisdom: 9, charisma: 9, career: 'Master Teacher', health: 'Spiritual' }
  };
  
  return matrixValues[destinyNumber] || { 
    strength: 5, 
    wisdom: 5, 
    charisma: 5,
    career: 'Varied',
    health: 'Average'
  };
};

/**
 * Calculates Western Zodiac sign
 * @param {Date} date - Birth date
 * @returns {string} Zodiac sign name
 */
export const calculateWesternZodiac = (date) => {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const dateStr = `${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;

  for (const zodiac of westernZodiacs) {
    if (dateStr >= zodiac.dates[0] && dateStr <= zodiac.dates[1]) {
      return zodiac.name;
    }
  }
  return 'Capricorn';
};

/**
 * Calculates Kua Number for Feng Shui
 * @param {string} gender - 'male' or 'female'
 * @param {Date} date - Birth date
 * @returns {number} Kua number (1-9)
 */
export const calculateKuaNumber = (gender, date) => {
  let year = date.getFullYear();
  
  // Adjust for Chinese New Year
  if (chineseNewYearDates[year] && date < new Date(chineseNewYearDates[year])) {
    year--;
  }
  
  // For years 2000 and later, add 9 before reducing
  const lastTwoDigits = year % 100;
  const sum = (year >= 2000 ? 
    String(lastTwoDigits + 9).split('').reduce((acc, digit) => acc + parseInt(digit), 0) :
    String(lastTwoDigits).split('').reduce((acc, digit) => acc + parseInt(digit), 0));
  
  const kua = gender === 'male' ? 
    (10 - (sum % 9)) || 9 :
    (sum + 5) % 9 || 9;
  
  return kua;
};

/**
 * Calculates compatibility score between two people
 * @param {Object} person1 - First person's data
 * @param {Object} person2 - Second person's data
 * @returns {number} Compatibility score (0-100)
 */
export const calculateCompatibilityScore = (person1, person2) => {
  const p1Zodiac = person1.saju.zodiacAnimal;
  const p2Zodiac = person2.saju.zodiacAnimal;
  
  let score = 50; // Base score
  
  // Zodiac compatibility
  if (compatibilityMatrix[p1Zodiac]?.good.includes(p2Zodiac)) score += 20;
  if (compatibilityMatrix[p1Zodiac]?.bad.includes(p2Zodiac)) score -= 20;
  
  // Element compatibility (simplified)
  const elementCompatibility = {
    'Jia': ['Ji', 'Geng'],
    'Yi': ['Geng', 'Xin'],
    'Bing': ['Xin', 'Ren'],
    'Ding': ['Ren', 'Gui'],
    'Wu': ['Gui', 'Jia'],
    'Ji': ['Jia', 'Yi'],
    'Geng': ['Yi', 'Bing'],
    'Xin': ['Bing', 'Ding'],
    'Ren': ['Ding', 'Wu'],
    'Gui': ['Wu', 'Ji']
  };
  
  if (elementCompatibility[person1.saju.yearStem]?.includes(person2.saju.yearStem)) {
    score += 15;
  }
  
  // Destiny number compatibility
  const num1 = person1.destinyNumber;
  const num2 = person2.destinyNumber;
  
  if (num1 === num2) score += 5; // Same numbers harmonize
  if ([1, 5, 7].includes(num1) && [1, 5, 7].includes(num2)) score += 5;
  if ([2, 4, 8].includes(num1) && [2, 4, 8].includes(num2)) score += 5;
  if ([3, 6, 9].includes(num1) && [3, 6, 9].includes(num2)) score += 5;
  
  return Math.max(0, Math.min(100, Math.round(score)));
};

/**
 * Generates a full analysis report for a person
 * @param {Object} personData - Person's birth data
 * @returns {Object} Complete analysis report
 */
export const generatePersonAnalysis = (personData) => {
  const birthDate = new Date(personData.birthDate);
  const saju = calculateSaju(birthDate, personData.birthTime);
  const destinyNumber = calculateDestinyNumber(birthDate);
  const destinyMatrix = calculateDestinyMatrix(destinyNumber);
  const westernZodiac = calculateWesternZodiac(birthDate);
  const kuaNumber = calculateKuaNumber(personData.gender, birthDate);
  
  return {
    personalAnalysis: {
      bazi: {
        yearPillar: `${saju.yearStem} ${saju.yearBranch} (${saju.zodiacAnimal})`,
        monthPillar: `${saju.monthStem} ${saju.monthBranch}`,
        dayPillar: `${saju.dayStem} ${saju.dayBranch}`,
        hourPillar: `${saju.hourStem} ${saju.hourBranch}`,
        element: saju.yearStem // Simplified element
      },
      ziWeiDouShu: {
        mainStar: getMainStar(saju.dayBranch),
        lifePalace: getLifePalace(saju.hourBranch),
        destiny: getDestinyInterpretation(saju.yearStem, saju.yearBranch)
      },
      natalChart: {
        sun: westernZodiac,
        moon: calculateMoonSign(birthDate), // Simplified
        ascendant: calculateAscendant(birthDate, personData.birthTime), // Simplified
        mercury: westernZodiac, // Simplified
        venus: westernZodiac, // Simplified
        mars: westernZodiac // Simplified
      }
    },
    lifePathAnalysis: {
      currentCycle: {
        description: getCurrentCycle(birthDate),
        period: getCurrentPeriod(birthDate)
      },
      yearlyForecast: generateYearlyForecast(destinyNumber, new Date().getFullYear())
    },
    recommendations: {
      careerSuggestions: getCareerSuggestions(destinyNumber, saju.yearStem),
      healthAdvice: getHealthAdvice(destinyNumber, saju.yearBranch),
      luckyDirections: getLuckyDirections(kuaNumber),
      favorableElements: getFavorableElements(saju.yearStem)
    },
    destinyNumber,
    destinyMatrix
  };
};

// Helper functions (simplified versions)
const getMainStar = (dayBranch) => {
  const stars = {
    'Zi': 'Tian Ji', 'Chou': 'Tian Tong', 'Yin': 'Tian Liang',
    'Mao': 'Wen Qu', 'Chen': 'Wu Qu', 'Si': 'Lian Zhen',
    'Wu': 'Po Jun', 'Wei': 'Tan Lang', 'Shen': 'Ju Men',
    'You': 'Tian Xiang', 'Xu': 'Tian Liang', 'Hai': 'Zi Wei'
  };
  return stars[dayBranch] || 'Purple Star';
};

const getLifePalace = (hourBranch) => {
  const palaces = [
    'Life', 'Parents', 'Fortunes', 'Property',
    'Career', 'Friends', 'Travel', 'Health',
    'Wealth', 'Children', 'Spouse', 'Siblings'
  ];
  return palaces[earthlyBranches.indexOf(hourBranch)] || 'Life Palace';
};

// ... (additional helper functions would be here)

export default {
  calculateZodiac,
  calculateSaju,
  calculateDestinyNumber,
  calculateDestinyMatrix,
  calculateWesternZodiac,
  calculateKuaNumber,
  calculateCompatibilityScore,
  generatePersonAnalysis
};