import { useState } from 'react';
import { activities } from './data/activities';
import ProfileCard from './components/ProfileCard';
import ActivityCard from './components/ActivityCard';

export default function App() {
  const [timeframe, setTimeframe] = useState('weekly');

  return (
    <main className="bg-navy-950 min-h-screen font-rubik px-6 py-[81px] md:px-[78px] md:py-[174px] flex flex-col gap-6 lg:grid lg:grid-cols-4 lg:gap-8 lg:max-w-5xl lg:mx-auto lg:px-0">
      <ProfileCard timeframe={timeframe} onTimeframeChange={setTimeframe} />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:contents">
        {activities.map((activity) => (
          <ActivityCard
            key={activity.title}
            activity={activity}
            timeframe={timeframe}
          />
        ))}
      </div>
    </main>
  );
}
