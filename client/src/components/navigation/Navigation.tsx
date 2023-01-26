import { DesktopNavigation } from './desktop/Desktop'
import { MobileNavigation } from './mobile/Mobile'
import { Links } from './Links';
import { useState } from 'react';

export const Navigation = () => {
  const [selected, setSelected] = useState('Home');

  return (
    <>
      <DesktopNavigation selected={selected} links={Links} className={`md:flex hidden`} />
      <MobileNavigation selected={selected} className={`md:hidden`} links={Links} />
    </>
  )
}