import {navItems} from '../constants/index.ts'
import { navItemType } from '../types'
import NavItem from './NavItem.tsx'

const Navbar = () => {
  return (
    <nav className="space-x-5 flex">
      {
        navItems.map((item: navItemType, index) => (
          <NavItem key={index} navItem={item} />
        ))
      }
    </nav>
  )
}

export default Navbar
