#!/bin/bash

rm -rf dist
mkdir dist

cp -pr {server,package.json,yarn.lock} dist/
pushd dist/
yarn --prod
tar cvfz build.tar.gz ./*

rm -rf {server,package.json,yarn.lock}

popd