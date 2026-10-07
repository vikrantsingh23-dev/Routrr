# Routrr

One place to get things done. Routrr is a single conversational entry point for IT, HR, Finance and Facilities.
This is the frontend: Next.js (App Router), React, TypeScript and Tailwind CSS, with a mock service layer that can be swapped for a FastAPI backend.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run typecheck  # tsc --noEmit
npm run build && npm start
```

Requires Node 18.17 or later.

## Routes

| Route | What it is |
| --- | --- |
| `/` | New conversation (welcome state) |
| `/c/:id` | An existing conversation |
| `/conversations` | Search, rename and delete conversations |
| `/saved` | Saved answers |
| `/analytics` | Routing & Resolution (demo evaluation results) |
| `/settings` | Profile, notifications, appearance, privacy, connected services, demo controls |

## Try these messages

| Message | Shows |
| --- | --- |
| My laptop Wi-Fi isn't working and I want to know how many leave days I have. | Multi-intent routing to IT and HR, sources, routing details |
| How do I reset my password? | Single answer with steps and source |
| My account isn't working. | Clarification with choices |
| Create a ticket because the AC in room 204 isn't working. | Action confirmation, then ticket result |
| Report a facilities issue | Follow-up question before an action |
| What is the parental leave policy in Canada? | "No reliable source" hand-off |
| asdf | Low-confidence state with service choices |

## Seeing the error states

Open **Settings > Demo controls** and choose a failure to force on the next request:
network failure, agent unavailable, knowledge unavailable, or action failure (ticket creation).
Choose "Off" to go back to normal.

## Connecting the FastAPI backend

All network access goes through `src/services/api.ts`. With `NEXT_PUBLIC_API_BASE_URL` unset, it uses the mocks in `src/services/mock/`.
Set it (see `.env.example`) and every function calls the real endpoint instead; no component changes are needed.

| Function | Endpoint |
| --- | --- |
| `sendMessage()` | `POST /api/chat` |
| `getConversations()` | `GET /api/conversations` |
| `getConversation(id)` | `GET /api/conversations/:id` |
| `getRoutingDetails(id, messageId)` | `GET /api/routing/:id?message=...` |
| `createTicket()` | `POST /api/tickets` |
| `getSources(ids)` | `GET /api/sources?ids=...` |
| `getAnalytics()` | `GET /api/analytics` |
| `getSavedAnswers()` | `GET /api/saved` |

Response shapes are the types in `src/lib/types.ts` (`AssistantPayload`, `Conversation`, `Ticket`, `AnalyticsData`).
The backend should respond `503` (optionally `{ "domain": "it" }`) when a domain agent is down; the UI shows the "services are temporarily unavailable" state.

## Structure

```
src/
  app/                 routes
  components/
    layout/            AppShell, Sidebar, TopBar, PageHeader, HelpDialog
    chat/              ChatWindow, MessageList, UserMessage, AssistantMessage, DomainBadge,
                       RoutingStatus, RoutingDetails, SourceCitation, ClarificationOptions,
                       ActionConfirmation, TicketResult, RequestDetailsPanel, Composer, WelcomeState
    conversations/     ConversationList, SavedAnswers
    analytics/         AnalyticsDashboard, MetricCard, RoutingChart
    settings/          SettingsView
    states/            ErrorState, EmptyState, LoadingState
    ui/                Button, Switch, Dialog, Skeleton
  services/            api.ts and mock/ (router, seed data, demo controls)
  store/               AppStateProvider (conversations, pending stages, saved answers, theme)
  lib/                 types, domain metadata, helpers
```

## Notes

- Conversation state lives in memory and resets on reload (mock backend). Theme and toggles persist in `localStorage`.
- Analytics figures are fixed sample data and are labeled "Demo evaluation results" on the page.
- A ticket is only shown as created after `createTicket()` resolves. Failures show a retry and support path.
