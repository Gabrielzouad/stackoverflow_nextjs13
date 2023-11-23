import LocalSearchBar from '@/components/shared/search/LocalSearchBar';
import NoResult from '@/components/shared/NoResult';
import QuestionCard from '@/components/cards/QuestionCard';
import { getQuestionsByTag } from '@/lib/actions/question.action';
import { URLProps } from '@/types';

export default async function Home({ params, searchParams }: URLProps) {
  const result = await getQuestionsByTag({
    tagId: params.id,
    page: 1,
    searchQuery: searchParams.q,
  });

  return (
    <>
      <h1 className='h1-bold text-dark100_light900'>
        {result.tagTitle.charAt(0).toUpperCase() + result.tagTitle.slice(1)}{' '}
        Questions
      </h1>
      <div className='mt-11 w-full'>
        <LocalSearchBar
          route='/'
          iconPosition='left'
          imgSrc='/assets/icons/search.svg'
          placeholder='Search for Questions'
          otherClasses='flex-1'
        />
      </div>
      <div className='mt-10 flex w-full flex-col gap-6'>
        {result.questions.length > 0 ? (
          result.questions.map((question: any) => (
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
            title='There&rsquo;s no questions to show on this tag'
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
