#!/bin/bash
curl -X POST http://localhost:3000/user/register \
  -H "Content-Type: application/json" \
  -d '{"name":"teste","email":"teste@email.com","password":"123456","confirmPassword":"123456"}' \