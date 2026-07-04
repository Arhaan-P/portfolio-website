# Cloud GCS — Project Context

## Overview

Cloud GCS is a multi-drone Ground Control System for planning missions, monitoring live flights, and reviewing flight history across a fleet. It serves drone operators (who fly missions through a web dashboard) and admins (who observe all fleets read-only). The core problem it solves: giving operators a single cloud-hosted surface to command many drones at once — real and simulated, hobbyist and industrial — while keeping every drone reachable through one consistent path regardless of its radio hardware.

## Architecture Summary

The system is a four-part topology. Drones connect to a **gateway** (desktop or Android), which is the *sole bridge* to the cloud — there is no direct drone-to-cloud path. The gateway speaks MAVLink to drones and a persistent WebSocket to the **backend**. The backend persists telemetry, fans it out over Redis pub/sub, and serves REST + WebSocket APIs to the **frontend**. Industrial (Tier 1) drones additionally feed a high-bandwidth payload/video stream that is posted directly to the backend.

```
  Drone(s) ──MAVLink (serial/TCP)──▶ Gateway ──WebSocket──▶ Backend ──REST/WS──▶ Frontend
  (SITL or real)                   (desktop/Android)        (FastAPI +            (React web app)
                                                             Postgres/Timescale,
                                                             Redis, object store)
       T1 payload + video ─────────────────────────────────▶ Backend (direct POST)
```

The same containerized backend stack runs locally (Docker Compose) and is designed to graduate to cloud hosting unchanged.

## Components

### Frontend (Cloud GCS web app)
- **Purpose:** Operator dashboard for fleet management, mission planning, live telemetry on a map, historical playback, payload/video consoles, and a read-only admin dashboard.
- **Tech stack:** React + TypeScript + Vite, Leaflet/OpenStreetMap for mapping, hls.js for video, Firebase Auth for sign-in, React Router for operator vs. admin route trees.
- **Fit:** The only user-facing surface. Talks to the backend exclusively over REST and WebSocket; never communicates with gateways or drones directly.

### Backend (Cloud service)
- **Purpose:** Telemetry ingestion and persistence, real-time fan-out, mission and task storage, gateway/drone/user management, payload ingest, and admin APIs.
- **Tech stack:** FastAPI (async Python), PostgreSQL with TimescaleDB for time-series telemetry, Redis for caching and pub/sub, an S3-compatible object store for media, MediaMTX for video streaming, Alembic for migrations.
- **Fit:** The hub of the system. Stateless application instances share all live and persistent state through Redis and Postgres, enabling horizontal scaling.

### Local Gateway (Desktop)
- **Purpose:** Bridges multiple concurrent drones' MAVLink links to the backend; uploads missions to drones, routes commands, and runs an autonomous offline failsafe engine.
- **Tech stack:** PySide6 desktop app, pymavlink.
- **Fit:** Runs on an operator's PC/edge device. Tier-blind — it treats every MAVLink connection identically and automatically allocates telemetry detail per radio group based on bandwidth budget.

### Android Gateway (COMPLETED)
- **Purpose:** A mobile replacement for the desktop gateway, handling one drone per phone. Indistinguishable from the desktop gateway to the backend.
- **Tech stack:** Kotlin + Jetpack Compose shell wrapping the shared Python gateway core (via Chaquopy); USB-serial radio support for real SiK hardware and a UDP path for SITL testing; foreground service with wake lock for uninterrupted background operation.
- **Fit:** Lets an operator run a gateway from a phone or an RC transmitter unit. Multiple Android phones plus a desktop gateway can operate in the same session for multi-drone setups.

### SITL Testing Suite
- **Purpose:** Spawns and controls fleets of simulated ArduPilot drones for development and testing, with movement patterns, failure injection, and synthetic payload/video generation.
- **Tech stack:** Menu-driven scripts managing ArduPilot SITL instances; synthetic payload streamer; ffmpeg + MediaMTX for simulated video.
- **Fit:** Simulated drones expose MAVLink endpoints that gateways connect to exactly like real hardware — no gateway or backend code distinguishes a simulated drone from a real one.

## Key Features

- User authentication and persistent sessions (Firebase Auth, verified server-side).
- Fleet management: view gateways and drones, status, rename/relabel, filter by status.
- Live map with per-drone markers, heading, and a telemetry detail panel.
- Real-time telemetry over WebSocket with auto-reconnect and a low-latency target.
- Mission planning: waypoints, geofences, and splitting a mission into per-drone tasks.
- Mission lifecycle: upload, start, abort, with tracked state transitions.
- Two-tier drone model — Tier 2 (RF-only) and Tier 1 (RF + WiFi payload) — with automatic, gateway-owned rich/critical telemetry allocation per radio group.
- Payload console for sensor-equipped drones: LiDAR ring, thermal readout and heatmap, AI detections, weather, capture gallery, gimbal and compute-health panels.
- Live video for the designated video drone (HLS via MediaMTX), with AI detection bounding boxes drawn over the feed.
- Historical telemetry and animated playback over a retained time window.
- Read-only admin dashboard: cross-user fleet, users, sessions, missions, audit log, live admin map, and system health.
- Autonomous, offline-first failsafe policies that execute on the gateway independent of the cloud.
- One-command local stack via Docker Compose.

## Current State

**Live / completed:**
- Containerized backend stack (FastAPI + Postgres/TimescaleDB + Redis + object store + MediaMTX) with migrations.
- Telemetry persistence, Redis pub/sub fan-out, and split ingest/viewer WebSocket endpoints.
- Hardened auth (no dev bypasses, hashed device tokens, role-gated admin), server-side mission CRUD.
- Two-tier fleet architecture with automatic telemetry allocation and the industrial T1 payload/video console.
- Historical telemetry + playback (integrated as a dashboard panel rather than a separate route).
- Read-only admin dashboard (REST + UI + live admin map).
- Autonomous gateway failsafe policy system.
- **Android Gateway — COMPLETED** across all build phases (scaffolding through real SiK hardware and RC-transmitter hardening).

**In progress / planned:**
- Geofence push to autopilot as MAVLink fence data.
- Full observability stack and CI/CD pipelines.
- Optional cloud (AWS Free Tier) graduation via infrastructure-as-code.
- Broader automated test coverage for newer endpoints and UI flows.

## Out of Scope / Explicitly Excluded

- **No direct drone-to-cloud path.** Every drone reaches the cloud through a gateway. The former "cellular/Mode 3" direct-ingest path was removed.
- **No tier or simulation special-casing in gateway/backend logic.** No `drone_type` checks, no simulated-drone string matching — real and SITL drones are handled identically.
- **No admin write actions.** The admin dashboard is strictly view-only; no mission control, no commands, no force-disconnect.
- **No self-service admin promotion.** Admin accounts are created only via a backend script — never through the frontend or any API.
- **No manual rich-drone election.** Telemetry-role allocation is fully automatic; the UI shows roles as read-only badges.
- **No multi-tenant/org model or external SSO.** Single-tenant assumption; Firebase Auth only.
- **SD-card / offline raw payload ingestion (full-res imagery, point clouds, hyperspectral) is deferred** — the data model reserves space for it.

## Glossary

- **Gateway** — A desktop or Android app that bridges drones' MAVLink links to the backend; the sole drone-to-cloud path.
- **Drone** — A UAV identified by a drone id, connected to a gateway. May be real or SITL-simulated.
- **Tier** — A drone's communication class. **Tier 2** = RF-only (hobbyist). **Tier 1** = RF + a separate WiFi payload link (industrial). A backend/frontend concept only; the gateway is tier-blind.
- **Radio group** — A shared RF link carrying several Tier 2 drones; the gateway promotes some to "rich" telemetry within the group's bandwidth budget.
- **Rich / critical (telemetry role)** — "Rich" drones report expanded telemetry; "critical" drones report only safety-essential fields. Allocated automatically by the gateway.
- **Mission / Task (Submission)** — A mission is a top-level operation; a task is a work unit assigned to exactly one drone.
- **Payload** — Sensor and media data (LiDAR, thermal, detections, weather, captures, gimbal, compute health, video) from Tier 1 drones.
- **SITL** — Software-In-The-Loop ArduPilot simulation, used in place of real drone hardware for development and testing.
- **Flight session** — A bounded record of one drone's connected flight, used for history and playback.
