// Generic function: toggle active and close on outside click
function setupToggle(triggerSelector, targetSelector) {
  const trigger = document.querySelector(triggerSelector);
  const target = document.querySelector(targetSelector);

  // Toggle active on trigger and target
  trigger.addEventListener("click", (e) => {
    e.stopPropagation();
    trigger.classList.toggle("active");
    target.classList.toggle("active");
  });

  // Close target if clicking outside
  document.addEventListener("click", () => {
    trigger.classList.remove("active");
    target.classList.remove("active");
  });

  // Stop clicks inside target from closing
  target.addEventListener("click", (e) => e.stopPropagation());
}
setupToggle("#toggleSidebar", ".sidebar"); // Toggle SideBar
setupToggle(".dropdown-btn", ".sub-menu"); // Toggle SubMenu
// setupToggle("trigger", "target");

// Detect if device supports touch
if ("ontouchstart" in window || navigator.maxTouchPoints > 0) {
  const sidebar = document.querySelector(".sidebar");
  const toggleSidebar = document.querySelector("#toggleSidebar");

  let startX = 0,
    startY = 0,
    endX = 0,
    endY = 0;

  sidebar.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
  });

  sidebar.addEventListener("touchend", (e) => {
    endX = e.changedTouches[0].clientX;
    endY = e.changedTouches[0].clientY;

    const diffX = endX - startX;
    const diffY = endY - startY;

    // Check if horizontal swipe is stronger than vertical
    if (Math.abs(diffX) > Math.abs(diffY)) {
      // Negative X direction (swipe left)
      if (diffX < -50) {
        // 50px threshold to avoid accidental taps
        sidebar.classList.remove("active");
        toggleSidebar.classList.remove("active");
      }
    }
  });
}
