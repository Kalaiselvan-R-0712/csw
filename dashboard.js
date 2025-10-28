// ==========================
// Stackly Cloud Dashboard JS
// Shared logic for user + admin dashboards
// ==========================

// --- THEME MANAGEMENT ---
const body = document.body;
const themeToggle = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");

// Restore saved theme
(function () {
  const savedTheme = localStorage.getItem("stackly-theme");
  if (savedTheme === "light") {
    body.classList.replace("dark", "light");
    themeIcon.className = "fas fa-moon";
  } else {
    body.classList.add("dark");
  }
})();

// Theme toggle event
if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    if (body.classList.contains("dark")) {
      body.classList.replace("dark", "light");
      themeIcon.className = "fas fa-moon";
      localStorage.setItem("stackly-theme", "light");
    } else {
      body.classList.replace("light", "dark");
      themeIcon.className = "fas fa-sun";
      localStorage.setItem("stackly-theme", "dark");
    }
  });
}

// --- SESSION PROTECTION ---
(function () {
  const userRole = localStorage.getItem("stackly-user");

  // Redirect unauthorized users
  if (!userRole) {
    window.location.href = "login.html";
  }

  // Role-based restriction (admin vs user)
  const isAdminPage = window.location.pathname.includes("admin-dashboard.html");
  if (isAdminPage && userRole !== "admin") {
    window.location.href = "login.html";
  }
  if (!isAdminPage && userRole === "admin") {
    // Optional: allow admin to access both or restrict only admin panel
  }
})();

// --- LOGOUT HANDLER ---
const logoutBtn = document.getElementById("logout");
if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("stackly-user");
    window.location.href = "login.html";
  });
}

// --- HELPER: Animate cards on scroll ---
window.addEventListener("scroll", () => {
  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
    const rect = card.getBoundingClientRect();
    if (rect.top < window.innerHeight - 50) {
      card.style.transition = "transform 0.6s ease, opacity 0.6s ease";
      card.style.transform = "translateY(0)";
      card.style.opacity = "1";
    }
  });
});

// --- Optional fade-in on load ---
window.addEventListener("load", () => {
  document.querySelectorAll(".card, .chart-container").forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    setTimeout(() => {
      el.style.transition = "transform 0.6s ease, opacity 0.6s ease";
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    }, 200);
  });
});
