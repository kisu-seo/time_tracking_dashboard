export default function ProfileCard({ timeframe, onTimeframeChange }) {
  const tabs = ['daily', 'weekly', 'monthly'];

  return (
    <div className="rounded-2xl overflow-hidden lg:row-span-2 lg:col-span-1">

      {/* Zone 1: 보라색 프로필 영역 */}
      <div className="bg-purple-600 rounded-2xl p-8 flex items-center gap-6 lg:flex-col lg:items-start lg:pb-20 lg:pt-9 relative z-10">
        <img
          src="/images/image-jeremy.png"
          alt="Jeremy Robson 프로필 사진"
          className="w-[64px] h-[64px] rounded-full border-[3px] border-white lg:w-[78px] lg:h-[78px]"
        />
        <div>
          <p className="text-navy-200 text-[15px] leading-[18px] font-normal mb-2">Report for</p>
          <h1 className="text-white text-2xl font-light leading-tight lg:text-[40px] lg:leading-[47px]">
            Jeremy <span className="lg:block">Robson</span>
          </h1>
        </div>
      </div>

      {/* Zone 2: 네이비 탭 영역 */}
      <nav
        className="bg-navy-900 px-0 pb-6 pt-[52px] flex justify-between lg:flex-col lg:justify-start lg:gap-5 lg:pb-8 relative -mt-7"
        aria-label="시간대 선택"
      >
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => onTimeframeChange(tab)}
            aria-pressed={timeframe === tab}
            className={`capitalize text-lg font-normal transition-colors duration-200 w-[109px] lg:text-left
              ${timeframe === tab
                ? 'text-white'
                : 'text-purple-500 hover:text-white'
              }`}
          >
            {tab}
          </button>
        ))}
      </nav>

    </div>
  );
}
