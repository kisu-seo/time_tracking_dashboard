import rawData from '../../data.json';

const THEME_MAP = {
  'Work':      { colorClass: 'bg-work',      icon: '/images/icon-work.svg' },
  'Play':      { colorClass: 'bg-play',      icon: '/images/icon-play.svg' },
  'Study':     { colorClass: 'bg-study',     icon: '/images/icon-study.svg' },
  'Exercise':  { colorClass: 'bg-exercise',  icon: '/images/icon-exercise.svg' },
  'Social':    { colorClass: 'bg-social',    icon: '/images/icon-social.svg' },
  'Self Care': { colorClass: 'bg-self-care', icon: '/images/icon-self-care.svg' },
};

export const activities = rawData.map((item) => ({
  ...item,
  ...THEME_MAP[item.title],
}));
