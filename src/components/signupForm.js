export function signupMarkup() {
  return `
    <form class="signup-form" data-signup novalidate>
      <div class="field-grid">
        <input name="first" required placeholder="First Name" aria-label="First Name" autocomplete="given-name">
        <input name="last" required placeholder="Last Name" aria-label="Last Name" autocomplete="family-name">
        <input name="email" type="email" required placeholder="Email" aria-label="Email" autocomplete="email">
      </div>
      <label class="file-field">
        <input type="file" accept="image/*,.pdf" aria-label="Please upload photo ID">
        <span data-file-label>Please Upload Photo ID (State ID or Driver's License)</span>
      </label>
      <textarea name="message" rows="4" placeholder="Message" aria-label="Message"></textarea>
      <button class="btn btn-gold btn-block" type="submit">Get Fire Kirin Player Account Now!</button>
      <p class="form-note" data-signup-done hidden>This is a visual demo. Nothing was submitted, stored, or uploaded.</p>
      <p class="fine-print">Demo only. Photo ID stays in your browser and is cleared when you submit.</p>
    </form>`;
}

export function bindSignup(root) {
  const form = root.querySelector('[data-signup]');
  if (!form || form.dataset.bound) return;
  form.dataset.bound = 'true';

  const file = form.querySelector('input[type="file"]');
  const label = form.querySelector('[data-file-label]');
  file?.addEventListener('change', () => {
    const picked = file.files?.[0];
    if (label) {
      label.textContent = picked
        ? picked.name
        : "Please Upload Photo ID (State ID or Driver's License)";
    }
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    if (file) file.value = '';
    if (label) label.textContent = "Please Upload Photo ID (State ID or Driver's License)";
    form.reset();
    const done = form.querySelector('[data-signup-done]');
    if (done) done.hidden = false;
  });
}
