import TagCard from '@/components/cards/TagCard';
import Filter from '@/components/shared/Filter';
import LocalSearchBar from '@/components/shared/search/LocalSearchBar';
import { TagFilters } from '@/constants/filters';
import { getTags } from '@/lib/actions/tag.actions';
import { SearchParamsProps } from '@/types';
import React from 'react';

const Tags = async ({ searchParams }: SearchParamsProps) => {
  const result = await getTags({ searchQuery: searchParams.q });
  return (
    <>
      <h1 className='h1-bold text-dark100_light900'>All Users</h1>
      <div className='mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center'>
        <LocalSearchBar
          route='/tags'
          iconPosition='left'
          imgSrc='assets/icons/search.svg'
          placeholder='Search for tags'
          otherClasses='flex-1'
        />
        <Filter
          filters={TagFilters}
          otherClasses='min-h-[56px] sm:min-w-[170px]'
        />
      </div>

      <section className='mt-12 flex flex-wrap gap-4'>
        {result.tags.length > 0 ? (
          result.tags.map((tag) => <TagCard key={tag._id} tag={tag} />)
        ) : (
          <p className='body-regular text-dark200_light900'>No Tags found</p>
        )}
      </section>
    </>
  );
};

export default Tags;
