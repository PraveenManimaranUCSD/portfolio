console.log('IT’S ALIVE!');

function $$(selector, context = document) {
  return Array.from(context.querySelectorAll(selector));
}

// Since your repository is 'portfolio', we need to use '/portfolio/' as the base path on GitHub Pages
const isGithubPages = window.location.hostname.includes('github.io');
const basePath = isGithubPages ? '/portfolio/' : '/';

let pages = [
  { url: '', title: 'Home' },
  { url: 'projects/', title: 'Projects' },
  { url: 'resume/', title: 'Resume' },
  { url: 'contact/', title: 'Contact' },
  { url: 'https://github.com/PraveenManimaranUCSD', title: 'GitHub' }
];

const ARE_WE_HOME = document.documentElement.classList.contains('home');

// Create the <nav> element and prepend it to the <body>
let nav = document.createElement('nav');
document.body.prepend(nav);

for (let p of pages) {
  let url = p.url;
  let title = p.title;

  // Use the correct base path for GitHub Pages
  url = (!ARE_WE_HOME && !url.startsWith('http')) ? basePath + url : url;

  // Create the <a> element for each navigation link
  let a = document.createElement('a');
  a.href = url;
  a.textContent = title;
  
  // Add the "current" class to the current page link
  a.classList.toggle(
    'current',
    a.host === location.host && a.pathname === location.pathname
  );

  // Open external links (e.g., GitHub) in a new tab
  a.toggleAttribute('target', a.host !== location.host);
  nav.append(a);
}

// Add the dark mode switcher
document.body.insertAdjacentHTML(
  'afterbegin',
  `
  <label class="color-scheme">
    Theme:
    <select id="color-scheme-selector">
      <option value="light dark">Automatic</option>
      <option value="light">Light</option>
      <option value="dark">Dark</option>
    </select>
  </label>`
);

// Get the <select> element for color scheme switching
const select = document.querySelector('#color-scheme-selector');

// Load the user’s color scheme preference from localStorage
if ("colorScheme" in localStorage) {
  const savedScheme = localStorage.colorScheme;
  document.documentElement.style.setProperty('color-scheme', savedScheme);
  select.value = savedScheme; 
}

// Add event listener for changing the color scheme
select.addEventListener('input', function (event) {
  const selectedScheme = event.target.value;
  
  // Apply the selected color scheme
  document.documentElement.style.setProperty('color-scheme', selectedScheme);
  
  // Save the user's preference in localStorage
  localStorage.colorScheme = selectedScheme;
  
  console.log('Color scheme changed to', selectedScheme);
});
