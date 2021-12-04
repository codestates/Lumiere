#!/bin/bash
cd /home/ubuntu/Lumiere/server

export MONGO_URI=$(aws ssm get-parameters --region ap-northeast-2 --names MONGO_URI --query Parameters[0].Value | sed 's/"//g')
export JWT_KEY=$(aws ssm get-parameters --region ap-northeast-2 --names JWT_KEY --query Parameters[0].Value | sed 's/"//g')
authbind --deep pm2 start index.js