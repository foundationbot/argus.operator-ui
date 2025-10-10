import type { ReactNode, ElementType } from "react";
import type { SvgIconProps } from "@mui/material/SvgIcon";

export type AppEntry = {
    path?: string;
    index?: boolean;
    label: string;
    nav?: boolean;
    icon?: ElementType<SvgIconProps>; // e.g., HomeIcon (not <HomeIcon />)
    element: ReactNode;               // e.g., <div>Page</div>
};

export type NavItem = {
    to: string;
    label: string;
    Icon?: ElementType<SvgIconProps>;
};
