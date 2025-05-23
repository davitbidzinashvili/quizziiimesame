document.addEventListener('DOMContentLoaded', () => {
  let allUsers = [];
  const grid = document.getElementById('grid');
  const searchInput = document.getElementById('search-input');
  const loader = document.getElementById('loader');
  function getInitials(name) {
    return name
      .split(' ')
      .map(word => word[0].toUpperCase())
      .join('');
  }
  function formatAddress(address) {
    return `${address.street}${address.suite ? ', ' + address.suite : ''}, ${address.city}`;
  }
  function createUserCard(user) {
    const card = document.createElement('div');
    card.className = 'card';
    const cardHeader = document.createElement('div');
    cardHeader.className = 'card-header';

    const avatar = document.createElement('div');
    avatar.className = 'card-avatar';
    avatar.textContent = getInitials(user.name);

    cardHeader.appendChild(avatar);

    const cardBody = document.createElement('div');
    cardBody.className = 'card-body';

    const title = document.createElement('h3');
    title.className = 'card-title';
    title.textContent = user.name;

    const username = document.createElement('p');
    username.className = 'card-username';
    username.textContent = '@' + user.username;
    const addressDetails = document.createElement('div');
    addressDetails.className = 'card-details';
    const addressTitle = document.createElement('p');
    addressTitle.className = 'card-details-title';
    addressTitle.textContent = 'Address';
    const addressText = document.createElement('p');
    addressText.className = 'card-address';
    addressText.innerHTML = formatAddress(user.address).replace(/, /g, '<br />');
  addressDetails.appendChild(addressTitle);
    addressDetails.appendChild(addressText);
    const companyDetails = document.createElement('div');
    companyDetails.className = 'card-details';
    const companyTitle = document.createElement('p');
    companyTitle.className = 'card-details-title';
    companyTitle.textContent = 'Company';
    const companyText = document.createElement('p');
    companyText.className = 'card-company';
    companyText.textContent = user.company.name;
    companyDetails.appendChild(companyTitle);
    companyDetails.appendChild(companyText);
    cardBody.appendChild(title);
    cardBody.appendChild(username);
    cardBody.appendChild(addressDetails);
    cardBody.appendChild(companyDetails);
    card.appendChild(cardHeader);
    card.appendChild(cardBody);
    return card;
  }
  function renderUsers(users) {
    grid.innerHTML = '';
    users.forEach(user => {
      const card = createUserCard(user);
      grid.appendChild(card);
    });
  }
  function filterUsers(term) {
    term = term.toLowerCase().trim();
    const filtered = term
      ? allUsers.filter(user => user.name.split(' ')[0].toLowerCase().includes(term))
      : allUsers;
    renderUsers(filtered);
  }
  async function fetchUsers() {
    const res = await fetch('https://jsonplaceholder.typicode.com/users');
    allUsers = await res.json();
    renderUsers(allUsers);
    if (loader) loader.style.display = 'none';
  }
  searchInput.addEventListener('input', e => filterUsers(e.target.value));
  fetchUsers();
});
