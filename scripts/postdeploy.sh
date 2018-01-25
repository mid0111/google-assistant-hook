#!/bin/bash

npm run build
sudo apt-get install -y libavahi-compat-libdnssd-dev

cp ./server/config/googleClientSecret.json.sample ./server/config/googleClientSecret.json
cp ./server/config/braviaSecret.json.sample ./server/config/braviaSecret.json
