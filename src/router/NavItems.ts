import { APP_REGISTRY } from "./AppRegistry";
import type { NavItem } from "../types";

export const NAV_ITEMS: NavItem[] = APP_REGISTRY
    .filter(e => e.nav)
    .map(e => ({
        to: e.index ? "/" : `/${(e.path ?? "").replace(/^\/+/, "")}`,
        label: e.label,
        Icon: e.icon,
    }));
