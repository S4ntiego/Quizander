Note on Performance!
This app is using the canary releases for Next.js 13 and React 18. The new router and app dir is still in beta and not production-ready. NextAuth.js, which is used for authentication, is also not fully supported in Next.js 13 and RSC. As of now, you may expect some performance hits when testing the dashboard as react suspense is not fully operational yet.

# Quizander

Fullstack Harry Potter's Trivia website built with app directory of Next.js 13.

Project is not endorsed or supported directly or indirectly with Warner Bros. Entertainment, JK Rowling, Wizarding World Digital, or any of the official Harry Potter trademark/right holders.

<div style={{'display':'flex'}}>

<img src="https://user-images.githubusercontent.com/62663595/231110040-21a53b59-be5c-4682-9521-a73d722de59a.png" width="500"  />
<img src="https://user-images.githubusercontent.com/62663595/231110068-80a55917-f4fe-4844-876d-441b98431bb9.png" width="500"  />
<img src="https://user-images.githubusercontent.com/62663595/231110121-ac823f52-f14f-46de-afbe-f8fe453c485f.png" width="500"  />
<img src="https://user-images.githubusercontent.com/62663595/231113463-238d5044-185b-4325-88a1-7fc6a9207f66.png" width="500"  />
<img src="https://user-images.githubusercontent.com/62663595/231109983-226a00ba-add1-40d9-9378-dfc9678f8faf.png" height="300"  />
</div>



# Libraries/Technology used in the project:
- Next.js 13
- React
- Prisma ORM
- Postgresql database
- Typescript
- Zod validator
- Tailwindcss
- Next-auth
- React-hook-form
- AWS S3 storage
- Multer
- RadixUi/ShadcnUI

# Features
- Server & Client Components - Next.js 13 App Directory
- Loading UI - React Suspense
- Authentication - NextAuth.js (Google & Facebook Providers)
- Protected & Unprotected API routes - Node.js API/Middlewares
- Response toasts - ShadcnUI
- Form validation - Zod
- Typescript
- Routing/Layouts - Next.js 13
- Data Fetching, Caching and Mutation - Next.js 13/Fetch/React Cache
- ORM - Prisma
- Database - Postgresql hosted on Railway
- Stylization - Tailwindcss
- Dark/Light mode - Next theme toggle
- Dashboard with partial revalidation - Next.js 13
- Responsive design

# Initial skeleton of this trivia website prepared with Nextjs, React-Query, Typegoose, Express & Node, JWT & Redis Authentication:
https://github.com/S4ntiego/QuizanderQueryTypegoose

# Running locally
To run the project, you need to provide the following .env files:

RAILWAY POSTGRESQL DATABASE: https://railway.app/
- DATABASE_URL=
- PGDATABASE=railway
- PGHOST=
- PGPASSWORD=
- PGPORT=
- PGUSER=postgres

GOOGLE PROVIDER: https://developers.google.com/identity/protocols/oauth2
- GOOGLE_CLIENT_ID=
- GOOGLE_CLIENT_SECRET=

FACEBOOK PROVIDER: https://developers.facebook.com/apps/
- FACEBOOK_CLIENT_ID=
- FACEBOOK_CLIENT_SECRET=

AWS S3: https://aws.amazon.com/s3/
- APP_AWS_ACCESS_KEY=
- APP_AWS_SECRET_KEY=
- APP_AWS_REGION=
- AWS_S3_BUCKET_NAME=

