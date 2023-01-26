import Link from 'next/link';
import { useOutside } from '../../../hooks/useOutside';

type Props = {
  settings: boolean;
  setSettings: CallableFunction;
}

const AccountSettings = [
  {
    name: 'Account Preferences',
    href: '/profile/settings'
  }, {
    name: 'Logout',
    href: '/logout',
  }
]

export const Settings = ({ settings, setSettings }: Props) => {


  const ref = useOutside<HTMLDivElement>(setSettings);

  return (
    <>
      <div ref={ref} className={`fixed bottom-12 right-2 rounded px-2 py-1 duration-500
      bg-slate-200/90 ${settings ? 'translate-x-0' : 'translate-x-[105%]'}`}>
        <ul className='divide-y-2 px-4 divide-gray-400'>
          {
            AccountSettings.map((setting) => {
              if (setting.name !== 'Logout')
                return (
                  <li className='py-1' key={setting.name}>
                    <Link href={setting.href} >{setting.name}</Link>
                  </li>
                );
              return (
                <li className='py-1' key={setting.name}>
                  {setting.name}
                </li>
              );
            })
          }
        </ul>
      </div>
    </>
  );
}