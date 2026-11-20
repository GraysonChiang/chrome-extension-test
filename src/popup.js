import { checkForUpdate } from './update.js';

const countEl = document.getElementById('count');
const btn = document.getElementById('btn');
const statusEl = document.getElementById('update-status');
const downloadBtn = document.getElementById('download');
const checkBtn = document.getElementById('check');

function renderUpdate(update) {
  if (!update) return;
  const time = new Date(update.checkedAt).toLocaleString();
  if (update.hasUpdate) {
    statusEl.textContent = `有新版 v${update.latestVersion}！下載後解壓，到 chrome://extensions 按重新整理。`;
    downloadBtn.hidden = false;
    downloadBtn.onclick = () => chrome.tabs.create({ url: update.downloadUrl });
  } else {
    statusEl.textContent = `已是最新版（${time} 檢查）`;
    downloadBtn.hidden = true;
  }
}

async function init() {
  document.getElementById('version').textContent = `v${chrome.runtime.getManifest().version}`;
  const { count = 0, update } = await chrome.storage.local.get(['count', 'update']);
  countEl.textContent = count;
  renderUpdate(update);
}

btn.addEventListener('click', async () => {
  try {
    const { count = 0 } = await chrome.storage.local.get('count');
    await chrome.storage.local.set({ count: count + 1 });
    countEl.textContent = count + 1;
  } catch (err) {
    console.error('更新點擊次數失敗：', err);
  }
});

checkBtn.addEventListener('click', async () => {
  checkBtn.disabled = true;
  statusEl.textContent = '檢查中…';
  try {
    renderUpdate(await checkForUpdate());
  } catch (err) {
    statusEl.textContent = `檢查失敗：${err.message}`;
  } finally {
    checkBtn.disabled = false;
  }
});

init().catch((err) => console.error('初始化失敗：', err));
