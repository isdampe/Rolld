#Rolld
A personal set of bash scripts for rolling out web projects.

##Usage
Drop them in somewhere like /opt/, and then

1. cd /opt/rolld/ && chmod +x *.sh
2. sudo ln -s /opt/rolld/roll-static.sh /usr/bin/roll-static
3. sudo ln -s /opt/rolld/roll-wordpress.sh /usr/bin/roll-wordpress
3. cd /path/to/project
4. roll-static
5. cd /path/to/wordpress
6. roll-wordpress