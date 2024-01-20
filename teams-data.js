// Contenuto del file data.js
const playersData = [
    { playerName: 'Alberto Pierobon', teams: ['Famechimica', 'GiovyRana Team', 'Brunobrio'], detailedPoints: [
        { day: 1, activity: 'Esterna', value: 2 }, 
        { day: 1, activity: 'Invention', value: 2 }, 
        { day: 1, activity: 'Esterna', value: 2 },
        { day: 1, activity: 'Eliminazione', value: 15 }], eliminato: true},
    { playerName: 'Alice Scaffardi', teams: ['Sfilettati', 'Cracchini','Brunobrio'], detailedPoints: [
        { day: 1, activity: 'MisteryBox', value: 3 }, 
        { day: 1, activity: 'Esterna', value: 2 }, 
        { day: 1, activity: 'Esterna', value: 2 }], eliminato: false},
    { playerName: 'Andrea Sciamanna', teams: ['Gli Stellati','Bimbe di Barbieri', 'Sfilettati','PizzaHot'], detailedPoints: [
        { day: 1, activity: 'Esterna', value: 2 }, 
        { day: 1, activity: 'Eliminazione', value: 12 }], eliminato: true},
    { playerName: 'Anna Pisano', teams: ['Famechimica','Brunobrio'], detailedPoints: [
        { day: 1, activity: 'Esterna', value: 2 },
        { day: 1, activity: 'Eliminazione', value: 10 }], eliminato: true},
    { playerName: 'Antonio Mazzola', teams: ['Gli Stellati', 'Cannavacciuoli', 'Bimbe di Barbieri', 'GiovyRana Team', 'Craccosanti','Brunobrio'], detailedPoints: [
        { day: 1, activity: 'MisteryBox', value: 3 }, 
        { day: 1, activity: 'Esterna', value: 2 }, 
        { day: 1, activity: 'Esterna', value: 2 }, 
        { day: 1, activity: 'Esterna', value: 2 }], eliminato: false},
    { playerName: 'Beatrice Belli', teams: ['Cannavacciuoli', 'Cracchini','Brunobrio'], detailedPoints: [
        { day: 1, activity: 'Eliminazione', value: 8 }], eliminato: true},
    { playerName: 'Deborah Meloni', teams: ['Bimbe di Barbieri', 'Gli Stellati', 'GiovyRana Team', 'Craccosanti'], detailedPoints: [
        { day: 1, activity: 'Esterna', value: 2 }, 
        { day: 1, activity: 'MisteryBox', value: 3 }, 
        { day: 1, activity: 'Esterna', value: 2 }, 
        { day: 1, activity: 'MisteryBox', value: 3 }, 
        { day: 1, activity: 'Esterna', value: 2 }], eliminato: false},
    { playerName: 'Eleonora Riso', teams: ['Cannavacciuoli', 'Sfilettati'], detailedPoints: [
        { day: 1, activity: 'MisteryBox', value: 3 }], eliminato: false},
    { playerName: 'Filippo Baldo', teams: ['Gli Stellati', 'Famechimica', 'Cracchini'], detailedPoints: [
        { day: 1, activity: 'Esterna', value: 2 }, 
        { day: 1, activity: 'Esterna', value: 2 }], eliminato: false},
    { playerName: 'Kassandra Rodriguez', teams: ['GiovyRana Team','PizzaHot'], detailedPoints: [
        { day: 1, activity: 'Esterna', value: 2 }, 
        { day: 1, activity: 'Esterna', value: 2 }], eliminato: false},
    { playerName: 'Lorenzo Silvidio', teams: ['GiovyRana Team', 'Craccosanti'], detailedPoints: [], eliminato: false},
    { playerName: 'Marcus Agerstroem', teams: ['Gli Stellati', 'Bimbe di Barbieri', 'Sfilettati','Brunobrio'], detailedPoints: [ 
        { day: 1, activity: 'Esterna', value: 2 }], eliminato: false},
    { playerName: 'Michela Morelli', teams: ['Cannavacciuoli', 'Craccosanti'], detailedPoints: [
        { day: 1, activity: 'Invention', value: 2 }, 
        { day: 1, activity: 'MisteryBox', value: 3 }], eliminato: false},
    { playerName: 'Niccolò Califano', teams: ['Gli Stellati', 'Bimbe di Barbieri', 'Sfilettati'], detailedPoints: [
        { day: 1, activity: 'MisteryBox', value: 3 }], eliminato: false},
    { playerName: 'Nicolò Molinari', teams: ['Cannavacciuoli', 'Bimbe di Barbieri', 'Famechimica', 'PizzaHot'], detailedPoints: [
        { day: 1, activity: 'Esterna', value: 2 },
        { day: 1, activity: 'Eliminazione', value: 6 }], eliminato: true},
    { playerName: 'Sara Bellinzona', teams: ['Famechimica', 'Cracchini','PizzaHot'], detailedPoints: [
        { day: 1, activity: 'Esterna', value: 2 }], eliminato: false},
    { playerName: 'Settimino Difonzo', teams: ['Cannavacciuoli','PizzaHot'], detailedPoints: [
        { day: 1, activity: 'Esterna', value: 2 }, 
        { day: 1, activity: 'Esterna', value: 2 }], eliminato: false},
    { playerName: 'Valeria Zullo', teams: ['Cracchini', 'Craccosanti'], detailedPoints: [
        { day: 1, activity: 'Eliminazione', value: 4 }], eliminato: true},
    { playerName: 'Fiorenza Pennacchio', teams: ['Cracchini', 'GiovyRana Team', 'Craccosanti'], detailedPoints: [
        { day: 1, activity: 'Eliminazione', value: 2 }], eliminato: true},
    { playerName: 'Chu Razanadrabe', teams: ['Sfilettati', 'Famechimica', 'PizzaHot'], detailedPoints: [
        { day: 1, activity: 'Eliminazione', value: 1 }], eliminato: true}
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
            
            // Aggiunge i dettagli dei punti per il giocatore nella squadra
            teamData.points += player.detailedPoints.reduce((total, detail) => total + detail.value, 0);
        });
    });

    return Array.from(teamsMap.values());
}
