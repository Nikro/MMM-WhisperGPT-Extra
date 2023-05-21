/* Magic Mirror
 * Node Helper: MMM-WhisperGPT-Extra
 *
 * By Sergiu Nagailic
 * MIT Licensed.
 */
const exec = require('child_process').exec;
let NodeHelper = require("node_helper");

module.exports = NodeHelper.create({

	// Override socketNotificationReceived method.

	/* socketNotificationReceived(notification, payload)
	 * This method is called when a socket notification arrives.
	 *
	 * argument notification string - The identifier of the notification.
	 * argument payload mixed - The payload of the notification.
	 */
	socketNotificationReceived: function(notification, payload) {
		if (notification === "COMMAND") {
			this.processCommand(payload);
		}
		else if (notification === 'KEYWORD_DETECTED') {
			this.focusOn();
		}
	},

  processCommand: function(command) {
    // Convert the command to lowercase to handle case variations
    command = command.toLowerCase();

    // Remove any extra spaces
    command = command.replace(/\s+/g, ' ').trim();

    // Define regular expression patterns for each command
    let turnOffPattern = /(turn|shut).*off/;
    let shutDownPattern = /shut.*down/;
    let turnOnPattern = /(turn|power).*on/;
    let chromeCastPattern = /(chromecast)/;

    // Check if command matches any pattern
    if (turnOffPattern.test(command) || shutDownPattern.test(command)) {
      // Command is to turn off the TV
      console.log("Turning off the TV");
      this.turnOff();
      return;
    }

    if (turnOnPattern.test(command)) {
      // Command is to turn on the TV
      console.log("Turning on the TV");
      this.turnOn();
      return;
    }

    if (chromeCastPattern.test(command)) {
      // Switch to Chromecast.
      console.log("Switch to Chromecast");
      this.focusOff();
		}

    // If none of the patterns matched, the command is not recognized
    console.log("Command not recognized");
  },


  turnOn: function() {
    exec('cec-ctl -d /dev/cec0 --to 0 --image-view-on', (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
      console.error(`stderr: ${stderr}`);
    });
  },

  turnOff: function() {
    exec('cec-ctl -d /dev/cec0 --to 0 --standby', (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
      console.error(`stderr: ${stderr}`);
    });
  },

  focusOn: function() {
    exec('cec-ctl -d /dev/cec0 --to 0 --active-source phys-addr=2.0.0.0', (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
      console.error(`stderr: ${stderr}`);
    });
  },

  focusOff: function() {
    exec('cec-ctl -d /dev/cec0 --to 0 --active-source phys-addr=1.0.0.0', (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
      console.error(`stderr: ${stderr}`);
    });
  }


});
