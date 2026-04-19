// =============================================================================
// ProfileCard.jsx — 사용자 프로필 & 시간대 선택 카드 (User Profile & Timeframe Nav)
// =============================================================================
//
// [구조] 이 컴포넌트는 시각적으로 두 영역(Zone)으로 구성된다.
//   Zone 1 (보라색): 사용자 아바타 + 이름 — 항상 화면에 노출되는 신원 영역
//   Zone 2 (네이비): Daily / Weekly / Monthly 선택 탭 — 데이터 필터 컨트롤
//
// [Why] Zone 2의 네이비 배경이 Zone 1 위에 -28px 올라오는 이유:
//       디자인 시안의 "레이어드 카드(Layered Card)" 효과를 구현하기 위함이다.
//       두 Zone을 별도 요소로 분리하면 각각 독립적으로 높이와 색상을 제어할 수 있다.
//
// =============================================================================

// [Why] TABS를 컴포넌트 외부에 선언하는 이유:
//       렌더링마다 새 배열이 생성되는 것을 막고, 탭 목록 변경 시 단일 지점만 수정한다. (SSOT)
const TABS = ['daily', 'weekly', 'monthly'];

/**
 * @component ProfileCard
 * @param {('daily'|'weekly'|'monthly')} timeframe        - 현재 활성화된 시간대
 * @param {function}                     onTimeframeChange - 탭 클릭 시 부모로 상태 전달하는 핸들러
 */
export default function ProfileCard({ timeframe, onTimeframeChange }) {
  return (
    // [Why] overflow-hidden: Zone 1의 rounded-2xl 모서리가 Zone 2에 가려지지 않도록
    //       부모가 자식의 넘침을 잘라낸다.
    // [Why] lg:flex lg:flex-col: 데스크톱에서 두 Zone을 세로로 쌓아 전체 높이를 채운다.
    <div className="rounded-2xl overflow-hidden lg:h-full lg:flex lg:flex-col lg:w-[255px]">

      {/* ── Zone 1: 보라색 프로필 영역 ────────────────────────────────────── */}
      {/*
        [반응형 전략]
        - 모바일/태블릿: 아바타와 텍스트를 가로(row)로 배치 (items-center, gap-6)
        - 데스크톱     : 세로(column)로 전환하고 lg:flex-1으로 남는 세로 공간을 모두 차지,
                         Zone 2의 고정 높이(199px)와 합산하여 전체 카드 높이를 채운다.

        [Why] z-10: Zone 2가 -mt-7로 위로 올라올 때 Zone 1 위에 덮이지 않도록
              Zone 1의 쌓임 순서를 보장한다.
      */}
      <div className="
        bg-purple-600 rounded-2xl p-8
        flex items-center gap-6
        relative z-10
        lg:flex-1 lg:flex-col lg:items-start lg:justify-start lg:gap-10
      ">

        {/* 프로필 아바타
            [Why] 데스크톱에서 shadow를 추가하는 이유: 보라색 배경 위에서
                  아바타가 공중에 떠 있는 입체감(depth)을 시안과 동일하게 표현한다.
        */}
        <img
          src="/images/image-jeremy.png"
          alt="Jeremy Robson 프로필 사진"
          className="
            w-[64px] h-[64px] rounded-full border-[3px] border-white
            lg:w-[78px] lg:h-[78px] lg:shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]
          "
        />

        {/* 리포트 레이블 + 사용자 이름
            [Why] lg:mb-0: 데스크톱에서 "Report for"와 h1 사이의 여백을 제거하여
                  아바타와 이름 블록이 gap-10으로만 제어되도록 한다.
            [Why] Jeremy와 Robson 사이에 <span className="lg:block">을 삽입한 이유:
                  데스크톱에서 이름이 두 줄로 자연스럽게 줄바꿈되어 세로 레이아웃에 맞게 표시된다.
        */}
        <div>
          <p className="text-navy-200 text-[15px] leading-[18px] font-normal mb-2 lg:mb-0">
            Report for
          </p>
          <h1 className="
            text-white font-light leading-tight
            text-2xl
            md:text-2xl md:leading-[28px]
            lg:text-[40px] lg:leading-[47px]
          ">
            Jeremy <span className="lg:block">Robson</span>
          </h1>
        </div>

      </div>

      {/* ── Zone 2: 네이비 탭 영역 ──────────────────────────────────────────── */}
      {/*
        [반응형 전략]
        - 모바일  : 3개 탭을 가로로 펼침 (justify-between)
        - 태블릿  : 간격을 균등하게 재분배 (justify-evenly)
        - 데스크톱: 세로 열로 전환, 고정 높이 199px (활동 카드 본문과 동일)
                   하단 패딩 제거(lg:pb-0)하여 Monthly 버튼 아래 불필요한 공백을 없앤다.

        [Why] -mt-7 (음수 마진): Zone 1 위로 28px 겹쳐 올라와
              디자인 시안의 "레이어드 카드" 비주얼을 만든다.
        [Why] pt-[52px]: 음수 마진(-28px)으로 Zone 1에 가려진 부분(28px)만큼
              상단 패딩을 더해 탭 버튼의 실제 시작 위치를 보정한다.
      */}
      <nav
        className="
          bg-navy-900 px-6 pt-[52px] pb-6 -mt-7
          flex justify-between
          relative
          md:px-8 md:justify-evenly
          lg:flex-col lg:justify-start lg:gap-5 lg:pb-0 lg:h-[199px]
        "
        aria-label="시간대 선택"
      >
        {/* [Why] aria-pressed: 현재 선택된 탭을 스크린 리더에 "눌린 상태"로 알린다. (A11y) */}
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => onTimeframeChange(tab)}
            aria-pressed={timeframe === tab}
            className={`
              capitalize text-lg font-normal transition-colors duration-200
              lg:text-left
              ${timeframe === tab
                ? 'text-white'                           // 활성 탭: 흰색으로 강조
                : 'text-purple-500 lg:hover:text-white'  // 비활성 탭: 호버는 데스크톱에서만
              }
            `}
          >
            {tab}
          </button>
        ))}
      </nav>

    </div>
  );
}
