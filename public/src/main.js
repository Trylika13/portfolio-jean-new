import "./main.css";

/* =============================
   🌀 Loader + animation prénom
============================= */
window.addEventListener("load", () => {
  // Le loader s'affiche un court instant
  setTimeout(() => {
    const loader = document.getElementById("loader");
    if (loader) loader.classList.add("fade-out");

    // ✨ Lancer l'animation du prénom après le fade-out
    setTimeout(() => {
      const text = "Jean Grégoire";
      const target = document.getElementById("typing");
      let i = 0;

      function type() {
        if (i < text.length) {
          target.textContent += text.charAt(i);
          i++;
          setTimeout(type, 100);
        }
      }

      if (target) type();
    }, 800); // délai synchronisé avec la disparition du loader
  }, 500); // durée d’affichage du loader avant fade-out
});

/* =============================
   ✨ Effets reveal au scroll
============================= */
document.addEventListener("DOMContentLoaded", () => {
  const revealUps = document.querySelectorAll(".reveal-up");
  const revealFades = document.querySelectorAll(".reveal-fade");

  function revealOnScroll(elements, delay = 0) {
    const triggerBottom = window.innerHeight * 0.85;

    elements.forEach((el, index) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < triggerBottom) {
        el.style.transitionDelay = `${index * delay}s`;
        el.classList.add("visible");
      } else {
        el.style.transitionDelay = "0s";
        el.classList.remove("visible");
      }
    });
  }

  function handleScroll() {
    revealOnScroll(revealUps, 0.15); // pour les projets
    revealOnScroll(revealFades, 0); // pour la section "about"
  }

  window.addEventListener("scroll", handleScroll);
  handleScroll(); // exécution au chargement
});

/* =============================
   🌐 (Optionnel) Scroll behavior smooth
============================= */
document.documentElement.style.scrollBehavior = "smooth";

// --- FORMULAIRE DE CONTACT ---
const form = document.querySelector(
  'form[action="https://api.web3forms.com/submit"]'
);

if (form) {
  // Création d’un message de retour
  const messageBox = document.createElement("p");
  messageBox.className = "text-center font-medium mt-4 transition";
  form.appendChild(messageBox);

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    messageBox.textContent = "Envoi en cours...";
    messageBox.classList.remove("text-teal-600", "text-red-600");
    messageBox.classList.add("text-teal-900");

    const formData = new FormData(form);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        messageBox.textContent = "Merci 🙏 Ton message a bien été envoyé !";
        messageBox.classList.remove("text-teal-600");
        messageBox.classList.add("text-teal-900");
        form.reset();
      } else {
        messageBox.textContent =
          "Oups 😕 Une erreur est survenue. Réessaie plus tard.";
        messageBox.classList.remove("text-teal-600");
        messageBox.classList.add("text-red-600");
      }
    } catch (error) {
      console.error(error);
      messageBox.textContent = "Erreur réseau ❌ Vérifie ta connexion.";
      messageBox.classList.remove("text-teal-600");
      messageBox.classList.add("text-red-600");
    }
  });
}
