import { Link, useLocation } from "react-router-dom";
import { FC, useState } from 'react'
import { navItemProps, navItemBasicProps } from "../types";

const NavItemBasic: FC<navItemBasicProps> = ({ navItem, isDropped }) => {
    const { title, url, isDropdown } = navItem;
    const location = useLocation();
    const isCurrent = location.pathname === url;

    return (
        <Link
            to={url}
            className={`group relative cursor-pointer font-medium transition-all duration-300 ${isCurrent ? 'text-pink-500' : 'text-cyan-400'}`}
        >
            <span className="inline-block transform transition-transform duration-300 group-hover:scale-105 transform-origin-bottom">
                {`${title}${isDropdown ? (isDropped ? " ▲" : " ▼") : ""}`}
            </span>
            <div
                className={`underline z-0 absolute bottom-0 left-0 h-0.5 ${isCurrent ? 'bg-cyan-400' : 'bg-pink-500'}  underline-width-0 underline-transition group-hover:underline-width-full`}
            ></div>
        </Link>
    );
};


const NavItem: FC<navItemProps> = ({ navItem }) => {
    const { isDropdown, dropdownItems } = navItem;
    const [isDropped, setIsDropped] = useState<Boolean>(false)
    const toggleDropped = () => {
        setIsDropped(!isDropped);
    }
    return (
        <>
            <div className="relative" onClick={isDropdown ? (toggleDropped) : (() => { })}>
                <NavItemBasic navItem={navItem} isDropped={isDropped} />
                {isDropped &&
                    (<>
                        <div className="absolute top-8 w-48 p-4  bg-gray-200 z-50 ">
                            {dropdownItems?.map((item) => <NavItemBasic navItem={item} isDropped={isDropped} />)}
                        </div>
                    </>)
                }
            </div>
        </>
    )
}

export default NavItem