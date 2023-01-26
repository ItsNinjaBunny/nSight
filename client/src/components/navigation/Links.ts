import { HouseIcon, CalendarIcon, UsersIcon, ChartBarIcon, UserCircleIcon } from '../icons'

const className = 'w-6 h-6 text-slate-800'

export const Links = [
  {
    name: 'Home',
    href: '/',
    icon: HouseIcon({ className }),
  }, {
    name: 'Calendar',
    href: '/calendar',
    icon: CalendarIcon({ className }),
  }, {
    name: 'Contacts',
    href: '/contacts',
    icon: UsersIcon({ className }),
  }, {
    name: 'Analytics',
    href: '/analytics',
    icon: ChartBarIcon({ className }),
  }, {
    name: 'Profile',
    href: '/profile',
    icon: UserCircleIcon({ className }),
  }
]