import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ErrorBoundary from './ErrorBoundary';

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
  const [loading, setLoading] = useState(false);

  const handleInputChange = (person, field, value) => {
    if (person === 'person1') {
      setPerson1(prev => ({ ...prev, [field]: value }));
    } else {
      setPerson2(prev => ({ ...prev, [field]: value }));
    }
  };

  const validateInputs = () => {
    const requiredFields = ['name', 'gender', 'birthdate', 'birthTime', 'birthplace'];
    const person1Valid = requiredFields.every(field => person1[field]);
    
    if (analysisType === 'single') {
      if (!person1Valid) {
        setError(t('error.required_fields'));
        return false;
      }
    } else {
      const person2Valid = requiredFields.every(field => person2[field]);
      if (!person1Valid || !person2Valid) {
        setError(t('error.required_fields'));
        return false;
      }
    }
    return true;
  };

  const handleCalculate = async () => {
    if (!validateInputs()) return;
    
    setLoading(true);
    setError(null);

    try {
      const payload = analysisType === 'single' 
        ? { analysisType, person1 } 
        : { analysisType, person1, person2 };

      const response = await fetch('http://localhost:5000/api/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(t('error.calculation_failed'));
      }

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }

      setResult(data);
    } catch (err) {
      setError(err.message.includes('Failed to fetch') 
        ? t('error.connection_failed') 
        : err.message);
    } finally {
      setLoading(false);
    }
  };

  const renderResultSection = () => {
    if (!result) return null;

    const getValue = (obj, path, defaultValue = 'N/A') => {
      return path.split('.').reduce((o, p) => (o && o[p] !== undefined ? o[p] : defaultValue), obj);
    };

    return (
      <div className="mt-6 text-white">
        {analysisType === 'single' ? (
          <>
            <h3 className="text-xl font-semibold">
              {t('results_for', { name: getValue(result, 'person1.name', t('person_1')) })}
            </h3>
            
            <h4 className="text-lg font-semibold mt-4">{t('saju')}</h4>
            <p>{t('year_stem')}: {getValue(result, 'person1.saju.yearStem')}</p>
            <p>{t('year_branch')}: {getValue(result, 'person1.saju.yearBranch')}</p>
            <p>{t('month_stem')}: {getValue(result, 'person1.saju.monthStem')}</p>
            <p>{t('month_branch')}: {getValue(result, 'person1.saju.monthBranch')}</p>
            <p>{t('day_stem')}: {getValue(result, 'person1.saju.dayStem')}</p>
            <p>{t('day_branch')}: {getValue(result, 'person1.saju.dayBranch')}</p>
            <p>{t('hour_stem')}: {getValue(result, 'person1.saju.hourStem')}</p>
            <p>{t('hour_branch')}: {getValue(result, 'person1.saju.hourBranch')}</p>

            <h4 className="text-lg font-semibold mt-4">{t('zi_wei_dou_shu')}</h4>
            <p>{t('main_star')}: {getValue(result, 'person1.ziWeiDouShu.mainStar')}</p>
            <p>{t('palace')}: {getValue(result, 'person1.ziWeiDouShu.palace')}</p>

            <h4 className="text-lg font-semibold mt-4">{t('destiny_matrix')}</h4>
            <p>{t('strength')}: {getValue(result, 'person1.destinyMatrix.strength')}</p>
            <p>{t('wisdom')}: {getValue(result, 'person1.destinyMatrix.wisdom')}</p>
            <p>{t('charisma')}: {getValue(result, 'person1.destinyMatrix.charisma')}</p>

            <h4 className="text-lg font-semibold mt-4">{t('astrology')}</h4>
            <p>{t('sun_sign')}: {getValue(result, 'person1.astrology.sunSign')}</p>

            <h4 className="text-lg font-semibold mt-4">{t('feng_shui')}</h4>
            <p>{t('kua_number')}: {getValue(result, 'person1.fengShui.kuaNumber')}</p>
            <p>{t('best_direction')}: {getValue(result, 'person1.fengShui.bestDirection')}</p>

            <h4 className="text-lg font-semibold mt-4">{t('advice')}</h4>
            <p>{getValue(result, 'person1.advice', t('no_advice_available'))}</p>
          </>
        ) : (
          <>
            <h3 className="text-xl font-semibold">{t('couple_compatibility')}</h3>
            
            <h4 className="text-lg font-semibold mt-4">
              {t('person1_results', { name: getValue(result, 'person1.name', t('person_1')) })}
            </h4>
            <p>{t('saju')}: {getValue(result, 'person1.saju.yearStem')} {getValue(result, 'person1.saju.yearBranch')}</p>
            <p>{t('zi_wei_dou_shu')}: {getValue(result, 'person1.ziWeiDouShu.mainStar')}</p>
            <p>{t('destiny_matrix')}: {t('strength')} {getValue(result, 'person1.destinyMatrix.strength')}</p>
            <p>{t('astrology')}: {getValue(result, 'person1.astrology.sunSign')}</p>
            <p>{t('feng_shui')}: {t('kua')} {getValue(result, 'person1.fengShui.kuaNumber')}</p>

            <h4 className="text-lg font-semibold mt-4">
              {t('person2_results', { name: getValue(result, 'person2.name', t('person_2')) })}
            </h4>
            <p>{t('saju')}: {getValue(result, 'person2.saju.yearStem')} {getValue(result, 'person2.saju.yearBranch')}</p>
            <p>{t('zi_wei_dou_shu')}: {getValue(result, 'person2.ziWeiDouShu.mainStar')}</p>
            <p>{t('destiny_matrix')}: {t('strength')} {getValue(result, 'person2.destinyMatrix.strength')}</p>
            <p>{t('astrology')}: {getValue(result, 'person2.astrology.sunSign')}</p>
            <p>{t('feng_shui')}: {t('kua')} {getValue(result, 'person2.fengShui.kuaNumber')}</p>

            <h4 className="text-lg font-semibold mt-4">{t('compatibility')}</h4>
            <p>{t('score')}: {getValue(result, 'compatibility.score')}%</p>
            <p>{t('details')}: {getValue(result, 'compatibility.details', t('no_details_available'))}</p>
          </>
        )}
      </div>
    );
  };

  return (
    <ErrorBoundary>
      <div className="bg-purple-800 p-8 rounded-lg shadow-lg max-w-2xl w-full mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-white">{t('calculator.analysis_type_selection')}</h2>
        
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
            {error}
          </div>
        )}

        <div className="mb-6">
          <label className="block mb-2 text-white">{t('calculator.analysis_type')}</label>
          <select
            value={analysisType}
            onChange={(e) => setAnalysisType(e.target.value)}
            className="w-full p-2 rounded text-black"
          >
            <option value="single">{t('calculator.single_analysis')}</option>
            <option value="couple">{t('calculator.couple_compatibility')}</option>
          </select>
        </div>

        <div className="space-y-4">
          {/* Person 1 Inputs */}
          <div className="bg-purple-700 p-4 rounded-lg">
            <h3 className="text-xl font-semibold mb-4 text-white">{t('calculator.person_1')}</h3>
            <div className="mb-4">
              <label className="block mb-2 text-white">{t('calculator.name')}</label>
              <input
                type="text"
                value={person1.name}
                onChange={(e) => handleInputChange('person1', 'name', e.target.value)}
                className="w-full p-2 rounded text-black"
                placeholder={t('calculator.name')}
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-white">{t('calculator.gender')}</label>
              <select
                value={person1.gender}
                onChange={(e) => handleInputChange('person1', 'gender', e.target.value)}
                className="w-full p-2 rounded text-black"
              >
                <option value="">{t('calculator.select_gender')}</option>
                <option value="male">{t('calculator.male')}</option>
                <option value="female">{t('calculator.female')}</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="mb-4">
                <label className="block mb-2 text-white">{t('calculator.birth_date')}</label>
                <input
                  type="date"
                  value={person1.birthdate}
                  onChange={(e) => handleInputChange('person1', 'birthdate', e.target.value)}
                  className="w-full p-2 rounded text-black"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-white">{t('calculator.birth_time')}</label>
                <input
                  type="time"
                  value={person1.birthTime}
                  onChange={(e) => handleInputChange('person1', 'birthTime', e.target.value)}
                  className="w-full p-2 rounded text-black"
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-white">{t('calculator.birth_place')}</label>
              <input
                type="text"
                value={person1.birthplace}
                onChange={(e) => handleInputChange('person1', 'birthplace', e.target.value)}
                className="w-full p-2 rounded text-black"
                placeholder={t('calculator.enter_birthplace')}
              />
            </div>
          </div>

          {/* Person 2 Inputs (Conditional) */}
          {analysisType === 'couple' && (
            <div className="bg-purple-700 p-4 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 text-white">{t('calculator.person_2')}</h3>
              <div className="mb-4">
                <label className="block mb-2 text-white">{t('calculator.name')}</label>
                <input
                  type="text"
                  value={person2.name}
                  onChange={(e) => handleInputChange('person2', 'name', e.target.value)}
                  className="w-full p-2 rounded text-black"
                  placeholder={t('calculator.name')}
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-white">{t('calculator.gender')}</label>
                <select
                  value={person2.gender}
                  onChange={(e) => handleInputChange('person2', 'gender', e.target.value)}
                  className="w-full p-2 rounded text-black"
                >
                  <option value="">{t('calculator.select_gender')}</option>
                  <option value="male">{t('calculator.male')}</option>
                  <option value="female">{t('calculator.female')}</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="mb-4">
                  <label className="block mb-2 text-white">{t('calculator.birth_date')}</label>
                  <input
                    type="date"
                    value={person2.birthdate}
                    onChange={(e) => handleInputChange('person2', 'birthdate', e.target.value)}
                    className="w-full p-2 rounded text-black"
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-2 text-white">{t('calculator.birth_time')}</label>
                  <input
                    type="time"
                    value={person2.birthTime}
                    onChange={(e) => handleInputChange('person2', 'birthTime', e.target.value)}
                    className="w-full p-2 rounded text-black"
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-white">{t('calculator.birth_place')}</label>
                <input
                  type="text"
                  value={person2.birthplace}
                  onChange={(e) => handleInputChange('person2', 'birthplace', e.target.value)}
                  className="w-full p-2 rounded text-black"
                  placeholder={t('calculator.enter_birthplace')}
                />
              </div>
            </div>
          )}
        </div>

        <button
          onClick={handleCalculate}
          disabled={loading}
          className={`bg-purple-600 hover:bg-purple-500 text-white p-2 rounded w-full mt-4 ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {loading ? t('calculator.calculating') : t('calculator.calculate')}
        </button>

        {renderResultSection()}
      </div>
    </ErrorBoundary>
  );
};

export default Calculator;