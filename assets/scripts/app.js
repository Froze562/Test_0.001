//Disable Autofill, AutoComplete ETC. from Input -->
window.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("input").forEach((input) => {
    input.setAttribute("autocomplete", "off");
    input.setAttribute("autocorrect", "off");
    input.setAttribute("autocapitalize", "off");
    input.setAttribute("spellcheck", "false");
  });
});

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
setupToggle("#toggleSidebar", "#Sidebar"); // Toggle Sidebar
setupToggle("#-iSearch", ".search-container"); // Toggle SearchContainer
setupToggle("#-iSearch", ".search-box"); // Toggle SearchContainer
setupToggle(".search-container", ".search-box"); // Toggle SearchContainer
// setupToggle("trigger", "target");

// Clicking Outside Of Box Trigger Functin's -->
document.addEventListener("click", function (event) {
  // Close all sub-menus
  document.querySelectorAll(".sub-menu.active").forEach((menu) => {
    menu.classList.remove("active");
  });
});
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    searchContainer.classList.remove("active");
    searchBox.classList.remove("active");
    searchToggle.classList.remove("active");
  }
});

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

// Function's Of Search-Container -->
const input = document.querySelector(".search-input");

// Open search box on "/" key
document.addEventListener("keydown", function (e) {
  if (
    e.key === "/" &&
    !["INPUT", "TEXTAREA"].includes(document.activeElement.tagName)
  ) {
    e.preventDefault();
    document.querySelector("#-iSearch").click();
  }

  setTimeout(() => {
    input.focus();
  }, 700);
});
// Clear input on outside click
document.addEventListener("click", function (event) {
  if (input && !input.contains(event.target)) {
    input.value = "";
  }
});
// Clear input utility
function clearInput() {
  if (input) {
    input.value = "";
    input.placeholder = "Search";
  }

  setTimeout(() => {
    input.focus();
  }, 1000);
}

// Search Option for Search Input -->
const suggestionBox = document.querySelector(".search-suggestions");
const searchOptions = [...document.querySelectorAll(".search-option")];

document.addEventListener("DOMContentLoaded", () => {
  let currentFocus = -1;

  // Helper function to highlight the active item in the list
  const setActiveItem = (items) => {
    items.forEach((item) => item.classList.remove("active"));
    if (currentFocus > -1 && items[currentFocus]) {
      items[currentFocus].classList.add("active");
    }
  };

  // Function to render matching suggestions in the suggestion box
  const renderSuggestions = (query) => {
    suggestionBox.innerHTML = "";
    currentFocus = -1;

    if (!query.trim()) {
      suggestionBox.style.display = "none";
      return;
    }

    const matchedItems = searchOptions.filter((el) =>
      el.textContent.trim().toLowerCase().includes(query)
    );

    if (matchedItems.length === 0) {
      suggestionBox.innerHTML = `<li class="list-group-item text-white fs-5 p-1 ps-4">No results found</li>`;
      suggestionBox.style.display = "block";
      return;
    }

    matchedItems.forEach((el) => {
      const highlightedText = highlightQuery(el.textContent, query);
      const li = createSuggestionItem(highlightedText, el);
      suggestionBox.appendChild(li);
    });

    suggestionBox.style.display = "block";
  };

  // Helper function to highlight the query in matched text
  const highlightQuery = (text, query) => {
    const regex = new RegExp(`(${query})`, "gi");
    return text.replace(regex, '<span style="color: #ff6f61;">$1</span>');
  };

  // Function to create a suggestion item (li element)
  const createSuggestionItem = (highlightedText, el) => {
    const li = document.createElement("li");
    li.innerHTML = highlightedText;
    li.classList.add("suggestion-item", "list-group-item");
    li.style.cursor = "pointer";

    li.addEventListener("click", () => handleItemClick(el));
    return li;
  };

  // Handle item click event (navigation)
  const handleItemClick = (el) => {
    const anchor = el.querySelector("a") || el.closest("a");
    if (anchor) window.location.href = anchor.href;
  };

  // Function to find the best match based on query
  const findBestMatch = (query) => {
    return searchOptions.reduce(
      (bestMatch, el, index) => {
        const matches = getMatchCount(query, el.textContent.toLowerCase());
        return matches > bestMatch.matches ? { matches, index } : bestMatch;
      },
      { matches: 0 }
    ).index;
  };

  // Helper function to count how many characters in `a` are in `b`
  const getMatchCount = (a, b) => {
    let matches = 0;
    const bChars = [...b];
    for (const char of a) {
      const index = bChars.indexOf(char);
      if (index !== -1) {
        matches++;
        bChars.splice(index, 1); // Remove matched character
      }
    }
    return matches;
  };

  // Event listener for the input field to handle text changes
  input.addEventListener("input", (e) => {
    const query = e.target.value.trim().toLowerCase();
    renderSuggestions(query);
  });

  // Event listener to handle arrow keys and Enter key press
  input.addEventListener("keydown", (e) => {
    const items = suggestionBox.querySelectorAll(".suggestion-item");
    const deactivateSearchUI = () => {
      document.querySelector(".search-container")?.classList.remove("active");
      document.querySelector(".search-box")?.classList.remove("active");
    };
    const query = input.value.trim().toLowerCase();

    switch (e.key) {
      case "ArrowDown":
        currentFocus = (currentFocus + 1) % items.length;
        setActiveItem(items);
        e.preventDefault();
        break;

      case "ArrowUp":
        currentFocus = (currentFocus - 1 + items.length) % items.length;
        setActiveItem(items);
        e.preventDefault();
        break;

      case "Enter":
        e.preventDefault();
        if (currentFocus > -1 && items[currentFocus]) {
          items[currentFocus].click();
          deactivateSearchUI(); // 👈 REMOVE active classes when selected
        } else if (query) {
          const bestMatchIndex = findBestMatch(query);
          if (bestMatchIndex !== -1) {
            const el = searchOptions[bestMatchIndex];
            handleItemClick(el);
            deactivateSearchUI(); // 👈 REMOVE active classes on best match
          }
        }
        break;

      default:
        break;
    }
  });
});
