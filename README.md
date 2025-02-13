# API "Crues" Documentation

This API is bridging to the FR gov API related to monitoring the levels of rivers.

- Node.js + Express
- Ky (HTTP requets)
- Docker

## Installation

### Required

- [Docker](https://www.docker.com/)

### Commands

```
docker compose up
```

## API

### Base URL

http://localhost:3000/api/

### Endpoints

GET crues -- Returns all the territories
GET crues/territory/:code -- Returns a specific territory