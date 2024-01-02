
// index.js (Script per la pagina principale)
document.addEventListener('DOMContentLoaded', function () {
    const sortedTeamsData = teamsData.sort((a, b) => b.points - a.points);
    
    // Carica dinamicamente la lista delle squadre sulla pagina principale
    loadTeamList(sortedTeamsData);
});

function loadTeamList(teamsData) {
    const teams = extractUniqueTeams(teamsData);

    const teamList = document.getElementById('teamList');
    
    if (!teamList) {
        console.error("Element with id 'teamList' not found.");
        return;
    }

    teams.forEach(team => {
        const teamElement = document.createElement('section');
        teamElement.classList.add('team');
        
        const logoElement = document.createElement('img');
        logoElement.src = `${team}.png`;
        logoElement.alt = 'Team Logo';
        logoElement.classList.add('team-logo');
        teamElement.appendChild(logoElement);

        teamElement.innerHTML += `
            <h2>${team}</h2>
            <p>Punti: ${calculateTotalPoints(team, teamsData)}</p>
        `;
        
        teamElement.addEventListener('click', function () {
            // Reindirizza alla pagina di dettaglio della squadra al clic
            window.location.replace(`team-detail.html#${team}`);
        });

        teamList.appendChild(teamElement);
    });
}

// team-detail.js (Script per la pagina di dettaglio del team)
document.addEventListener('DOMContentLoaded', function () {
    const teamDetailPage = document.getElementById('teamDetail');
    
    if (!teamDetailPage) {
        console.error("Element with id 'teamDetail' not found.");
        return;
    }

    // Estrai il nome della squadra dalla URL
    const teamName = decodeURIComponent(window.location.hash.substring(1));

    // Carica i dettagli della squadra nella pagina di dettaglio
    loadTeamDetail(teamName);
});

function loadTeamDetail(teamName) {
    const teamDetailPage = document.getElementById('teamDetail');

    if (!teamDetailPage) {
        console.error("Element with id 'teamDetail' not found.");
        return;
    }

    // Filtra i dati della squadra in base al nome della squadra
    const teamPlayers = teamsData.filter(item => item.team === teamName);

    // Creare l'HTML per visualizzare i dettagli della squadra
    const teamDetailHTML = `
        <h2>${teamName}</h2>
        <ul>
            ${teamPlayers.map(player => `<li>${player.playerName}: ${player.points} punti</li>`).join('')}
        </ul>
    `;

    teamDetailPage.innerHTML = teamDetailHTML;
}

function extractUniqueTeams(data) {
    return [...new Set(data.map(item => item.team))];
}

function calculateTotalPoints(team, teamsData) {
    const teamPlayers = teamsData.filter(item => item.team === team);
    return teamPlayers.reduce((total, player) => total + player.points, 0);
}