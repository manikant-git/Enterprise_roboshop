# -----------------------------------------------------------------------------
# Stage 1 - Build
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
LABEL version="1.0.0"

# Remove default nginx content
RUN rm -rf /usr/share/nginx/html/*

# Copy application
COPY --from=builder /build/ /usr/share/nginx/html/

# Copy nginx configuration
COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY nginx/conf.d/ /etc/nginx/conf.d/

# Create required directories
RUN mkdir -p /var/cache/nginx \
             /var/log/nginx \
             /tmp/nginx \
    && chown -R nginx:nginx \
       /usr/share/nginx/html \
       /var/cache/nginx \
       /var/log/nginx \
       /tmp/nginx

USER nginx

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \
CMD wget --spider --quiet http://127.0.0.1:8080/health || exit 1

CMD ["nginx","-g","daemon off;"]
