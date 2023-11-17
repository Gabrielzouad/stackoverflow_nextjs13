import React from 'react';
import Link from 'next/link';

interface TagCardProps {
  tag: {
    _id: string;
    questions: [];
    name: string;
    created: string;
  };
}

const TagCard = async ({ tag }: TagCardProps) => {
  return (
    <Link
      className='shadow-light100_darknone w-full max-xs:min-w-full xs:w-[260px]'
      href={`/tag/${tag._id}`}
    >
      <article className='background-light900_dark200 light-border flex w-full flex-col rounded-2xl border p-8'>
        <div className='background-light800_dark400 w-fit rounded-sm px-5 py-1.5'>
          <h3 className='paragraph-semibold text-dark300_light900'>
            {tag.name}
          </h3>
        </div>
        <div className='mt-4 w-fit items-center gap-2'>
          <p className='small-regular text-dark500_light700 mt-4'>
            JavaScript, often abbreviated as JS, is a programming language that
            is one of the core technologies of the World Wide Web, alongside
            HTML and CSS
          </p>
          <p className='small-medium text-dark400_light500 mt-3.5'>
            <span className='body-semibold primary-text-gradient mr-2.5'>
              {tag.questions.length}
            </span>
            questions
          </p>
        </div>
      </article>
    </Link>
  );
};

export default TagCard;
