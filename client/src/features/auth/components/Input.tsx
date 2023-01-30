import { useState } from 'react';
import { EyeIcon, EyeSlashIcon } from '../../../components/icons';

type Props = {
  label: string;
  type: string;
  placeholder?: string;
  value: string;
  onChange: CallableFunction;
  className: string;
}

export const Input = ({ label, type, placeholder,
  value, onChange, className }: Props) => {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(prev => !prev);

  const toggleShow = () => show ? 'text' : 'password';

  if (type !== 'password') {
    return (
      <div className='flex flex-col relative w-full space-y-1'>
        <label htmlFor={label} className='text-slate-900'>
          {label}
        </label>
        <input id={label}
          placeholder={placeholder ? placeholder : ''}
          type={type} onChange={(e) => onChange(e.target.value)}
          value={value}
          className={`${className} `}
        />
      </div>
    );
  }

  return (
    <div className='flex flex-col relative w-full space-y-1
      '>
      <label htmlFor={label} className='text-slate-900'>
        {label}
      </label>
      <div className='flex'>
        <input id={label}
          placeholder={placeholder ? placeholder : ''}
          type={toggleShow()} onChange={(e) => onChange(e.target.value)}
          value={value} className={`${className} w-full pr-6`}
        />
        {show ? <EyeSlashIcon onClick={handleShow}
          className='absolute right-0 bottom-1 w-5 h-5 text-slate-900 cursor-pointer' />
          :
          <EyeIcon onClick={handleShow}
            className='absolute right-0 bottom-1 w-5 h-5 text-slate-900 cursor-pointer' />
        }
      </div>
    </div>
  )
}