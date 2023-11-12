import Question from '@/components/forms/Question';
import { getUserByID } from '@/lib/actions/user.action';
// import { auth } from '@clerk/nextjs';
import React from 'react';
import { redirect } from 'next/navigation';

const Page = async () => {
  // const { userId } = auth();
  const userId = '12345';
  if (!userId) redirect('/sign-in');

  const mongoUser = await getUserByID({ userId });
  console.log(mongoUser);
  return (
    <div>
      <h1 className='h1-bold text-dark100_light900'>Ask a Question</h1>
      <div className='mt-6'>
        <Question mongoUserId={JSON.stringify(mongoUser._id)} />
      </div>
    </div>
  );
};

export default Page;
