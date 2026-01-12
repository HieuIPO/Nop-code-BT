/*
  script.js (Auth UI)
  - 3 trang: Login / Register / Forgot Password (không reload)
  - Validate client-side:
    + Email hợp lệ
    + Mật khẩu tối thiểu 6 ký tự
    + Register: confirm password phải khớp
  - Không có backend: submit chỉ hiển thị thông báo demo
*/

// ===== Helpers nhỏ, dễ hiểu =====

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(email).trim());
}

/** @param {"login" | "register" | "forgot"} pageName */
function showPage(pageName) {
  const pages = document.querySelectorAll(".page");
  const tabs = document.querySelectorAll(".tab");

  pages.forEach((p) => p.classList.toggle("is-active", p.dataset.page === pageName));

  // Tab chỉ có login/register. Forgot sẽ bỏ aria-current ở tab.
  tabs.forEach((t) => {
    const active = t.dataset.go === pageName;
    if (active) t.setAttribute("aria-current", "page");
    else t.removeAttribute("aria-current");
  });

  // Reset UI khi chuyển trang
  hideNotice();
  clearAllErrors();
}

function setNotice(message, type) {
  const notice = document.getElementById("notice");
  notice.hidden = false;
  notice.textContent = message;
  notice.classList.remove("is-success", "is-danger");
  if (type === "success") notice.classList.add("is-success");
  if (type === "danger") notice.classList.add("is-danger");
}

function hideNotice() {
  const notice = document.getElementById("notice");
  notice.hidden = true;
  notice.textContent = "";
  notice.classList.remove("is-success", "is-danger");
}

function setFieldError(inputEl, message) {
  const field = inputEl.closest(".field");
  const hint = document.querySelector(`[data-hint="${inputEl.id}"]`);
  if (field) field.classList.add("is-invalid");
  if (hint) hint.textContent = message;
}

function clearFieldError(inputEl) {
  const field = inputEl.closest(".field");
  const hint = document.querySelector(`[data-hint="${inputEl.id}"]`);
  if (field) field.classList.remove("is-invalid");
  if (hint) hint.textContent = "";
}

function clearAllErrors() {
  document.querySelectorAll(".field.is-invalid").forEach((f) => f.classList.remove("is-invalid"));
  document.querySelectorAll(".field__hint").forEach((h) => (h.textContent = ""));
}

// ===== Main =====

const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");
const forgotForm = document.getElementById("forgotForm");

const loginEmail = document.getElementById("loginEmail");
const loginPassword = document.getElementById("loginPassword");

const registerName = document.getElementById("registerName");
const registerEmail = document.getElementById("registerEmail");
const registerPassword = document.getElementById("registerPassword");
const registerConfirm = document.getElementById("registerConfirm");

const forgotEmail = document.getElementById("forgotEmail");

// Xoá lỗi khi người dùng gõ lại
document.addEventListener("input", (e) => {
  const input = e.target;
  if (!(input instanceof HTMLInputElement)) return;
  if (!input.id) return;

  clearFieldError(input);
  hideNotice();
});

document.addEventListener("click", (e) => {
  const go = e.target.closest("[data-go]");
  if (!go) return;
  e.preventDefault();
  showPage(go.dataset.go);
});

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  hideNotice();
  clearAllErrors();

  let ok = true;

  if (!isValidEmail(loginEmail.value)) {
    ok = false;
    setFieldError(loginEmail, "Email không hợp lệ.");
  }

  if (String(loginPassword.value).length < 6) {
    ok = false;
    setFieldError(loginPassword, "Mật khẩu phải có tối thiểu 6 ký tự.");
  }

  if (!ok) {
    setNotice("Vui lòng kiểm tra lại thông tin đăng nhập.", "danger");
    return;
  }

  setNotice("Đăng nhập thành công (demo).", "success");
});

registerForm.addEventListener("submit", (e) => {
  e.preventDefault();
  hideNotice();
  clearAllErrors();

  let ok = true;

  if (!String(registerName.value).trim()) {
    ok = false;
    setFieldError(registerName, "Vui lòng nhập họ và tên.");
  }

  if (!isValidEmail(registerEmail.value)) {
    ok = false;
    setFieldError(registerEmail, "Email không hợp lệ.");
  }

  if (String(registerPassword.value).length < 6) {
    ok = false;
    setFieldError(registerPassword, "Mật khẩu phải có tối thiểu 6 ký tự.");
  }

  if (String(registerConfirm.value).length < 6) {
    ok = false;
    setFieldError(registerConfirm, "Vui lòng nhập lại mật khẩu (tối thiểu 6 ký tự). ");
  } else if (registerConfirm.value !== registerPassword.value) {
    ok = false;
    setFieldError(registerConfirm, "Mật khẩu nhập lại không khớp.");
  }

  if (!ok) {
    setNotice("Vui lòng kiểm tra lại thông tin đăng ký.", "danger");
    return;
  }

  setNotice("Đăng ký thành công (demo). Bạn có thể đăng nhập.", "success");
});

forgotForm.addEventListener("submit", (e) => {
  e.preventDefault();
  hideNotice();
  clearAllErrors();

  if (!isValidEmail(forgotEmail.value)) {
    setFieldError(forgotEmail, "Email không hợp lệ.");
    setNotice("Vui lòng nhập email hợp lệ để tiếp tục.", "danger");
    return;
  }

  setNotice("Đã gửi hướng dẫn đặt lại mật khẩu (demo) tới email của bạn.", "success");
});

// Mặc định trang mở đầu
showPage("login");
