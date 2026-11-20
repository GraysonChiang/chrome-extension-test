const countEl = document.getElementById('count');
const btn = document.getElementById('btn');

async function init() {
  const { count = 0 } = await chrome.storage.local.get('count');
  countEl.textContent = count;
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

init().catch((err) => console.error('讀取點擊次數失敗：', err));
