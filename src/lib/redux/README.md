# Redux Setup for `/src/app/app` Directory

This Redux Toolkit and RTK Query setup is **isolated exclusively** to the `/src/app/app` directory (member and employee dashboards). Other routes remain completely SSR-friendly.

## Structure

```
src/lib/redux/
├── store.ts              # Redux store configuration
├── hooks.ts              # Pre-typed Redux hooks
├── api/
│   ├── baseApi.ts        # RTK Query base API configuration
│   ├── loanApi.ts        # Loan endpoints
│   └── userApi.ts        # User endpoints
└── slices/               # Redux slices (future use)

src/app/app/
├── layout.tsx            # Wraps app routes with Redux provider
└── providers.tsx         # Redux Provider component
```

## Usage Examples

### Using RTK Query Hooks in Components

```typescript
'use client';

import { useGetLoansQuery } from '@/lib/redux/api/loanApi';

export function LoansList() {
  const { data: loans, isLoading, error } = useGetLoansQuery();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading loans</div>;

  return (
    <ul>
      {loans?.map((loan) => (
        <li key={loan._id}>{loan.principal}</li>
      ))}
    </ul>
  );
}
```

### Using Mutations

```typescript
'use client';

import { useCreateLoanMutation } from '@/lib/redux/api/loanApi';

export function CreateLoanForm() {
  const [createLoan, { isLoading }] = useCreateLoanMutation();

  const handleSubmit = async (formData) => {
    try {
      await createLoan(formData).unwrap();
      // Success - cache will auto-update
    } catch (error) {
      console.error('Failed to create loan:', error);
    }
  };

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      handleSubmit({ /* form data */ });
    }}>
      {/* form fields */}
    </form>
  );
}
```

### Using Pre-typed Redux Hooks

```typescript
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
```

## Adding New API Endpoints

1. Create a new file in `src/lib/redux/api/` (e.g., `transactionApi.ts`)
2. Use `baseApi.injectEndpoints()` to define endpoints
3. Export the generated hooks
4. Add the new API to the store in `store.ts`

## Configuration

- **Base URL**: Configured in `baseApi.ts` using `NEXT_PUBLIC_API_URL` environment variable
- **Credentials**: Requests include cookies (`credentials: 'include'`)
- **Cache Tags**: Used for intelligent cache invalidation (see `baseApi.ts`)

## Important Notes

✅ Redux is **only available** in `/src/app/app` and its child routes  
✅ Other routes (login, register, etc.) remain **fully SSR-friendly**  
✅ Improves SEO for static/SSR routes  
✅ Client-side state management only where needed
