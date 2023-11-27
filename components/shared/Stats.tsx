import React from 'react';
import StatCard from '../cards/StatCard';

const Stats = async () => {
  return (
    <div className='mt-5 grid grid-cols-1 gap-5 xs:grid-cols-2 md:grid-cols-4 '>
      <StatCard badgeInfo='Answers' questions={2} badgeStat={2} />
      <StatCard
        isBadge
        badgeInfo='Answers'
        badgeStat={2}
        imgUrl='/assets/icons/bronze-medal.svg'
      />
      <StatCard
        isBadge
        badgeInfo='Answers'
        badgeStat={2}
        imgUrl='/assets/icons/silver-medal.svg'
      />
      <StatCard
        isBadge
        badgeInfo='Answers'
        badgeStat={2}
        imgUrl='/assets/icons/gold-medal.svg'
      />
    </div>
  );
};

export default Stats;
