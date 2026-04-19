import { useState } from 'react';
import { activities } from './data/activities';
import ProfileCard from './components/ProfileCard';
import ActivityCard from './components/ActivityCard';

export default function App() {
  const [timeframe, setTimeframe] = useState('weekly');

  return (
    <main className="bg-navy-950 min-h-screen font-rubik p-6 flex flex-col gap-6 lg:grid lg:grid-cols-4 lg:gap-8 lg:max-w-5xl lg:mx-auto lg:py-20 lg:px-0">
      <ProfileCard timeframe={timeframe} onTimeframeChange={setTimeframe} />
      {activities.map((activity) => (
        <ActivityCard
          key={activity.title}
          activity={activity}
          timeframe={timeframe}
        />
      ))}
    </main>
  );
}
