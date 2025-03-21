import { ClassThatUsesAnotherClass } from "./ClassThatUsesAnotherClass.js";
import { ClassWithData } from "./ClassWithData.js";

const restApiService = new ClassWithData("Woof!");
const accountConfigDataSource = new ClassThatUsesAnotherClass(restApiService);

async function lifeCycle(alarm) {
  console.log(
    "LifeCycle alarm: " + alarm.name + " " + Date(Date.now()).toString(),
  );
  let isFirst = true;
  await chrome.storage.local.get(["firstTime"]).then((result) => {
    if (!("firstTime" in result)) {
      isFirst = true;
    } else {
      isFirst = false;
    }
  });
  if (isFirst == true) {
    restApiService.setVoice("Meow... Meow...");
    await chrome.storage.local.set({ firstTime: "done" });
  }
  accountConfigDataSource.useOtherClass();
}

/**
 * Ensures the lifecycle alarm exists, creating it if necessary.
 */
async function checkAlarmState() {
  const alarm = await chrome.alarms.get("lifecycle");

  if (!alarm) {
    await chrome.alarms.create("lifecycle", {
      delayInMinutes: 0.5,
      periodInMinutes: 1.5,
    });
  }
}

/**
 * Initializes the extension. Called after being installed or after startup
 */
async function initialize() {
  await checkAlarmState();
}

// Schedule periodic execution of the extension lifecycle.
chrome.alarms.onAlarm.addListener(lifeCycle);

// Listener for extension installation.
chrome.runtime.onInstalled.addListener(() => {
  console.log("chromeos-extension installed: " + Date(Date.now()).toString());
  initialize();
});

// Listener for ChromeOS device startup.
chrome.runtime.onStartup.addListener(() => {
  console.log(
    "chromeos-extension loaded on startup: " + Date(Date.now()).toString(),
  );
  initialize();
});
