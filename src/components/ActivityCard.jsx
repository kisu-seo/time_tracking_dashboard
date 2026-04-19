const PREV_LABEL = {
  daily: 'Yesterday',
  weekly: 'Last Week',
  monthly: 'Last Month',
};

const fmt = (n) => `${n}hr${n !== 1 ? 's' : ''}`;

export default function ActivityCard({ activity, timeframe }) {
  const { title, colorClass, icon, timeframes } = activity;
  const { current, previous } = timeframes[timeframe];
  const prevLabel = PREV_LABEL[timeframe];

  return (
    <article
      className="rounded-2xl overflow-hidden"
      aria-label={`${title} 활동 카드`}
    >
      {/* 상단 컬러 모자 레이어 */}
      <div className={`${colorClass} h-[76px] relative overflow-hidden`}>
        <img
          src={icon}
          alt=""
          aria-hidden="true"
          className="absolute -top-3 right-4 w-[78px] h-[78px] opacity-75 object-contain"
        />
      </div>

      {/* 본문 레이어 (네이비 카드, 모자 위로 올라옴) */}
      <div className="bg-navy-900 hover:bg-navy-800 transition-colors duration-200 rounded-t-2xl -mt-[38px] md:-mt-[42px] relative z-10 p-6 h-[122px] md:h-[180px] lg:h-auto lg:p-8">

        {/* 타이틀 + 쩜쩜쩜 버튼 */}
        <div className="flex items-center justify-between mb-2 md:mb-4 lg:mb-6">
          <h2 className="text-white font-medium text-lg">{title}</h2>
          <button
            aria-label={`${title} 더 보기`}
            className="text-navy-200 hover:text-white transition-colors duration-200 flex items-center"
          >
            <img
              src="/images/icon-ellipsis.svg"
              alt=""
              aria-hidden="true"
              className="w-[21px] md:w-[12px] hover:brightness-150 transition-all"
            />
          </button>
        </div>

        {/* 현재 시간 + 이전 기간 텍스트 */}
        <div className="flex items-center justify-between md:flex-col md:items-start lg:gap-2">
          <p className="text-white text-[2rem] md:text-[56px] md:leading-[66px] md:mb-2 font-light leading-none">
            {fmt(current)}
          </p>
          <p className="text-navy-200 text-[15px] leading-[18px] font-normal">
            {prevLabel} - {fmt(previous)}
          </p>
        </div>

      </div>
    </article>
  );
}
