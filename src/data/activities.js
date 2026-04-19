// =============================================================================
// activities.js — 활동 데이터 가공 레이어 (Data Transform Layer)
// =============================================================================
//
// [Why] data.json은 순수 시간 데이터만 포함한다.
//       UI 렌더링에 필요한 테마(색상, 아이콘)는 관심사 분리 원칙에 따라
//       이 파일에서 병합(merge)하여 컴포넌트에 전달한다.
//       → 단일 진실 공급원(SSOT): 테마 변경 시 이 파일만 수정하면 된다.
//
// =============================================================================

import rawData from '../../data.json';

// -----------------------------------------------------------------------------
// THEME_MAP — 활동 타이틀을 키로, UI 테마(배경색 클래스·아이콘 경로)를 값으로 매핑
//
// [Why] Tailwind의 동적 클래스 생성을 막기 위해 완성된 클래스명을 미리 선언한다.
//       (예: `bg-${name}` 형태는 빌드 시 트리쉐이킹으로 제거될 수 있음)
// [How] tailwind.config.js의 커스텀 색상 키(work, play 등)와 1:1 대응한다.
// -----------------------------------------------------------------------------
const THEME_MAP = {
  'Work':      { colorClass: 'bg-work',      icon: '/images/icon-work.svg' },
  'Play':      { colorClass: 'bg-play',      icon: '/images/icon-play.svg' },
  'Study':     { colorClass: 'bg-study',     icon: '/images/icon-study.svg' },
  'Exercise':  { colorClass: 'bg-exercise',  icon: '/images/icon-exercise.svg' },
  'Social':    { colorClass: 'bg-social',    icon: '/images/icon-social.svg' },
  'Self Care': { colorClass: 'bg-self-care', icon: '/images/icon-self-care.svg' },
};

// -----------------------------------------------------------------------------
// activities — 컴포넌트가 실제로 소비하는 최종 활동 데이터 배열
//
// [How] rawData(시간 정보) + THEME_MAP(UI 테마)를 스프레드 연산자로 병합한다.
//       결과 구조: { title, timeframes: { daily, weekly, monthly }, colorClass, icon }
// -----------------------------------------------------------------------------
export const activities = rawData.map((item) => ({
  ...item,
  ...THEME_MAP[item.title],
}));
