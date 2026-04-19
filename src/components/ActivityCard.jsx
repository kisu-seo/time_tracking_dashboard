// =============================================================================
// ActivityCard.jsx — 개별 활동 시간 추적 카드 (Individual Activity Tracking Card)
// =============================================================================
//
// [구조] 이 컴포넌트는 시각적으로 두 레이어로 구성된다.
//   Layer 1 (컬러 모자): 활동별 고유 색상 배경 + 반투명 아이콘 오버레이
//   Layer 2 (네이비 본문): 타이틀, 더보기 버튼, 현재/이전 기간 시간 통계
//
// [Why] 두 레이어를 별도 요소로 분리하고 음수 마진(-mt)으로 겹치는 이유:
//       CSS의 position/z-index 없이 순수 레이아웃 흐름만으로 "카드 위에 모자를 얹은"
//       디자인 시안의 레이어드 효과를 구현할 수 있기 때문이다.
//
// =============================================================================

// -----------------------------------------------------------------------------
// PREV_LABEL — 시간대별 "이전 기간" UI 레이블 (SSOT)
//
// [Why] 이 매핑을 컴포넌트 외부에 두는 이유:
//       렌더링마다 객체가 재생성되는 것을 막고,
//       레이블 문구 변경 시 이 선언부 한 곳만 수정하면 된다.
// -----------------------------------------------------------------------------
const PREV_LABEL = {
  daily:   'Yesterday',
  weekly:  'Last Week',
  monthly: 'Last Month',
};

// -----------------------------------------------------------------------------
// fmt — 시간 수(숫자)를 표시 문자열로 변환하는 순수 함수 (Pure Utility)
//
// [Why] 단수/복수 처리 로직을 인라인으로 두지 않고 함수로 분리한 이유:
//       JSX 내부에 삼항 연산자가 중첩되어 가독성을 해치는 것을 방지한다.
// [How] n === 1이면 "1hr", 그 외에는 "Xhr s" 형태로 반환한다.
// -----------------------------------------------------------------------------
const fmt = (n) => `${n}hr${n !== 1 ? 's' : ''}`;

// =============================================================================

// [Why] 이앨지를 문자열 경로가 아닌 ES Module import로 불러오는 이유:
//       Vite가 빌드 시 base 경로를 자동 적용하여 GitHub Pages 등 서브 디렉토리 배포 시에도
//       항상 올바른 URL이 생성된다. (문자열 경로는 base 설정을 반영하지 않음)
import ellipsisIcon from '../assets/images/icon-ellipsis.svg';

/**
 * @component ActivityCard
 * @param {object}                       activity   - activities.js에서 가공된 활동 데이터
 *   @param {string}                     activity.title      - 활동명 (예: 'Work', 'Play')
 *   @param {string}                     activity.colorClass - Tailwind 배경색 클래스 (예: 'bg-work')
 *   @param {string}                     activity.icon       - 아이콘 이미지 경로
 *   @param {object}                     activity.timeframes - 시간대별 데이터 { daily, weekly, monthly }
 * @param {('daily'|'weekly'|'monthly')} timeframe  - App에서 내려오는 현재 선택된 시간대
 */
export default function ActivityCard({ activity, timeframe }) {
  const { title, colorClass, icon, timeframes } = activity;
  const { current, previous } = timeframes[timeframe];

  // [Why] PREV_LABEL 조회를 렌더 시점에 한 번만 수행하여 JSX를 간결하게 유지한다.
  const prevLabel = PREV_LABEL[timeframe];

  return (
    // [Why] <article>을 사용하는 이유: 각 카드는 독립적으로 의미를 가지는 콘텐츠 단위이므로
    //       섹션 시멘틱 요소 중 self-contained content에 해당하는 article이 적합하다. (A11y)
    <article
      className="rounded-2xl overflow-hidden"
      aria-label={`${title} 활동 카드`}
    >

      {/* ── Layer 1: 컬러 모자 레이어 ──────────────────────────────────────── */}
      {/*
        [Why] overflow-hidden: 아이콘이 -top-3으로 살짝 위로 튀어나왔을 때
              이 컨테이너 영역 밖으로 넘치지 않도록 잘라낸다.
        [Why] 아이콘에 opacity-75를 적용하는 이유:
              배경색 위에서 아이콘이 과하게 강조되지 않고 자연스럽게 녹아드는
              디자인 시안의 반투명 오버레이 효과를 구현한다.
      */}
      <div className={`${colorClass} h-[76px] relative overflow-hidden`}>
        <img
          src={icon}
          alt=""
          aria-hidden="true"
          className="absolute -top-3 right-4 w-[78px] h-[78px] opacity-75 object-contain"
        />
      </div>

      {/* ── Layer 2: 네이비 본문 레이어 ────────────────────────────────────── */}
      {/*
        [Why] 음수 마진(-mt)으로 Layer 1 위에 겹치는 이유:
              Layer 1의 높이(76px)를 유지하면서 본문이 위로 슬라이드업되어
              "카드 위에 모자를 얹은" 레이어드 카드 비주얼을 만든다.
              마진 값은 해상도별로 달라진다:
              -38px (모바일) / -42px (태블릿) / -30px (데스크톱)

        [Why] 높이를 고정하는 이유:
              6개 카드의 본문 높이를 통일하여 활동 카드 그리드의 행 높이를 일정하게 유지한다.
              122px (모바일) / 180px (태블릿) / 199px (데스크톱)

        [Why] lg:hover:bg-navy-800를 데스크톱에서만 적용하는 이유:
              모바일/태블릿의 터치 환경에서는 hover 상태가 클릭 후에도 유지(Sticky Hover)되어
              의도치 않은 색상 잔상이 남는다. 마우스가 있는 데스크톱에서만 활성화한다.
      */}
      <div className="
        bg-navy-900 rounded-t-2xl
        -mt-[38px] md:-mt-[42px] lg:-mt-[30px]
        p-6 h-[122px] md:h-[180px] lg:h-[199px] lg:p-8
        relative z-10
        transition-colors duration-200 lg:hover:bg-navy-800
      ">

        {/* 타이틀 + 더보기(점점점 / Ellipsis) 버튼 행 */}
        <div className="flex items-center justify-between mb-2 md:mb-4 lg:mb-[24px]">

          <h2 className="text-white font-medium text-lg">{title}</h2>

          {/* [Why] 버튼에 aria-label을 부여하는 이유:
                    아이콘만으로는 스크린 리더가 버튼의 목적을 알 수 없으므로,
                    접근 가능한 레이블로 "Work 더 보기" 등 의미를 명시한다. (A11y)
              [Why] 아이콘 이미지에 aria-hidden="true"를 적용하는 이유:
                    부모 버튼에 이미 aria-label이 있으므로, 이미지를 스크린 리더에서
                    중복 낭독 하지 않도록 숨긴다.
          */}
          <button
            aria-label={`${title} 더 보기`}
            className="text-navy-200 transition-colors duration-200 flex items-center lg:hover:text-white"
          >
            <img
              src={ellipsisIcon}
              alt=""
              aria-hidden="true"
              className="w-[21px] md:w-[12px] lg:w-[21px] transition-all lg:hover:brightness-150"
            />
          </button>

        </div>

        {/* 시간 통계 영역: 현재 기간 + 이전 기간 비교 */}
        {/*
          [반응형 전략]
          - 모바일  : 현재 시간과 이전 기간 텍스트를 가로(row)로 나란히 배치
                     (flex justify-between으로 양 끝 정렬)
          - 태블릿/데스크톱: 세로(column)로 전환, 현재 시간이 위, 이전 기간이 아래
        */}
        <div className="flex items-center justify-between md:flex-col md:items-start lg:gap-0">

          {/* 현재 기간 시간 표시 (style-guide.md 기준: Text Preset 1)
              - 모바일  : 32px
              - 태블릿/데스크톱: 56px / line-height 66px
              [Why] lg:mb-2: 데스크톱에서 현재 시간과 이전 기간 텍스트 사이에
                    8px 간격을 부여해 두 정보를 시각적으로 구분한다.
          */}
          <p className="
            text-white font-light leading-none
            text-[2rem]
            md:text-[56px] md:leading-[66px] md:mb-2 lg:mb-2
          ">
            {fmt(current)}
          </p>

          {/* 이전 기간 비교 텍스트 (예: "Last Week - 36hrs")
              흐린 navy-200 색상으로 현재 시간보다 시각적 우선순위를 낮춘다.
          */}
          <p className="text-navy-200 text-[15px] leading-[18px] font-normal">
            {prevLabel} - {fmt(previous)}
          </p>

        </div>

      </div>
    </article>
  );
}
