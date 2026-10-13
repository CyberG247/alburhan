/**
 * Comprehensive Nigerian Geopolitical Registry
 * Contains all 36 States + FCT and their constituent 774 Local Government Areas (LGAs),
 * along with accredited tertiary institutions and global country listings.
 */

export const nigeriaStatesAndLgas: Record<string, string[]> = {
  Abia: [
    'Aba North', 'Aba South', 'Arochukwu', 'Bende', 'Ikwuano', 'Isiala Ngwa North',
    'Isiala Ngwa South', 'Isuikwuato', 'Obi Ngwa', 'Ohafia', 'Osisioma Ngwa',
    'Ugwunagbo', 'Ukwa East', 'Ukwa West', 'Umuahia North', 'Umuahia South', 'Umu Nneochi'
  ],
  Adamawa: [
    'Demsa', 'Fufore', 'Ganye', 'Girei', 'Gombi', 'Guyuk', 'Hong', 'Jada', 'Lamurde',
    'Madagali', 'Maiha', 'Mayo-Belwa', 'Michika', 'Mubi North', 'Mubi South', 'Numan',
    'Shelleng', 'Song', 'Toungo', 'Yola North', 'Yola South'
  ],
  'Akwa Ibom': [
    'Abak', 'Eastern Obolo', 'Eket', 'Esit Eket', 'Essien Udim', 'Etim Ekpo', 'Etinan',
    'Ibeno', 'Ibesikpo Asutan', 'Ibiono-Ibom', 'Ika', 'Ikono', 'Ikot Abasi', 'Ikot Ekpene',
    'Ini', 'Itu', 'Mbo', 'Mkpat-Enin', 'Nsit-Atai', 'Nsit-Ibom', 'Nsit-Ubium', 'Obot Akara',
    'Okobo', 'Onna', 'Oron', 'Oruk Anam', 'Udung-Uko', 'Ukanafun', 'Uruan', 'Urue-Offong/Oruko', 'Uyo'
  ],
  Anambra: [
    'Aguata', 'Anambra East', 'Anambra West', 'Anaocha', 'Awka North', 'Awka South',
    'Ayamelum', 'Dunukofia', 'Ekwusigo', 'Idemili North', 'Idemili South', 'Ihiala',
    'Njikoka', 'Nnewi North', 'Nnewi South', 'Ogbaru', 'Onitsha North', 'Onitsha South',
    'Orumba North', 'Orumba South', 'Oyi'
  ],
  Bauchi: [
    'Alkaleri', 'Bauchi', 'Bogoro', 'Damban', 'Darazo', 'Dass', 'Gamawa', 'Ganjuwa',
    'Giade', 'Itas/Gadau', 'Jama’are', 'Katagum', 'Kirfi', 'Misau', 'Ningi', 'Shira',
    'Tafawa Balewa', 'Toro', 'Warji', 'Zaki'
  ],
  Bayelsa: [
    'Brass', 'Ekeremor', 'Kolokuma/Opokuma', 'Nembe', 'Ogbia', 'Sagbama',
    'Southern Ijaw', 'Yenagoa'
  ],
  Benue: [
    'Ado', 'Agatu', 'Apa', 'Buruku', 'Gboko', 'Guma', 'Gwer East', 'Gwer West',
    'Katsina-Ala', 'Konshisha', 'Kwande', 'Logo', 'Makurdi', 'Obi', 'Ogbadibo',
    'Ohimini', 'Oju', 'Okpokwu', 'Otukpo', 'Tarka', 'Ukum', 'Ushongo', 'Vandeikya'
  ],
  Borno: [
    'Abadam', 'Askira/Uba', 'Bama', 'Bayo', 'Biu', 'Chibok', 'Damboa', 'Dikwa',
    'Gubio', 'Guzamala', 'Gwoza', 'Hawul', 'Jere', 'Kaga', 'Kala/Balge', 'Konduga',
    'Kukawa', 'Kwaya Kusar', 'Mafa', 'Magumeri', 'Maiduguri', 'Marte', 'Mobbar',
    'Monguno', 'Ngala', 'Nganzai', 'Shani'
  ],
  'Cross River': [
    'Abi', 'Akamkpa', 'Akpabuyo', 'Bakassi', 'Bekwarra', 'Biase', 'Boki', 'Calabar Municipal',
    'Calabar South', 'Etung', 'Ikom', 'Obanliku', 'Obubra', 'Obudu', 'Odukpani', 'Ogoja',
    'Yakuur', 'Yala'
  ],
  Delta: [
    'Aniocha North', 'Aniocha South', 'Bomadi', 'Burutu', 'Ethiope East', 'Ethiope West',
    'Ika North East', 'Ika South', 'Isoko North', 'Isoko South', 'Ndokwa East', 'Ndokwa West',
    'Okpe', 'Oshimili North', 'Oshimili South', 'Patani', 'Sapele', 'Udu', 'Ughelli North',
    'Ughelli South', 'Ukwuani', 'Uvwie', 'Warri North', 'Warri South', 'Warri South West'
  ],
  Ebonyi: [
    'Abakaliki', 'Afikpo North', 'Afikpo South', 'Ebonyi', 'Ezza North', 'Ezza South',
    'Ikwo', 'Ishielu', 'Ivo', 'Izzi', 'Ohaozara', 'Ohaukwu', 'Onicha'
  ],
  Edo: [
    'Akoko-Edo', 'Egor', 'Esan Central', 'Esan North-East', 'Esan South-East', 'Esan West',
    'Etsako Central', 'Etsako East', 'Etsako West', 'Igueben', 'Ikpoba-Okha', 'Oredo',
    'Orhionmwon', 'Ovia North-East', 'Ovia South-West', 'Owan East', 'Owan West', 'Uhunmwonde'
  ],
  Ekiti: [
    'Ado Ekiti', 'Efon', 'Ekiti East', 'Ekiti South-West', 'Ekiti West', 'Emure', 'Gbonyin',
    'Ido Osi', 'Ijero', 'Ikere', 'Ikole', 'Ilejemeje', 'Irepodun/Ifelodun', 'Ise/Orun',
    'Moba', 'Oye'
  ],
  Enugu: [
    'Aninri', 'Awgu', 'Enugu East', 'Enugu North', 'Enugu South', 'Ezeagu', 'Igbo Etiti',
    'Igbo Eze North', 'Igbo Eze South', 'Isi Uzo', 'Nkanu East', 'Nkanu West', 'Nsukka',
    'Oji River', 'Udenu', 'Udi', 'Uzo-Uwani'
  ],
  'Federal Capital Territory (FCT)': [
    'Abaji', 'Bwari', 'Gwagwalada', 'Kuje', 'Kwali', 'Municipal Area Council (AMAC)'
  ],
  Gombe: [
    'Akko', 'Balanga', 'Billiri', 'Dukku', 'Funakaye', 'Gombe', 'Kaltungo', 'Kwami',
    'Nafada', 'Shongom', 'Yamaltu/Deba'
  ],
  Imo: [
    'Aboh Mbaise', 'Ahiazu Mbaise', 'Ehime Mbano', 'Ezinihitte', 'Ideato North', 'Ideato South',
    'Ihitte/Uboma', 'Ikeduru', 'Isiala Mbano', 'Isu', 'Mbaitoli', 'Ngor Okpala', 'Njaba',
    'Nkwerre', 'Nwangele', 'Obowo', 'Oguta', 'Ohaji/Egbema', 'Okigwe', 'Onuimo', 'Orlu',
    'Orsu', 'Oru East', 'Oru West', 'Owerri Municipal', 'Owerri North', 'Owerri West'
  ],
  Jigawa: [
    'Auyo', 'Babura', 'Biriniwa', 'Birnin Kudu', 'Buji', 'Dutse', 'Gagarawa', 'Garki',
    'Gumel', 'Guri', 'Gwaram', 'Gwiwa', 'Hadejia', 'Jahun', 'Kafin Hausa', 'Kaugama',
    'Kazaure', 'Kiri Kasama', 'Kiyawa', 'Maigatari', 'Malam Madori', 'Miga', 'Ringim',
    'Roni', 'Sule Tankarkar', 'Taura', 'Yankwashi'
  ],
  Kaduna: [
    'Birnin Gwari', 'Chikun', 'Giwa', 'Igabi', 'Ikara', 'Jaba', 'Jema’a', 'Kachia',
    'Kaduna North', 'Kaduna South', 'Kagarko', 'Kajuru', 'Kaura', 'Kauru', 'Kubau',
    'Kudan', 'Lere', 'Makarfi', 'Sabon Gari', 'Sanga', 'Soba', 'Zangon Kataf', 'Zaria'
  ],
  Kano: [
    'Ajingi', 'Albasu', 'Bagwai', 'Bebeji', 'Bichi', 'Bunkure', 'Dala', 'Dambatta',
    'Dawakin Kudu', 'Dawakin Tofa', 'Doguwa', 'Fagge', 'Gabasawa', 'Garko', 'Garun Mallam',
    'Gaya', 'Gezawa', 'Gwale', 'Gwarzo', 'Kabo', 'Kano Municipal', 'Karaye', 'Kibiya',
    'Kiru', 'Kumbotso', 'Kunchi', 'Kura', 'Madobi', 'Makoda', 'Minjibir', 'Nasarawa',
    'Rano', 'Rimin Gado', 'Rogo', 'Shanono', 'Sumaila', 'Takai', 'Tarauni', 'Tofa',
    'Tsanyawa', 'Tudun Wada', 'Ungogo', 'Warawa', 'Wudil'
  ],
  Katsina: [
    'Bakori', 'Batagarawa', 'Batsari', 'Baure', 'Bindawa', 'Charanchi', 'Dandume',
    'Danja', 'Dan Musa', 'Daura', 'Dutsin Ma', 'Faskari', 'Funtua', 'Ingawa', 'Jibia',
    'Kafur', 'Kaita', 'Kankara', 'Kankia', 'Katsina', 'Kurfi', 'Kusada', 'Mai’Adua',
    'Malumfashi', 'Mani', 'Mashi', 'Matazu', 'Musawa', 'Rimi', 'Sabuwa', 'Safana',
    'Sandamu', 'Zango'
  ],
  Kebbi: [
    'Aleiro', 'Arewa Dandi', 'Argungu', 'Augie', 'Bagudo', 'Birnin Kebbi', 'Bunza',
    'Dandi', 'Fakai', 'Gwandu', 'Jega', 'Kalgo', 'Koko/Besse', 'Maiyama', 'Ngaski',
    'Sakaba', 'Shanga', 'Suru', 'Danko/Wasagu', 'Yauri', 'Zuru'
  ],
  Kogi: [
    'Adavi', 'Ajaokuta', 'Ankpa', 'Bassa', 'Dekina', 'Ibaji', 'Idah', 'Igalamela-Odolu',
    'Ijumu', 'Kabba/Bunu', 'Kogi', 'Lokoja', 'Mopa-Muro', 'Ofu', 'Ogori/Magongo',
    'Okehi', 'Okene', 'Olamaboro', 'Omala', 'Yagba East', 'Yagba West'
  ],
  Kwara: [
    'Asa', 'Baruten', 'Edu', 'Ekiti', 'Ifelodun', 'Ilorin East', 'Ilorin South',
    'Ilorin West', 'Irepodun', 'Isin', 'Kaiama', 'Moro', 'Offa', 'Oke Ero', 'Oyun', 'Pategi'
  ],
  Lagos: [
    'Agege', 'Ajeromi-Ifelodun', 'Alimosho', 'Amuwo-Odofin', 'Apapa', 'Badagry',
    'Epe', 'Eti-Osa', 'Ibeju-Lekki', 'Ifako-Ijaiye', 'Ikeja', 'Ikorodu', 'Kosofe',
    'Lagos Island', 'Lagos Mainland', 'Mushin', 'Ojo', 'Oshodi-Isolo', 'Shomolu', 'Surulere'
  ],
  Nasarawa: [
    'Akwanga', 'Awe', 'Doma', 'Karu', 'Keana', 'Keffi', 'Kokona', 'Lafia',
    'Nasarawa', 'Nasarawa Egon', 'Obi', 'Toto', 'Wamba'
  ],
  Niger: [
    'Agaie', 'Agwara', 'Bida', 'Borgu', 'Bosso', 'Chanchaga', 'Edati', 'Gbako',
    'Gurara', 'Katcha', 'Kontagora', 'Lapai', 'Lavun', 'Magama', 'Mariga', 'Mashegu',
    'Mokwa', 'Moya', 'Paikoro', 'Rafi', 'Rijau', 'Shiroro', 'Suleja', 'Tafa', 'Wushishi'
  ],
  Ogun: [
    'Abeokuta North', 'Abeokuta South', 'Ado-Odo/Ota', 'Ewekoro', 'Ifo', 'Ijebu East',
    'Ijebu North', 'Ijebu North East', 'Ijebu Ode', 'Ikenne', 'Ilaro', 'Imeko Afon',
    'Ipokia', 'Obafemi Owode', 'Odeda', 'Odogbolu', 'Ogun Waterside', 'Remo North',
    'Shagamu', 'Yewa North', 'Yewa South'
  ],
  Ondo: [
    'Akoko North-East', 'Akoko North-West', 'Akoko South-East', 'Akoko South-West',
    'Akure North', 'Akure South', 'Ese Odo', 'Idanre', 'Ifedore', 'Ilaje', 'Ile Oluji/Okeigbo',
    'Irele', 'Odigbo', 'Okitipupa', 'Ondo East', 'Ondo West', 'Ose', 'Owo'
  ],
  Osun: [
    'Atakunmosa East', 'Atakunmosa West', 'Aiyedaade', 'Aiyedire', 'Boluwaduro', 'Boripe',
    'Ede North', 'Ede South', 'Ife Central', 'Ife East', 'Ife North', 'Ife South', 'Egbedore',
    'Ejigbo', 'Ifedayo', 'Ifelodun', 'Ila', 'Ilesa East', 'Ilesa West', 'Irepodun', 'Irewole',
    'Isokan', 'Iwo', 'Obokun', 'Odo Otin', 'Ola Oluwa', 'Olorunda', 'Oriade', 'Orolu', 'Osogbo'
  ],
  Oyo: [
    'Afijio', 'Akinyele', 'Atiba', 'Atisbo', 'Egbeda', 'Ibadan North', 'Ibadan North-East',
    'Ibadan North-West', 'Ibadan South-East', 'Ibadan South-West', 'Ibarapa Central',
    'Ibarapa East', 'Ibarapa North', 'Ido', 'Irepo', 'Iseyin', 'Itesiwaju', 'Iwajowa',
    'Kajola', 'Lagelu', 'Ogbomosho North', 'Ogbomosho South', 'Ogo Oluwa', 'Olorunsogo',
    'Oluyole', 'Ona Ara', 'Orelope', 'Ori Ire', 'Oyo East', 'Oyo West', 'Saki East', 'Saki West', 'Surulere'
  ],
  Plateau: [
    'Barkin Ladi', 'Bassa', 'Bokkos', 'Jos East', 'Jos North', 'Jos South', 'Kanam',
    'Kanke', 'Langtang North', 'Langtang South', 'Mangu', 'Mikang', 'Pankshin',
    'Qua’an Pan', 'Riyom', 'Shendam', 'Wase'
  ],
  Rivers: [
    'Abua/Odual', 'Ahoada East', 'Ahoada West', 'Akuku-Toru', 'Andoni', 'Asari-Toru',
    'Bonny', 'Degema', 'Eleme', 'Emuoha', 'Etche', 'Gokana', 'Ikwerre', 'Khana',
    'Obio/Akpor', 'Ogba/Egbema/Ndoni', 'Ogu/Bolo', 'Okrika', 'Omuma', 'Opobo/Nkoro',
    'Oyigbo', 'Port Harcourt', 'Tai'
  ],
  Sokoto: [
    'Binji', 'Bodinga', 'Dange Shuni', 'Gada', 'Goronyo', 'Gudu', 'Gwadabawa', 'Illela',
    'Isa', 'Kebbe', 'Kware', 'Rabah', 'Sabon Birni', 'Shagari', 'Silame', 'Sokoto North',
    'Sokoto South', 'Tambuwal', 'Tangaza', 'Tureta', 'Wamako', 'Wurno', 'Yabo'
  ],
  Taraba: [
    'Ardo Kola', 'Bali', 'Donga', 'Gashaka', 'Gassol', 'Ibi', 'Jalingo', 'Karim Lamido',
    'Kurmi', 'Lau', 'Sardauna', 'Takum', 'Ussa', 'Wukari', 'Yorro', 'Zing'
  ],
  Yobe: [
    'Bade', 'Bursari', 'Damaturu', 'Fika', 'Fune', 'Geidam', 'Gujba', 'Gulani', 'Jakusko',
    'Karasuwa', 'Machina', 'Nangere', 'Nguru', 'Potiskum', 'Tarmuwa', 'Yunusari', 'Yusufari'
  ],
  Zamfara: [
    'Anka', 'Bakura', 'Birnin Magaji/Kiyaw', 'Bukkuyum', 'Bungudu', 'Gummi', 'Gusau',
    'Kaura Namoda', 'Maradun', 'Maru', 'Shinkafi', 'Talata Mafara', 'Chafe', 'Zurmi'
  ]
}

export const nigerianStatesList = Object.keys(nigeriaStatesAndLgas).sort()

export const accreditedInstitutions: string[] = [
  // Prominent Northern & Jigawa/Kano Institutions
  'Federal University Dutse (FUD), Jigawa',
  'Sule Lamido University (SLU), Kafin Hausa, Jigawa',
  'Jigawa State Polytechnic, Dutse',
  'Binyaminu Usman Polytechnic, Hadejia, Jigawa',
  'College of Education, Gumel, Jigawa',
  'Bayero University Kano (BUK), Kano',
  'Kano University of Science & Technology (KUST), Wudil',
  'Yusuf Maitama Sule University, Kano',
  'Kano State Polytechnic, Kano',
  'Federal College of Education, Kano',
  'Federal College of Education (Technical), Bichi',
  'Sa’adatu Rimi University of Education, Kumbotso, Kano',
  'Ahmadu Bello University (ABU), Zaria',
  'Kaduna State University (KASU), Kaduna',
  'Kaduna Polytechnic, Kaduna',
  'Federal College of Education, Zaria',
  'Nuhu Bamalli Polytechnic, Zaria',
  'Air Force Institute of Technology (AFIT), Kaduna',
  'Usmanu Danfodiyo University (UDUS), Sokoto',
  'Shehu Shagari University of Education, Sokoto',
  'Umaru Musa Yar’adua University (UMYU), Katsina',
  'Federal University Dutsin-Ma (FUDMA), Katsina',
  'Hassan Usman Katsina Polytechnic, Katsina',
  'Federal College of Education, Katsina',
  'Federal Polytechnic, Daura, Katsina',
  'Waziri Umaru Federal Polytechnic, Birnin Kebbi',
  'Federal University Birnin Kebbi, Kebbi',
  'Federal University Gusau, Zamfara',
  'Federal Polytechnic, Kaura Namoda, Zamfara',
  'Abubakar Tafawa Balewa University (ATBU), Bauchi',
  'Federal Polytechnic, Bauchi',
  'Modibbo Adama University (MAU), Yola',
  'University of Maiduguri (UNIMAID), Borno',
  'Yobe State University, Damaturu',
  'Federal University Gashua, Yobe',
  'Gombe State University, Gombe',
  'Federal University Kashere, Gombe',
  'University of Abuja (UniAbuja), FCT',
  'Federal University of Technology, Minna',
  'Ibrahim Badamasi Babangida University, Lapai',
  'Federal Polytechnic, Bida',
  'University of Ilorin (UNILORIN), Kwara',
  'Kwara State University, Malete',
  'Federal Polytechnic, Offa, Kwara',
  'Nasarawa State University, Keffi',
  'Federal University Lafia, Nasarawa',
  'University of Jos (UNIJOS), Plateau',

  // Prominent National Universities & Polys
  'University of Lagos (UNILAG), Lagos',
  'Lagos State University (LASU), Lagos',
  'Yaba College of Technology (YABATECH), Lagos',
  'University of Ibadan (UI), Oyo',
  'Obafemi Awolowo University (OAU), Ile-Ife',
  'Federal University of Technology Akure (FUTA), Ondo',
  'University of Benin (UNIBEN), Edo',
  'University of Nigeria, Nsukka (UNN), Enugu',
  'Nnamdi Azikiwe University (UNIZIK), Awka',
  'University of Port Harcourt (UNIPORT), Rivers',
  'University of Calabar (UNICAL), Cross River',
  'University of Uyo (UNIUYO), Akwa Ibom',
  'Other / Foreign / Not Listed'
]

export const degreesAndCertificates: string[] = [
  'Ph.D (Doctor of Philosophy)',
  'M.Ed (Master of Education)',
  'M.Sc (Master of Science)',
  'M.A (Master of Arts)',
  'PGDE (Postgraduate Diploma in Education)',
  'B.Ed (Bachelor of Education)',
  'B.Sc(Ed) / B.A(Ed)',
  'B.Sc (Bachelor of Science)',
  'B.A (Bachelor of Arts)',
  'B.Tech / B.Eng (Bachelor of Technology / Engineering)',
  'LLB / BL (Law / Shari’ah)',
  'HND (Higher National Diploma)',
  'OND / ND (Ordinary National Diploma)',
  'NCE (Nigeria Certificate in Education)',
  'RN / RM (Registered Nurse / Midwife)',
  'Community Health Diploma (CHEW)',
  'SSCE / WAEC / NECO / NABTEB',
  'Federal Ministry of Labour Trade Test (Grade I / II / III)',
  'FSLC (First School Leaving Certificate)',
  'Higher Islamic Studies / Thanawiyyah Certificate',
  'Ijazah / Tahfeez Completion Certificate',
  'Other Professional Certificate'
]

export const globalNationalities: string[] = [
  'Nigerian',
  'Nigerien',
  'Chadian',
  'Cameroonian',
  'Beninese',
  'Ghanaian',
  'Sudanese',
  'Egyptian',
  'Saudi Arabian',
  'Kenyan',
  'British',
  'American',
  'Canadian',
  'Other'
]
