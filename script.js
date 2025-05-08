// Sample players and Elo ratings
const players = [
  { name: "Alice", rating: 1500 },
  { name: "Bob", rating: 1600 },
  { name: "Charlie", rating: 1400 },
];

// Sort by rating descending
players.sort((a, b) => b.rating - a.rating);

// Populate leaderboard
const tbody = document.querySelector("#leaderboard tbody");
players.forEach(player => {
  const row = document.createElement("tr");
  row.innerHTML = `<td>${player.name}</td><td>${player.rating}</td>`;
  tbody.appendChild(row);
});
