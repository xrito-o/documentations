(function() {
  const lastUpdatedMeta = document.querySelector('meta[name="last-updated"]');
  if (!lastUpdatedMeta) return;

  const currentTimestamp = lastUpdatedMeta.getAttribute('content');

  // How often to check for updates (milliseconds)
  const CHECK_INTERVAL = 5 * 60 * 1000; // 5 minutes

  function checkForUpdate() {
    fetch(window.location.href, { cache: 'no-store' })
      .then(response => response.text())
      .then(html => {
        // Parse fetched HTML to find last updated meta
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const remoteMeta = doc.querySelector('meta[name="last-updated"]');
        if (!remoteMeta) return;

        const remoteTimestamp = remoteMeta.getAttribute('content');

        if (remoteTimestamp > currentTimestamp) {
          // Show update notification to user
          if (!document.getElementById('update-notification')) {
            const notification = document.createElement('div');
            notification.id = 'update-notification';
            notification.style.position = 'fixed';
            notification.style.bottom = '10px';
            notification.style.right = '10px';
            notification.style.backgroundColor = '#007acc';
            notification.style.color = '#fff';
            notification.style.padding = '10px 20px';
            notification.style.borderRadius = '5px';
            notification.style.cursor = 'pointer';
            notification.style.zIndex = '9999';
            notification.textContent = 'New version available! Click to refresh.';
            notification.onclick = () => location.reload();
            document.body.appendChild(notification);
          }
        }
      })
      .catch(err => console.error('Update check failed:', err));
  }

  // Initial check and periodic checks
  checkForUpdate();
  setInterval(checkForUpdate, CHECK_INTERVAL);
})();
