var system 	= require('system');
var stdin	= system.stdin;
var stdout	= system.stdout;

var line = system.stdin.readLine();
line += '+reply ... :D';
system.stdout.writeLine(JSON.stringify(line));

phantom.exit(0);