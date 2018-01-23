#!/bin/bash
wget http://wordpress.org/latest.tar.gz
tar xf latest.tar.gz
mv wordpress/* ./
rm wordpress latest.tar.gz -R
cd wp-content/plugins
rm hello.php
rm akismet -R
wget https://downloads.wordpress.org/plugin/advanced-custom-fields.zip
unzip advanced-custom-fields.zip
wget https://downloads.wordpress.org/plugin/wordpress-seo.zip
unzip wordpress-seo.zip
wget https://downloads.wordpress.org/plugin/wp-super-cache.zip
unzip wp-super-cache.zip
rm *.zip
cp ~/acf/acf-gallery ./ -R
cp ~/acf/acf-repeater ./ -R
cp ~/acf/acf-options-page ./ -R
cd ../themes
rm twenty* -R
mkdir rename_me
cd rename_me
touch header.php footer.php index.php functions.php archive.php single.php page.php style.css
mkdir lib
cd ../../../
rm readme.html
sudo chown www-data ./ -R
cd wp-content/themes
sudo chown dampe:dampe rename_me -R
cd ../../