# VHELP — Portfolio Context

## Project Name
**VHELP — VIT Chennai Student Life Platform**

## One-liner
A campus super-app for VIT Chennai that unifies food ordering, study materials, hostel/mess info, repairs, lost-and-found, a student marketplace, carpooling and messaging into a single mobile app — backed by a vendor/admin console for the people running those services.

## Problem / Motivation
Campus services at VIT Chennai were scattered across websites, WhatsApp groups, and PDFs. VHELP is a mobile-first "digital ecosystem" replacement for the older V-Help website, giving ~15,000 potential students one app for everyday campus life (ordering food, finding notes, tracking a repair, contacting a warden) and giving restaurants/admins a dashboard to manage it. *(Independent community project — not officially affiliated with VIT Chennai per the README's disclaimer.)*

## My Role
**Team project (~3 core developers) — lead / top contributor.**
Based on commit authorship across the two main repositories:
- **VHELP-USER** (896 commits): Arhaan-P is the #1 contributor (~446 commits), ahead of Aditya Bharti (~357) and Aman Bajpai (~85).
- **V-HELP-ADMIN** (307 commits): Arhaan-P is again #1 (~151 commits), ahead of Aman Bajpai (~81) and Aditya Bharti (~73).
- Other minor contributors: Prax, ManojKumar, and a shared `vhelpcc` service account.

> ⚠️ Verify before publishing: commit *count* ≠ ownership of specific subsystems. If you want to claim ownership of particular features (e.g. "built the food-ordering flow" or "owned the offline sync layer"), confirm which modules you actually authored — I can attribute repos/authorship but not per-feature ownership with confidence.

## Tech Stack
**Languages**
- Dart (Flutter apps — ~107k LOC user app, ~71k LOC admin app)
- TypeScript (Supabase Deno edge functions)
- JavaScript / HTML / CSS (web landing pages, data-sync tooling)
- SQL (Postgres migrations)

**Frameworks / Libraries**
- Flutter 3.27 / Dart 3.6, Material Design 3
- Provider (state management), RxDart
- Firebase SDKs: Auth, Firestore, Storage, Messaging (FCM), Crashlytics, Analytics, App Check
- `supabase_flutter`, `dart_jsonwebtoken` (custom auth bridging)
- pdfrx / flutter_downloader (in-app PDF study materials), cached_network_image, flutter_image_compress
- mobile_scanner + qr_flutter (QR), google_mobile_ads (AdMob), app_links (deep linking), sqflite + shared_preferences (offline cache), flutter_local_notifications
- Admin extras: fl_chart (analytics), googleapis / google_sign_in (Drive + Sheets integration), audioplayers (order-alert sounds)

**Database**
- Supabase (PostgreSQL) with Row-Level Security — primary backend
- Cloud Firestore — real-time features + legacy data
- SQLite (on-device offline cache)

**Cloud / Infra**
- Supabase Edge Functions (Deno / TypeScript) — **24 serverless functions**
- Dual Firebase projects (`vhelp-user`, `vhelp-admin`) — cross-project auth architecture
- Google Drive API (study-material storage) + Google Sheets sync
- Vercel (web landing / shared-cart pages), Firebase Hosting/Storage (auth-gated APK distribution)

**DevOps / Tools**
- GitHub Actions CI/CD (automated APK builds → GitHub Releases / Firebase Storage)
- Firebase App Check, Crashlytics monitoring
- flutter_lints / static analysis

## Key Features
- **Multi-restaurant food ordering** — live menus, persistent cart, real-time order tracking, plus a vendor-side order management console (with audio alerts) in the admin app.
- **Study materials & PYQ platform** — year/subject/faculty-organized notes with in-app PDF viewing, offline caching, and Google Drive as the storage backend.
- **Hostel, mess & laundry hub** — block contacts, mess menus with reviews, and scheduled laundry reminder notifications (driven by dedicated edge functions).
- **Campus marketplace + lost & found + repairs** — peer-to-peer used-goods trading, image-based lost/found reporting, and device repair request tracking, each wired to its own notification pipeline.
- **Real-time messaging & ticketing** — group/community chat and a support ticketing system with chat (a fully spec'd module with accessibility, security, and performance audits under `.kiro/specs/`).
- **Carpooling** — ride sharing with automatic cleanup of expired rides.
- **Shareable cart via deep links** — `vhelp://` custom-scheme + Android digital asset links let a student share a pre-filled cart through a web page that deep-links back into the app.

## Architecture Notes
Confident inference from code/config:
- **Flutter client → hybrid backend.** The user app is organized cleanly by feature (`lib/features/<domain>`) with a shared `core/services` layer (~87 service files).
- **Dual-database, dual-Firebase design.** Supabase/Postgres is the primary store (with RLS); Firestore handles real-time + legacy data; the admin app reaches *across* two Firebase projects and a custom JWT bridge (`firebase-auth` edge function) to reconcile identities.
- **Serverless business logic.** 24 Supabase Edge Functions (Deno/TS) own sensitive operations — order creation, notifications, admin/staff provisioning, account deletion — instead of trusting the client.
- **Offline-first client.** Dedicated `services/offline` + SQLite caching layers for data sync when connectivity drops.
- **Separate web surfaces.** `vhelpmainapp` (Vercel shared-cart + asset-links), `vhelpvendorapp` (partner landing / auth-gated APK download), and a `Mess_Laundry_data` CSV→backend admin sync tool.

## Technical Challenges Solved
- **Cross-project identity reconciliation** — bridging two separate Firebase projects and Supabase auth via a custom JWT edge function; non-trivial auth plumbing.
- **Secure-by-default backend** — pushing privileged actions (order creation, user deletion, admin provisioning) into server-side edge functions + Postgres RLS rather than the client.
- **Deep-linking the shared-cart flow** — solving Android redirect loops and immediate app-open with a custom `vhelp://` scheme + digital asset links (visible across several commits).
- **Offline synchronization** — layered SQLite/offline-data services so core features degrade gracefully without network.
- **Storage-constrained media** — client-side image compression to fit Firebase Storage limits (noted as a 200KB target in pubspec comments).
- **Auth-gated release distribution** — moving APK delivery to authenticated Firebase Storage downloads and fixing the resulting CORS issues.

## Metrics / Impact
**No verified production metrics found in the code.** The README lists targets and projections (e.g. "< 3s launch", "95%+ order success", "4,500+ target users", "2,000+ concurrent"), but these read as *goals/estimates, not measured results* — do not present them as achieved numbers.

Defensible, code-derived scale figures you *can* cite:
- ~178k lines of Dart across two apps (~107k user + ~71k admin)
- ~550 Dart source files; ~87 service classes; 24 Supabase edge functions
- ~1,200+ commits across the four repositories; 3+ core contributors

➡️ **Flag: add real benchmarks / analytics** (actual DAU, order counts, crash-free rate from Crashlytics, launch time from a profile run) if you want quantified impact on the portfolio — the instrumentation (Analytics, Crashlytics) is already wired in, so the data likely exists somewhere in the Firebase console.

## Live Demo / Repo Link
- GitHub org: **github.com/V-Help** (repos `VHELP-USER`, `V-HELP-ADMIN` — visibility unverified)
- APK distribution is auth-gated via Firebase Storage / GitHub Releases
- Public web pages deployed on Vercel — [ADD LINK]
- App store listing (if published) — [ADD LINK]
- Contact on record: vhelpvitcc@gmail.com

## Screenshots Needed
**Yes.** This is a polished, multi-feature Flutter mobile app with an admin/vendor dashboard — strong visual material. Recommended captures: food-ordering + cart flow, study-materials PDF viewer, hostel/mess hub, chat/ticketing, and the admin analytics dashboard (fl_chart) + vendor order screen.

## Suggested Portfolio Tier
**Featured (flagship case study).** Justification: large real-world-scoped codebase (~178k LOC), genuinely non-trivial architecture (hybrid Supabase+dual-Firebase, 24 edge functions, offline-first, deep linking, CI/CD), and a full client+admin+web product surface — this is your strongest depth-and-completeness story. Lead with the *architecture* and your *top-contributor* role; source real metrics before quoting any numbers.
