const LATEST_RELEASE_URL =
  'https://api.github.com/repos/GraysonChiang/chrome-extension-test/releases/latest';

// 逐段比較 "1.2.3" 這種版本號：a > b 回傳正數
export function compareVersions(a, b) {
  const pa = a.split('.').map(Number);
  const pb = b.split('.').map(Number);
  for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
    const diff = (pa[i] || 0) - (pb[i] || 0);
    if (diff !== 0) return diff;
  }
  return 0;
}

// 查 GitHub 最新 Release，結果存進 storage 並更新圖示 badge
export async function checkForUpdate() {
  const res = await fetch(LATEST_RELEASE_URL, {
    headers: { Accept: 'application/vnd.github+json' },
  });
  if (!res.ok) throw new Error(`GitHub API 回應 ${res.status}`);
  const release = await res.json();

  const latestVersion = release.tag_name.replace(/^v/, '');
  const currentVersion = chrome.runtime.getManifest().version;
  const zip = release.assets.find((a) => a.name.endsWith('.zip'));
  const update = {
    latestVersion,
    hasUpdate: compareVersions(latestVersion, currentVersion) > 0,
    downloadUrl: zip ? zip.browser_download_url : release.html_url,
    checkedAt: Date.now(),
  };

  await chrome.storage.local.set({ update });
  await chrome.action.setBadgeText({ text: update.hasUpdate ? 'NEW' : '' });
  if (update.hasUpdate) {
    await chrome.action.setBadgeBackgroundColor({ color: '#d93025' });
  }
  return update;
}
