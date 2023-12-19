import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

const Loading = () => {
  return (
    <section>
      <h1 className='h1-bold text-dark100_light900'>All Users</h1>
      <div className='mb-12 mt-11 flex flex-wrap items-center justify-between gap-5'>
        <Skeleton className='h-14 flex-1 ' />
        <div className='block max-md:hidden'>
          <Skeleton className='h-14 w-28' />
        </div>
      </div>
      <div className='mt-12 flex flex-wrap gap-4 '>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((user) => (
          <Skeleton
            key={user}
            className='h-48 w-full rounded-xl max-xs:min-w-full xs:w-[260px]'
          />
        ))}
      </div>
    </section>
  );
};

export default Loading;
