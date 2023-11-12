import Filter from '@/components/shared/Filter';
import LocalSearchBar from '@/components/shared/search/LocalSearchBar';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { HomePageFilters } from '@/constants/filters';
import HomeFilters from '@/components/shared/home/HomeFilters';
import NoResult from '@/components/shared/NoResult';
import QuestionCard from '@/components/cards/QuestionCard';

const questions = [
  {
    question:
      "How do I use the 'QuestionCardProps' interface in my TypeScript code?",
    _id: '1',
    title: 'Getting Started with TypeScript Interfaces',
    tags: [
      { _id: 'tag1', name: 'TypeScript' },
      { _id: 'tag2', name: 'Interfaces' },
    ],
    author: {
      _id: 'author1',
      name: 'John Doe',
      picture: 'john-doe.jpg',
    },
    upvotes: 510000,
    views: 2100000,
    answers: [{ answerId: 'answer1', text: 'You can use it like this...' }],
    createdAt: new Date('2023-11-02'),
  },
  {
    question:
      "How can I extend the 'QuestionCardProps' interface for custom use cases?",
    _id: '2',
    title: 'Extending TypeScript Interfaces',
    tags: [
      { _id: 'tag3', name: 'TypeScript' },
      { _id: 'tag4', name: 'Extending' },
    ],
    author: {
      _id: 'author2',
      name: 'Alice Smith',
      picture: 'alice-smith.jpg',
    },
    upvotes: 15,
    views: 150,
    answers: [
      {
        answerId: 'answer2',
        text: "You can create a new interface that extends 'QuestionCardProps'...",
      },
    ],
    createdAt: new Date('2023-10-30'),
  },
  {
    question:
      "What is the best way to validate data against the 'QuestionCardProps' interface?",
    _id: '3',
    title: 'Data Validation in TypeScript',
    tags: [
      { _id: 'tag1', name: 'TypeScript' },
      { _id: 'tag5', name: 'Validation' },
    ],
    author: {
      _id: 'author1',
      name: 'John Doe',
      picture: 'john-doe.jpg',
    },
    upvotes: 12,
    views: 180,
    answers: [],
    createdAt: new Date('2023-10-28'),
  },
  {
    question:
      "Are there any recommended naming conventions for implementing the 'QuestionCardProps' interface?",
    _id: '4',
    title: 'TypeScript Naming Conventions',
    tags: [
      { _id: 'tag1', name: 'TypeScript' },
      { _id: 'tag6', name: 'Naming' },
    ],
    author: {
      _id: 'author3',
      name: 'Elena Ramirez',
      picture: 'elena-ramirez.jpg',
    },
    upvotes: 8,
    views: 160,
    answers: [],
    createdAt: new Date('2023-10-25'),
  },
  {
    question:
      "How can I make some properties in the 'QuestionCardProps' interface optional?",
    _id: '5',
    title: 'Optional Properties in TypeScript Interfaces',
    tags: [
      { _id: 'tag1', name: 'TypeScript' },
      { _id: 'tag7', name: 'Optional' },
    ],
    author: {
      _id: 'author2',
      name: 'Alice Smith',
      picture: 'alice-smith.jpg',
    },
    upvotes: 9,
    views: 170,
    answers: [],
    createdAt: new Date('2023-10-23'),
  },
];

export default function Home() {
  return (
    <>
      <div className='flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center'>
        <h1 className='h1-bold text-dark100_light900'>All Questions</h1>
        <Link href='/ask-question' className='flex justify-end max-sm:w-full'>
          <Button className='primary-gradient min-h-[46px] px-4 py-3 !text-light-900'>
            Ask Question
          </Button>
        </Link>
      </div>
      <div className='mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center'>
        <LocalSearchBar
          route='/'
          iconPosition='left'
          imgSrc='assets/icons/search.svg'
          placeholder='Search for Questions'
          otherClasses='flex-1'
        />
        <Filter
          filters={HomePageFilters}
          otherClasses='min-h-[56px] sm:min-w-[170px]'
          containerClasses='hidden mx-md:flex'
        />
      </div>
      <HomeFilters />
      <div className='mt-10 flex w-full flex-col gap-6'>
        {questions.length > 0 ? (
          questions.map((question) => (
            <QuestionCard
              key={question._id}
              _id={question._id}
              title={question.title}
              tags={question.tags}
              author={question.author}
              upvotes={question.upvotes}
              views={question.views}
              answers={question.answers}
              createdAt={question.createdAt}
            />
          ))
        ) : (
          <NoResult
            title='There&rsquo;s no questions to show'
            description=' Be the first to break the silence! 🚀 Ask a Question and kickstart the
          discussion. Your query could be the next big thing others learn from.
          Get involved! 💡'
            link='/ask-question'
            linkTitle='Ask a Question'
          />
        )}
      </div>
    </>
  );
}
