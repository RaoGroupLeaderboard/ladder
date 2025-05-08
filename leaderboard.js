fetch('data.json')
  .then(res => res.json())
  .then(data => {
    const tbody = document.querySelector('#leaderboard tbody');
    data.sort((a, b) => b.rating - a.rating);
    data.forEach(player => {
      const row = `<tr><td>${player.name}</td><td>${player.rating}</td></tr>`;
      tbody.innerHTML += row;
    });
  });

