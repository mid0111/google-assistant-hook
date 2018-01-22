#!/bin/bash

rm -rf dist
mkdir dist

cp -pr {server,package.json,yarn.lock} dist/
pushd dist/
yarn install --prod --silent --no-progress
tar cvfz build.tar.gz ./*

rm -rf {server,package.json,yarn.lock}

popd