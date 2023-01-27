import { useEffect, useRef, useState } from 'react';
import { ClientCard } from '../client-card/ClientCard';
import { Card } from '../../types';


type Props = {
  className: string;
  data: Card[];
  selected: boolean;
  setSelected: CallableFunction;
}

export const ClientManager = ({ className, data, selected, setSelected }: Props) => {
  const [cardSelected, setCardSelected] = useState<Card | null>(null);
  const [hide, setHide] = useState('hide--clients');
  const [changeHeight, setChangeHeight] = useState('');
  const firstCard = data[0];
  const show = 'show--clients';

  const handleSelected = async (card: Card, event: any) => {
  
    setCardSelected({
      ...card,
      
    });
    
    setSelected((prev: boolean) => !prev);

    event.currentTarget.className += ' selected--client';
    if(event.currentTarget.className)
    setTimeout(() => {
      setHide('height-animation');
    }, 500)
  };

  // const getSelectedCard = (card: Card) => {
  //   return selected ? 
  // }

  return (
    <>
      <section className={`${selected ? '' : ''} p-2 h-[100%] overflow-y-show transition-all relative`}>
        {
          data.map(card => (
            <ClientCard onClick={(e: any) => handleSelected(card, e)}
              className={` ${selected &&
                JSON.stringify(cardSelected) !== JSON.stringify(card) ? hide : show}`}
              key={card.id} card={card} />
          ))
        }
      </section>
      <div className={`${selected ? '' : ''}`}>
      </div>
    </>
  );
}