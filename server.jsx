const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const zodiacAnimals = ['Monkey', 'Rooster', 'Dog', 'Pig', 'Rat', 'Ox', 'Tiger', 'Rabbit', 'Dragon', 'Snake', 'Horse', 'Goat'];
const heavenlyStems = ['Jia', 'Yi', 'Bing', 'Ding', 'Wu', 'Ji', 'Geng', 'Xin', 'Ren', 'Gui'];
const earthlyBranches = ['Zi', 'Chou', 'Yin', 'Mao', 'Chen', 'Si', 'Wu', 'Wei', 'Shen', 'You', 'Xu', 'Hai'];
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

const calculateZodiac = (year, month, day) => {
  let zodiacYear = year;
  if (chineseNewYearDates[year]) {
    const chineseNewYearDate = new Date(chineseNewYearDates[year]);
    const birthDate = new Date(year, month - 1, day);
    if (birthDate < chineseNewYearDate) {
      zodiacYear = year - 1;
    }
  }
  const zodiacIndex = (zodiacYear - 4) % 12;
  return zodiacAnimals[zodiacIndex >= 0 ? zodiacIndex : 12 + zodiacIndex];
};

const calculateSaju = (year, month, day, hour) => {
  const hourIndex = Math.floor((hour % 24) / 2);
  const monthStems = ['Bing', 'Ding', 'Wu', 'Ji', 'Geng', 'Xin', 'Ren', 'Gui', 'Jia', 'Yi', 'Bing', 'Ding'];
  const monthBranches = ['Yin', 'Mao', 'Chen', 'Si', 'Wu', 'Wei', 'Shen', 'You', 'Xu', 'Hai', 'Zi', 'Chou'];

  return {
    yearStem: heavenlyStems[(year - 4) % 10],
    yearBranch: earthlyBranches[(year - 4) % 12],
    monthStem: monthStems[month - 1],
    monthBranch: monthBranches[month - 1],
    dayStem: heavenlyStems[(new Date(year, month - 1, day).getTime() / 86400000) % 10],
    dayBranch: earthlyBranches[(new Date(year, month - 1, day).getTime() / 86400000) % 12],
    hourStem: heavenlyStems[(year - 4 + hourIndex) % 10],
    hourBranch: earthlyBranches[hourIndex]
  };
};

const calculateZiWeiDouShu = (year, month, day, hour) => {
  const stars = ['Zi Wei', 'Tian Ji', 'Tai Yang', 'Wu Qu', 'Tian Tong', 'Lian Zhen'];
  const palaces = ['Life', 'Wealth', 'Career', 'Health', 'Romance'];
  return {
    mainStar: stars[(year + month + day + hour) % stars.length],
    palace: palaces[(year + month + day + hour) % palaces.length]
  };
};

const calculateDestinyMatrix = (year, month, day) => {
  const destinyNumber = (year + month + day) % 9 || 9;
  const destinyMatrix = {
    1: { strength: 70, wisdom: 30, charisma: 20 },
    2: { strength: 40, wisdom: 60, charisma: 30 },
    3: { strength: 80, wisdom: 40, charisma: 60 },
    4: { strength: 50, wisdom: 50, charisma: 40 },
    5: { strength: 90, wisdom: 20, charisma: 80 },
    6: { strength: 60, wisdom: 80, charisma: 50 },
    7: { strength: 30, wisdom: 90, charisma: 60 },
    8: { strength: 80, wisdom: 40, charisma: 24 },
    9: { strength: 20, wisdom: 70, charisma: 90 }
  };
  return destinyMatrix[destinyNumber];
};

const calculateAstrology = (month, day) => {
  const signs = [
    { sign: 'Capricorn', start: [12, 22], end: [1, 19] },
    { sign: 'Aquarius', start: [1, 20], end: [2, 18] },
    { sign: 'Pisces', start: [2, 19], end: [3, 20] },
    { sign: 'Aries', start: [3, 21], end: [4, 19] },
    { sign: 'Taurus', start: [4, 20], end: [5, 20] },
    { sign: 'Gemini', start: [5, 21], end: [6, 20] },
    { sign: 'Cancer', start: [6, 21], end: [7, 22] },
    { sign: 'Leo', start: [7, 23], end: [8, 22] },
    { sign: 'Virgo', start: [8, 23], end: [9, 22] },
    { sign: 'Libra', start: [9, 23], end: [10, 22] },
    { sign: 'Scorpio', start: [10, 23], end: [11, 21] },
    { sign: 'Sagittarius', start: [11, 22], end: [12, 21] }
  ];
  for (const { sign, start, end } of signs) {
    if ((month === start[0] && day >= start[1]) || (month === end[0] && day <= end[1])) {
      return { sunSign: sign };
    }
  }
  return { sunSign: 'Capricorn' };
};

const calculateFengShui = (year, gender) => {
  const kua = (year % 10 + 5) % 9 || 9;
  const directions = {
    1: 'North',
    2: 'Northeast',
    3: 'East',
    4: 'Southeast',
    5: gender === 'male' ? 'Northeast' : 'West',
    6: 'West',
    7: 'Northwest',
    8: 'Southwest',
    9: 'South'
  };
  return { kuaNumber: kua, bestDirection: directions[kua] };
};

const generateAdvice = (saju, ziWeiDouShu, destinyMatrix, astrology, fengShui) => {
  return `Based on your Saju (${saju.yearStem} ${saju.yearBranch}), focus on ${destinyMatrix.strength > 70 ? 'leveraging your strength' : 'building resilience'}. Your Zi Wei Dou Shu (${ziWeiDouShu.mainStar}) suggests career opportunities in ${ziWeiDouShu.palace.toLowerCase()}. In ${astrology.sunSign}, embrace your natural traits. For Feng Shui, face ${fengShui.bestDirection} for harmony.`;
};

const calculateCompatibility = (person1, person2) => {
  const sajuScore = person1.saju.yearBranch === person2.saju.yearBranch ? 30 : 10;
  const ziWeiScore = person1.ziWeiDouShu.mainStar === person2.ziWeiDouShu.mainStar ? 20 : 10;
  const matrixScore = Math.abs(person1.destinyMatrix.strength - person2.destinyMatrix.strength) < 20 ? 20 : 10;
  const astroScore = ['Aries', 'Leo', 'Sagittarius'].includes(person1.astrology.sunSign) && ['Aries', 'Leo', 'Sagittarius'].includes(person2.astrology.sunSign) ? 20 : 10;
  const totalScore = sajuScore + ziWeiScore + matrixScore + astroScore;
  return {
    score: totalScore,
    details: `Your compatibility is ${totalScore}%. Strong alignment in ${sajuScore > 20 ? 'Saju' : 'other areas'}.`
  };
};

app.post('/api/calculate', (req, res) => {
  const { analysisType, person1, person2 } = req.body;
  if (!analysisType || !person1 || (analysisType === 'couple' && !person2)) {
    return res.status(400).json({ error: 'Invalid input' });
  }

  const processPerson = (person) => {
    const { name, gender, birthdate, birthTime, birthplace } = person;
    if (!name || !gender || !birthdate || !birthTime || !birthplace) {
      throw new Error('All fields are required');
    }
    const [year, month, day] = birthdate.split('-').map(Number);
    const hour = parseInt(birthTime.split(':')[0]);

    return {
      name,
      gender,
      birthplace,
      zodiac: calculateZodiac(year, month, day),
      saju: calculateSaju(year, month, day, hour),
      ziWeiDouShu: calculateZiWeiDouShu(year, month, day, hour),
      destinyMatrix: calculateDestinyMatrix(year, month, day),
      astrology: calculateAstrology(month, day),
      fengShui: calculateFengShui(year, gender),
      advice: ''
    };
  };

  try {
    const result = { person1: processPerson(person1) };
    if (analysisType === 'couple') {
      result.person2 = processPerson(person2);
      result.compatibility = calculateCompatibility(result.person1, result.person2);
    }
    result.person1.advice = generateAdvice(
      result.person1.saju,
      result.person1.ziWeiDouShu,
      result.person1.destinyMatrix,
      result.person1.astrology,
      result.person1.fengShui
    );
    if (result.person2) {
      result.person2.advice = generateAdvice(
        result.person2.saju,
        result.person2.ziWeiDouShu,
        result.person2.destinyMatrix,
        result.person2.astrology,
        result.person2.fengShui
      );
    }
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
