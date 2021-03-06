angular.module('drugServices', [])

.factory('drugEffects', function() {
  var drugEffects = [
    'Nausea',
    'Heart-burn',
    'Indigestion',
    'Rash',
    'Headache'
  ];

  return drugEffects;
})

.factory('drugNames', function() {
  var drugNames = [
    'Abilify',
    'Aciphex',
    'Advair Diskus',
    'Afinitor',
    'Alimta',
    'Aranesp',
    'Atripla',
    'Avastin',
    'Avonex',
    'Avonex Pen',
    'Benicar',
    'Benicar Hct',
    'Betaseron',
    'Bystolic',
    'Celebrex',
    'Cialis',
    'Combivent Respimat',
    'Complera',
    'Copaxone',
    'Crestor',
    'Cubicin',
    'Cymbalta',
    'Dexilant',
    'Diovan',
    'Enbrel',
    'Epogen',
    'Erbitux',
    'Evista',
    'Flovent Hfa',
    'Focalin Xr',
    'Gardasil',
    'Gilenya',
    'Gleevec',
    'Herceptin',
    'Humalog',
    'Humalog Kwikpen',
    'Humira',
    'Incivek',
    'Invega Sustenna',
    'Isentress',
    'Janumet',
    'Januvia',
    'Lantus',
    'Lantus Solostar',
    'Levemir',
    'Lucentis',
    'Lunesta',
    'Lyrica',
    'Namenda',
    'Nasonex',
    'Neulasta',
    'Neupogen',
    'Nexium',
    'Novolog',
    'Novolog Flexpen',
    'Orencia',
    'Oxycontin',
    'Pradaxa',
    'Prevnar 13',
    'Prezista',
    'Pristiq',
    'Procrit',
    'Remicade',
    'Renvela',
    'Reyataz',
    'Rituxan',
    'Sandostatin Lar',
    'Sensipar',
    'Seroquel Xr',
    'Spiriva Handihaler',
    'Stelara',
    'Strattera',
    'Stribild',
    'Suboxone',
    'Symbicort',
    'Synagis',
    'Synthroid',
    'Tamiflu',
    'Tarceva',
    'Tecfidera',
    'Treanda',
    'Truvada',
    'Velcade',
    'Ventolin Hfa',
    'Vesicare',
    'Viagra',
    'Victoza 3-Pak',
    'Viread',
    'Vytorin',
    'Vyvanse',
    'Welchol',
    'Xarelto',
    'Xeloda',
    'Xgeva',
    'Xifaxan',
    'Xolair',
    'Zetia',
    'Zostavax',
    'Zytiga',
    'Zyvox'
  ];

  return drugNames;
})