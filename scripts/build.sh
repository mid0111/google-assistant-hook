#!/bin/bash

rm -rf dist
mkdir dist

cp -pr {server,package.json,yarn.lock} dist/
pushd dist/
yarn install --prod --silent --no-progress
tar cfz build.tar.gz ./*

popd
