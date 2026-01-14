(function () {
  const VALID_ID = "628hst53785jj";

  // 🔁 PUT YOUR OWN IMAGE URL HERE
  const CARD_IMAGE_URL = "https://upload.pinnocent.com/assets/files/upload-1768369810.png";

  document.addEventListener("DOMContentLoaded", () => {

    document.documentElement.style.overflow = "hidden";

    const style = document.createElement("style");
    style.textContent = `
      .access-overlay {
        position: fixed;
        inset: 0;
        background: rgba(245,245,247,0.96);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2147483647;
        font-family: -apple-system, BlinkMacSystemFont,
          "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      }

      .access-card {
        background: #ffffff;
        width: 90%;
        max-width: 380px;
        padding: 36px 28px;
        border-radius: 20px;
        text-align: center;
        box-shadow: 0 40px 80px rgba(0,0,0,0.15);
        animation: fadeIn 0.4s ease;
      }

      @keyframes fadeIn {
        from { opacity: 0; transform: scale(0.96); }
        to { opacity: 1; transform: scale(1); }
      }

      .card-image {
        width: 180px;
        max-width: 100%;
        margin: 0 auto 20px;
        display: block;
      }

      .access-card h1 {
        font-size: 22px;
        font-weight: 600;
        margin-bottom: 12px;
        color: #1d1d1f;
      }

      .access-card p {
        font-size: 14px;
        color: #6e6e73;
        margin-bottom: 22px;
        line-height: 1.5;
      }

      .access-card input {
        width: 100%;
        padding: 14px;
        font-size: 15px;
        border-radius: 12px;
        border: 1px solid #d2d2d7;
        outline: none;
        margin-bottom: 16px;
      }

      .access-card input:focus {
        border-color: #0071e3;
      }

      .access-card button {
        width: 100%;
        padding: 14px;
        border: none;
        border-radius: 12px;
        background: #0071e3;
        color: #ffffff;
        font-size: 15px;
        font-weight: 500;
        cursor: pointer;
      }

      .access-error {
        display: none;
        margin-top: 12px;
        font-size: 13px;
        color: #d93025;
      }
    `;
    document.head.appendChild(style);

    const overlay = document.createElement("div");
    overlay.className = "access-overlay";
    overlay.innerHTML = `
      <div class="access-card">
        <img src="${CARD_IMAGE_URL}" class="card-image" alt="Card" />
        <h1>Card Access ID Required</h1>
        <p>Enter your Card Access ID to continue.</p>
        <input type="text" placeholder="Access ID" autocomplete="off" />
        <button>Continue</button>
        <div class="access-error">Invalid Access ID. Please try again.</div>
      </div>
    `;

    document.body.appendChild(overlay);

    const input = overlay.querySelector("input");
    const button = overlay.querySelector("button");
    const error = overlay.querySelector(".access-error");

    function verify() {
      if (input.value.trim() === VALID_ID) {
        document.documentElement.style.overflow = "";
        overlay.remove();
      } else {
        error.style.display = "block";
        input.value = "";
        input.focus();
      }
    }

    button.addEventListener("click", verify);
    input.addEventListener("keydown", e => {
      if (e.key === "Enter") verify();
    });

    input.focus();
  });
})();