#!/bin/bash
git clone https://github.com/isdampe/Web-App-Min-2015.git
mv Web-App-Min-2015/* ./
rm Web-App-Min-2015 -Rf
./install.sh
