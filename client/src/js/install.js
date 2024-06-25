const butInstall = document.getElementById("buttonInstall");

// Check if the browser supports service workers
window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  butInstall.style.display = "block";
  window.deferredPrompt = event;
});

// Handle the install button click
butInstall.addEventListener("click", async () => {
  if (window.deferredPrompt) {
    window.deferredPrompt.prompt();
    const { outcome } = await window.deferredPrompt.userChoice;
    window.deferredPrompt = null;
    butInstall.style.display = "none";
  } else {
    return;
  }
});

// Handle the appinstalled event
window.addEventListener("appinstalled", (event) => {
  console.log("PWA was installed");
  window.deferredPrompt = null;
});
