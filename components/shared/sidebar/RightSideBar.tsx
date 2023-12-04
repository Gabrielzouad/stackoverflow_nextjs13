import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import RenderTag from '../RenderTag';
import { getHotQuestions } from '@/lib/actions/question.action';
import { getTopPopularTags } from '@/lib/actions/tag.actions';

const RightSidebar = async () => {
  const hotQuestions = await getHotQuestions({});
  const popularTags = await getTopPopularTags();

  return (
    <section className='custom-scrollbar background-light900_dark200 sticky right-0 top-0 flex h-screen w-[350px] flex-col  gap-5 overflow-y-auto border-l p-6 pt-36 shadow-light-300 dark:border-none max-xl:hidden'>
      <div>
        <h3 className='h3-bold text-dark200_light900'>Top Question</h3>
        <div className='mt-7 flex w-full flex-col gap-[30px]'>
          {hotQuestions.questions.map((question) => {
            return (
              <Link
                href={`/question/${question._id}`}
                key={question._id}
                className='flex cursor-pointer items-center justify-between gap-7 '
              >
                <p className='body-medium text-dark500_light700'>
                  {question.title}
                </p>
                <Image
                  src='/assets/icons/chevron-right.svg'
                  alt='chevron right'
                  width={20}
                  height={20}
                  className='invert-colors'
                />
              </Link>
            );
          })}
        </div>
      </div>
      <div className='mt-6'>
        <h3 className='h3-bold text-dark200_light900'>Popular Tags</h3>
        <div className='mt-7 flex flex-col gap-4'>
          {popularTags.popularTags.map((tag) => {
            return (
              <RenderTag
                key={tag._id}
                _id={tag._id}
                title={tag.name}
                totalQuestions={tag.count}
                showCount
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default RightSidebar;
