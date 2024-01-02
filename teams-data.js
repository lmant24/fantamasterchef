// Contenuto del file data.js
// Contenuto del file data.js
const playersData = [
    { playerName: 'Alberto Pierobon', teams: [], points: 2, eliminato: false},
    { playerName: 'Alice Scaffardi', teams: ['Sfilettati'], points: 3, eliminato: false},
    { playerName: 'Andrea Sciamanna', teams: ['ILEFER','Bimbe di Barbieri', 'Sfilettati'], points: 0, eliminato: false},
    { playerName: 'Anna Pisano', teams: [], points: 2, eliminato: false},
    { playerName: 'Antonio Mazzola', teams: ['ILEFER', 'Cannavacciuoli', 'Bimbe di Barbieri'], points: 5, eliminato: false},
    { playerName: 'Beatrice Belli', teams: ['Cannavacciuoli'], points: 0, eliminato: false},
    { playerName: 'Deborah Meloni', teams: ['Bimbe di Barbieri', 'ILEFER'], points: 2, eliminato: false},
    { playerName: 'Eleonora Riso', teams: ['Cannavacciuoli', 'Sfilettati'], points: 3, eliminato: false},
    { playerName: 'Filippo Baldo', teams: ['ILEFER'], points: 2, eliminato: false},
    { playerName: 'Kassandra Rodriguez', teams: [], points: 2, eliminato: false},
    { playerName: 'Lorenzo Silvidio', teams: [], points: 0, eliminato: false},
    { playerName: 'Marcus Agerstroem', teams: ['ILEFER', 'Bimbe di Barbieri', 'Sfilettati'], points: 0, eliminato: false},
    { playerName: 'Michela Morelli', teams: ['Cannavacciuoli'], points: 0, eliminato: false},
    { playerName: 'Niccolò Califano', teams: ['ILEFER', 'Bimbe di Barbieri', 'Sfilettati'], points: 0, eliminato: false},
    { playerName: 'Nicolò Molinari', teams: ['Cannavacciuoli', 'Bimbe di Barbieri'], points: 2, eliminato: false},
    { playerName: 'Sara Bellinzona', teams: [], points: 0, eliminato: false},
    { playerName: 'Settimino Difonzo', teams: ['Cannavacciuoli'], points: 2, eliminato: false},
    { playerName: 'Valeria Zullo', teams: [], points: 0, eliminato: false},
    { playerName: 'Fiorenza Pennacchio', teams: [], points: 2, eliminato: true},
    { playerName: 'Chu Razanadrabe', teams: ['Sfilettati'], points: 1, eliminato: true}
    // Aggiungi altri giocatori secondo necessità
];

const teamsData = generateTeamsData(playersData);

function generateTeamsData(playersData) {
    const teamsMap = new Map();

    playersData.forEach(player => {
        player.teams.forEach(team => {
            if (!teamsMap.has(team)) {
                teamsMap.set(team, { name: team, players: [], points: 0 });
            }

            const teamData = teamsMap.get(team);
            teamData.players.push(player.playerName);
            teamData.points += player.points;
        });
    });

    return Array.from(teamsMap.values());
}
