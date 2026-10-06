document.addEventListener("DOMContentLoaded", () => {
  const navList = document.querySelector(".nav-links");
  const menuBtn = document.querySelector(".menu-btn");
  const navLinks = document.querySelectorAll(".nav-links a");

  // Smooth scroll + close mobile menu
  navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");
      if (!targetId || !targetId.startsWith("#")) return;
      const section = document.querySelector(targetId);
      if (!section) return;
      event.preventDefault();
      section.scrollIntoView({ behavior: "smooth", block: "start" });
      navList.classList.remove("open");
      menuBtn.setAttribute("aria-expanded", "false");
    });
  });

  // Mobile menu toggle
  menuBtn.addEventListener("click", () => {
    const open = navList.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", String(open));
  });

  // Highlight the link for the section in view
  const sections = [...navLinks]
    .map((l) => document.querySelector(l.getAttribute("href")))
    .filter(Boolean);

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((l) =>
          l.classList.toggle("active", l.getAttribute("href") === "#" + entry.target.id)
        );
      });
    },
    { rootMargin: "-40% 0px -55% 0px" }
  );
  sections.forEach((s) => observer.observe(s));
});
