const ARTISTS = [
  // ================= VIERNES 21 DE AGOSTO =================
  // EL VALLE
  {name: "D.Palermo", day: "VIE", stage: "EL VALLE", time: "19:10-19:40", slug: "d-palermo"},
  {name: "Shakedablock!", day: "VIE", stage: "EL VALLE", time: "19:50-20:20", slug: "shakedablock"},
  {name: "Tarchi", day: "VIE", stage: "EL VALLE", time: "20:30-21:20", slug: "tarchi"},
  {name: "D.Valentino", day: "VIE", stage: "EL VALLE", time: "22:00-23:00", slug: "d-valentino"},
  {name: "Sticky M.A.", day: "VIE", stage: "EL VALLE", time: "00:00-00:50", slug: "sticky-ma"},
  {name: "Gloosito", day: "VIE", stage: "EL VALLE", time: "01:30-02:20", slug: "gloosito"},
  {name: "Six Sex", day: "VIE", stage: "EL VALLE", time: "03:00-03:50", slug: "six-sex"},
  {name: "8belial", day: "VIE", stage: "EL VALLE", time: "04:30-05:20", slug: "8belial"},
  {name: "Selecta", day: "VIE", stage: "EL VALLE", time: "05:30-06:30", slug: "selecta"},

  // EL BOSQUE
  {name: "Bby Demon", day: "VIE", stage: "EL BOSQUE", time: "19:20-19:50", slug: "bby-demon"},
  {name: "Semon", day: "VIE", stage: "EL BOSQUE", time: "20:00-20:30", slug: "semon"},
  {name: "LG1DO", day: "VIE", stage: "EL BOSQUE", time: "21:20-22:10", slug: "lg1do"},
  {name: "Uña y Carne", day: "VIE", stage: "EL BOSQUE", time: "22:50-00:00", slug: "una-y-carne"},
  {name: "Ultralone", day: "VIE", stage: "EL BOSQUE", time: "00:40-01:30", slug: "ultralone"},
  {name: "Stereo Madness", day: "VIE", stage: "EL BOSQUE", time: "02:10-03:00", slug: "stereo-madness"},
  {name: "Marce y Dlomalo", day: "VIE", stage: "EL BOSQUE", time: "03:40-04:30", slug: "marce-y-dlomalo"},

  // LA CARPA
  {name: "Cecilio G", day: "VIE", stage: "LA CARPA", time: "21:30-22:20", slug: "cecilio-g"},
  {name: "Tommy Blanco", day: "VIE", stage: "LA CARPA", time: "22:30-22:55", slug: "tommy-blanco"},
  {name: "Uzi Habache", day: "VIE", stage: "LA CARPA", time: "22:55-23:20", slug: "uzi-habache"},
  {name: "Cybernene", day: "VIE", stage: "LA CARPA", time: "23:30-00:20", slug: "cybernene"},
  {name: "TK Mami", day: "VIE", stage: "LA CARPA", time: "00:30-01:20", slug: "tk-mami"},
  {name: "Aleesha", day: "VIE", stage: "LA CARPA", time: "01:30-02:20", slug: "aleesha"},
  {name: "Raly", day: "VIE", stage: "LA CARPA", time: "02:30-03:20", slug: "raly"},
  {name: "L'Haine", day: "VIE", stage: "LA CARPA", time: "03:30-04:20", slug: "lhaine"},
  {name: "Olivia Babe y Gigi264", day: "VIE", stage: "LA CARPA", time: "04:30-05:30", slug: "olivia-babe-y-gigi264"},
  {name: "Johnnyfuu", day: "VIE", stage: "LA CARPA", time: "05:30-06:30", slug: "johnnyfuu"},

  // ================= SÁBADO 22 DE AGOSTO =================
  // EL VALLE
  {name: "Nico", day: "SAB", stage: "EL VALLE", time: "18:30-19:00", slug: "nico"},
  {name: "Iza TKM", day: "SAB", stage: "EL VALLE", time: "19:10-19:40", slug: "iza-tkm"},
  {name: "Amore", day: "SAB", stage: "EL VALLE", time: "20:00-20:50", slug: "amore"},
  {name: "Natalia Lacunza", day: "SAB", stage: "EL VALLE", time: "21:30-22:20", slug: "natalia-lacunza"},
  {name: "Ralphie Choo", day: "SAB", stage: "EL VALLE", time: "23:00-23:50", slug: "ralphie-choo"},
  {name: "MVRK", day: "SAB", stage: "EL VALLE", time: "00:30-01:20", slug: "mvrk"},
  {name: "Juicy Bae", day: "SAB", stage: "EL VALLE", time: "02:00-02:50", slug: "juicy-bae"},
  {name: "Soto Asa", day: "SAB", stage: "EL VALLE", time: "03:30-04:20", slug: "soto-asa"},
  {name: "Skinyz", day: "SAB", stage: "EL VALLE", time: "04:30-06:30", slug: "skinyz"},

  // EL BOSQUE
  {name: "Yung Brandy", day: "SAB", stage: "EL BOSQUE", time: "19:30-20:00", slug: "yung-brandy"},
  {name: "Vampi", day: "SAB", stage: "EL BOSQUE", time: "20:10-20:40", slug: "vampi"},
  {name: "Dirty Suc", day: "SAB", stage: "EL BOSQUE", time: "20:50-21:40", slug: "dirty-suc"},
  {name: "Vreno YG", day: "SAB", stage: "EL BOSQUE", time: "22:10-23:00", slug: "vreno-yg"},
  {name: "Ugly", day: "SAB", stage: "EL BOSQUE", time: "23:40-00:30", slug: "ugly"},
  {name: "Jesse Baez", day: "SAB", stage: "EL BOSQUE", time: "01:10-02:00", slug: "jesse-baez"},
  {name: "Rebe", day: "SAB", stage: "EL BOSQUE", time: "02:40-03:30", slug: "rebe"},
  {name: "Delarue", day: "SAB", stage: "EL BOSQUE", time: "04:00-04:50", slug: "delarue"},

  // LA CARPA
  {name: "Fanta Rosario", day: "SAB", stage: "LA CARPA", time: "20:30-21:20", slug: "fanta-rosario"},
  {name: "Facebrooklyn", day: "SAB", stage: "LA CARPA", time: "21:30-22:20", slug: "facebrooklyn"},
  {name: "Guxo", day: "SAB", stage: "LA CARPA", time: "22:30-23:20", slug: "guxo"},
  {name: "Kristina", day: "SAB", stage: "LA CARPA", time: "23:30-00:20", slug: "kristina"},
  {name: "Taichu", day: "SAB", stage: "LA CARPA", time: "00:30-01:20", slug: "taichu"},
  {name: "Jay Dime", day: "SAB", stage: "LA CARPA", time: "01:30-02:20", slug: "jay-dime"},
  {name: "Biberon", day: "SAB", stage: "LA CARPA", time: "02:30-03:20", slug: "biberon"},
  {name: "YYY891", day: "SAB", stage: "LA CARPA", time: "03:30-04:20", slug: "yyy891"},
  {name: "Arcex", day: "SAB", stage: "LA CARPA", time: "04:30-05:30", slug: "arcex"},
  {name: "Bluntz b2b Tasuik", day: "SAB", stage: "LA CARPA", time: "05:30-06:30", slug: "bluntz-b2b-tasuik"},

  // ================= DOMINGO 23 DE AGOSTO =================
  // EL VALLE
  {name: "Amoryodio", day: "DOM", stage: "EL VALLE", time: "18:40-19:10", slug: "amoryodio"},
  {name: "Nerdbellako", day: "DOM", stage: "EL VALLE", time: "19:20-19:50", slug: "nerdbellako"},
  {name: "Raul Clyde", day: "DOM", stage: "EL VALLE", time: "21:30-22:20", slug: "raul-clyde"},
  {name: "Akriila", day: "DOM", stage: "EL VALLE", time: "23:00-23:50", slug: "akriila"},
  {name: "Hoke", day: "DOM", stage: "EL VALLE", time: "00:30-01:20", slug: "hoke"},
  {name: "Abhir", day: "DOM", stage: "EL VALLE", time: "02:00-02:50", slug: "abhir"},
  {name: "Ben Yart", day: "DOM", stage: "EL VALLE", time: "02:40-03:30", slug: "ben-yart"},
  {name: "Metrika", day: "DOM", stage: "EL VALLE", time: "03:30-04:20", slug: "metrika"},
  {name: "Kabasaki", day: "DOM", stage: "EL VALLE", time: "04:30-05:30", slug: "kabasaki"},
  {name: "Xina Mora", day: "DOM", stage: "EL VALLE", time: "05:30-06:30", slug: "xina-mora"},

  // EL BOSQUE
  {name: "Main Costa", day: "DOM", stage: "EL BOSQUE", time: "18:50-19:20", slug: "main-costa"},
  {name: "Tawa", day: "DOM", stage: "EL BOSQUE", time: "19:30-20:00", slug: "tawa"},
  {name: "l0rna", day: "DOM", stage: "EL BOSQUE", time: "20:00-20:50", slug: "l0rna"},
  {name: "Ébano", day: "DOM", stage: "EL BOSQUE", time: "22:10-23:00", slug: "ebano"},
  {name: "Nico Miseria", day: "DOM", stage: "EL BOSQUE", time: "23:40-00:30", slug: "nico-miseria"},
  {name: "Roomtrash", day: "DOM", stage: "EL BOSQUE", time: "01:10-02:00", slug: "roomtrash"},
  {name: "ANB", day: "DOM", stage: "EL BOSQUE", time: "04:00-04:50", slug: "anb"},

  // LA CARPA
  {name: "Leïti", day: "DOM", stage: "LA CARPA", time: "20:40-21:30", slug: "leiti"},
  {name: "Gatti", day: "DOM", stage: "LA CARPA", time: "21:30-22:20", slug: "gatti"},
  {name: "C Marí", day: "DOM", stage: "LA CARPA", time: "22:30-23:20", slug: "c-mari"},
  {name: "El Bugg", day: "DOM", stage: "LA CARPA", time: "23:30-00:20", slug: "el-bugg"},
  {name: "La Musa", day: "DOM", stage: "LA CARPA", time: "00:30-01:20", slug: "la-musa"},
  {name: "Bea Pelea", day: "DOM", stage: "LA CARPA", time: "01:30-02:20", slug: "bea-pelea"},
  {name: "Ladiferencia 2006", day: "DOM", stage: "LA CARPA", time: "02:30-03:20", slug: "ladiferencia-2006"},
  {name: "Zell", day: "DOM", stage: "LA CARPA", time: "03:30-04:20", slug: "zell"},
  {name: "Sneaky Wh", day: "DOM", stage: "LA CARPA", time: "04:30-05:30", slug: "sneaky-wh"},
  {name: "Kid Gummy", day: "DOM", stage: "LA CARPA", time: "05:30-06:30", slug: "kid-gummy"},

  // ================= ARTISTA ESPECIAL =================
  {name: "Young Latte", day: "ESP", stage: "ARTISTA ESPECIAL", time: "SORPRESA", slug: "young-latte", special: true}
];
