import HomeIcon from "@mui/icons-material/Home";
import BuildIcon from "@mui/icons-material/Build";
import TimelineIcon from "@mui/icons-material/Timeline";
import DevicesIcon from "@mui/icons-material/Devices";
import TerminalIcon from "@mui/icons-material/Terminal";
import SettingsIcon from "@mui/icons-material/Settings";

import type { AppEntry } from "../types";

export const APP_REGISTRY = [
  {
    index: true,
    label: "Command Center",
    nav: true,
    icon: HomeIcon,
    element: <div>Command Center</div>
  },
  {
    path: "cladding-task",
    label: "Cladding Task",
    nav: true,
    icon: BuildIcon,
    element: <div>Cladding Task</div>
  },
  {
    path: "oee",
    label: "OEE",
    nav: true,
    icon: TimelineIcon,
    element: <div>OEE</div>
  },
  {
    path: "machines",
    label: "Machines",
    nav: true,
    icon: DevicesIcon,
    element: <div>Machines</div>
  },
  {
    path: "commands",
    label: "Commands",
    nav: true,
    icon: TerminalIcon,
    element: <div>Commands</div>
  },
  {
    path: "settings",
    label: "Settings",
    nav: true,
    icon: SettingsIcon,
    element: <div>Settings</div>
  },
] satisfies AppEntry[];
