/*
    original spreadsheet headers:

    - frostbite 2019

      0) Player 1 Character
      1) Player 2 Character
      2) Selection Style
      3) Game 1 Stage
      4) Strike Order [PS2]
      5) Strike Order [SV]
      6) Strike Order [BF]
      7) Strike Order [FD]
      8) Strike Order [T&C]
      9) Game 2's Banned Stage #1
      10) Game 2's Banned Stage #2
      11) Game 2 Chosen Stage
      12) G2 P1 Character
      13) G2 P2 Character
      14) Game 3?
      15) Game 3's Banned Stage #1
      16) Game 3's Banned Stage #2
      17) Game 3 Chosen Stage
      18) G3 P1 Character
      19) G3 P2 Character

    - genesis 6

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

// ----
// user prompt to select which tournament's data
// ----

console.log('Enter [1] for Genesis 6 and [2] for Frostbite 2019: ');
var stdin = process.openStdin();
stdin.addListener("data", function(d) {
  switch (d.toString().trim()) {
    case '1':
      processData(1);
      break;
    case '2':
      processData(2);
      break;
    default:
      // purposely empty
  }
});

function processData (tourneyChoice) {

  // .readFileSync returns a string, because encoding is specified
  /*
      I acknowledge that using String.split and then going back to iterate again
      is not efficient, but it is an acceptable engineering decision considering:
        1) this easy-to-understand implementation speeds up development time, and
        2) this script file is intended to run a small number of limited times,
           since its purpose is to generate an output file that is used instead.
  */
  const rowsArr = (tourneyChoice === 1) ?
    fs.readFileSync('raw_g6.csv', 'utf8').split('\n') :
    fs.readFileSync('raw_fb2019.csv', 'utf8').split('\n');

  // ----
  // initialize empty results storage to keep track of tallies/etc during parsing
  // ----

  const globalStats = {
    totalGames: 0,
    totalSets: 0,  // Known manually - just a sanity check.
    totalBans: 0,  // Since there's two bans each time, divide this by 2 to get total of games with bans recorded. This automatically excludes all game 1s.
    setsWithBanRecorded: 0,
    totalBanPairs: 0
  };

  // full list is based on Genesis's longer list
  // frostbite uses: 0 1 2 3 4 5 _ 7 8 9 _
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

  const shortNames = [
    "PS2",
    "SV",            
    "BF",           
    "FD",     
    "Lylat",          
    "T&C",         
    "Unova",  
    "Y.Island",
    "Kalos",  
    "Y.Story",         
    "C.Siege"           
  ];

  // stageStats matches Tabulator's expected data format:
  // array of objects, each with the same properties

  const stageStats = [];

  // For more efficient accessing during the nested loops of parsing (below),
  // banPairsRaw is an object of objects. At the end, there is a step to convert
  // it to Tabulator's expected format, array of objects.

  // The property accessors of banPairsRaw and its elements must be full stages
  // names, not short stages names, for easy lookup when parsing the speadsheet
  // cells (which use full names).
  
  const banPairsRaw = {};

  // they share the same initialization loop, over the same stage list

  for (let i = 0; i < stages.length; i++) {

    stageStats.push({
      stage: stages[i],
      shortName: shortNames[i],
      gamesPlayed: 0,
      setsPlayed: 0,
      gamesBanned: 0,
      setsBanned: 0
    });

    banPairsRaw[stages[i]] = {};
    for (let j = 0; j < stages.length; j++) {
      if (tourneyChoice !== 1 && j !== 6 && j !== 10) {
        banPairsRaw[stages[i]][stages[j]] = 0;
      }
    }

    // for stageStats, mark Genesis 6 starters by default
    if (i <= 4) {
      stageStats[i].starter = true;
    }
    else {
      stageStats[i].starter = false;
    }
  }
  // then modify starters for Frostbite 2019
  if (tourneyChoice !== 1) {
    stageStats[4].starter = false;
    stageStats[5].starter = true;
  }

  // ----
  // main parsing part
  // ----
  // 'Set' here is the noun that the Smash community typically calls a group of
  // games - synonymous with 'match'. Do not confuse with the verb 'set'.

  const setPlayedFlags = new Array(11).fill(false);
  const setBannedFlags = new Array(11).fill(false);
  let setHasBanRecorded = false;

  let tokenArr = null;
  rowsArr.forEach((row) => {

    // my comment on efficiency near the top of this file still applies
    tokenArr = row.split(',');

    const playedIndices = (tourneyChoice === 1) ? [6, 9, 13] : [3, 11, 17];
    const bannedIndices = (tourneyChoice === 1) ? [7, 8, 11, 12] : [9, 10, 15, 16];

    for (let i = 0; i < stages.length; i++) {

      // tally games and sets, for played
      for (let j = 0; j < playedIndices.length; j++) {
        if (tokenArr[playedIndices[j]] === stages[i]) {
          stageStats[i].gamesPlayed++;
          globalStats.totalGames++;
          setPlayedFlags[i] = true;
        }
      }
      for (let k = 0; k < bannedIndices.length; k++) {
        // still tallying games and sets, but for banned this time
        if (tokenArr[bannedIndices[k]] === stages[i]) {
          stageStats[i].gamesBanned++;
          globalStats.totalBans++;
          setBannedFlags[i] = true;
          setHasBanRecorded = true;
        }
      }
    }

    // TO REWRITE
    // Ban pairs...
    // Can generalize checking each pair to its first element only,
    // then also count the reverse.
    for (let k = 0; k < bannedIndices.length; k++) {
      if (
        (tourneyChoice === 1 && (bannedIndices[k] === 7 || bannedIndices[k] === 11)) ||
        (tourneyChoice !== 1 && (bannedIndices[k] === 9 || bannedIndices[k] === 15))
        )
      {
        // breaking up nested accessors for readability and human understanding
        const firstBan = tokenArr[bannedIndices[k]]; // should be stage name as string
        const secondBan = tokenArr[bannedIndices[k+1]]; // should be stage name as string
        if (firstBan !== "") {
          banPairsRaw[firstBan][secondBan]++;
          banPairsRaw[secondBan][firstBan]++;
          globalStats.totalBanPairs++;
        }
      }
    }

    // wrap up processing current row: count and reset flags

    globalStats.totalSets++;
    if (setHasBanRecorded) {
      globalStats.setsWithBanRecorded++;
    }
    setHasBanRecorded = false;

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

  // Convert banPairsRaw, an object of objects, to an array of objects, the
  // format expected by Tabulator. As previously mentioned, the 2-dimensional
  // object was used for more efficient accessing during the nested loops of
  // the CSV-parsing step.
  const banPairsColumns = [];
  for (let key in banPairsRaw) {
    if (tourneyChoice !== 1 && key !== "Unova Pokémon League" && key !== "Castle Siege") {
      let newElem = { stageA: key };
      Object.assign(newElem, banPairsRaw[key]);
      banPairsColumns.push(newElem);
    }
  };

  // remove stages not used by Frostbite
  // should be the last modification to these arrays, to preserve known indices
  // during other steps
  if (tourneyChoice !== 1) {
    // castle siege
    stageStats.pop();
    stages.pop();
    shortNames.pop();
    // unova
    stageStats.splice(6, 1);
    stages.splice(6, 1);
    shortNames.splice(6, 1);
  }

  // ----
  // write results to file
  // ----

  let builtString = "export const stageStats = [\n";
  stageStats.forEach((e) => {
    builtString = builtString + util.inspect(e) + ",\n";
  });
  builtString = builtString + "\n];\n\n" + "export const banPairs = [\n";
  banPairsColumns.forEach((e) => {
    builtString = builtString + util.inspect(e) + ",\n";
  });
  builtString = builtString + "\n];\n\n"
                + "export const globalStats = \n" + util.inspect(globalStats) + ";\n\n"
                + "export const stages = \n" + util.inspect(stages) + ";\n\n"
                + "export const shortNames = \n" + util.inspect(shortNames) + ";";

  const fileToWrite = (tourneyChoice === 1) ? 
    "../src/js/genesis6/data.js" :
    "../src/js/frostbite2019/data.js";

  fs.writeFile(fileToWrite, builtString, function (err) {
    if(err) {
      return console.log(err);
    }
    console.log("Finished writing to file!");
    process.exit(0);
  }); 

}