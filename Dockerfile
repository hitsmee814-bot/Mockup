FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:1.27-alpine

ARG IMAGE_NAME
ARG IMAGE_VERSION

LABEL org.opencontainers.image.title="$IMAGE_NAME" \
	org.opencontainers.image.ref.name="$IMAGE_NAME" \
	org.opencontainers.image.version="$IMAGE_VERSION"

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/out /usr/share/nginx/html

RUN printf '{"version":"%s"}\n' "$IMAGE_VERSION" > /usr/share/nginx/html/version.json

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

