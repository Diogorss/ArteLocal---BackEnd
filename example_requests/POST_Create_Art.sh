#!/bin/bash
TOKEN="COLE_SEU_TOKEN_AQUI"
curl -X POST http://localhost:3000/arts \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"title":"Minha Arte","description":"Descrição da arte","imageUrl":"https://exemplo.com/imagem.jpg"}'