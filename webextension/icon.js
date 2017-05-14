function generateIconTitle(enabled) {
	let titleMsgID = "icon_title_" + (enabled ? "enabled" : "disabled");
	return browser.runtime.getManifest().name + " – " + browser.i18n.getMessage(titleMsgID);
}


// Monitor settings for changes to the request processing setting
browser.storage.onChanged.addListener((changes, areaName) => {
	for(let name of Object.keys(changes)) {
		if(areaName === "local" && name === "enable") {
			if(changes[name].newValue === true) {
				browser.browserAction.setIcon({ path: { 256: "icon.svg" } });
				browser.browserAction.setTitle({ title: generateIconTitle(true) });
			} else {
				browser.browserAction.setIcon({ path: { 256: "icon-light.svg" } });
				browser.browserAction.setTitle({ title: generateIconTitle(false) });
			}
		}
	}
});

browser.browserAction.onClicked.addListener((tab) => {
	browser.storage.local.get(["enable"]).then((result) => {
		return browser.storage.local.set({ enable: !result.enable });
	}).catch(console.exception);
});
