import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18next
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          title: 'Destiny Path Calculator',
          analysis_type: 'Analysis Type',
          single_analysis: 'Single Analysis',
          couple_compatibility: 'Couple Compatibility',
          person1: 'Person 1',
          person2: 'Person 2',
          name_label: 'Full Name',
          name_placeholder: 'Enter full name',
          gender_label: 'Gender',
          select_gender: 'Select gender',
          male: 'Male',
          female: 'Female',
          birthdate_label: 'Birth Date',
          birth_time_label: 'Birth Time',
          birthplace_label: 'Birth Place',
          birthplace_placeholder: 'Enter birth place',
          calculate: 'Calculate',
          error_required: 'All fields are required for Person 1',
          error_required_couple: 'All fields are required for both persons',
          error_fetch: 'Error calculating results',
          results_for: 'Results for {{name}}',
          person1_results: 'Results for {{name}}',
          person2_results: 'Results for {{name}}',
          saju: 'Saju (Four Pillars)',
          zi_wei_dou_shu: 'Zi Wei Dou Shu',
          destiny_matrix: 'Destiny Matrix',
          astrology: 'Western Astrology',
          feng_shui: 'Feng Shui',
          advice: 'Personalized Advice',
          compatibility: 'Compatibility'
        }
      }
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18next;