import Profile from '@/components/forms/Profile';
import { getUserByID } from '@/lib/actions/user.action';
import { ParamsProps } from '@/types';
import { auth } from '@clerk/nextjs';
import React from 'react';

const page = async ({ params }: ParamsProps) => {
  const { userId } = auth();
  if (!userId) return null;

  const mongoUser = await getUserByID({ userId });

  return (
    <>
      <h1 className='h1-bold text-dark100_light900 '>Edit Questions</h1>
      <div className='mt-9'>
        <Profile clerkId={mongoUser.clerkId} user={JSON.stringify(mongoUser)} />
      </div>
    </>
  );
};

export default page;
