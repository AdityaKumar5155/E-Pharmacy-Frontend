import {navItems} from '../constants/index.ts'
import { navItemType } from '../types'

const Navbar = () => {
  return (
    <nav className="space-x-5">
      {
        navItems.map((item: navItemType) => (
          <a key={item.title} href={item.url}>
            {item.title}
          </a>
        ))
      }
    </nav>
  )
}

export default Navbar
