This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Setting up new yarn nextjs project

```
yarn create next-app my-app     # Create new project my-app
yarn install                    # Install all dependencies
yarn dev                        # Run development server
yarn add lodash                 # Add new package
yarn remove lodash              # Remove a package
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Shadcn Documentation](https://ui.shadcn.com/docs) - learn about Shadcn UI library.
- [NextAuth](https://next-auth.js.org/getting-started/introduction) - Authentication Library for Next.js

## Adding Next Auth Prisma

```
yarn add next-auth @prisma/client @auth/prisma-adapter
yarn add prisma --save-dev
npx prisma init
```

Create `[...nextauth]/route.ts`, `_lib/auth.ts`, `_lib/db.ts`, `_types/next-auth.d.ts`, `_lib/serverAuth.ts`
Update `prisma/schema.prisma`
Add `.env` variables

```
npx prisma migrate dev
npx prisma generate
```
