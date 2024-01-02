document.addEventListener('DOMContentLoaded', function () {
    const sortedTeamsData = teamsData.sort((a, b) => b.points - a.points);
    loadTeamList(sortedTeamsData);
});

function loadTeamList(teamsData) {
    const teamList = document.getElementById('teamList');

    teamsData.forEach((team, index) => {
        const teamElement = document.createElement('section');
        teamElement.classList.add('team');

        const positionElement = document.createElement('div');
        positionElement.classList.add('position');
        positionElement.innerHTML = `<p><i class="fas fa-trophy"></i> ${index + 1}</p>`;
        teamElement.appendChild(positionElement);

        const logoElement = document.createElement('img');
        logoElement.src = `${team.name}.png`;
        logoElement.alt = 'Team Logo';
        logoElement.classList.add('team-logo');
        teamElement.appendChild(logoElement);

        const teamDetails = document.createElement('div');
        teamDetails.classList.add('team-details');
        teamDetails.innerHTML = `
			<h2 class="team-name">${team.name}</h2>
			<div class="team-stats">
				<div>
					<p><i class="fas fa-star"></i> ${team.points}</p>
					<p><i class="fas fa-user"></i> ${countActivePlayers(team.players)}/6</p>
				</div>
			</div>
		`;

        teamElement.appendChild(teamDetails);

        teamElement.addEventListener('click', function () {
            window.location.replace(`team-detail.html#${team.name}`);
        });

        teamList.appendChild(teamElement);
    });
}



function countActivePlayers(players) {
    return players.filter(player => !getPlayerData(player).eliminato).length;
}

function getPlayerData(player) {
    return playersData.find(data => data.playerName === player) || {};
}
