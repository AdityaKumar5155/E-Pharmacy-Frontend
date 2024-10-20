export interface navItemType {
    title : string;
    url : string;
    isDropdown : boolean;
    dropdownItems? : navItemType[];
}