FROM node:22.12.0 AS builder

WORKDIR /app

COPY package.json ./

RUN npm install --no-audit --no-fund

COPY . .

ENV VITE_GENERATE_SOURCEMAP=false

ARG VITE_GENERATE_SOURCEMAP
ENV VITE_GENERATE_SOURCEMAP=${VITE_GENERATE_SOURCEMAP}

RUN npm run build

FROM nginx:alpine

ARG VITE_GENERATE_SOURCEMAP
ENV VITE_GENERATE_SOURCEMAP=${VITE_GENERATE_SOURCEMAP}

ARG VITE_CLERK_PUBLISHABLE_KEY
ENV VITE_CLERK_PUBLISHABLE_KEY=${VITE_CLERK_PUBLISHABLE_KEY}

ARG VITE_BACKEND_URL
ENV VITE_BACKEND_URL=${VITE_BACKEND_URL}

ARG VITE_ENVIRONMENT_NAME
ENV VITE_ENVIRONMENT_NAME=${VITE_ENVIRONMENT_NAME}

ARG PORT=80

EXPOSE ${PORT}

COPY config/app/nginx/nginx.conf /etc/nginx/nginx.conf
COPY config/app/nginx/conf.d/ /etc/nginx/conf.d/
COPY config/app/entrypoint.sh /entrypoint.sh
COPY config/app/nginx/init-scripts/ /docker-entrypoint.d/

RUN chmod +x /entrypoint.sh /docker-entrypoint.d/*.sh

WORKDIR /usr/share/nginx/html

COPY --from=builder /app/dist ./