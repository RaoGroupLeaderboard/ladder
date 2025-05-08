let players = [];
let teamA = [];
let teamB = [];
const K = 32;

// === LEADERBOARD ===
function updateLeaderboard() {
  const tbody = document.querySelector("#leaderboard tbody");
  tbody.innerHTML = "";
  players.sort((a, b) => b.rating - a.rating);
  players.forEach(p => {
    const row = document.createElement("tr");
    row.innerHTML = `<td>${p.name}</td><td>${Math.round(p.rating)}</td>`;
    tbody.appendChild(row);
  });
}

// === ADD PLAYER ===
function addPlayer() {
  const name = document.getElementById("new-player").value.trim();
  if (!name || players.find(p => p.name === name)) return;
  players.push({ name, rating: 1500 });
  updateLeaderboard();
  document.getElementById("new-player").value = "";
}

// === ADD PLAYER TO TEAM ===
function addPlayerToTeam(team) {
  const container = document.getElementById(`team-${team.toLowerCase()}`);
  const select = document.createElement("select");

  const defaultOption = document.createElement("option");
  defaultOption.text = "-- Select Player --";
  defaultOption.disabled = true;
  defaultOption.selected = true;
  select.appendChild(defaultOption);

  players.forEach(p => {
    const option = document.createElement("option");
    option.value = p.name;
    option.text = p.name;
    select.appendChild(option);
  });

  container.appendChild(select);
}

// === RECORD MATCH ===
function recordMatch(winningTeam) {
  teamA = Array.from(document.querySelectorAll("#team-a select")).map(s => s.value);
  teamB = Array.from(document.querySelectorAll("#team-b select")).map(s => s.value);

  if (teamA.length === 0 || teamB.length === 0) {
    alert("Both teams must have players.");
    return;
  }

  const teamARating = averageRating(teamA);
  const teamBRating = averageRating(teamB);

  const expectedA = 1 / (1 + Math.pow(10, (teamBRating - teamARating) / 400));
  const expectedB = 1 - expectedA;

  const scoreA = winningTeam === 'A' ? 1 : 0;
  const scoreB = 1 - scoreA;

  teamA.forEach(name => {
    const player = players.find(p => p.name === name);
    player.rating += K * (scoreA - expectedA);
  });

  teamB.forEach(name => {
    const player = players.find(p => p.name === name);
    player.rating += K * (scoreB - expectedB);
  });

  clearTeams();
  updateLeaderboard();
}

function averageRating(team) {
  let total = 0;
  team.forEach(name => {
    const player = players.find(p => p.name === name);
    total += player.rating;
  });
  return total / team.length;
}

function clearTeams() {
  document.getElementById("team-a").innerHTML = "";
  document.getElementById("team-b").innerHTML = "";
}
