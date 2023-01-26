import { useState } from 'react';
import { type NavigationLink } from '../types';
import Link from 'next/link';
import { Settings } from './Settings';

type Props = {
  selected: string;
  className: string;
  links: NavigationLink[];
}

export const MobileNavigation = ({ selected, links, className }: Props) => {
  const [settings, setSettings] = useState(false);

  const toggleSettings = () => setSettings(true);
  const closeSettings = () => setSettings(false);
  console.log(settings);

  return (
    <>
      <nav className={`${className} fixed flex bottom-0 w-full bg-slate-200/90 py-2 shadow-md`}>
        <ul className='flex justify-evenly items-center w-full'>
          {
            links.map((link) => {
              if (link.name !== 'Profile') {
                return (
                  <li key={link.name}>
                    <Link href={link.href}>{link.icon}</Link>
                  </li>
                )
              }

              return (
                <li id='profile-settings' className='' onClick={settings ? closeSettings : toggleSettings} key={link.name}>
                  {link.icon}
                </li>
              )
            })
          }
        </ul>
      </nav>
      <Settings settings={settings} setSettings={closeSettings} />
    </>
  );
}