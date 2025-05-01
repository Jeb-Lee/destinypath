const zodiacAnimals = ['Monkey', 'Rooster', 'Dog', 'Pig', 'Rat', 'Ox', 'Tiger', 'Rabbit', 'Dragon', 'Snake', 'Horse', 'Goat'];

const chineseNewYearDates = {
  1924: '1924-02-05',
  1925: '1925-01-25',
  1926: '1926-02-13',
  1927: '1927-02-02',
  1928: '1928-01-23',
  1929: '1929-02-10',
  1930: '1930-01-30',
  1931: '1931-02-17',
  1932: '1932-02-06',
  1933: '1933-01-26',
  1934: '1934-02-14',
  1935: '1935-02-04',
  1936: '1936-01-24',
  1937: '1937-02-11',
  1938: '1938-01-31',
  1939: '1939-02-19',
  1940: '1940-02-08',
  1941: '1941-01-27',
  1942: '1942-02-15',
  1943: '1943-02-05',
  1944: '1944-01-25',
  1945: '1945-02-13',
  1946: '1946-02-02',
  1947: '1947-01-22',
  1948: '1948-02-10',
  1949: '1949-01-29',
  1950: '1950-02-17',
  1951: '1951-02-06',
  1952: '1952-01-26',
  1953: '1953-02-14',
  1954: '1954-02-03',
  1955: '1955-01-24',
  1956: '1956-02-12',
  1957: '1957-01-31',
  1958: '1958-02-18',
  1959: '1959-02-08',
  1960: '1960-01-28',
  1961: '1961-02-15',
  1962: '1962-02-05',
  1963: '1963-01-25',
  1964: '1964-02-13',
  1965: '1965-02-02',
  1966: '1966-01-21',
  1967: '1967-02-09',
  1968: '1968-01-30',
  1969: '1969-02-17',
  1970: '1970-02-06',
  1971: '1971-01-27',
  1972: '1972-02-15',
  1973: '1973-02-03',
  1974: '1974-01-23',
  1975: '1975-02-11',
  1976: '1976-01-31',
  1977: '1977-02-18',
  1978: '1978-02-07',
  1979: '1979-01-28',
  1980: '1980-02-16',
  1981: '1981-02-05',
  1982: '1982-01-25',
  1983: '1983-02-13',
  1984: '1984-02-02',
  1985: '1985-02-20',
  1986: '1986-02-09',
  1987: '1987-01-29',
  1988: '1988-02-17',
  1989: '1989-02-06',
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
  2024: '2024-02-10'
};

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

const heavenlyStems = ['Jia', 'Yi', 'Bing', 'Ding', 'Wu', 'Ji', 'Geng', 'Xin', 'Ren', 'Gui'];
const earthlyBranches = ['Zi', 'Chou', 'Yin', 'Mao', 'Chen', 'Si', 'Wu', 'Wei', 'Shen', 'You', 'Xu', 'Hai'];

export const calculateZodiac = (date) => {
  const year = date.getFullYear();
  let zodiacYear = year;
  
  if (chineseNewYearDates[year]) {
    const chineseNewYearDate = new Date(chineseNewYearDates[year]);
    if (date < chineseNewYearDate) {
      zodiacYear = year - 1;
    }
  }
  
  const zodiacIndex = (zodiacYear - 4) % 12;
  return zodiacAnimals[zodiacIndex >= 0 ? zodiacIndex : 12 + zodiacIndex];
};

export const calculateSaju = (date, hour) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hourNum = parseInt(hour.split(':')[0]);

  // Calculate hour pillar (each branch covers 2 hours)
  const hourIndex = Math.floor(hourNum / 2);
  const hourStemIndex = (year - 4 + hourIndex) % 10;

  return {
    yearStem: heavenlyStems[(year - 4) % 10],
    yearBranch: earthlyBranches[(year - 4) % 12],
    monthStem: heavenlyStems[(year - 4 + month - 1) % 10],
    monthBranch: earthlyBranches[(month + 1) % 12],
    dayStem: heavenlyStems[(year - 4 + month - 1 + day - 1) % 10],
    dayBranch: earthlyBranches[(day + 9) % 12],
    hourStem: heavenlyStems[hourStemIndex],
    hourBranch: earthlyBranches[hourIndex]
  };
};

export const calculateDestinyNumber = (date) => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  
  const reduceToDigit = num => num > 9 ? reduceToDigit(Math.floor(num / 10) + (num % 10) : num;
  
  return reduceToDigit(reduceToDigit(day) + reduceToDigit(month) + reduceToDigit(year));
};

export const calculateDestinyMatrix = (destinyNumber) => {
  const matrixValues = {
    1: { strength: 8, wisdom: 6, charisma: 7 },
    2: { strength: 5, wisdom: 8, charisma: 6 },
    3: { strength: 7, wisdom: 5, charisma: 8 },
    4: { strength: 6, wisdom: 7, charisma: 5 },
    5: { strength: 9, wisdom: 4, charisma: 8 },
    6: { strength: 7, wisdom: 8, charisma: 6 },
    7: { strength: 4, wisdom: 9, charisma: 7 },
    8: { strength: 8, wisdom: 5, charisma: 6 },
    9: { strength: 5, wisdom: 7, charisma: 9 }
  };
  
  return matrixValues[destinyNumber] || { strength: 5, wisdom: 5, charisma: 5 };
};

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

export const calculateKuaNumber = (gender, date) => {
  let year = date.getFullYear();
  
  // Adjust for Chinese New Year
  if (chineseNewYearDates[year] && date < new Date(chineseNewYearDates[year])) {
    year--;
  }
  
  const sum = String(year).split('').reduce((acc, digit) => acc + parseInt(digit), 0);
  const kua = (10 - (sum % 9)) || 9;
  
  return gender === 'male' ? kua : ((kua + 5) % 9 || 9);
};

export const calculateCompatibilityScore = (person1, person2) => {
  const compatibilityMatrix = {
    'Rat': { good: ['Dragon', 'Monkey', 'Ox'], bad: ['Horse'] },
    'Ox': { good: ['Rat', 'Rooster', 'Snake'], bad: ['Goat'] },
    'Tiger': { good: ['Horse', 'Dog', 'Pig'], bad: ['Monkey'] },
    'Rabbit': { good: ['Goat', 'Pig', 'Dog'], bad: ['Rooster'] },
    'Dragon': { good: ['Rat', 'Monkey', 'Rooster'], bad: ['Dog'] },
    'Snake': { good: ['Ox', 'Rooster', 'Monkey'], bad: ['Pig'] },
    'Horse': { good: ['Tiger', 'Dog', 'Goat'], bad: ['Rat'] },
    'Goat': { good: ['Rabbit', 'Horse', 'Pig'], bad: ['Ox'] },
    'Monkey': { good: ['Rat', 'Dragon', 'Snake'], bad: ['Tiger'] },
    'Rooster': { good: ['Ox', 'Dragon', 'Snake'], bad: ['Rabbit'] },
    'Dog': { good: ['Tiger', 'Horse', 'Rabbit'], bad: ['Dragon'] },
    'Pig': { good: ['Tiger', 'Rabbit', 'Goat'], bad: ['Snake'] }
  };

  const p1Zodiac = person1.saju.yearBranch;
  const p2Zodiac = person2.saju.yearBranch;
  
  let score = 50; // Base score
  
  if (compatibilityMatrix[p1Zodiac]?.good.includes(p2Zodiac)) score += 25;
  if (compatibilityMatrix[p1Zodiac]?.bad.includes(p2Zodiac)) score -= 25;
  
  // Add score based on element compatibility
  const elementsCompatible = (
    (person1.saju.yearStem === 'Jia' && person2.saju.yearStem === 'Ji') ||
    (person1.saju.yearStem === 'Yi' && person2.saju.yearStem === 'Geng')
  );
  if (elementsCompatible) score += 15;
  
  return Math.max(0, Math.min(100, Math.round(score)));
};