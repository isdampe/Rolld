#!/bin/sh
mogrify -format jpg -quality 75 -resize 1500x *.jpg
mogrify -gravity center -background white -extent 1500x1125 *.jpg
