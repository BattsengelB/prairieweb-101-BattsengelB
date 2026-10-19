/* ------------------------------------------------------------
   Debounce helper (300 ms)
   Used to delay validation so it doesn't fire instantly.
   ------------------------------------------------------------ */
function debounce(fn, delay = 300) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => fn(...args), delay);
    };
}

/* ------------------------------------------------------------
   Sanitization function (prevents XSS)
   Replaces dangerous characters with safe HTML entities.
   ------------------------------------------------------------ */
function sanitize(str) {
    return str.replace(/[<>&"'`]/g, (c) => ({
        '<': '&#60;',   // <
        '>': '&#62;',   // >
        '&': '&#38;',   // &
        '"': '&#34;',   // "
        "'": '&#39;',   // '
        '`': '&#96;'    // `
    }[c]));
}

/* ------------------------------------------------------------
   Get form + error region
   These elements are used throughout the script.
   ------------------------------------------------------------ */
const form = document.getElementById("trailForm");
const errors = document.getElementById("errors");

/* ------------------------------------------------------------
   Validation function
   - Name must not be blank
   - Email must match regex
   - Message must be <= 500 chars
   - aria-invalid applied to failing inputs
   - Errors announced in aria-live region
   ------------------------------------------------------------ */
function validateForm() {
    errors.innerHTML = ""; // clear previous errors
    let valid = true;

    const name = sanitize(form.name.value.trim());
    const email = sanitize(form.email.value.trim());
    const message = sanitize(form.message.value.trim());

    // Email regex pattern
    /* Email regex pattern explanation:
        // ^           → start of string
        // [^\s@]+     → one or more characters that are NOT whitespace or @
        // @           → literal @ symbol
        // [^\s@]+     → one or more characters that are NOT whitespace or @
        // \.          → literal dot
        // [^\s@]+     → one or more characters that are NOT whitespace or @
        //   $           → end of string                                     */
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Name validation
    if (name === "") {
        valid = false;
        form.name.setAttribute("aria-invalid", "true");
        errors.innerHTML += "<p>Please enter your name.</p>";
    } else {
        form.name.removeAttribute("aria-invalid");
    }

    // Email validation
    if (!emailRegex.test(email)) {
        valid = false;
        form.email.setAttribute("aria-invalid", "true");
        errors.innerHTML += "<p>Please enter a valid email.</p>";
    } else {
        form.email.removeAttribute("aria-invalid");
    }

    // Message validation
    if (message.length === 0 || message.length > 500) {
        valid = false;
        form.message.setAttribute("aria-invalid", "true");
        errors.innerHTML += "<p>Message must be between 1 and 500 characters.</p>";
    } else {
        form.message.removeAttribute("aria-invalid");
    }

    return valid;
}

/* ------------------------------------------------------------
   Real-time validation (debounced)
   Runs validateForm() with a 300ms delay while typing.
   ------------------------------------------------------------ */
form.addEventListener("input", debounce(validateForm));

/* ------------------------------------------------------------
   Submit handler
   - Prevents page reload
   - Validates form
   - Converts form data to JSON
   - Prints pretty JSON to console
   ------------------------------------------------------------ */
form.addEventListener("submit", (event) => {
    event.preventDefault(); // stop page reload

    if (!validateForm()) {
        return; // stop if invalid
    }

    // Convert form data to JSON
    const data = Object.fromEntries(new FormData(form).entries());
    console.log(JSON.stringify(data, null, 2));

    errors.innerHTML = "<p>Form submitted successfully!</p>";
});
