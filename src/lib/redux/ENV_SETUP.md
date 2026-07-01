# Redux RTK Query Configuration

Add the following environment variable to your `.env.local` file to configure the API base URL for Redux RTK Query:

```
# API Configuration for Redux RTK Query
# Used in: src/lib/redux/api/baseApi.ts
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

## Environment Variable Explanation

- **NEXT_PUBLIC_API_URL**: The base URL for all RTK Query API calls
  - In development: `http://localhost:3000/api`
  - In production: Your production API domain (e.g., `https://api.yourdomain.com/api`)
  - This variable is public (prefixed with `NEXT_PUBLIC_`) so it's available in the browser

## Default Behavior

If `NEXT_PUBLIC_API_URL` is not set, RTK Query will default to `http://localhost:3000/api`.

## Note

Make sure your API routes are configured in:
- `src/app/api/` directory for the /api/* routes
- Or point to an external API server
