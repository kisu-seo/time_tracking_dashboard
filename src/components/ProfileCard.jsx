export default function ProfileCard({ timeframe, onTimeframeChange }) {
  const tabs = ['daily', 'weekly', 'monthly'];

  return (
    <div className="rounded-2xl overflow-hidden lg:row-span-2 lg:col-span-1">

      {/* Zone 1: 보라색 프로필 영역 */}
      <div className="bg-purple-600 rounded-2xl p-8 flex items-center gap-5 lg:flex-col lg:items-start lg:pb-12 lg:pt-8">
        <img
          src="/images/image-jeremy.png"
          alt="Jeremy Robson 프로필 사진"
          className="w-16 h-16 rounded-full border-[3px] border-white lg:w-20 lg:h-20"
        />
        <div>
          <p className="text-purple-500 text-sm font-normal mb-1">Report for</p>
          <h1 className="text-white text-2xl font-light leading-tight lg:text-4xl lg:leading-snug">
            Jeremy<br />Robson
          </h1>
        </div>
      </div>

      {/* Zone 2: 네이비 탭 영역 */}
      <nav
        className="bg-navy-900 px-8 py-6 flex justify-between lg:flex-col lg:justify-start lg:gap-5"
        aria-label="시간대 선택"
      >
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => onTimeframeChange(tab)}
            aria-pressed={timeframe === tab}
            className={`capitalize text-lg font-medium transition-colors duration-200 text-left
              ${timeframe === tab
                ? 'text-white'
                : 'text-navy-200 hover:text-white'
              }`}
          >
            {tab === 'daily' ? 'Daily' : tab === 'weekly' ? 'Weekly' : 'Monthly'}
          </button>
        ))}
      </nav>

    </div>
  );
}
