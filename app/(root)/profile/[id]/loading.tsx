import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

const Loading = () => {
  return (
    <>
      <div className='flex flex-col-reverse items-start justify-between sm:flex-row'>
        <div className='flex flex-col items-start gap-4 lg:flex-row'>
          <Skeleton className='h-[140px] w-[140px] rounded-full' />
          <div>
            <Skeleton className='h2-bold h-8 w-[200px]' />
            <Skeleton className='paragraph-regular mt-3 h-4 max-w-[200px]' />
            <div className='mt-5 flex flex-wrap items-center justify-start gap-5'>
              <Skeleton className='h-[20px] w-[100px]' />
              <Skeleton className='h-[20px] w-[100px]' />
              <Skeleton className='h-[20px] w-[100px]' />
            </div>
          </div>
        </div>
        <div className='flex justify-end max-sm:mb-5 max-sm:w-full sm:mt-3'>
          <Skeleton className='h-[46px] w-[175px]' />
        </div>
      </div>
      <div className='mt-5 grid grid-cols-1 gap-5 xs:grid-cols-2 md:grid-cols-4'>
        <Skeleton className='h-[75px] w-[200]' />
        <Skeleton className='h-[75px] w-[200]' />
        <Skeleton className='h-[75px] w-[200]' />
        <Skeleton className='h-[75px] w-[200]' />
      </div>
      <div>
        <div className='flex flex-col gap-6 mt-12 '>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((question) => (
            <Skeleton key={question} className='h-48 w-full rounded-xl' />
          ))}
        </div>
      </div>
    </>
  );
};

export default Loading;
