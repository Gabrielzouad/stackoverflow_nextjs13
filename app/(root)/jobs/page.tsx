import { SearchParamsProps } from '@/types';
import { getJobs } from '@/lib/utils';
import Link from 'next/link';
import Image from 'next/image';

export default async function Home({ searchParams }: SearchParamsProps) {
  const result = await getJobs();
  return (
    <>
      <h1 className='h1-bold text-dark100_light900'>Jobs in Norway</h1>
      <div className='light-border mb-9 mt-11 flex flex-col gap-9 border-b pb-9'>
        {result.data.map((job: any) => (
          <div
            key={job.job_id}
            className='background-light900_dark200 light-border shadow-light100_darknone flex flex-col items-center gap-6 rounded-lg border p-6 sm:flex-row sm:p-8'
          >
            <div className='flex w-full justify-end sm:hidden'>
              <div className='background-light800_dark400 flex items-center justify-end gap-2 rounded-2xl px-3 py-1.5'>
                <p className='body-medium text-dark400_light700'>
                  {job.employer_name}
                </p>
              </div>
            </div>
            <div className='flex items-center gap-6'>
              <Image
                src={
                  job.employer_logo
                    ? job.employer_logo
                    : '/assets/icons/job-search.svg'
                }
                width={64}
                height={64}
                alt='Employer logo'
              />
            </div>
            <div className='w-full'>
              <div className='flex-between flex-wrap gap-2'>
                <h2 className='base-semibold text-dark200_light900'>
                  {job.job_title}
                </h2>
                <div className='hidden sm:flex'>
                  <div className='background-light800_dark400 flex items-center justify-end gap-2 rounded-2xl px-3 py-1.5'>
                    <p className='body-medium text-dark400_light700'>
                      {job.employer_name}
                    </p>
                  </div>
                </div>
              </div>
              <p className='body-regular text-dark500_light700 mt-2 line-clamp-2'>
                {job.job_description}
              </p>
              <div className='flex-between mt-8 flex-wrap gap-6'>
                <div className='flex flex-wrap items-center gap-6'>
                  <div className='flex items-center gap-2'>
                    <Image
                      src='/assets/icons/clock-2.svg'
                      width={16}
                      height={16}
                      alt='Time icon'
                    />
                    <p className='body-medium text-light-500'>
                      {job.job_employment_type
                        ? job.job_employment_type
                        : 'Not Specified'}
                    </p>
                  </div>
                  <div className='flex items-center gap-2'>
                    <Image
                      src='/assets/icons/currency-dollar-circle.svg'
                      width={16}
                      height={16}
                      alt='Time icon'
                    />
                    <p className='body-medium text-light-500'>
                      {job.job_min_salary
                        ? job.job_min_salary.toString() +
                          '-' +
                          job.job_max_salary.toString()
                        : 'Not Specified'}
                    </p>
                  </div>
                </div>
                <Link
                  href={job.job_apply_link}
                  className='flex items-center gap-2'
                >
                  <p className='body-semibold primary-text-gradient'>
                    View Job
                  </p>
                  <Image
                    src='/assets/icons/arrow-up-right.svg'
                    width={16}
                    height={16}
                    alt='Pointer for job'
                  />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
