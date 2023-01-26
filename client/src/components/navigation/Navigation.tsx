import { DesktopNavigation } from './Desktop'
import { MobileNavigation } from './Mobile'
import { Links } from './Links';

export const Navigation = () => {

  return (
    <>
      <DesktopNavigation />
      <MobileNavigation links={Links} />
    </>
  )
}