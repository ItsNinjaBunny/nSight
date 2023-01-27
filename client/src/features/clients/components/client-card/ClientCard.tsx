import { ArrowLeftIcon, UserCircleIcon } from '../../../../components/icons';
import { type Card } from '../../types';
import Image from 'next/image';
import { ClientType } from '../client-type/ClientType';
import { RefObject } from 'react';

type Props = {
  key: string;
  card: Card;
  className?: string;
  onClick?: CallableFunction;
}

export const ClientCard = ({ card, className, onClick }: Props) => {

  return (
    <div key={card.id} onClick={onClick ? (e) => onClick(e) : undefined} className={`first:mt-3 mt-5 last:mb-3 bg-slate-300 rounded relative transition-all ${className ? className : ''}`}>
      <ArrowLeftIcon className={`absolute top-1 left-0.5 w-5 h-5 `} />
      <div className='flex flex-row items-center justify-between mx-6 py-4'>
        <div className='flex space-x-2'>
          {
            card.image ? (
              <Image width={48} height={48} src={card.image} alt={''} />
            ) : (
              <UserCircleIcon className='w-12 h-12' />
            )
          }
          <p className='flex flex-col'>
            <span className='pl-1'>{card.name}</span>
            <span className='pl-1 text-sm italic text-gray-600 font-medium tracking-wide'>{card.email.toLowerCase()}</span>
          </p>
        </div>
        <ClientType type={card.type} />
      </div>
    </div>
  );
}