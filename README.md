# Coffee R Us Admin Showcase

A React SPA built with Vite that lets an administrator browse, search, add, edit, and remove coffee products using a simulated JSON server backend.

## Features

- Client-side routing with `react-router-dom`
- Dynamic product search
- Add new products with a form
- Edit product details and price via patch requests
- Delete products from the inventory
- Simulated backend persistence using `json-server`
- Custom hook for API interactions (`useApi`)
- Component state management with hooks like `useState`, `useEffect`, `useRef`, `useId`, and `useContext`
- Unit tests using Vitest and React Testing Library

## Getting Started

Install dependencies:

```bash
npm install
```

Start the JSON server and the React app together:

```bash
npm run dev:all
```

- React app: http://localhost:5173
- Backend API: http://localhost:4000

## Available Scripts

- `npm run dev` - start the React app only
- `npm run dev:server` - start the JSON server backend
- `npm run dev:all` - start both frontend and backend
- `npm run build` - build production assets
- `npm run test` - run tests once
- `npm run test:watch` - run tests in watch mode

## Data Endpoints

The simulated backend uses `db.json` with the following endpoints:

- `GET /products`
- `POST /products`
- `PATCH /products/:id`
- `DELETE /products/:id`
- `GET /store_info`

## Notes

- The app expects the backend at `http://localhost:4000`.
- The search bar filters products by name, origin, or description.
- Product details allow price edits and product deletion.

## Testing

Run the test suite:

```bash
npm run test
```
 https://yennifer-cell.github.io/showcase-app/
