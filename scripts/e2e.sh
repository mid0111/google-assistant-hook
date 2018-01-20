#!/bin/bash

function clean {
  kill $SERVER_PID
}

node ./server/mock/bin/www &
SERVER_PID=$!

ng e2e --proxy-config client/proxy-mock.conf.json
EXIT_CODE=$?

trap clean EXIT
exit $EXIT_CODE