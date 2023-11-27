import { getUserStats } from '@/lib/actions/user.action';
import { SearchParamsProps } from '@/types';
import React from 'react';
import QuestionCard from '../cards/QuestionCard';

interface Props extends SearchParamsProps {
  userId: string;
  clerkId?: string | null;
}

const AnswersTab = ({ searchParams, userId, clerkId }: Props) => {
  return <div>AnswersTab</div>;
};

export default AnswersTab;
