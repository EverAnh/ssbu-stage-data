import { colorSettings } from './chart-settings';

const starterStages = [];

export const decisionMethodData = {
  labels: ["Striking", "Mutual Agreement"],
  datasets: [{
    label: 'Sets',
    data: [693, 448],
    backgroundColor: colorSettings.backgroundColor,
    borderColor: colorSettings.borderColor,
    borderWidth: 1
  }]
};

export const agreedStageData = {
  labels: ['Pokémon Stadium 2','Battlefield','Smashville','Final Destination','Lylat Cruise'],
  datasets: [{
    label: 'Sets',
    data: [333, 61, 34, 18, 2],
    backgroundColor: colorSettings.backgroundColor,
    borderColor: colorSettings.borderColor,
    borderWidth: 1
  }]
};

export const strikedStageData = {
  labels: ['Pokémon Stadium 2','Battlefield','Smashville','Final Destination','Lylat Cruise'],
  datasets: [{
    label: 'Sets',
    data: [292, 168, 123, 89, 20],
    backgroundColor: colorSettings.backgroundColor,
    borderColor: colorSettings.borderColor,
    borderWidth: 1
  }]
};
