# Redux & RTK Query Setup - Quick Start Guide

## ✅ Setup Complete!

Redux Toolkit and RTK Query have been configured exclusively for the `/src/app/app` directory. Other routes remain fully SSR-friendly for optimal SEO.

## 📁 What Was Created

### Redux Store & Configuration
- **[src/lib/redux/store.ts](src/lib/redux/store.ts)** - Redux store with RTK Query APIs
- **[src/lib/redux/hooks.ts](src/lib/redux/hooks.ts)** - Pre-typed Redux hooks
- **[src/lib/redux/index.ts](src/lib/redux/index.ts)** - Central export file

### RTK Query APIs
- **[src/lib/redux/api/baseApi.ts](src/lib/redux/api/baseApi.ts)** - Base API configuration
- **[src/lib/redux/api/loanApi.ts](src/lib/redux/api/loanApi.ts)** - Loan endpoints
- **[src/lib/redux/api/userApi.ts](src/lib/redux/api/userApi.ts)** - User endpoints

### App Integration
- **[src/app/app/layout.tsx](src/app/app/layout.tsx)** - Wraps all `/app/*` routes with Redux provider
- **[src/app/app/providers.tsx](src/app/app/providers.tsx)** - Redux Provider component

### Documentation
- **[src/lib/redux/README.md](src/lib/redux/README.md)** - Full setup documentation
- **[src/lib/redux/example-component.tsx](src/lib/redux/example-component.tsx)** - Example usage component
- **[src/lib/redux/ENV_SETUP.md](src/lib/redux/ENV_SETUP.md)** - Environment variables guide

## 🚀 How to Use Redux in `/src/app/app` Components

### 1. In Member Dashboard
```typescript
'use client';

import { useGetLoansQuery } from '@/lib/redux';

export function Dashboard() {
  const { data: loans, isLoading, error } = useGetLoansQuery();
  // ... your component code
}
```

### 2. Use Mutations for Updates
```typescript
import { useUpdateLoanMutation } from '@/lib/redux';

export function UpdateLoanForm({ loanId }) {
  const [updateLoan] = useUpdateLoanMutation();
  
  const handleUpdate = async (data) => {
    await updateLoan({ id: loanId, data }).unwrap();
  };
}
```

### 3. Use Pre-typed Hooks
```typescript
import { useAppDispatch, useAppSelector } from '@/lib/redux';
```

## 🔑 Key Features

✅ **Isolated to `/src/app/app`** - Redux only loads where needed  
✅ **RTK Query Caching** - Automatic data caching & synchronization  
✅ **Tag-based Invalidation** - Smart cache invalidation  
✅ **TypeScript Support** - Fully typed hooks and API responses  
✅ **No SSR Penalties** - Other routes remain SSR-friendly  

## 📝 Next Steps

1. **Set up environment variables** (if using external API):
   ```
   NEXT_PUBLIC_API_URL=http://localhost:3000/api
   ```

2. **Add more API endpoints** as needed in `src/lib/redux/api/`

3. **Use the example component** as a template in your dashboard components

4. **Test RTK Query** by importing hooks in member/employee dashboard pages

## ⚠️ Important Notes

- Redux is **only accessible in** `/src/app/app` and child routes
- Other routes like `/login` and `/register` remain fully SSR-compatible
- To use Redux in a component, add `'use client'` directive
- RTK Query automatically handles caching and cache invalidation

## 🆘 Need Help?

See [src/lib/redux/README.md](src/lib/redux/README.md) for detailed documentation.
