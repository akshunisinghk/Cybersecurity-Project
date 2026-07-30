# ---------- Build Stage ----------
FROM golang:1.26-alpine AS builder

WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download

COPY . .

RUN CGO_ENABLED=0 GOOS=linux go build -o server .

# ---------- Runtime Stage ----------
FROM alpine:3.22

WORKDIR /app

RUN apk --no-cache add ca-certificates wget

COPY --from=builder /app/server .
COPY .env.example ./

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
CMD wget --spider -q http://localhost:8080/health || exit 1

CMD ["./server"]