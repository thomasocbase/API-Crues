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

- GET baseurl + stations -- Returns all the stations
- GET baseurl + station/:code -- Returns the list of observed water levels from a specific station
- GET baseurl + station/coord/:code -- Returns the geo coordinates (long / lat) of a given station
- GET baseurl + territory/:code -- Returns a specific territory