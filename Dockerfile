FROM nginx:alpine

# Cài ca-certificates
RUN apk add --no-cache ca-certificates

COPY dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
