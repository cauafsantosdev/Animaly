// Dark mode config
const theme = localStorage.getItem('theme');
if (!theme || theme === 'dark') {
  document.documentElement.classList.add('dark');
  localStorage.setItem('theme', 'dark');
}

const toggleThemeBtn = document.getElementById('toggleTheme');
const themeIcon = document.getElementById('themeIcon');

function setTheme(mode) {
  if (mode === 'dark') {
    document.documentElement.classList.add('dark');
    themeIcon.textContent = '🌙';
    localStorage.setItem('theme', 'dark');
  } else {
    document.documentElement.classList.remove('dark');
    themeIcon.textContent = '☀️';
    localStorage.setItem('theme', 'light');
  }
}

toggleThemeBtn.addEventListener('click', () => {
  const isDark = document.documentElement.classList.contains('dark');
  setTheme(isDark ? 'light' : 'dark');
});

themeIcon.textContent = localStorage.getItem('theme') === 'light' ? '☀️' : '🌙';

// Axios config
const api = axios.create({
  baseURL: 'http://localhost:8000'
});

// Register
document.getElementById('registerBtn').addEventListener('click', async () => {
  const name = document.getElementById('name').value;
  const age = parseInt(document.getElementById('age').value);
  const sex = document.getElementById('sex').value;
  const colour = document.getElementById('colour').value;

  try {
    const res = await api.post('/animals', { name, age, sex, colour });
    alert(res.data.message);
  } catch {
    alert('Error adding animal');
  }
});

// Search
document.getElementById('searchBtn').addEventListener('click', async () => {
  const id = parseInt(document.getElementById('searchId').value);
  const output = document.getElementById('searchResult');

  try {
    const res = await api.get(`/animals/${id}`);
    if (res.data.message) {
      output.textContent = res.data.message;
    } else {
      output.innerHTML = `
        <strong>Name:</strong> ${res.data.name}<br>
        <strong>Age:</strong> ${res.data.age}<br>
        <strong>Sex:</strong> ${res.data.sex}<br>
        <strong>Colour:</strong> ${res.data.colour}
      `;
    }
  } catch {
    output.textContent = 'Error fetching animal';
  }
});

// Delete
document.getElementById('deleteBtn').addEventListener('click', async () => {
  const id = parseInt(document.getElementById('deleteId').value);
  const output = document.getElementById('deleteResult');

  try {
    const res = await api.delete(`/animals/${id}`);
    output.textContent = res.data.message;
  } catch {
    output.textContent = 'Error deleting animal';
  }
});

// Window
document.getElementById('seeAnimalsBtn').addEventListener('click', async () => {
  const window = document.getElementById('animalWindow');
  const listDiv = document.getElementById('animalList');

  try {
    const res = await api.get('/animals');
    listDiv.innerHTML = '';
    res.data.forEach(animal => {
      const item = document.createElement('details');
      item.className = 'bg-gray-100 dark:bg-gray-700 p-4 rounded shadow';
      item.innerHTML = `
        <summary class="cursor-pointer font-semibold">${animal.name} (ID: ${animal.animal_id})</summary>
        <div class="pl-4 mt-2 text-sm">
          <p><strong>Age:</strong> ${animal.age}</p>
          <p><strong>Sex:</strong> ${animal.sex}</p>
          <p><strong>Colour:</strong> ${animal.colour}</p>
        </div>
      `;
      listDiv.appendChild(item);
    });
    window.classList.remove('hidden');
    window.classList.add('flex');
  } catch {
    alert('Error loading animals');
  }
});

document.getElementById('closeWindow').addEventListener('click', () => {
  document.getElementById('animalWindow').classList.add('hidden');
});
