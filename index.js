var SSH = require('simple-ssh');
var Alexa = require("alexa-sdk");

var ssh = new SSH({
	host: 'yourserver.com',
	user: 'username',
  	key: `-----BEGIN RSA PRIVATE KEY-----
MIIEpAIBAAKCAQEApQtRxugrDMU8YNBy2j2Lyk6yAxMSKaiusrNUamXKLxFvdlZ1
6HCN+jjaE7q8OYFEmq9l2B5U8GCYMFldXWBxIv7fvRWyi1ZTw3olaZ8DmGYwPKLM
TOQ3MOm/zcJZbiTY1/cx2CW6NupPX78O42hLKM2iJwp6epgxC5t2Vw==
-----END RSA PRIVATE KEY-----`
});

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
	alexa.registerHandlers(handlers);

	ssh.on("close", function () {alexa.execute()});
	ssh
        .exec('nohup /home/username/script.sh > /dev/null 2>&1 &', {  // Nohup runs script in BG, > /dev/null redirects output. & also runs in BG. Trying to keep things fast to make alexa response time good.
            out: console.log.bind(console)
        })
        .exec('exit', {                                               // Also for trying to keep things fast.
            out: console.log.bind(console)
        }).start();	
};

var handlers = {
    'LaunchRequest': function(){
		this.emit(':tell', 'Now opening the garage door.'); 
    }
};