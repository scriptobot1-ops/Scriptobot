// ==================== THEME TOGGLE ====================
const themeBtn = document.getElementById("theme-toggle");
if (themeBtn) {
  themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");
  });

  // Keyboard shortcut: T key
  document.addEventListener("keydown", (e) => {
    if (e.key.toLowerCase() === "t") {
      document.body.classList.toggle("dark");
    }
  });
}

// ==================== MOBILE MENU ====================
const mobileBtn = document.getElementById("mobile-toggle");
const navLinks = document.querySelector(".nav-links");
if (mobileBtn && navLinks) {
  mobileBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });
}

// ==================== HERO TYPEWRITER ====================
const heroTarget = document.querySelector(".hero-left h1 span.animated");
if (heroTarget) {
  const heroPhrases = [
    "Interactive Frontends",
    "Realtime Websites with Firebase",
    "3D Experiences & Micro-Interactions"
  ];

  let i = 0;
  let currentPhrase = "";
  let isDeleting = false;
  const speed = 100;

  function typeHero() {
    const fullText = heroPhrases[i];

    if (isDeleting) {
      currentPhrase = fullText.substring(0, currentPhrase.length - 1);
    } else {
      currentPhrase = fullText.substring(0, currentPhrase.length + 1);
    }

    heroTarget.textContent = currentPhrase;

    if (!isDeleting && currentPhrase === fullText) {
      isDeleting = true;
      setTimeout(typeHero, 1500);
    } else if (isDeleting && currentPhrase === "") {
      isDeleting = false;
      i++;
      if (i >= heroPhrases.length) i = 0;
      setTimeout(typeHero, 500);
    } else {
      setTimeout(typeHero, speed);
    }
  }
  typeHero();
}

// ==================== NEWSLETTER FORM ====================
if (typeof firebase !== "undefined") {
  const db = firebase.firestore();
  const newsletterForm = document.getElementById("newsletter-form");

  if (newsletterForm) {
    newsletterForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const email = newsletterForm.querySelector("input[type='email']").value;

      if (!email) return;

      try {
        await db.collection("newsletter").add({
          email: email,
          subscribedAt: new Date()
        });

        alert("Thank you for subscribing! ✅");
        newsletterForm.reset();
      } catch (error) {
        console.error("Error adding email: ", error);
        alert("Oops! Something went wrong.");
      }
    });
  }
}

// ==================== ABOUT PAGE REVEAL ====================
function revealOnScroll() {
  document.querySelectorAll(".reveal").forEach((el) => {
    const windowHeight = window.innerHeight;
    const elementTop = el.getBoundingClientRect().top;
    const revealPoint = 100;

    if (elementTop < windowHeight - revealPoint) {
      el.classList.add("visible");
    }
  });
}
window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);
// Contact Form submit
const contactForm = document.getElementById("contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = contactForm.querySelector("#name").value.trim();
    const email = contactForm.querySelector("#email").value.trim();
    const message = contactForm.querySelector("#message").value.trim();

    if (!name || !email || !message) {
      alert("Please fill all fields.");
      return;
    }

    try {
      await db.collection("contacts").add({
        name: name,
        email: email,
        message: message,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      });

      alert("✅ Thank you! Your message has been sent.");
      contactForm.reset();
    } catch (error) {
      console.error("❌ Error sending message:", error);
      alert("Oops! Something went wrong. Please try again.");
    }
  });
}
// Reviews Collection Reference
const reviewForm = document.getElementById("reviewForm");
const reviewStatus = document.getElementById("reviewStatus");
const reviewsContainer = document.getElementById("reviews-container");

if (reviewForm) {
  reviewForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("reviewerName").value.trim();
    const message = document.getElementById("reviewMessage").value.trim();

    if (!name || !message) return;

try {
  await db.collection("reviews").add({
    name: name,
    comment: message, // renamed from message → comment
    rating: 5, // or default to 5 if no rating UI
  });

  reviewStatus.textContent = "✅ Thanks for your feedback!";
  reviewForm.reset();
} catch (err) {
  console.error("Error adding review:", err);
  reviewStatus.textContent = "❌ Failed to submit. Try again!";
}

  });
}

// Fetch & Display Reviews
async function loadReviews() {
  try {
    const snapshot = await db.collection("reviews")
      .orderBy("createdAt", "desc")
      .limit(6) // sirf latest 6 reviews show karna
      .get();

    reviewsContainer.innerHTML = "";
    snapshot.forEach((doc) => {
      const data = doc.data();
      const card = document.createElement("div");
      card.classList.add("review-card");
      card.innerHTML = `
        <h3>${data.name || "Anonymous"}</h3>
        <p>${data.message}</p>
      `;
      reviewsContainer.appendChild(card);
    });
  } catch (err) {
    console.error("Error loading reviews:", err);
  }
}

// On page load
if (reviewsContainer) loadReviews();
// ==================== SERVICE WORKER REGISTRATION ====================
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then(() => console.log("✅ Service Worker Registered"))
      .catch(err => console.log("❌ Service Worker Failed:", err));
  });
}
// ==================== END OF SCRIPT.JS ====================