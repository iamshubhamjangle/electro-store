- Clear the cart on place order

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

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")
  directUrl = env("DIRECT_URL")
}

model Account {
  id                String  @id @default(cuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String? @db.Text
  access_token      String? @db.Text
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String? @db.Text
  session_state     String?

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model User {
  id            String    @id @default(cuid())
  name          String?
  email         String?   @unique
  emailVerified DateTime?
  image         String?
  accounts      Account[]
  sessions      Session[]
}

model VerificationToken {
  identifier String
  token      String   @unique
  expires    DateTime

  @@unique([identifier, token])
}
```

Add `.env` variables

```
# To generate 32 bit secret
NODE_ENV="development"

# Database
DATABASE_URL=postgres://username:password@localhost:5432/db_name
DIRECT_URL=postgres://username:password@localhost:5432/db_name

# Next Auth
NEXTAUTH_URL=http://localhost:3000/
NEXTAUTH_SECRET="" # To generate run >> openssl rand -base64 32 | paste --delimiters '' --serial
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
```

```
npx prisma migrate dev
npx prisma generate
```
