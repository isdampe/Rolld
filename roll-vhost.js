#!/usr/bin/env node
/*
 * Creates an apache2 virtual host .conf file based on user input
 * Enables the new virtual host
 * Adds a localhost entry to /etc/hosts pointing to the domain.
 */
var fs = require("fs");
var exec = require('child_process').exec;

(function(){

  "use strict";

  var vhost_buffer, s, dr, host_buffer;
  var argNum = process.argv.length -2;
  if ( argNum !== 2 ) {
    console.log("Nope, Usage:");
    console.log("sudo roll-vhost www.domainname.com /path/to/html");
    console.log("sudo roll-vhost www.domainname.com $PWD");
    process.exit(1);
  }

  var template = fs.readFileSync(__dirname + "/data/vhost-template.txt", {
    encoding: "utf8"
  });

  if (! template ) {
    console.log("Error reading data/vhost-template.txt");
    process.exit(1);
  }

  s = process.argv[2];
  dr = process.argv[3];
  if ( dr.slice(-1) !== "/" ) {
    dr += "/";
  }

  //Compile template.
  vhost_buffer = template.replace(/\%s/g, s);
  vhost_buffer = vhost_buffer.replace(/\%dr/g, dr);

  //Write template to apache dir.
  try {
    fs.writeFileSync("/etc/apache2/sites-available/" + s + ".conf", vhost_buffer);
  } catch(e) {
    console.log("Can't write virtualhost .conf file. Are you running as sudo?");
    process.exit(1);
  }

  //Enable module with apache.
  exec("a2ensite " + s, function(err,stdo,stderr){
    if ( err ){
      console.log("WARN: Error from a2ensite: " + err);
    }
    console.log(stdo);

    //Reset apache.
    exec("service apache2 reload",function(err,stdo,stderr){
      if ( err ){
        console.log("WARN: Error from service apache2 reload: " + err);
      };
      console.log(stdo);
    });
  });

  //Add line to hosts file.
  //Check for entry first.
  host_buffer = fs.readFileSync("/etc/hosts", {
    encoding: "utf8"
  });

  if ( host_buffer.indexOf(s) > -1 ) {
    console.log("WARN: Entry for " + s + " already found in /etc/hosts. Ignoring this step.");
  } else {
    console.log("Write entry to /etc/hosts for " + s);
    fs.appendFileSync("/etc/hosts","\n127.0.0.1   " + s + "\n");
  }

  setTimeout(function(){
    console.log("All done. You can now visit http://" + s + " in your browser" );
  },500);


})();
