# URL Shortener

A simple full-stack URL shortener. Monorepo with a React + Redux client and an Express server, both in TypeScript.

## Stack

- **Client:** React, Redux Toolkit, Vite
- **Server:** Express
- **Storage:** in-memory (resets on restart)

## Structure

```
url-shortener/
└── apps/
    ├── client  # React app (Vite)
    └── server  # Express API
```

## Getting Started

```bash
npm install
npm run dev
```

- Client: http://localhost:5173
- Server: http://localhost:3000

## Scripts

| Command         | Description                       |
| --------------- | --------------------------------- |
| `npm run dev`   | Run client and server in dev mode |
| `npm run build` | Build server and client           |

## API

### `POST /shorten`

Request:

```json
{ "url": "https://example.com" }
```

Response:

```json
{ "shortUrl": "http://localhost:3001/abc1234" }
```

Returns `400` with `{ "error": "Invalid URL" }` if the URL is invalid. Submitting the same URL twice returns the same short link.

### `GET /:id`

Redirects to the original URL. Returns `404` if the id is unknown.

## Notes

- No authentication.
- Links are stored in memory. Swap `server/src/store.ts` for a database to persist them.
