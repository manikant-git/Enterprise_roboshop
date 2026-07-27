# -----------------------------------------------------------------------------
# Stage 1 - Prepare static assets
# -----------------------------------------------------------------------------
FROM alpine:3.22 AS builder

WORKDIR /build

COPY src/ .

# -----------------------------------------------------------------------------
# Stage 2 - Runtime
# -----------------------------------------------------------------------------
FROM nginx:1.29-alpine

LABEL maintainer="Manikanta"
LABEL application="roboshop-frontend"

# Remove default nginx files
RUN rm -rf /usr/share/nginx/html/*

# Copy website
COPY --from=builder /build /usr/share/nginx/html

# Copy nginx configuration
COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
COPY nginx/security.conf /etc/nginx/conf.d/security.conf
COPY nginx/gzip.conf /etc/nginx/conf.d/gzip.conf
COPY nginx/cache.conf /etc/nginx/conf.d/cache.conf

# Health endpoint
COPY health/health.html /usr/share/nginx/html/health.html

# Create writable directories
RUN mkdir -p /var/cache/nginx \
             /var/run \
             /var/log/nginx \
    && chown -R nginx:nginx \
       /var/cache/nginx \
       /var/run \
       /var/log/nginx \
       /usr/share/nginx/html

USER nginx

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
CMD wget --no-verbose --tries=1 --spider http://127.0.0.1:8080/health || exit 1

CMD ["nginx", "-g", "daemon off;"]
