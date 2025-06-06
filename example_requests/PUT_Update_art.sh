#!/bin/bash
TOKEN="COLE_SEU_TOKEN_AQUI"
ART_ID=1
curl -X PUT http://localhost:3000/arts/$ART_ID \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"title":"Arte Atualizada"}'