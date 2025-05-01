import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

i18next
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          app_title: 'Destiny Path Calculator',
          app_subtitle: 'Discover your destiny through Saju, Zi Wei Dou Shu, and more',
          title: 'Destiny Analysis',
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
          compatibility: 'Compatibility',
          language: {
            english: 'English',
            korean: '한국어'
          }
        }
      },
      ko: {
        translation: {
          app_title: '운명 경로 계산기',
          app_subtitle: '사주, 자미두수 등을 통해 운명을 알아보세요',
          title: '운명 분석',
          analysis_type: '분석 유형',
          single_analysis: '개인 분석',
          couple_compatibility: '커플 궁합',
          person1: '첫 번째 사람',
          person2: '두 번째 사람',
          name_label: '전체 이름',
          name_placeholder: '전체 이름을 입력하세요',
          gender_label: '성별',
          select_gender: '성별 선택',
          male: '남성',
          female: '여성',
          birthdate_label: '생년월일',
          birth_time_label: '출생 시간',
          birthplace_label: '출생지',
          birthplace_placeholder: '출생지를 입력하세요',
          calculate: '계산',
          error_required: '첫 번째 사람의 모든 필드가 필요합니다',
          error_required_couple: '두 사람 모두의 모든 필드가 필요합니다',
          error_fetch: '결과 계산 중 오류 발생',
          results_for: '{{name}}님의 결과',
          person1_results: '{{name}}님의 결과',
          person2_results: '{{name}}님의 결과',
          saju: '사주 (사주팔자)',
          zi_wei_dou_shu: '자미두수',
          destiny_matrix: '운명 매트릭스',
          astrology: '서양 점성술',
          feng_shui: '풍수',
          advice: '개인화된 조언',
          compatibility: '궁합',
          language: {
            english: '영어',
            korean: '한국어'
          }
        }
      }
    },
    fallbackLng: 'en',
    lng: 'en',
    debug: true,
    interpolation: {
      escapeValue: false
    }
  });

export default i18next;
