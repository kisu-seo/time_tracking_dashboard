// =============================================================================
// App.jsx — 루트 레이아웃 & 전역 상태 관리 (Root Layout & Global State)
// =============================================================================
//
// [Why] 이 컴포넌트는 두 가지 단일 책임만 갖는다.
//   1. 전역 시간대(timeframe) 상태의 소유자(Source of Truth)
//   2. ProfileCard와 ActivityCard를 조율하는 반응형 그리드 컨테이너
//
// [구조] ProfileCard는 상태를 읽고 변경하며, ActivityCard는 상태를 읽기만 한다.
//        단방향 데이터 흐름: App(상태) → ProfileCard(읽기+쓰기), ActivityCard(읽기)
//
// =============================================================================

import { useState } from 'react';
import { activities } from './data/activities';
import ProfileCard from './components/ProfileCard';
import ActivityCard from './components/ActivityCard';

export default function App() {
  // [Why] timeframe 상태를 App에서 관리하는 이유:
  //       ProfileCard(변경)와 ActivityCard(소비) 두 형제 컴포넌트가 공유해야 하므로
  //       공통 조상(Lifting State Up 패턴)인 이 컴포넌트가 소유한다.
  const [timeframe, setTimeframe] = useState('weekly');

  return (
    // [Why] 이 div는 데스크톱(lg:)에서만 역할을 갖는다.
    //       max-w-5xl로 너비가 제한된 <main>을 뷰포트 정중앙에 배치하기 위해
    //       min-h-screen 높이의 flex 컨테이너로 감싼다.
    <div className="lg:flex lg:min-h-screen lg:items-center lg:justify-center">

      {/*
        [반응형 레이아웃 전략]
        - 모바일  : flex-col, 세로 1열 스택 (gap 24px, 좌우 24px / 상하 81px 패딩)
        - 태블릿  : 동일 구조, 패딩만 확장 (좌우 78px / 상하 174px)
        - 데스크톱: CSS Grid 2열로 전환 (프로필 255px 고정 | 활동 카드 1fr 유동)
                   max-w-5xl로 최대 너비를 제한하고 가로 중앙 정렬 (lg:mx-auto)
                   세로 gap은 제거(gap-y-0)하여 의도치 않은 하단 여백을 방지한다.
      */}
      <main className="
        w-full font-rubik
        flex flex-col gap-6
        px-6 py-[81px]
        md:px-[78px] md:py-[174px]
        lg:grid lg:grid-cols-[255px_1fr]
        lg:gap-x-8 lg:gap-y-0
        lg:max-w-5xl lg:mx-auto
        lg:px-0 lg:pt-0 lg:pb-0
        lg:items-start
      ">

        {/* 좌측 열: 사용자 정보 + 시간대 탭 (데스크톱 고정 너비 255px) */}
        <ProfileCard timeframe={timeframe} onTimeframeChange={setTimeframe} />

        {/* 우측 열: 6개 활동 카드 그리드
            [Why] lg:grid-cols-3을 md:와 분리 선언한 이유:
                  태블릿(3열)과 데스크톱(3열)의 열 수는 같지만,
                  부모 그리드 구조가 달라 독립적으로 명시하는 것이 의도를 명확히 한다.
        */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-3 lg:gap-8">
          {activities.map((activity) => (
            <ActivityCard
              key={activity.title}
              activity={activity}
              timeframe={timeframe}
            />
          ))}
        </div>

      </main>
    </div>
  );
}
