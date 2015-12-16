#!/usr/bin/env node
/*
 * Toggles a domain on or off in /etc/hosts.
 */

var fs = require("fs");


(function(){

	"use strict";

	var toggleState, hostArray = [], hostBuffer;

	var main = function() {

		var argNum = process.argv.length -2, i = 3;

		if ( argNum < 2 ) {
			usage();
			process.exit(0);
		}

		toggleState = process.argv[2];
		if ( toggleState !== "on" && toggleState !== "off" ) {
			usage();
			process.exit(0);
		}

		hostBuffer = fs.readFileSync("/etc/hosts", {
			encoding: "utf8"
		});

		for ( i; i<(argNum + 2); i++ ) {
			toggleLocalHost(toggleState,process.argv[i]);
		}

	};

	var usage = function() {
		console.log("Nope, Usage:");
		console.log("sudo vhost-toggle on www.domainname.com [www.anotherdomain.com] [...]");
		console.log("sudo vhost-toggle off www.domainname.com [www.anotherdomain.com] [...]");
		process.exit(0);
	};

	var toggleLocalHost = function(toggleState,host) {

		switch(toggleState) {
			case "on":
				addHostEntry(host);
			break;
			case "off":
				removeHostEntry(host);
			break;
		}

	};

	var addHostEntry = function(host) {

		//Is the entry already there?
		 if ( hostBuffer.indexOf(host) > -1 ) {
		 	console.log("WARN: skipping " + host + ", entry already exists.");
		 	return false;
		 }

		 fs.appendFileSync("/etc/hosts","\n127.0.0.1	" + host + " #vhost-toggle");
		 hostBuffer += "\n127.0.0.1	" + host + " #vhost-toggle";
		 console.log("Add host entry for " + host);

	};

	var removeHostEntry = function(host) {

		hostBuffer = hostBuffer.replace("\n127.0.0.1	" + host + " #vhost-toggle","");
		fs.writeFileSync("/etc/hosts",hostBuffer);
		console.log("Removed host entry for " + host);

	};

	main();


})();