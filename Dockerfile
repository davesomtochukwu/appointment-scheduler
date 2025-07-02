# Use official Node.js image as the base
FROM node:18-alpine AS builder

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy only package files first for better caching
COPY package.json pnpm-lock.yaml ./

# Install dependencies (including dev for build)
RUN pnpm install --frozen-lockfile --strict-peer-dependencies=false

# Copy the rest of the app
COPY . .

# Build the Next.js app with standalone output
RUN pnpm build

# Production image
FROM node:18-alpine AS runner

WORKDIR /app

# Install pnpm for running the app
RUN npm install -g pnpm

# Copy only the necessary files from the builder
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/pnpm-lock.yaml ./pnpm-lock.yaml

# Install only production dependencies
RUN pnpm install --prod --frozen-lockfile --strict-peer-dependencies=false

# Copy Next.js standalone output
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

# Copy environment variables file if needed
# COPY .env.local .env.local

EXPOSE 3000

CMD ["node", "server.js"]