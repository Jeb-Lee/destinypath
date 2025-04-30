import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const Calculator = () => {
  const { t } = useTranslation();
  const [analysisType, setAnalysisType] = useState('single');
  const [person1, setPerson1] = useState({
    name: '',
    gender: '',
    birthdate: '',
    birthTime: '',
    birthplace: ''
  });
  const [person2, setPerson2] = useState({
    name: '',
    gender: '',
    birthdate: '',
    birthTime: '',
    birthplace: ''
  });
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleInputChange = (person, field, value) => {
    if (person === 'person1') {
      setPerson1({ ...person1, [field]: value });
    } else {
      setPerson2({ ...person2, [field]: value });
    }
  };

  const handleCalculate = async () => {
    if (analysisType === 'single' && (!person1.name || !person1.gender || !person1.birthdate || !person1.birthTime || !person1.birthplace)) {
      setError(t('error_required', 'All fields are required for Person 1'));
      return;
    }
    if (analysisType === 'couple' && (!person1.name || !person1.gender || !person1.birthdate || !person1.birthTime || !person1.birthplace || !person2.name || !person2.gender || !person2.birthdate || !person2.birthTime || !person2.birthplace)) {
      setError(t('error_required_couple', 'All fields are required for both persons'));
      return;
    }
    setError(null);

    try {
      const payload = analysisType === 'single' ? { analysisType, person1 } : { analysisType, person1, person2 };
      const response = await fetch('http://localhost:5000/api/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!response.ok) {
        throw new Error('Failed to calculate');
      }
      const data = await response.json();
      if (data.error) {
        setError(data.error);
        return;
      }
      setResult(data);
    } catch (err) {
      setError(t('error_fetch', 'Error calculating results'));
    }
  };

  return (
    <div className="bg-purple-800 p-8 rounded-lg shadow-lg max-w-2xl w-full mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-white">{t('title')}</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Analysis Type Selection */}
      <div className="mb-6">
        <label className="block mb-2 text-white">{t('analysis_type')}</label>
        <select
          value={analysisType}
          onChange={(e) => setAnalysisType(e.target.value)}
          className="w-full p-2 rounded text-black"
        >
          <option value="single">{t('Single Analysis')}</option>
          <option value="couple">{t('Couple Compatibility')}</option>
        </select>
      </div>

      {/* Person 1 Inputs */}
      <h3 className="text-xl font-semibold mb-4 text-white">{t('person1')}</h3>
      <div className="mb-4">
        <label className="block mb-2 text-white">{t('Name')}</label>
        <input
          type="text"
          value={person1.name}
          onChange={(e) => handleInputChange('person1', 'name', e.target.value)}
          className="w-full p-2 rounded text-black"
          placeholder={t('Name')}
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2 text-white">{t('Gender')}</label>
        <select
          value={person1.gender}
          onChange={(e) => handleInputChange('person1', 'gender', e.target.value)}
          className="w-full p-2 rounded text-black"
        >
          <option value="">{t('Select gender')}</option>
          <option value="male">{t('Male')}</option>
          <option value="female">{t('Female')}</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block mb-2 text-white">{t('Birth Date')}</label>
        <input
          type="date"
          value={person1.birthdate}
          onChange={(e) => handleInputChange('person1', 'birthdate', e.target.value)}
          className="w-full p-2 rounded text-black"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2 text-white">{t('Birth Time')}</label>
        <input
          type="time"
          value={person1.birthTime}
          onChange={(e) => handleInputChange('person1', 'birthTime', e.target.value)}
          className="w-full p-2 rounded text-black"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2 text-white">{t('Birth Place')}</label>
        <input
          type="text"
          value={person1.birthplace}
          onChange={(e) => handleInputChange('person1', 'birthplace', e.target.value)}
          className="w-full p-2 rounded text-black"
          placeholder={t('Enter birthplace here')}
        />
      </div>

      {/* Person 2 Inputs (Couple Mode) */}
      {analysisType === 'couple' && (
        <>
          <h3 className="text-xl font-semibold mb-4 text-white">{t('person2')}</h3>
          <div className="mb-4">
            <label className="block mb-2 text-white">{t('Names')}</label>
            <input
              type="text"
              value={person2.name}
              onChange={(e) => handleInputChange('person2', 'name', e.target.value)}
              className="w-full p-2 rounded text-black"
              placeholder={t('Name')}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-white">{t('Gender')}</label>
            <select
              value={person2.gender}
              onChange={(e) => handleInputChange('person2', 'gender', e.target.value)}
              className="w-full p-2 rounded text-black"
            >
              <option value="">{t('Select Gender')}</option>
              <option value="male">{t('Male')}</option>
              <option value="female">{t('Female')}</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-white">{t('Birth Date')}</label>
            <input
              type="date"
              value={person2.birthdate}
              onChange={(e) => handleInputChange('person2', 'birthdate', e.target.value)}
              className="w-full p-2 rounded text-black"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-white">{t('Birth Time')}</label>
            <input
              type="time"
              value={person2.birthTime}
              onChange={(e) => handleInputChange('person2', 'birthTime', e.target.value)}
              className="w-full p-2 rounded text-black"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-white">{t('Birth Place')}</label>
            <input
              type="text"
              value={person2.birthplace}
              onChange={(e) => handleInputChange('person2', 'birthplace', e.target.value)}
              className="w-full p-2 rounded text-black"
              placeholder={t('Birthplace')}
            />
          </div>
        </>
      )}

      <button
        onClick={handleCalculate}
        className="bg-purple-600 hover:bg-purple-500 text-white p-2 rounded w-full mt-4"
      >
        {t('calculate')}
      </button>

      {/* Results */}
      {result && (
        <div className="mt-6 text-white">
          {analysisType === 'single' ? (
            <>
              <h3 className="text-xl font-semibold">{t('results_for', { name: result.person1.name })}</h3>
              <h4 className="text-lg font-semibold mt-4">{t('saju')}</h4>
              <p>Year Stem: {result.person1.saju.yearStem}</p>
              <p>Year Branch: {result.person1.saju.yearBranch}</p>
              <p>Month Stem: {result.person1.saju.monthStem}</p>
              <p>Month Branch: {result.person1.saju.monthBranch}</p>
              <p>Day Stem: {result.person1.saju.dayStem}</p>
              <p>Day Branch: {result.person1.saju.dayBranch}</p>
              <p>Hour Stem: {result.person1.saju.hourStem}</p>
              <p>Hour Branch: {result.person1.saju.hourBranch}</p>
              <h4 className="text-lg font-semibold mt-4">{t('zi_wei_dou_shu')}</h4>
              <p>Main Star: {result.person1.ziWeiDouShu.mainStar}</p>
              <p>Palace: {result.person1.ziWeiDouShu.palace}</p>
              <h4 className="text-lg font-semibold mt-4">{t('destiny_matrix')}</h4>
              <p>Strength: {result.person1.destinyMatrix.strength}</p>
              <p>Wisdom: {result.person1.destinyMatrix.wisdom}</p>
              <p>Charisma: {result.person1.destinyMatrix.charisma}</p>
              <h4 className="text-lg font-semibold mt-4">{t('astrology')}</h4>
              <p>Sun Sign: {result.person1.astrology.sunSign}</p>
              <h4 className="text-lg font-semibold mt-4">{t('feng_shui')}</h4>
              <p>Kua Number: {result.person1.fengShui.kuaNumber}</p>
              <p>Best Direction: {result.person1.fengShui.bestDirection}</p>
              <h4 className="text-lg font-semibold mt-4">{t('advice')}</h4>
              <p>{result.person1.advice}</p>
            </>
          ) : (
            <>
              <h3 className="text-xl font-semibold">{t('couple_compatibility')}</h3>
              <h4 className="text-lg font-semibold mt-4">{t('person1_results', { name: result.person1.name })}</h4>
              <p>Saju: {result.person1.saju.yearStem} {result.person1.saju.yearBranch}...</p>
              <p>Zi Wei Dou Shu: {result.person1.ziWeiDouShu.mainStar}</p>
              <p>Destiny Matrix: Strength {result.person1.destinyMatrix.strength}</p>
              <p>Astrology: {result.person1.astrology.sunSign}</p>
              <p>Feng Shui: Kua {result.person1.fengShui.kuaNumber}</p>
              <h4 className="text-lg font-semibold mt-4">{t('person2_results', { name: result.person2.name })}</h4>
              <p>Saju: {result.person2.saju.yearStem} {result.person2.saju.yearBranch}...</p>
              <p>Zi Wei Dou Shu: {result.person2.ziWeiDouShu.mainStar}</p>
              <p>Destiny Matrix: Strength {result.person2.destinyMatrix.strength}</p>
              <p>Astrology: {result.person2.astrology.sunSign}</p>
              <p>Feng Shui: Kua {result.person2.fengShui.kuaNumber}</p>
              <h4 className="text-lg font-semibold mt-4">{t('compatibility')}</h4>
              <p>Score: {result.compatibility.score}%</p>
              <p>Details: {result.compatibility.details}</p>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Calculator;