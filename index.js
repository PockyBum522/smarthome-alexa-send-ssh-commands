var SSH = require('simple-ssh');
var Alexa = require("alexa-sdk");

exports.handler = function(event, context, callback) {
    var ssh = new SSH({
        host: 'yourserver.com',
        user: 'username',
        key: `-----BEGIN RSA PRIVATE KEY-----
MIIEpAIBAAKCAQEApQtRxugrDMU8YNBy2j2Lyk6yAxMSKaiusrNUamXKLxFvdlZ1
qllnnUwLPC1P/2jPXRtmavLhhiAUrPVpC12WjZMlYTxQc9WbjXHXx24MgPa8jeAw
TOQ3MOm/zcJZbiTY1/cx2CW6NupPX78O42hLKM2iJwp6epgxC5t2Vw==
-----END RSA PRIVATE KEY-----`
    });

    var alexa = Alexa.handler(event, context);
	alexa.registerHandlers(handlers);

	ssh.on("close", function () {alexa.execute()});
	ssh
        .exec('nohup /path/to/script.sh </dev/null &>/dev/null &', {  // Nohup runs script in BG, < /dev/null &> redirects input and output. & also runs in BG. Trying to keep things fast to make alexa response time good.
            out: console.log.bind(console)
        })
        .exec('exit', {                                            // Also for trying to keep things fast.
            out: console.log.bind(console)
        }).start();	
};

var handlers = {
    'LaunchRequest': function(){
		this.emit(':tell', 'Script run.'); 
    }
};