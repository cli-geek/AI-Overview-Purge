/* NOTICE
This project is a modified version of AIPurge by Matt Anderson (aka Abominable),
originally distributed via Firefox Add-ons (AMO)
under the Mozilla Public License 2.0.

Modifications by: Austin Laubach
*/

let listenerAdded = false;
let modifyRequestListener = null; // Store the listener function for later removal

console.log("Abominable background script loaded");

// Listen for messages from the popup to update the state of the switch
chrome.runtime.onMessage.addListener((message) => {
  const isEnabled = message.enabled;

  // If enabled is true, add the request modification listener
  if (isEnabled) {
    console.log("Switch is ON, modifying requests");

    // Only add the listener once
    if (!listenerAdded) {
      // Define the listener function
      modifyRequestListener = function (details) {
        console.log("Intercepting request:", details.url);

        // Ensure we are only modifying Google search URLs
        if (details.url.includes("https://www.google.com/search")) {
          const url = new URL(details.url);
          let query = url.searchParams.get("q");

          // Check if the 'abominable' marker is present to avoid loops
          if (url.searchParams.has("abominable")) {
            console.log("Already processed, skipping modification");
            return {}; // Skip the modification if the marker is present
          }

          // If there's a search query, append '-ai' if it's not already there. If "ai" exists, ignore.
		  if (query && !query.includes("-ai")) {
			if(!query.includes("ai")){
				query += " -ai";
				url.searchParams.set("q", query);
			}
			url.searchParams.set("q", query);
		  }

          // Add a marker to avoid further modifications (prevent redirect loop)
          url.searchParams.set("abominable", "true");
          console.log("Modified URL:", url.toString());

          // Redirect to the modified URL
          return { redirectUrl: url.toString() };
        }

        return {}; // Return nothing if not a Google search URL
      };

      // Add the webRequest listener
      chrome.webRequest.onBeforeRequest.addListener(
        modifyRequestListener,
        {
          urls: ["*://www.google.com/search*"]
        },
        ["blocking"]
      );

      listenerAdded = true;
      console.log("WebRequest listener attached");
    }
  } else {
    console.log("Switch is OFF, not modifying requests");

    // Remove the listener if the switch is off
    if (listenerAdded && modifyRequestListener) {
      chrome.webRequest.onBeforeRequest.removeListener(modifyRequestListener);
      listenerAdded = false;
      console.log("WebRequest listener removed");
    }
  }
});
