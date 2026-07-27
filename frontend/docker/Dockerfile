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

RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /build/ /usr/share/nginx/html/

COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY nginx/conf.d/ /etc/nginx/conf.d/

RUN mkdir -p /var/cache/nginx /tmp/nginx

RUN chown -R nginx:nginx \
    /usr/share/nginx/html \
    /var/cache/nginx \
    /tmp/nginx

USER nginx

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \
CMD wget --spider --quiet http://127.0.0.1:8080/health || exit 1

CMD ["nginx","-g","daemon off;"]
