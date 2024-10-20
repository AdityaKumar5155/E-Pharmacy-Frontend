export interface navItemType {
    title : string;
    url : string;
    isDropdown : boolean;
    dropdownItems? : navItemType[];
}

export interface navItemProps {
    navItem : navItemType;
}

export interface navItemBasicProps {
    navItem : navItemType;
    isDropped: Boolean;
}