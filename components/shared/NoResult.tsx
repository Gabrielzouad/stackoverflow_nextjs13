import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface NoResultProps {
  title: string;
  description: string;
  link: string;
  linkTitle: string;
}

const NoResult = ({ title, description, link, linkTitle }: NoResultProps) => {
  return (
    <div className='mt-10 flex w-full flex-col items-center justify-center'>
      <Image
        src='/assets/images/light-illustration.png'
        alt='no result illustration'
        width={270}
        height={200}
        className='block object-contain dark:hidden'
      />

      <Image
        src='/assets/images/dark-illustration.png'
        alt='no result illustration'
        width={270}
        height={200}
        className='hidden object-contain dark:flex'
      />

      <h2 className='h2-bold text-dark200_light900 mt-6'>{title}</h2>
      <p className='body-regular text-dark500_light700 my-3.5 max-w-md text-center'>
        {description}
      </p>
      <Link href={link} className='mt-6 flex justify-end max-sm:w-full'>
        <button className='paragraph-medium mt-5 min-h-[46px] rounded-lg bg-primary-500 px-4 py-3 !text-light-900 hover:bg-primary-500 dark:bg-primary-500 dark:text-light-900'>
          {linkTitle}
        </button>
      </Link>
    </div>
  );
};

export default NoResult;
