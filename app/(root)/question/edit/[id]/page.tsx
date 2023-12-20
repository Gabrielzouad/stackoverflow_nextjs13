import Question from '@/components/forms/Question';
import { getQuestionByID } from '@/lib/actions/question.action';
import { getUserByID } from '@/lib/actions/user.action';
import { ParamsProps } from '@/types';
import { auth } from '@clerk/nextjs';
import React from 'react';

const page = async ({ params }: ParamsProps) => {
  const { userId } = auth();
  if (!userId) return null;

  const mongoUser = await getUserByID({ userId });
  const result = await getQuestionByID({ questionId: params.id });

  return (
    <>
      <h1 className='h1-bold text-dark100_light900 '>Edit Questions</h1>
      <div className='mt-9'>
        <Question
          type='Edit'
          mongoUserId={mongoUser._id}
          questionDetails={JSON.stringify(result!)}
        />
      </div>
    </>
  );
};

export default page;
