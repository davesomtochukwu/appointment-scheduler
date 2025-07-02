# Use official Node.js image as the base
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install --frozen-lockfile --strict-peer-dependencies=false
# Copy the rest of the app
COPY . .

# Build the Next.js app
RUN pnpm build

# Production image
FROM node:18-alpine AS runner

WORKDIR /app

# Copy only necessary files from builder
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/next.config.mjs ./next.config.mjs

# Copy environment variables file if needed
# COPY .env.local .env.local

EXPOSE 3000

CMD ["pnpm", "start"]