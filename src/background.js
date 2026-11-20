import { checkForUpdate } from './update.js';

const ALARM_NAME = 'check-update';

chrome.runtime.onInstalled.addListener(async () => {
  await chrome.alarms.create(ALARM_NAME, { periodInMinutes: 360 });
  try {
    await checkForUpdate();
  } catch (err) {
    console.error('檢查更新失敗：', err);
  }
});

chrome.alarms.onAlarm.addListener(async (alarm) => {
  if (alarm.name !== ALARM_NAME) return;
  try {
    await checkForUpdate();
  } catch (err) {
    console.error('檢查更新失敗：', err);
  }
});
