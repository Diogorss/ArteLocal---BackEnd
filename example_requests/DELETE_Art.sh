#!/bin/bash
TOKEN="COLE_SEU_TOKEN_AQUI"
ART_ID=1
curl -X DELETE http://localhost:3000/arts/$ART_ID \
  -H "Authorization: Bearer $TOKEN"