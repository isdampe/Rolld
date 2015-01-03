#!/bin/bash
git clone https://github.com/isdampe/Web-App-Min-2015.git
mv WebAppMin2015/* ./
rm WebAppMin2015 -Rf
chmod +x launch.sh install.sh
./install.sh
