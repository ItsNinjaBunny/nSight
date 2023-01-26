import { DesktopNavigation } from './Desktop'
import { MobileNavigation } from './mobile/Mobile'
import { Links } from './Links';

export const Navigation = () => {

  return (
    <>
      <DesktopNavigation />
      <MobileNavigation links={Links} />
    </>
  )
}