
type Props = {
  type: 'client' | 'other' | 'lead'
}

export const ClientType = ({ type }: Props) => {

  const getColor = (type: 'client' | 'other' | 'lead') => {
    switch (type) {
      case 'client':
        return 'bg-green-500';
      case 'other':
        return 'bg-blue-500';
      case 'lead':
        return 'bg-amber-500';
    }
  }

  return (
    <div className='flex flex-row items-center justify-center gap-2 bg-slate-300 w-20 py-1.5 rounded-full shadow-gray-400 shadow-inner'>
      <p className='text-xs italic font-medium text-gray-700'>{type}</p>
      <div className={`w-5 h-5 rounded-full ${getColor(type)}`} />
    </div>
  )
}

