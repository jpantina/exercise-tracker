const storageKey = 'exercise-tracker:entries';

const form = document.querySelector('#exercise-form');
const list = document.querySelector('#exercise-list');
const emptyState = document.querySelector('#empty-state');
const clearButton = document.querySelector('#clear-log');

function loadEntries() {
  try {
    return JSON.parse(localStorage.getItem(storageKey)) ?? [];
  } catch {
    return [];
  }
}

function saveEntries(entries) {
  localStorage.setItem(storageKey, JSON.stringify(entries));
}

function renderEntries() {
  const entries = loadEntries();
  list.innerHTML = '';
  emptyState.hidden = entries.length > 0;

  for (const entry of entries) {
    const item = document.createElement('li');
    item.className = 'exercise-item';

    const title = document.createElement('strong');
    title.textContent = entry.name;

    const meta = document.createElement('p');
    meta.className = 'exercise-meta';
    meta.textContent = `${entry.sets} sets × ${entry.reps} reps • ${entry.createdAt}`;

    item.append(title, meta);

    if (entry.notes) {
      const notes = document.createElement('p');
      notes.className = 'exercise-notes';
      notes.textContent = entry.notes;
      item.append(notes);
    }

    list.append(item);
  }
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const entry = {
    id: crypto.randomUUID(),
    name: formData.get('name').trim(),
    sets: Number(formData.get('sets')),
    reps: Number(formData.get('reps')),
    notes: formData.get('notes').trim(),
    createdAt: new Intl.DateTimeFormat(undefined, {
      dateStyle: 'medium',
      timeStyle: 'short',
    }).format(new Date()),
  };

  saveEntries([entry, ...loadEntries()]);
  form.reset();
  document.querySelector('#exercise-sets').value = 3;
  document.querySelector('#exercise-reps').value = 10;
  renderEntries();
});

clearButton.addEventListener('click', () => {
  if (confirm('Clear all saved exercises on this device?')) {
    saveEntries([]);
    renderEntries();
  }
});

renderEntries();
