import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import RenderTag from '../shared/RenderTag';
import { getTopInteractedTags } from '@/lib/actions/tag.actions';
import { Badge } from '../ui/badge';

interface UserCardProps {
  user: {
    _id: string;
    clerkId: string;
    username: string;
    name: string;
    picture: string;
  };
}

const UserCard = async ({ user }: UserCardProps) => {
  const interactedTags = await getTopInteractedTags({ userId: user._id });
  return (
    <Link
      className='shadow-light100_darknone w-full max-xs:min-w-full xs:w-[260px]'
      href={`/profile/${user.clerkId}`}
    >
      <article className='background-light900_dark200 light-border flex w-full flex-col items-center justify-center rounded-2xl border p-8'>
        <Image
          src={user.picture}
          alt='User profile picture'
          width={100}
          height={100}
          className='rounded-full'
        />
        <div className='mt-4 text-center'>
          <h3 className='h3-bold text-dark200_light900 line-clamp-1'>
            {user.name}
          </h3>
          <p className='body-regular text-dark500_light500 mt-2'>
            @{user.username}
          </p>
        </div>
        <div className='mt-4 flex items-center gap-2'>
          <div className='flex justify-between gap-2'>
            {interactedTags.length > 0 ? (
              interactedTags.map((tag) => (
                <RenderTag key={tag._id} _id={tag._id} title={tag.name} />
              ))
            ) : (
              <Badge>No tags yet</Badge>
            )}
          </div>
        </div>
      </article>
    </Link>
  );
};

export default UserCard;
