import Image from 'next/image';
import React from 'react';

interface Props {
  isBadge?: boolean;
  imgUrl?: string;
  badgeStat: number;
  questions?: number;
  badgeInfo: string;
}

const StatCard = ({
  isBadge,
  imgUrl,
  questions,
  badgeStat,
  badgeInfo,
}: Props) => {
  return (
    <div className='background-light900_dark300 flex flex-wrap items-center justify-evenly gap-4 rounded-md border p-6 shadow-light-300 dark:shadow-dark-200'>
      <div>
        {isBadge ? (
          <Image src={imgUrl!} alt='badge' height={50} width={35} />
        ) : (
          <div>
            <p className='paragraph-semibold text-dark200_light900'>
              {questions}
            </p>
            <p className='body-medium text-dark400_light700'>Questions</p>
          </div>
        )}
      </div>
      <div>
        <p className='paragraph-semibold text-dark200_light900'>{badgeStat}</p>
        <p className='body-medium text-dark400_light700'>{badgeInfo}</p>
      </div>
    </div>
  );
};

export default StatCard;
