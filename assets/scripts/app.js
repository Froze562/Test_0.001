// Generic function: toggle active and close on outside click -->
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
setupToggle("#toggleSidebar", "#Sidebar"); // Toggle SideBar
// setupToggle("trigger", "target");

// Clicking Outside Of Box Trigger Functin's -->
document.addEventListener("click", function (event) {
  // Close all sub-menus
  document.querySelectorAll(".sub-menu.active").forEach((menu) => {
    menu.classList.remove("active");
  });
});

setupToggle("#toggleSidebar", "#Sidebar"); // Toggle Sidebar
// Existing toggle function

// 'X' Axis & 'Y' Axis Trigger Event's -->
const SideBar = document.getElementById("Sidebar");
const toggleSidebar = document.querySelector("#toggleSidebar");

// Detect if device supports touch
if ("ontouchstart" in window || navigator.maxTouchPoints > 0) {
  let startX = 0,
    startY = 0,
    endX = 0,
    endY = 0;

  SideBar.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
  });

  SideBar.addEventListener("touchend", (e) => {
    endX = e.changedTouches[0].clientX;
    endY = e.changedTouches[0].clientY;

    const diffX = endX - startX;
    const diffY = endY - startY;

    // Check if horizontal swipe is stronger than vertical
    if (Math.abs(diffX) > Math.abs(diffY)) {
      // Negative X direction (swipe left)
      if (diffX < -50) {
        // 50px threshold to avoid accidental taps
        SideBar.classList.remove("active");
        toggleSidebar.classList.remove("active");
      }
    }
  });
}

// Toggle Each SubMenu -->
function toggleSubMenu(button) {
  // Close all other active sub-menus
  document.querySelectorAll(".sub-menu.active").forEach((menu) => {
    if (menu !== button.nextElementSibling) {
      menu.classList.remove("active");
    }
  });

  // Toggle the clicked one
  button.nextElementSibling.classList.toggle("active");
}
// Function to close all sub-menus
function closeAllSubMenus() {
  document.querySelectorAll(".sub-menu.active").forEach((menu) => {
    menu.classList.remove("active");
  });
}
// Modify the toggleSidebar event to also close sub-menus
toggleSidebar.addEventListener("click", () => {
  // Existing toggle logic
  toggleSidebar.classList.toggle("active");
  document.getElementById("Sidebar").classList.toggle("active");

  // Close all sub-menus when sidebar is toggled
  closeAllSubMenus();
});
