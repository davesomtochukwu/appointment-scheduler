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

# Copy standalone output and required files
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

# Optionally copy .env or other config files
# COPY .env.local .env.local

EXPOSE 3000

# Limit Node.js memory usage for low-resource environments
ENV NODE_OPTIONS="--max-old-space-size=192"

CMD ["node", "server.js"]