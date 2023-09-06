export type SettingEntry={
    id:string;
    name:string;
    icon?:React.ComponentType;
    widget?:React.ComponentType;
    description?:string;
    menuItems?:string[];
}