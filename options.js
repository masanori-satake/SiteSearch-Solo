// options.js - Team Search Hub

let currentEditingId = null;

async function getEngines() {
  const result = await chrome.storage.local.get('engines');
  return result.engines || [];
}

async function saveEngines(engines) {
  await chrome.storage.local.set({ engines });
  // Notify background script to update context menus
  chrome.runtime.sendMessage({ type: "ENGINES_UPDATED" });
  renderList();
}

function renderList() {
  getEngines().then(engines => {
    const list = document.getElementById('engine-list');
    list.innerHTML = '';
    engines.forEach(engine => {
      const item = document.createElement('div');
      item.className = 'engine-list-item';
      item.innerHTML = `
        <div>
          <strong>${engine.name}</strong> [${engine.keyword}]<br>
          <small>${engine.url}</small>
        </div>
        <div>
          <button class="btn btn-text" onclick="editEngine('${engine.id}')">Edit</button>
          <button class="btn btn-text" onclick="deleteEngine('${engine.id}')" style="color: var(--md-sys-color-error);">Delete</button>
        </div>
      `;
      list.appendChild(item);
    });
  });
}

window.editEngine = async function(id) {
  const engines = await getEngines();
  const engine = engines.find(e => e.id === id);
  if (engine) {
    document.getElementById('engine-keyword').value = engine.keyword;
    document.getElementById('engine-name').value = engine.name;
    document.getElementById('engine-url').value = engine.url;
    document.getElementById('engine-pattern').value = engine.pattern || '';
    currentEditingId = id;
    document.getElementById('save-btn').textContent = 'Update Engine';
    validateKeyword();
  }
};

window.deleteEngine = async function(id) {
  let engines = await getEngines();
  engines = engines.filter(e => e.id !== id);
  await saveEngines(engines);
};

async function validateKeyword() {
  const keyword = document.getElementById('engine-keyword').value.trim();
  const engines = await getEngines();
  const isDuplicate = engines.some(e => e.keyword === keyword && e.id !== currentEditingId);

  const field = document.getElementById('field-keyword');
  if (isDuplicate && keyword) {
    field.classList.add('error');
    return false;
  } else {
    field.classList.remove('error');
    return true;
  }
}

document.getElementById('engine-keyword').addEventListener('input', validateKeyword);

document.getElementById('save-btn').addEventListener('click', async () => {
  const isValid = await validateKeyword();
  if (!isValid) return;

  const keyword = document.getElementById('engine-keyword').value.trim();
  const name = document.getElementById('engine-name').value.trim();
  const url = document.getElementById('engine-url').value.trim();
  const pattern = document.getElementById('engine-pattern').value.trim();

  if (!keyword || !name || !url) {
    alert("Please fill keyword, name, and URL.");
    return;
  }

  let engines = await getEngines();
  if (currentEditingId) {
    engines = engines.map(e => e.id === currentEditingId ? { ...e, keyword, name, url, pattern } : e);
  } else {
    engines.push({
      id: Date.now().toString(),
      keyword,
      name,
      url,
      pattern
    });
  }

  await saveEngines(engines);
  clearEditor();
});

document.getElementById('clear-btn').addEventListener('click', clearEditor);

function clearEditor() {
  document.getElementById('engine-keyword').value = '';
  document.getElementById('engine-name').value = '';
  document.getElementById('engine-url').value = '';
  document.getElementById('engine-pattern').value = '';
  document.getElementById('url-preset').value = '';
  currentEditingId = null;
  document.getElementById('save-btn').textContent = 'Save Engine';
  document.getElementById('field-keyword').classList.remove('error');
}

document.getElementById('url-preset').addEventListener('change', (e) => {
  if (e.target.value) {
    document.getElementById('engine-url').value = e.target.value;
    // Trigger label float
    document.getElementById('engine-url').dispatchEvent(new Event('input'));
  }
});

// Portability: Export
document.getElementById('export-btn').addEventListener('click', async () => {
  const engines = await getEngines();
  const blob = new Blob([JSON.stringify(engines, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'tsh-engines.json';
  a.click();
  URL.revokeObjectURL(url);
});

// Portability: Import
document.getElementById('import-btn').addEventListener('click', () => {
  document.getElementById('import-file').click();
});

document.getElementById('import-file').addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = async (event) => {
    try {
      const importedEngines = JSON.parse(event.target.result);
      const mode = document.getElementById('import-mode').value;

      let currentEngines = await getEngines();
      if (mode === 'overwrite') {
        currentEngines = importedEngines;
      } else {
        // Add mode: need to handle ID/Keyword collisions
        importedEngines.forEach(imp => {
          // Change ID if it exists
          if (currentEngines.some(e => e.id === imp.id)) {
            imp.id = Date.now().toString() + Math.random();
          }
          // Only add if keyword is not duplicate
          if (!currentEngines.some(e => e.keyword === imp.keyword)) {
            currentEngines.push(imp);
          }
        });
      }
      await saveEngines(currentEngines);
      alert("Imported successfully!");
    } catch (err) {
      alert("Invalid JSON file.");
    }
  };
  reader.readAsText(file);
});

// Initial load
renderList();
