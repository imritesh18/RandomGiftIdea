let giftData = [];

const form = document.getElementById('filterForm');
const giftResults = document.getElementById('giftResults');

// Fetch gift data
fetch('http://localhost:5000/api/gifts')
  .then(res => {
    if (!res.ok) throw new Error('Failed to fetch gift data');
    return res.json();
  })
  .then(data => {
    giftData = data;
  })
  .catch(err => {
    console.error("Error fetching gifts:", err);
    giftResults.innerHTML = "<p>Failed to load gift ideas. Please try again later.</p>";
  });

form.addEventListener('submit', function (e) {
  e.preventDefault();
  giftResults.innerHTML = "<p>Loading gift ideas...</p>";

  const occasion = document.getElementById('occasion').value;
  const ageGroup = document.getElementById('ageGroup').value;
  const gender = document.getElementById('gender').value;
  const budget = document.getElementById('budgetToggle').checked;

  // Block if no selection made
  if (!occasion && !ageGroup && !gender && !budget) {
    giftResults.innerHTML = "<p>Please select at least one filter option.</p>";
    return;
  }

  // Filter logic
  const filtered = giftData.filter(gift =>
    (!occasion || gift.occasion === occasion) &&
    (!ageGroup || gift.ageGroup === ageGroup) &&
    (!gender || gift.gender === gender || gift.gender === 'Any') &&
    (!budget || gift.price <= 25)
  );

  // Shuffle and limit to 3
  const randomGifts = filtered
    .sort(() => 0.5 - Math.random())
    .slice(0, 3);

  renderGifts(randomGifts);
});

function renderGifts(gifts) {
  giftResults.innerHTML = "";

  if (gifts.length === 0) {
    giftResults.innerHTML = "<p>No matching gift ideas found.</p>";
    return;
  }

  gifts.forEach(gift => {
    const card = document.createElement('div');
    card.className = 'gift-card';
    card.innerHTML = `
      <h3>${gift.emoji || '🎁'} ${gift.name}</h3>
      <p>For: ${gift.ageGroup}, ${gift.gender}</p>
      <p>Occasion: ${gift.occasion}</p>
      <p>Price: $${gift.price}</p>
    `;
    giftResults.appendChild(card);
  });
}