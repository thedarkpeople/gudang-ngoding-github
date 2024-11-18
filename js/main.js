const codeForm = document.getElementById('codeForm');
const codeContainer = document.getElementById('codeContainer');
let selectedCategory = '';

function showForm(category) {
  selectedCategory = category;
  document.getElementById('codingForm').style.display = 'block';
}

// Menyimpan kodingan baru
codeForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const title = document.getElementById('title').value.trim();
  const editorName = document.getElementById('editorName').value.trim();
  const codeText = document.getElementById('code').value.trim();

  if (!title || !editorName || !codeText) {
    alert('Title, nama editor, dan kodingan harus diisi!');
    return;
  }

  const codeElement = document.createElement('div');
  codeElement.className = 'code-item';
  codeElement.innerHTML = `
    <h3>${title} - ${selectedCategory.toUpperCase()} (Oleh: ${editorName})</h3>
    <textarea readonly>${codeText}</textarea>
    <button onclick="editCode(this)">Edit</button>
    <button onclick="copyCode(this)">Copy</button>
    <button onclick="deleteCode(this)">Hapus</button>
  `;
  codeContainer.appendChild(codeElement);

  // Reset form
  document.getElementById('title').value = '';
  document.getElementById('editorName').value = '';
  document.getElementById('code').value = '';
});

// Fitur mengedit kodingan
function editCode(button) {
  const codeItem = button.parentElement;
  const codeTextarea = codeItem.querySelector('textarea');
  const isEditing = codeTextarea.hasAttribute('readonly');

  if (isEditing) {
    codeTextarea.removeAttribute('readonly');
    codeTextarea.style.backgroundColor = '#333';
    button.textContent = 'Simpan';
  } else {
    codeTextarea.setAttribute('readonly', true);
    codeTextarea.style.backgroundColor = '#222';
    button.textContent = 'Edit';
  }
}

// Fitur menyalin kodingan
// Fitur menyalin kodingan menggunakan Clipboard API
function copyCode(button) {
  const codeTextarea = button.previousElementSibling;
  navigator.clipboard
    .writeText(codeTextarea.value)
    .then(() => {
      alert('Kodingan berhasil disalin ke clipboard!');
    })
    .catch((err) => {
      console.error('Gagal menyalin kodingan: ', err);
      alert('Gagal menyalin kodingan. Pastikan browser Anda mendukung Clipboard API.');
    });
}

// Fitur menghapus kodingan
function deleteCode(button) {
  if (confirm('Apakah Anda yakin ingin menghapus kodingan ini?')) {
    button.parentElement.remove();
  }
}

// Auto-pair syntax pada textarea
document.getElementById('code').addEventListener('input', (e) => {
  const value = e.target.value;
  if (value.endsWith('{')) {
    e.target.value = value + '\n\n}';
    const cursorPos = e.target.selectionStart - 2;
    e.target.setSelectionRange(cursorPos, cursorPos);
  }
});