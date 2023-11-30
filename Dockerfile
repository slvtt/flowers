#
## Install dependencies only when needed
#FROM node:16-alpine3.15 AS deps
#ENV NODE_ENV production
#ARG REACT_APP_API_URI
#ARG REACT_APP_PASS_MEDIA_URI
#ARG REACT_APP_REDIRECT_PAGE
#ENV REACT_APP_API_URI=$REACT_APP_API_URI
#ENV REACT_APP_PASS_MEDIA_URI=$REACT_APP_PASS_MEDIA_URI
#ENV REACT_APP_REDIRECT_PAGE=$REACT_APP_REDIRECT_PAGE
#WORKDIR /app
##RUN echo http://mirror.yandex.ru/mirrors/alpine/v3.15/main > /etc/apk/repositories; \
##    echo http://mirror.yandex.ru/mirrors/alpine/v3.15/community >> /etc/apk/repositories;
##    apk add python3=3.9.13-r1 make=4.3-r0 g++=10.3.1_git20211027-r0 --no-cache
#COPY package.json next.config.js yarn.lock ./
#RUN yarn install --frozen-lockfile
#RUN yarn add --dev typescript @types/node
#
## Rebuild the source code only when needed
#FROM node:16-alpine3.15 AS builder
#WORKDIR /app
#COPY next.config.js ./
#COPY package.json yarn.lock ./
#
#COPY --from=deps /app/node_modules ./node_modules
#COPY . .
#
#RUN yarn build
#
## Production image, copy all the files and run next
#FROM node:16-alpine3.15 AS runner
#WORKDIR /app
#
#ENV NODE_ENV production
#
#RUN addgroup -g 1001 -S nodejs && adduser -S nextjs -u 1001
#
## You only need to copy next.config.js if you are NOT using the default configuration
#COPY --from=builder /app/next.config.js ./
#COPY --from=builder /app/public ./public
#COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
#COPY --from=builder /app/node_modules ./node_modules
#COPY --from=builder /app/package.json ./package.json
#
#USER nextjs
#
#EXPOSE 3000
#
## Next.js collects completely anonymous telemetry data about general usage.
## Learn more here: https://nextjs.org/telemetry
## Uncomment the following line in case you want to disable telemetry.
## ENV NEXT_TELEMETRY_DISABLED 1
#
#CMD ["yarn", "start"]



# Install dependencies only when needed
FROM node:16-alpine AS deps
ARG REACT_APP_API_URI
ARG REACT_APP_PASS_MEDIA_URI
ARG REACT_APP_REDIRECT_PAGE
ENV REACT_APP_API_URI=$REACT_APP_API_URI
ENV REACT_APP_PASS_MEDIA_URI=$REACT_APP_PASS_MEDIA_URI
ENV REACT_APP_REDIRECT_PAGE=$REACT_APP_REDIRECT_PAGE
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json next.config.js yarn.lock* ./
RUN yarn install --frozen-lockfile


# Rebuild the source code only when needed
FROM node:16-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
# ENV NEXT_TELEMETRY_DISABLED 1

RUN yarn build

# If using npm comment out above and use below instead
# RUN npm run build

# Production image, copy all the files and run next
FROM node:16-alpine AS runner
WORKDIR /app

ENV NODE_ENV production
# Uncomment the following line in case you want to disable telemetry during runtime.
# ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
