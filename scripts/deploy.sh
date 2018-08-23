#!/bin/bash
echo "DEPLOY!"
yarn run build
cd build
cf push -b staticfile_buildpack dfagenda -m 64M
