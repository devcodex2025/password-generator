# syntax=docker/dockerfile:1
FROM node:22.16-slim AS base
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
# package files only: this layer set is reused until dependencies change
COPY package.json package-lock.json .npmrc ./

# npm ci installs exactly what package-lock.json pins; the cache mount keeps downloads between builds
FROM base AS deps
RUN --mount=type=cache,target=/root/.npm npm ci --prefer-offline --no-audit --no-fund

# derived from deps: no second download
FROM deps AS prod-deps
RUN npm prune --omit=dev --no-audit --no-fund

FROM deps AS build
# NEXT_PUBLIC_* values are inlined into the client bundle at build time
ARG NEXT_PUBLIC_GTM_ID
ARG NEXT_PUBLIC_GA_ID
ARG NEXT_PUBLIC_ADSENSE_CLIENT
ARG NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
COPY . .
RUN --mount=type=cache,target=/app/.next/cache npm run build

# unit + component tests: `docker compose --profile test run --rm test`
FROM deps AS test
COPY . .
CMD ["sh", "-c", "npm test && npm run test:components"]

# runtime image: production deps + build output only (no sources, devDependencies or build cache)
FROM base AS runner
ENV NODE_ENV=production
COPY --from=prod-deps /app/node_modules ./node_modules
COPY next.config.js ./
# node must own .next: ISR revalidation writes .next/server/route-cache at runtime
COPY --from=build --chown=node:node /app/.next ./.next
COPY --from=build --chown=node:node /app/public ./public
# keep: the build-stage .next/cache is a BuildKit cache mount, so the copied .next has no
# node-owned cache dir and the next_cache volume would otherwise be initialised as root
RUN mkdir -p .next/cache && chown node:node .next/cache
USER node
EXPOSE 3000
# next directly (not npm) so SIGTERM reaches the server
CMD ["node_modules/.bin/next", "start"]
