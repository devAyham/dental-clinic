# Development stage
FROM node:16-alpine AS development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate
RUN npm run build  # Ensure the app is built

# Production stage
FROM node:16-alpine AS production

# Set node environment to production
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY --from=development /usr/src/app/package*.json ./
COPY --from=development /usr/src/app/node_modules ./node_modules
COPY --from=development /usr/src/app/dist ./dist 
COPY --from=development /usr/src/app/prisma ./prisma  
COPY --from=development /usr/src/app/public ./public 

EXPOSE 3000

CMD ["npm","run","start:prod"]
