# -----------------------------------------------------------------------------
# RoboShop Frontend
# Production Dockerfile
# -----------------------------------------------------------------------------

FROM nginx:1.29-alpine

LABEL org.opencontainers.image.title="roboshop-frontend"
LABEL org.opencontainers.image.description="Production Ready RoboShop Frontend"
LABEL org.opencontainers.image.version="1.0.0"
LABEL org.opencontainers.image.authors="Manikanta"

# Remove default website
RUN rm -rf /usr/share/nginx/html/*

# Copy frontend application
COPY src/ /usr/share/nginx/html/

# Copy nginx configuration
COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY nginx/conf.d/ /etc/nginx/conf.d/

# Create writable directories
RUN mkdir -p /var/cache/nginx \
             /tmp/nginx \
    && chown -R nginx:nginx \
       /usr/share/nginx/html \
       /var/cache/nginx \
       /tmp/nginx

# Run as non-root
USER nginx

# Application port
EXPOSE 8080

# Graceful shutdown
STOPSIGNAL SIGQUIT

# Container health check
HEALTHCHECK --interval=30s \
            --timeout=5s \
            --start-period=15s \
            --retries=3 \
CMD wget --quiet --spider http://127.0.0.1:8080/health || exit 1

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]
