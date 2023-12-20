'use client';
import { sidebarLinks } from '@/constants';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SignedIn, SignedOut, useAuth } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';

const LeftSideBar = () => {
  const pathname = usePathname();
  const { userId } = useAuth();
  return (
    <section className='custom-scrollbar background-light900_dark200 sticky left-0 top-0 flex h-screen w-fit flex-col justify-between gap-5 overflow-y-auto border-r p-6 pt-36 shadow-light-300 dark:border-none max-sm:hidden'>
      <div>
        {sidebarLinks.map((item) => {
          const isActive =
            (pathname.includes(item.route) && item.route.length > 1) ||
            pathname === item.route;

          if (item.route === '/profile/') {
            if (userId) {
              item.route = `/profile/${userId}`;
            } else {
              return null;
            }
          }
          return (
            <Link
              key={item.route}
              href={item.route}
              className={`${
                isActive
                  ? 'primary-gradient rounded-lg text-light-900'
                  : 'text-dark300_light900'
              } flex items-center justify-start gap-4 bg-transparent p-4`}
            >
              <Image
                src={item.imgURL}
                alt={item.label}
                width={20}
                height={20}
                className={`${isActive ? '' : 'invert-colors'}`}
              />
              <p
                className={`${
                  isActive
                    ? 'base-bold hidden lg:block'
                    : ' base-medium hidden lg:block'
                }`}
              >
                {item.label}
              </p>
            </Link>
          );
        })}
      </div>
      <SignedOut>
        <div className='flex flex-col gap-3'>
          <Link href='/sign-in'>
            <Button className='small-medium btn-secondary min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none'>
              <Image
                src='/assets/icons/account.svg'
                width={20}
                height={20}
                alt='login'
                className='invert-colors lg:hidden'
              />
              <span className='max-lg:hidden'>Sign in</span>
            </Button>
          </Link>

          <Link href='/sign-up'>
            <Button className='small-medium light-border-2 btn-tertiary text-dark400_light900 min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none'>
              <Image
                src='/assets/icons/sign-up.svg'
                width={20}
                height={20}
                alt='sign up'
                className='invert-colors lg:hidden'
              />
              <span className='max-lg:hidden'>Sign up</span>
            </Button>
          </Link>
        </div>
      </SignedOut>
      <SignedIn>
        <div className='flex flex-col gap-3'>
          <Link
            href='/'
            className='text-dark300_light900 flex items-center justify-start gap-4 rounded-lg bg-transparent p-4'
          >
            <Image
              src='/assets/icons/account.svg'
              width={20}
              height={20}
              alt='sign out'
              className='invert-colors'
            />
            <p className='base-medium hidden lg:block'>Logout</p>
          </Link>
        </div>
      </SignedIn>
    </section>
  );
};

export default LeftSideBar;
