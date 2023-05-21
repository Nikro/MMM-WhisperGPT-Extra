/* global Module */

/* Magic Mirror
 * Module: MMM-WhisperGPT-Extra
 *
 * By Sergiu Nagailic
 * MIT Licensed.
 */

Module.register("MMM-WhisperGPT-Extra", {
	requiresVersion: "2.1.0", // Required version of MagicMirror

	start: function() {
		var self = this;
	},

	getDom: function() {
		var self = this;
		var wrapper = document.createElement("div");
		return wrapper;
	},

	getScripts: function() {
		return [];
	},

	getStyles: function () {
		return [
			"MMM-WhisperGPT-Extra.css",
		];
	},

	// socketNotificationReceived from helper
  notificationReceived: function (notification, payload, sender) {
		if (notification === 'WHISPERGPT_COMMAND') {
      this.sendSocketNotification("COMMAND", payload);
		}
		else if (notification === 'WHISPERGPT_KEYWORD_DETECTED') {
      this.sendSocketNotification("KEYWORD_DETECTED", payload);
		}
	},
});
