/*
    original spreadsheet headers:

    0) Game 1 Selection
    1) Strike Order [Pokémon Stadium 2]
    2) Strike Order [Smashville]
    3) Strike Order [Battlefield]
    4) Strike Order [Final Destination]
    5) Strike Order [Lylat Cruise]
    6) Game 1 Chosen Stage
    7) Game 2 Ban 1
    8) Game 2 Ban 2
    9) Game 2 Chosen Stage
    10) Was there a Game 3?
    11) Game 3 Ban 1
    12) Game 3 Ban 2
    13) Game 3 Chosen Stage
    14) Repeated chosen stages?
    15) Which stage repeated?
    16) Repeated bans?
    17) Stage(s) Banned Both Game 2 & 3

*/

const fs = require('fs');
const util = require('util');

// .readFileSync returns a string, because encoding is specified
/*
    I acknowledge that using String.split and then going back to iterate again
    is not efficient, but it is an acceptable engineering decision considering:
      1) this easy-to-understand implementation speeds up development time, and
      2) this script file is intended to run a small number of limited times,
         since its purpose is to generate an output file that is used instead.
*/
const rowsArr = fs.readFileSync('g6_stages_raw.csv', 'utf8').split('\n');

// ----
// initialize empty results storage to keep track of tallies/etc during parsing
// ----

let globalStats = {
  totalGames: 0,
  totalSets: 0
};

const stages = [
  "Pokémon Stadium 2",       // 0
  "Smashville",              // 1
  "Battlefield",             // 2
  "Final Destination",       // 3
  "Lylat Cruise",            // 4
  "Town And City",           // 5
  "Unova Pokémon League",    // 6
  "Yoshi's Island (Brawl)",  // 7
  "Kalos Pokémon League",    // 8
  "Yoshi's Story",           // 9
  "Castle Siege"             // 10
];

// match Tabulator's expected data format:
// array of objects, each with the same properties

let stageStats = [];

stages.forEach((s) => {
  stageStats.push({
    stage: s,
    gamesPlayed: 0,
    setsPlayed: 0,
    gamesBanned: 0,
    setsBanned: 0
  });
});

// ----
// main parsing part
// ----

let setPlayedFlags = new Array(11).fill(false);
let setBannedFlags = new Array(11).fill(false);

let tokenArr = null;
rowsArr.forEach((row) => {

  // my comment on efficiency near the top of this file still applies
  tokenArr = row.split(',');

  // tally games and sets...
  // played: indices 6, 9, 13
  // banned: indices 7, 8, 11, 12
  for (let i = 0; i < stages.length; i++) {
    if (tokenArr[6] === stages[i]) {
      stageStats[i].gamesPlayed++;
      setPlayedFlags[i] = true;
    }
    if (tokenArr[9] === stages[i]) {
      stageStats[i].gamesPlayed++;
      setPlayedFlags[i] = true;
    }
    if (tokenArr[13] === stages[i]) {
      stageStats[i].gamesPlayed++;
      setPlayedFlags[i] = true;
    }
    if (tokenArr[7] === stages[i]) {
      stageStats[i].gamesBanned++;
      setBannedFlags[i] = true;
    }
    if (tokenArr[8] === stages[i]) {
      stageStats[i].gamesBanned++;
      setBannedFlags[i] = true;
    }
    if (tokenArr[11] === stages[i]) {
      stageStats[i].gamesBanned++;
      setBannedFlags[i] = true;
    }
    if (tokenArr[12] === stages[i]) {
      stageStats[i].gamesBanned++;
      setBannedFlags[i] = true;
    }
  }

  // wrap up processing current row: count and reset flags
  globalStats.totalSets++;
  for (let i = 0; i < setPlayedFlags.length; i++) {
    if (setPlayedFlags[i]) {
      stageStats[i].setsPlayed++;
    }
    setPlayedFlags[i] = false;
  }
  for (let i = 0; i < setBannedFlags.length; i++) {
    if (setBannedFlags[i]) {
      stageStats[i].setsBanned++;
    }
    setBannedFlags[i] = false;
  }
});

// ----
// write results to file
// ----

let builtString = "export const stageStats = [";
stageStats.forEach((e) => {
  builtString = builtString + util.inspect(e) + ",";
});
builtString = builtString + "];";

fs.writeFile("../src/js/data-procedural.js", builtString, function (err) {
  if(err) {
    return console.log(err);
  }
  console.log("fs.writeFile finished without errors.");
}); 
