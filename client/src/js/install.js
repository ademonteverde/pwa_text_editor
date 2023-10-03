const installButton = document.getElementById('buttonInstall');

// Logic for installing the PWA
window.addEventListener('beforeinstallprompt', (event) => {
  window.deferredPrompt = event;

  // Remove 'hidden' class from the install button to make visible
  installButton.classList.remove('hidden');
});

// click event listener to the install button
installButton.addEventListener('click', async () => {
  const promptEvent = window.deferredPrompt;

  if (!promptEvent) {
    return;
  }

  promptEvent.prompt();

  window.deferredPrompt = null;

  // Hide the install button after clicking
  installButton.classList.add('hidden');
});

// handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
  // Clear the deferred prompt variable
  window.deferredPrompt = null;
});
