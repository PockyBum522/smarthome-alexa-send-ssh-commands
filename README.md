You need to npm install alexa-sdk and simple-ssh.

Put your private key in. (The example in the code is obviously truncated.) The backticks ensure a multiline string works correctly. I haven't tested it with indentation in front of the lines, I don't know if node is smart enough to handle that. I would just make sure your key doesn't have any leading whitespace in front of the lines.

Put in your server, username, and command(s). See simple-ssh documentation for information on how to chain commands. I haven't tested chaining with this code, but I know it will send one fine. YMMV.

Have fun.