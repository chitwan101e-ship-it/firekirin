export function signupMarkup() {
  return `
    <form class="signup-form is-disabled" aria-disabled="true">
      <div class="field-grid">
        <input name="first" disabled placeholder="First Name" aria-label="First Name" autocomplete="given-name">
        <input name="last" disabled placeholder="Last Name" aria-label="Last Name" autocomplete="family-name">
        <input name="email" type="email" disabled placeholder="Email" aria-label="Email" autocomplete="email">
      </div>
      <label class="file-field">
        <input type="file" disabled accept="image/*,.pdf" aria-label="Please upload photo ID" tabindex="-1">
        <span data-file-label>Please Upload Photo ID (State ID or Driver's License)</span>
      </label>
      <textarea name="message" rows="4" disabled placeholder="Message" aria-label="Message"></textarea>
      <button class="btn btn-gold btn-block" type="button" disabled>Coming soon</button>
      <p class="form-note">Player signup is coming soon.</p>
    </form>`;
}
