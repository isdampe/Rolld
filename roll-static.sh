#!/bin/bash
git clone https://github.com/evasivesoftware/WebAppMin.git
mv WebAppMin/* ./
rm WebAppMin -Rf
npm install