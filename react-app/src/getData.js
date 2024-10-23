

export default function getData(){
  function getPlayers1(){
      const players =  ([
        {
          id: 1, 
          firstName: "Finn", 
          lastName: "O'Connell", 
          age: "7", 
          team: "Bulls"
        },
        {
          id: 2, 
          firstName: "Julian", 
          lastName: "Giometti", 
          age: "8", 
          team: "Bulls"
        },
        {
          id: 3, 
          firstName: "Clive", 
          lastName: "Adams", 
          age: "7", 
          team: "Bulls"
        },
        {
          id: 4, 
          firstName: "Matias", 
          lastName: "Applewhite", 
          age: "8", 
          team: "Bulls"
        },
        {
          id: 5, 
          firstName: "August", 
          lastName: "Hatchel", 
          age: "7", 
          team: "Bulls"
        },
        {
          id: 6, 
          firstName: "Eden", 
          lastName: "Miller", 
          age: "8", 
          team: "Bulls"
        },
        {
          id: 7, 
          firstName: "Kais", 
          lastName: "Mencher", 
          age: "7", 
          team: "Bulls"
        },
        {
          id: 8, 
          firstName: "Luca", 
          lastName: "Chiarenza", 
          age: "8", 
          team: "Bulls"
        },
        {
          id: 9, 
          firstName: "Shepherd", 
          lastName: "Pierce", 
          age: "7", 
          team: "Bulls"
        },
        {
          id: 10, 
          firstName: "Tate", 
          lastName: "Goldstein", 
          age: "7", 
          team: "Bulls"
        }

      ]);
      //console.log(players);
      return players;
  }

  function getLeagues(){
      return ([
          {
              id: 1, 
              name:"i9 Sports Fall Season",
              type: "league",
              startDate: new Date(2024, 8, 16),
              endDate: new Date(2024, 9, 27)
          }, 
          {
              id: 2, 
              name:"November 2nd Turkey Day Challenge", 
              type: "tournament",
              startDate: new Date(2024, 10, 2),
              endDate: new Date(2024, 10, 2)
          }
      ]);
  }
  function getStats(){
    return ([
      {
        id: 1,
        gameId: 1,
        playerId: 1,
        points: 12,
        steals: 3,
        assists: 4,
        rebounds: 5
      }
    ]);
  }

  function getGames(){
      return ([
          {
              id: 1, 
              leagueId: 1, 
              name:"Game 1", 
              medalWinners: [4],
              outcome: "Win",
              score: "56-2",
              date: new Date(2024, 8, 16)
          },
          {
              id: 2, 
              leagueId: 1, 
              name:"Game 2", 
              medalWinners: [9],
              outcome: "Win",
              score: "59-2",
              date: new Date(2024, 8, 23)
          },
          {
              id: 3, 
              leagueId: 1, 
              name:"Game 3", 
              medalWinners: [6],
              outcome: "Win",
              score: "49-9",
              date: new Date(2024, 8, 30)
          },
          {
              id: 4, 
              leagueId: 1, 
              name:"Game 4", 
              medalWinners: [1,5],
              outcome: "Win",
              score: "60-10",
              date: new Date(2024, 9, 6)
          },
          {
              id: 5, 
              leagueId: 1, 
              name:"Game 5", 
              medalWinners: [3,8],
              outcome: "Win",
              score: "60-20",
              date: new Date(2024, 9, 13)
          },
          {
              id: 6, 
              leagueId: 1, 
              name:"Game 6", 
              medalWinners: [],
              outcome: "",
              score: "",
              date: new Date(2024, 9, 20)
          },
          {
              id: 7, 
              leagueId: 1, 
              name:"Game 7", 
              medalWinners: [],
              outcome: "",
              score: "",
              date: new Date(2024, 9, 27)
          },
          {
              id: 8, 
              leagueId: 2, 
              name:"Game 1", 
              medalWinners: [],
              outcome: "",
              score: "",
              date: new Date(2024, 10, 2)
          },
          {
              id: 9, 
              leagueId: 2, 
              name:"Game 2", 
              medalWinners: [],
              outcome: "",
              score: "",
              date: new Date(2024, 10, 2)
          },
          {
              id: 10, 
              leagueId: 2, 
              name:"Game 3", 
              medalWinners: [],
              outcome: "",
              score: "",
              date: new Date(2024, 10, 2)
          }
      ]);

  }

  return {getGames, getLeagues, getStats};
}
