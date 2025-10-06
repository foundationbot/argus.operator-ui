## Build Status: [![CircleCI](https://dl.circleci.com/status-badge/img/circleci/9ge79Tve6oRQavbD51DxNt/Xw26NiUkrEBAbspQt74jk3/tree/main.svg?style=svg&circle-token=CCIPRJ_JMNuSnQtDWtF8Uy5azi3zC_7c727d72ee6e5efbdef1607db2ed6a8dcb1a4228)](https://dl.circleci.com/status-badge/redirect/circleci/9ge79Tve6oRQavbD51DxNt/Xw26NiUkrEBAbspQt74jk3/tree/main)

# argus.operator-ui

A modern React + TypeScript dashboard for operating and monitoring apps and robotic workflows. It includes a command center, connectivity checks, cladding task state machine with cycle timing & logs, and OEE summaries by shift.

---

## Features

- **Command Center**
  - Start/Stop/Restart service controls for Java PC, AI PC, SCS Visualizer
  - Per-service status with toasts

- **Connectivity**
  - Internet / AI PC (Tailscale) / Control PC (LAN) pings
  - One-click refresh with status chips

- **Cladding Task**
  - Circular **state machine** visualization (read-only)
  - **Controls**: Start, Pause/Resume, Back/Forward, Stop
  - **Auto-loop** cycles (start → … → end → restart)
  - **Cycle log** with UTC timestamps, duration, and **commented events** (pause/resume/back/forward/stop)
  - Auto-save JSON (every hour and every 60 cycles) + manual export

- **OEE**
  - Production metrics by shift (Georgia time):
    - Day: 7am–3pm
    - Afternoon: 3pm–11pm
    - Night: 11pm–7am
  - Cycles completed & average cycle time per shift

- **Theming**
  - Global Light/Dark theme toggle
  - Centralized color palette tokens

- **Persistence**
  - Engine state, cycles, and settings persisted to `localStorage`
  - Survives page reloads and route changes

---

## Tech Stack

- Vite, React 18, TypeScript  
- MUI v5 (Material UI)  
- React Router v6  
- ESLint (flat config)  
- Optional: Docker & CircleCI pipeline

---