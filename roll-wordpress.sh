#!/bin/bash
wget http://wordpress.org/latest.tar.gz
tar xf latest.tar.gz
mv wordpress/* ./
rm wordpress latest.tar.gz -R
sudo chown www-data ./ -R
sudo chmod 777 ./ -R