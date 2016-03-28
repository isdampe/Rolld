#!/bin/sh
mogrify -format png -resize 1500x *.png
mogrify -gravity center -background transparent -extent 1500x1125 *.png
mogrify -format jpg -quality 75 -background white -alpha remove *.png
rm *.png
