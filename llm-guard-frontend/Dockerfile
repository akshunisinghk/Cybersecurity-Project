# ---- Build stage ----
FROM node:20-alpine AS build

WORKDIR /app

# Accept Clerk publishable key (and any other VITE_ env vars) at build time
ARG VITE_CLERK_PUBLISHABLE_KEY
ENV VITE_CLERK_PUBLISHABLE_KEY=$VITE_CLERK_PUBLISHABLE_KEY

# Install dependencies first (better layer caching)
COPY package.json package-lock.json ./
RUN npm ci

# Copy the rest of the source and build
COPY . .
RUN npm run build

# ---- Production stage ----
FROM nginx:alpine AS production

# Copy built assets from the build stage (Vite outputs to /app/dist)
COPY --from=build /app/dist /usr/share/nginx/html

# Optional: custom nginx config for SPA routing (client-side routing fallback)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]