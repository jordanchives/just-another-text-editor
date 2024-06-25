const butInstall = document.getElementById("buttonInstall");

window.addEventListener("beforeinstallprompt", (event) => {
  console.log("beforeinstallprompt event fired");
  event.preventDefault();
  butInstall.style.display = "block";
  window.deferredPrompt = event;
});

butInstall.addEventListener("click", async () => {
  console.log("Install button clicked");
  if (window.deferredPrompt) {
    console.log("Showing install prompt");
    window.deferredPrompt.prompt();
    const { outcome } = await window.deferredPrompt.userChoice;
    console.log(`User response to the install prompt: ${outcome}`);
    window.deferredPrompt = null;
    butInstall.style.display = "none";
  } else {
    console.log("No deferred prompt available");
  }
});

window.addEventListener("appinstalled", (event) => {
  console.log("PWA was installed");
  window.deferredPrompt = null;
});
