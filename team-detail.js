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
    const teamData = teamsData.find(team => team.name === teamName);

    if (!teamData) {
        console.error(`Team data not found for team ${teamName}.`);
        return;
    }

    // Ordina i giocatori per punteggio in ordine decrescente
    const sortedPlayers = teamData.players.sort((a, b) => {
        const playerA = playersData.find(player => player.playerName === a);
        const playerB = playersData.find(player => player.playerName === b);
        return playerB.points - playerA.points;
    });

    // Creare l'HTML per visualizzare i dettagli della squadra con immagini
    const teamDetailHTML = `
        <h2>${teamData.name}</h2>
        <ul class="player-list">
            ${sortedPlayers.map(playerName => {
                const player = playersData.find(player => player.playerName === playerName);
                return `
                    <li class="team-player">
                        <img src="img/chef/${player.playerName}.png" alt="${teamData.name} Logo" class="player-logo">
                        <div class="player-details">
                            <p class="player-name">${player.playerName}</p>
                            <p class="player-points">Punti: ${player.points}</p>
                        </div>
                    </li>`;
            }).join('')}
        </ul>
    `;

    teamDetailPage.innerHTML = teamDetailHTML;
}
