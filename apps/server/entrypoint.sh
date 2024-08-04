#!/bin/bash

pnpm prisma migrate deploy

exec "$@"