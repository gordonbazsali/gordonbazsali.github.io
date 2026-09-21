const subcategories = {
  music: ['film', 'dance', 'concert', 'albums'],
  audiovisual: ['series', 'standalone'],
  live: []
};

const categoryLinks = document.querySelectorAll('.category-link');
const subcategoryBar = document.getElementById('subcategory-bar');
const workEntries = document.querySelectorAll('.work-entry');

function filterEntries(category, subcategory) {
  workEntries.forEach(entry => {
    const matchesCategory = entry.dataset.category === category;
    const matchesSub = !subcategory || entry.dataset.subcategory === subcategory;
    entry.style.display = (matchesCategory && matchesSub) ? 'flex' : 'none';
  });
}

function renderSubcategories(category) {
  subcategoryBar.innerHTML = '';

  const subs = subcategories[category];
  if (!subs || subs.length === 0) {
    subcategoryBar.style.display = 'none';
    filterEntries(category, null);
    return;
  }

  subcategoryBar.style.display = 'flex';

  subs.forEach((sub, index) => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = '#';
    a.textContent = sub;
    a.className = 'subcategory-link';
    if (index === 0) a.classList.add('active');

    a.addEventListener('click', (e) => {
      e.preventDefault();
      document.querySelectorAll('.subcategory-link').forEach(l => l.classList.remove('active'));
      a.classList.add('active');
      filterEntries(category, sub);
    });

    li.appendChild(a);
    subcategoryBar.appendChild(li);
  });

  // Show the first subcategory's entries by default
  filterEntries(category, subs[0]);
}

categoryLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    categoryLinks.forEach(l => l.classList.remove('active'));
    link.classList.add('active');
    renderSubcategories(link.dataset.category);
  });
});

// Show music's subcategories and entries by default on page load
renderSubcategories('music');