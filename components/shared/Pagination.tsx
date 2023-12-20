'use client';
import React from 'react';
import { Button } from '../ui/button';
import { formUrlQuery } from '@/lib/utils';
import { useRouter, useSearchParams } from 'next/navigation';

interface Props {
  pageNumber: number;
  isNext: boolean;
}

const Pagination = ({ pageNumber, isNext }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleNavigation = (direction: string) => {
    const nextPageNumber =
      direction === 'next' ? pageNumber + 1 : pageNumber - 1;

    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: 'page',
      value: nextPageNumber.toString(),
    });

    router.push(newUrl);
  };

  if (!isNext && pageNumber === 1) return null;

  return (
    <div className='mt-10'>
      <div className='flex w-full items-center justify-center gap-2'>
        <Button
          disabled={pageNumber === 1}
          onClick={() => handleNavigation('prev')}
          className='light-border-2 btn flex h-9 min-h-[36px] 
          items-center justify-center gap-2 rounded-md border bg-slate-900 px-4 py-2 text-sm font-medium text-slate-50 shadow transition-colors hover:bg-slate-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90 dark:focus-visible:ring-slate-300'
        >
          <p className='body-medium text-dark200_light800'>Prev</p>
        </Button>
        <div className='flex items-center justify-center rounded-md bg-primary-500 px-3.5 py-2'>
          <p className='body-semibold text-light-900'>{pageNumber}</p>
        </div>
        <Button
          disabled={!isNext}
          onClick={() => handleNavigation('next')}
          className='light-border-2 btn flex h-9 min-h-[36px] items-center justify-center gap-2 rounded-md border bg-slate-900 px-4 py-2 text-sm font-medium text-slate-50 shadow transition-colors hover:bg-slate-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90 dark:focus-visible:ring-slate-300'
        >
          <p className='body-medium text-dark200_light800'>Next</p>
        </Button>
      </div>
    </div>
  );
};

export default Pagination;
