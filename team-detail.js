document.addEventListener('DOMContentLoaded', function () {
    const teamNameMain = document.getElementById('teamNameMain');
    const teamDetailMain = document.getElementById('teamDetailMain');

    if (!teamNameMain || !teamDetailMain) {
        console.error("One or both main elements not found.");
        return;
    }

    // Estrai il nome della squadra dalla URL
    const teamName = decodeURIComponent(window.location.hash.substring(1));

    // Carica il nome della squadra nel primo main
    loadTeamName(teamName);

    // Carica la lista dei giocatori e il grafico nel secondo main
    loadTeamDetail(teamName);
});

function loadTeamName(teamName) {
    const teamNameMain = document.getElementById('teamNameMain');

    if (!teamNameMain) {
        console.error("Element with id 'teamNameMain' not found.");
        return;
    }

    // Inserisci il nome della squadra nel primo main
    teamNameMain.innerHTML = `<h2>${teamName}</h2>`;
}

function loadTeamDetail(teamName) {
    const teamDetailMain = document.getElementById('teamDetailMain');

    if (!teamDetailMain) {
        console.error("Element with id 'teamDetailMain' not found.");
        return;
    }

    // Filtra i dati della squadra in base al nome della squadra
    const teamData = teamsData.find(team => team.name === teamName);

    if (!teamData) {
        console.error(`Team data not found for team ${teamName}.`);
        return;
    }

    // Creare l'HTML per visualizzare la lista dei giocatori con immagini e il grafico
    const teamDetailHTML = `
        <ul class="player-list">
            ${teamData.players.map(playerName => {
                const player = playersData.find(player => player.playerName === playerName);

                if (!player) {
                    console.error(`Player data not found for player ${playerName}.`);
                    return '';
                }

                const isEliminatedClass = player.eliminato ? 'eliminated' : '';
                const points = player.detailedPoints.reduce((total, detail) => total + detail.value, 0);

                return `
                    <li class="team-player ${isEliminatedClass}">
                        <img src="img/chef/${player.playerName}.png" alt="${teamData.name} Logo" class="player-logo">
                        <div class="player-details">
                            <p class="player-name">${player.playerName}</p>
                            <p class="player-points">Punti: ${points}</p>
                        </div>
                    </li>`;
            }).join('')}
        </ul>

        <!-- Grafico -->
        <div class="chart-container">
            <!-- Inserisci il codice per il grafico qui -->
            <canvas id="teamChart"></canvas>
        </div>
    `;

    teamDetailMain.innerHTML = teamDetailHTML;

    // Aggiungi la generazione del grafico dopo che l'HTML è stato inserito nella pagina
    generateChart(teamName);
}

let teamDetailPage; // Dichiarata globalmente


function generateChart(teamName) {
    const teamDetailMain = document.getElementById('teamDetailMain');

    if (!teamDetailMain) {
        console.error("Element with id 'teamDetailMain' not found.");
        return;
    }

    const chartCanvas = document.getElementById('teamChart');

    if (!chartCanvas) {
        console.error("Element with id 'teamChart' not found.");
        return;
    }

    const chartContext = chartCanvas.getContext('2d');

    const team = teamsData.find(team => team.name === teamName);

    if (!team) {
        console.error(`Team data not found for team ${teamName}.`);
        return;
    }

    const playerNames = team.players || [];

    if (playerNames.length === 0) {
        console.error(`No players found for team ${teamName}.`);
        return;
    }

    // Trova tutte le attività uniche
    const uniqueActivities = Array.from(
        new Set(
            playersData
                .filter(player => player.teams.includes(teamName))
                .flatMap(player => player.detailedPoints.map(point => point.activity))
        )
    );

    const datasets = playerNames.map(playerName => {
        const player = playersData.find(player => player.playerName === playerName);

        if (!player) {
            console.error(`Player data not found for player ${playerName}.`);
            return { label: '', data: [] };
        }

        const detailedPoints = player.detailedPoints || [];
        const activityPoints = {};

        detailedPoints.forEach(detail => {
            if (!activityPoints[detail.activity]) {
                activityPoints[detail.activity] = detail.value;
            } else {
                activityPoints[detail.activity] += detail.value;
            }
        });

        // Organizza i dati in base alle attività uniche
        const data = uniqueActivities.map(activity => activityPoints[activity] || 0);

        return {
            label: player.playerName,
            data: data,
            backgroundColor: getRandomColor(),
            borderColor: getRandomColor(),
            borderWidth: 1,
        };
    });

    // Configura i dati del grafico
    const chartData = {
        labels: uniqueActivities,
        datasets: datasets,
    };

    // Configura le opzioni del grafico
    const chartOptions = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    // Crea e visualizza il grafico
    new Chart(chartContext, {
        type: 'bar',
        data: chartData,
        options: chartOptions,
    });
}


const masterChefColors = [
    '#E81A61', // MisteryBox
    '#00A7E1', // Esterna
    '#FFD100', // NuovaAttivita
    '#00AF4C', // Eliminato
    '#FF6F61', // AltroColore1
    '#77D8D8', // AltroColore2
    '#FFA07A', // AltroColore3
    '#B8860B', // AltroColore4
    // Aggiungi altri colori per le attività secondo necessità
];

function getRandomColor() {
    // Restituisci un colore casuale tra quelli di MasterChef
    const randomColor = masterChefColors[Math.floor(Math.random() * masterChefColors.length)];
    return randomColor;
}

function getRandomColor() {
    // Restituisci un colore casuale tra quelli di MasterChef
    const randomColor = masterChefColors[Math.floor(Math.random() * masterChefColors.length)];
    return randomColor;
}
