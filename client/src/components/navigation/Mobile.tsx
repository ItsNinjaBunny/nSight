import { type NavigationLink } from './types';
import Link from 'next/link';

type Props = {
  links: NavigationLink[]
}

export const MobileNavigation = ({ links }: Props) => {

  return (
    <nav className='fixed flex bottom-0 w-full bg-slate-200/90 py-2 shadow-md'>
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
              <li key={link.name}>
                {link.icon}
              </li>
            )
          })
        }
      </ul>
    </nav>
  );
}