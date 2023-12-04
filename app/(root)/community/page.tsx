import UserCard from '@/components/cards/UserCard';
import Filter from '@/components/shared/Filter';
import LocalSearchBar from '@/components/shared/search/LocalSearchBar';
import { UserFilters } from '@/constants/filters';
import { getAllUsers } from '@/lib/actions/user.action';
import { SearchParamsProps } from '@/types';
import React from 'react';

const Page = async ({ searchParams }: SearchParamsProps) => {
  const result = await getAllUsers({ searchQuery: searchParams.q });
  return (
    <>
      <h1 className='h1-bold text-dark100_light900'>All Users</h1>
      <div className='mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center'>
        <LocalSearchBar
          route='/community'
          iconPosition='left'
          imgSrc='assets/icons/search.svg'
          placeholder='Search for other users'
          otherClasses='flex-1'
        />
        <Filter
          filters={UserFilters}
          otherClasses='min-h-[56px] sm:min-w-[170px]'
        />
      </div>

      <section className='mt-12 flex flex-wrap gap-4'>
        {result.users.length > 0 ? (
          result.users.map((user) => <UserCard key={user._id} user={user} />)
        ) : (
          <p className='body-regular text-dark200_light900'>No users found</p>
        )}
      </section>
    </>
  );
};

export default Page;
