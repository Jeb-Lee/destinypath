import React, { useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

// Helper components moved to top
const InputField = ({ label, type = 'text', value, onChange }) => (
  <div>
    <label className="block mb-1 text-sm font-medium">{label}</label>
    <input
      type={type}
      className="w-full p-2 border rounded"
      value={value}
      onChange={onChange}
      required
    />
  </div>
);

const SelectField = ({ label, value, onChange, options }) => (
  <div>
    <label className="block mb-1 text-sm font-medium">{label}</label>
    <select
      className="w-full p-2 border rounded"
      value={value}
      onChange={onChange}
      required
    >
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

const Calculator = () => {
  const [analysisType, setAnalysisType] = useState('single');
  const [person1, setPerson1] = useState({
    name: '',
    birthDate: '',
    birthTime: '',
    birthPlace: '',
    gender: 'male'
  });
  const [person2, setPerson2] = useState({
    name: '',
    birthDate: '',
    birthTime: '',
    birthPlace: '',
    gender: 'female'
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Moved render functions before they're used
  const renderPersonAnalysis = (personData) => (
    <div className="analysis-container">
      <h2 className="text-xl font-bold mb-4">{personData.name}'s Analysis</h2>
      <Tabs>
        <TabList>
          <Tab>Core Analysis</Tab>
          <Tab>Life Path</Tab>
          <Tab>Recommendations</Tab>
        </TabList>

        <TabPanel>
          <div className="analysis-section">
            <h3 className="text-lg font-semibold mb-2">Chinese Astrology</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium">Bazi (Four Pillars)</h4>
                <p>Year: {personData.personalAnalysis?.bazi?.yearPillar || 'N/A'}</p>
                <p>Month: {personData.personalAnalysis?.bazi?.monthPillar || 'N/A'}</p>
                <p>Day: {personData.personalAnalysis?.bazi?.dayPillar || 'N/A'}</p>
                <p>Hour: {personData.personalAnalysis?.bazi?.hourPillar || 'N/A'}</p>
              </div>
              <div>
                <h4 className="font-medium">Zi Wei Dou Shu</h4>
                <p>Main Star: {personData.personalAnalysis?.ziWeiDouShu?.mainStar || 'N/A'}</p>
                <p>Life Palace: {personData.personalAnalysis?.ziWeiDouShu?.lifePalace || 'N/A'}</p>
              </div>
            </div>

            <h3 className="text-lg font-semibold mt-4 mb-2">Western Astrology</h3>
            <div className="natal-chart">
              <p>Sun: {personData.personalAnalysis?.natalChart?.sun || 'N/A'}</p>
              <p>Moon: {personData.personalAnalysis?.natalChart?.moon || 'N/A'}</p>
              <p>Ascendant: {personData.personalAnalysis?.natalChart?.ascendant || 'N/A'}</p>
            </div>
          </div>
        </TabPanel>

        <TabPanel>
          <div className="life-path">
            <h3 className="text-lg font-semibold mb-2">Current Life Cycle</h3>
            <p>{personData.lifePathAnalysis?.currentCycle?.description || 'No data available'}</p>
            
            <h3 className="text-lg font-semibold mt-4 mb-2">Yearly Forecast</h3>
            <ul className="list-disc pl-5">
              {personData.lifePathAnalysis?.yearlyForecast?.map((item, i) => (
                <li key={i} className="mb-1">
                  <strong>{item.area}:</strong> {item.prediction}
                </li>
              )) || <li>No forecast data available</li>}
            </ul>
          </div>
        </TabPanel>

        <TabPanel>
          <div className="recommendations">
            <h3 className="text-lg font-semibold mb-2">Career Suggestions</h3>
            <ul className="list-disc pl-5">
              {personData.recommendations?.careerSuggestions?.map((career, i) => (
                <li key={i} className="mb-1">{career}</li>
              )) || <li>No career suggestions available</li>}
            </ul>

            <h3 className="text-lg font-semibold mt-4 mb-2">Health Advice</h3>
            <p>{personData.recommendations?.healthAdvice || 'No health advice available'}</p>
          </div>
        </TabPanel>
      </Tabs>
    </div>
  );

  const renderCompatibility = (compData) => (
    <div className="compatibility-analysis mt-8">
      <h2 className="text-xl font-bold mb-4">Relationship Compatibility</h2>
      <div className="score-meter bg-gray-200 rounded-full h-6 mb-4">
        <div 
          className="score-bar bg-blue-500 rounded-full h-full text-white text-xs flex items-center justify-center" 
          style={{ width: `${compData.relationshipAnalysis?.compatibilityScore || 0}%` }}
        >
          {compData.relationshipAnalysis?.compatibilityScore || 0}%
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <h3 className="text-lg font-semibold mb-2">Strengths</h3>
          <ul className="list-disc pl-5">
            {compData.relationshipAnalysis?.strengths?.map((s, i) => (
              <li key={i} className="mb-1">{s}</li>
            )) || <li>No strengths data available</li>}
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Challenges</h3>
          <ul className="list-disc pl-5">
            {compData.relationshipAnalysis?.challenges?.map((c, i) => (
              <li key={i} className="mb-1">{c}</li>
            )) || <li>No challenges data available</li>}
          </ul>
        </div>
      </div>

      <h3 className="text-lg font-semibold mt-6 mb-2">Growth Opportunities</h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h4 className="font-medium">Communication</h4>
          <p>{compData.growthOpportunities?.communicationStyle || 'No data available'}</p>
        </div>
        <div>
          <h4 className="font-medium">Emotional Connection</h4>
          <p>{compData.growthOpportunities?.emotionalConnection || 'No data available'}</p>
        </div>
      </div>
    </div>
  );

  const formatPersonData = (person) => {
    // Validate birth date exists and is valid
    if (!person.birthDate) {
      throw new Error('Birth date is required');
    }
    
    const birthDate = new Date(person.birthDate);
    if (isNaN(birthDate.getTime())) {
      throw new Error('Invalid birth date format');
    }

    return {
      ...person,
      birthDate: birthDate.toISOString()
    };
  };

  const handleInputChange = (person, field) => (e) => {
    const value = e.target.value;
    if (person === 'person1') {
      setPerson1(prev => ({ ...prev, [field]: value }));
    } else {
      setPerson2(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleCalculate = async () => {
    setLoading(true);
    setError(null);
    try {
      // Validate required fields
      if (!person1.name || !person1.birthDate || !person1.birthTime || !person1.birthPlace) {
        throw new Error('Please fill all required fields for Person 1');
      }
      
      if (analysisType === 'couple' && 
          (!person2.name || !person2.birthDate || !person2.birthTime || !person2.birthPlace)) {
        throw new Error('Please fill all required fields for Person 2');
      }

      const response = await fetch('http://localhost:5000/api/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          analysisType,
          person1: formatPersonData(person1),
          person2: analysisType === 'couple' ? formatPersonData(person2) : null
        })
      });

      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}`);
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err.message);
      console.error('Calculation error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6">Destiny Path Calculator</h1>
        
        <div className="mb-4">
          <label className="block mb-2 font-medium">Analysis Type:</label>
          <select 
            className="w-full p-2 border rounded"
            value={analysisType}
            onChange={(e) => setAnalysisType(e.target.value)}
          >
            <option value="single">Single Analysis</option>
            <option value="couple">Couple Compatibility</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="person-input bg-gray-50 p-4 rounded">
            <h2 className="text-lg font-semibold mb-3">Person 1</h2>
            <div className="space-y-3">
              <InputField label="Full Name" value={person1.name} onChange={handleInputChange('person1', 'name')} />
              <InputField label="Birth Date" type="date" value={person1.birthDate} onChange={handleInputChange('person1', 'birthDate')} />
              <InputField label="Birth Time" type="time" value={person1.birthTime} onChange={handleInputChange('person1', 'birthTime')} />
              <InputField label="Birth Place (City, Country)" value={person1.birthPlace} onChange={handleInputChange('person1', 'birthPlace')} />
              <SelectField 
                label="Gender" 
                value={person1.gender}
                onChange={handleInputChange('person1', 'gender')}
                options={[
                  { value: 'male', label: 'Male' },
                  { value: 'female', label: 'Female' },
                  { value: 'other', label: 'Other' }
                ]}
              />
            </div>
          </div>

          {analysisType === 'couple' && (
            <div className="person-input bg-gray-50 p-4 rounded">
              <h2 className="text-lg font-semibold mb-3">Person 2</h2>
              <div className="space-y-3">
                <InputField label="Full Name" value={person2.name} onChange={handleInputChange('person2', 'name')} />
                <InputField label="Birth Date" type="date" value={person2.birthDate} onChange={handleInputChange('person2', 'birthDate')} />
                <InputField label="Birth Time" type="time" value={person2.birthTime} onChange={handleInputChange('person2', 'birthTime')} />
                <InputField label="Birth Place (City, Country)" value={person2.birthPlace} onChange={handleInputChange('person2', 'birthPlace')} />
                <SelectField 
                  label="Gender" 
                  value={person2.gender}
                  onChange={handleInputChange('person2', 'gender')}
                  options={[
                    { value: 'male', label: 'Male' },
                    { value: 'female', label: 'Female' },
                    { value: 'other', label: 'Other' }
                  ]}
                />
              </div>
            </div>
          )}
        </div>

        <button
          className={`w-full py-3 px-4 rounded-md font-medium text-white ${loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'}`}
          onClick={handleCalculate}
          disabled={loading}
        >
          {loading ? 'Calculating...' : 'Calculate Destiny Path'}
        </button>

        {error && (
          <div className="mt-4 p-3 bg-red-100 text-red-700 rounded">
            Error: {error}
          </div>
        )}

        {result && (
          <div className="results-container mt-8">
            {renderPersonAnalysis(result.person1)}
            
            {analysisType === 'couple' && result.person2 && (
              <>
                {renderPersonAnalysis(result.person2)}
                {renderCompatibility(result.compatibility)}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Calculator;