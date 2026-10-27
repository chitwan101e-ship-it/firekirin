const questions = [
  {
    prompt: 'Where is the official Fire Kirin download?',
    choices: [
      'The Fire Kirin install page for Android and iPhone',
      'On Google Play',
      'On the App Store',
      'On a third-party APK site',
    ],
    correct: 0,
    note: 'Android and iPhone install from start.firekirin.xyz. Random APK sites are not that page.',
  },
  {
    prompt: 'How do you play with no download?',
    choices: [
      'Open the Fire Kirin web lobby in Chrome or Safari',
      'Only after an APK install',
      'Only after trusting an iPhone profile',
      'From a file someone texted you',
    ],
    correct: 0,
    note: 'The web lobby at play.firekirin.in runs the games with no APK and no iPhone profile.',
  },
  {
    prompt: 'Do Android and iPhone share one player ID?',
    choices: [
      'Yes. One player ID covers the app and the web lobby.',
      'No. Each device needs a new signup.',
      'Only after you install both files.',
      'Only if a message sends a new link.',
    ],
    correct: 0,
    note: 'The player ID you request on this site is the login for Android, iPhone, and the browser.',
  },
];

let overlay = null;
let onKey = null;
let index = 0;
let score = 0;
let locked = false;

function choiceMarkup() {
  return questions[index].choices.map((choice, choiceIndex) => `
    <button class="trivia-choice" type="button" data-choice="${choiceIndex}">
      <span class="trivia-letter">${String.fromCharCode(65 + choiceIndex)}</span>
      <span>${choice}</span>
    </button>`).join('');
}

function paint() {
  if (!overlay) return;
  const step = overlay.querySelector('[data-trivia-step]');
  const prompt = overlay.querySelector('[data-trivia-prompt]');
  const choices = overlay.querySelector('[data-trivia-choices]');
  const note = overlay.querySelector('[data-trivia-note]');
  const next = overlay.querySelector('[data-trivia-next]');
  const dots = overlay.querySelectorAll('[data-trivia-dot]');

  step.textContent = `Question ${index + 1} of ${questions.length}`;
  prompt.textContent = questions[index].prompt;
  choices.innerHTML = choiceMarkup();
  note.hidden = true;
  note.textContent = '';
  next.hidden = true;
  next.textContent = index === questions.length - 1 ? 'See your score' : 'Next question';
  dots.forEach((dot, dotIndex) => {
    dot.classList.toggle('is-current', dotIndex === index);
    dot.classList.toggle('is-done', dotIndex < index);
  });
  locked = false;
  choices.querySelector('.trivia-choice')?.focus();
}

function showScore() {
  if (!overlay) return;
  const correct = score;
  const title = correct === questions.length
    ? 'You got all 3.'
    : `You got ${correct} of ${questions.length}.`;
  const copy = correct === questions.length
    ? 'Install from the Fire Kirin page, or play in the web lobby, and keep one player ID.'
    : 'The guide on this page has the rest: the install page for the app, the web lobby when you want no file, and one player ID.';

  overlay.querySelector('.trivia-card').innerHTML = `
    <button class="trivia-close" type="button" data-trivia-close aria-label="Close trivia">
      <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3.2 3.2l9.6 9.6M12.8 3.2L3.2 12.8" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>
    </button>
    <p class="trivia-kicker">Download trivia</p>
    <h2 class="trivia-title" id="trivia-title">${title}</h2>
    <p class="trivia-score-copy">${copy}</p>
    <button class="btn btn-gold trivia-next" type="button" data-trivia-close>Read the guide</button>`;
  overlay.querySelector('.trivia-close')?.focus();
}

function answer(choiceIndex) {
  if (!overlay || locked) return;
  locked = true;
  const question = questions[index];
  const picked = Number(choiceIndex);
  if (picked === question.correct) score += 1;

  overlay.querySelectorAll('.trivia-choice').forEach((button) => {
    const value = Number(button.getAttribute('data-choice'));
    button.disabled = true;
    if (value === question.correct) button.classList.add('is-correct');
    else if (value === picked) button.classList.add('is-wrong');
  });

  const note = overlay.querySelector('[data-trivia-note]');
  note.hidden = false;
  note.textContent = question.note;
  overlay.querySelector('[data-trivia-next]').hidden = false;
}

function advance() {
  if (index >= questions.length - 1) {
    showScore();
    return;
  }
  index += 1;
  paint();
}

function onClick(event) {
  const choice = event.target.closest('[data-choice]');
  if (choice) {
    answer(choice.getAttribute('data-choice'));
    return;
  }
  if (event.target.closest('[data-trivia-next]')) {
    advance();
    return;
  }
  if (event.target.closest('[data-trivia-close]') || event.target === overlay) {
    DownloadTrivia.close();
  }
}

export const DownloadTrivia = {
  open() {
    this.close();
    index = 0;
    score = 0;
    locked = false;

    overlay = document.createElement('div');
    overlay.className = 'trivia-overlay';
    overlay.innerHTML = `
      <div class="trivia-card" role="dialog" aria-modal="true" aria-labelledby="trivia-title">
        <button class="trivia-close" type="button" data-trivia-close aria-label="Close trivia">
          <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3.2 3.2l9.6 9.6M12.8 3.2L3.2 12.8" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>
        </button>
        <p class="trivia-kicker">Download trivia</p>
        <div class="trivia-dots" aria-hidden="true">
          ${questions.map(() => '<span data-trivia-dot></span>').join('')}
        </div>
        <p class="trivia-step" data-trivia-step></p>
        <h2 class="trivia-title" id="trivia-title" data-trivia-prompt></h2>
        <div class="trivia-choices" data-trivia-choices></div>
        <p class="trivia-note" data-trivia-note hidden></p>
        <button class="btn btn-gold trivia-next" type="button" data-trivia-next hidden>Next question</button>
      </div>`;

    overlay.addEventListener('click', onClick);
    document.body.appendChild(overlay);
    document.body.classList.add('trivia-open');
    onKey = (event) => {
      if (event.key === 'Escape') DownloadTrivia.close();
    };
    document.addEventListener('keydown', onKey);
    requestAnimationFrame(() => overlay?.classList.add('is-visible'));
    paint();
  },

  close() {
    document.body.classList.remove('trivia-open');
    if (onKey) document.removeEventListener('keydown', onKey);
    onKey = null;
    overlay?.remove();
    overlay = null;
  },
};
