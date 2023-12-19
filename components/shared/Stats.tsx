import React from 'react';
import StatCard from '../cards/StatCard';
import { BadgeCounts } from '@/types';

interface Props {
  totalAnswers: number;
  totalQuestions: number;
  badges: BadgeCounts;
}

const Stats = async ({ totalAnswers, totalQuestions, badges }: Props) => {
  return (
    <div className='mt-5 grid grid-cols-1 gap-5 xs:grid-cols-2 md:grid-cols-4 '>
      <StatCard
        badgeInfo='Answers'
        questions={totalQuestions}
        badgeStat={totalAnswers}
      />
      <StatCard
        isBadge
        badgeInfo='Bronze'
        badgeStat={badges.BRONZE}
        imgUrl='/assets/icons/bronze-medal.svg'
      />
      <StatCard
        isBadge
        badgeInfo='Silver'
        badgeStat={badges.SILVER}
        imgUrl='/assets/icons/silver-medal.svg'
      />
      <StatCard
        isBadge
        badgeInfo='Gold'
        badgeStat={badges.GOLD}
        imgUrl='/assets/icons/gold-medal.svg'
      />
    </div>
  );
};

export default Stats;
