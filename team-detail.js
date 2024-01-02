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

    // Creare l'HTML per visualizzare i dettagli della squadra con immagini
    const teamDetailHTML = `
        <h2>${teamName}</h2>
        <ul class="player-list">
            ${teamPlayers.map(player => `
                <li class="team-player">
                    <img src="img/chef/${player.playerName}.png" alt="${player.team} Logo" class="player-logo">
                    <div class="player-details">
                        <p class="player-name">${player.playerName}</p>
                        <p class="player-points">Punti: ${player.points}</p>
                    </div>
                </li>`).join('')}
        </ul>
    `;

    teamDetailPage.innerHTML = teamDetailHTML;
}


