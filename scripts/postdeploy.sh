#!/bin/bash

npm run build

cp ./server/config/googleClientSecret.json.sample ./server/config/googleClientSecret.json
cp ./server/config/braviaSecret.json.sample ./server/config/braviaSecret.json

pwd
ls