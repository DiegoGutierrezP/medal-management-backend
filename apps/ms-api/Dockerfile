# --- Build phase ---
FROM node:18.20-alpine AS builder
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci

COPY . .

# Generar Prisma Client antes de compilar NestJS
RUN npx prisma generate
RUN npm run build ms-api

# --- Production phase ---
FROM node:18.20-alpine
WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/package.json ./ 
COPY --from=builder /usr/src/app/prisma ./prisma

USER node
CMD ["node", "dist/apps/ms-api/main"]