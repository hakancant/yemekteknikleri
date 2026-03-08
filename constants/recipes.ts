export interface Recipe {
  id: number;
  name: string;
  category: 'et' | 'tavuk' | 'balik' | 'sebze';
  time: string;
  difficulty: 'Kolay' | 'Orta' | 'Zor';
  ingredients: string[];
  instructions: string[];
  emoji: string;
}

export const recipes: Recipe[] = [
  // ET YEMEKLERİ (5 tarif)
  {
    id: 1,
    name: 'Kırmızı Et Kavurma',
    category: 'et',
    time: '45 dk',
    difficulty: 'Orta',
    emoji: '🥩',
    ingredients: [
      '500g dana kuşbaşı eti',
      '2 adet soğan',
      '3 adet yeşil biber',
      '2 yemek kaşığı domates salçası',
      '1 çay kaşığı karabiber',
      '1 çay kaşığı kırmızı toz biber',
      'Yarım çay bardağı sıcak su',
      'Yeterince zeytinyağı'
    ],
    instructions: [
      'Etleri yıkayıp süzün.',
      'Tencereye az yağ koyup etleri suyunu salıp çekene kadar kavurun.',
      'Doğranmış soğanları ekleyip 2-3 dakika kavurun.',
      'Salça ve baharatları ekleyip karıştırın.',
      'Sıcak suyu ilave edip kapağı kapalı şekilde 20 dakika pişirin.',
      'Doğranmış biberleri ekleyip 5 dakika daha pişirin.'
    ]
  },
  {
    id: 2,
    name: 'Yahnisi',
    category: 'et',
    time: '90 dk',
    difficulty: 'Kolay',
    emoji: '🍲',
    ingredients: [
      '500g dana eti',
      '2 adet patates',
      '2 adet havuç',
      '1 adet soğan',
      '1 yemek kaşığı salça',
      '5 su bardağı sıcak su',
      'Tuz, karabiber'
    ],
    instructions: [
      'Etleri yıkayıp küp doğrayın.',
      'Sebzeleri doğrayın.',
      'Tencereye etleri koyup suyunu çekene kadar kavurun.',
      'Soğanları ekleyin, ardından salça ve baharatları ilave edin.',
      'Sıcak suyu ekleyip kaynayınca altı kısın.',
      '20 dakika sonra patates ve havuçları ekleyin.',
      'Kısık ateşte 40 dakika daha pişirin.'
    ]
  },
  {
    id: 3,
    name: 'Izgara Köfte',
    category: 'et',
    time: '30 dk',
    difficulty: 'Kolay',
    emoji: '🍖',
    ingredients: [
      '500g kıyma',
      '1 adet soğan',
      '1 dilim ekmek içi',
      '1 adet yumurta',
      '1 çay kaşığı tuz',
      '1 çay kaşığı karabiber',
      '1 çay kaşığı kimyon',
      '1 çay kaşığı kırmızı toz biber'
    ],
    instructions: [
      'Soğanı rendeleyin.',
      'Ekmek içini ılık suda ıslatıp sıkın.',
      'Tüm malzemeleri karıştırıp yoğurun.',
      'Elden köfteleri şekillendirin.',
      'Izgara veya tavada 4-5 dakika pişirin.'
    ]
  },
  {
    id: 4,
    name: 'Köfte',
    category: 'et',
    time: '35 dk',
    difficulty: 'Orta',
    emoji: '🥙',
    ingredients: [
      '600g kıyma',
      '2 adet soğan',
      '2 dilim ekmek',
      '2 adet yumurta',
      '1 bağ maydanoz',
      'Tuz, karabiber, kimyon'
    ],
    instructions: [
      'Soğanları rendeleyin.',
      'Maydanozu ince kıyın.',
      'Ekmekleri suda ıslatıp sıkın.',
      'Tüm malzemeleri yoğurun.',
      'Köfteleri şekillendirip buzdolabında 15 dk bekletin.',
      'Tavada az yağda pişirin.'
    ]
  },
  {
    id: 5,
    name: 'Kuşbaşı Pirinç Pilavı',
    category: 'et',
    time: '50 dk',
    difficulty: 'Orta',
    emoji: '🍚',
    ingredients: [
      '300g kuşbaşı eti',
      '1.5 su bardağı pirinç',
      '2 su bardağı sıcak su',
      '1 adet soğan',
      '2 yemek kaşığı tereyağı',
      'Tuz, karabiber'
    ],
    instructions: [
      'Etleri tencerede kavurun.',
      'Soğanı ekleyip biraz daha kavurun.',
      'Pirinçleri yıkayıp ekleyin.',
      'Sıcak suyu ve baharatları ilave edin.',
      'Kapağı kapalı şekilde suyunu çekene kadar pişirin.'
    ]
  },

  // TAVUK YEMEKLERİ (5 tarif)
  {
    id: 6,
    name: 'Tavuk Sote',
    category: 'tavuk',
    time: '30 dk',
    difficulty: 'Kolay',
    emoji: '🍗',
    ingredients: [
      '400g tavuk göğsü',
      '2 adet dolmalık biber',
      '1 adet soğan',
      '2 diş sarımsak',
      '2 yemek kaşığı zeytinyağı',
      'Tuz, karabiber, kekik'
    ],
    instructions: [
      'Tavuğu küp doğrayın.',
      'Biber ve soğanı doğrayın.',
      'Tavada tavukları pişirin.',
      'Sebzeleri ekleyin.',
      'Baharatları ilave edip 5 dakika daha pişirin.'
    ]
  },
  {
    id: 7,
    name: 'Tavuk Kapama',
    category: 'tavuk',
    time: '45 dk',
    difficulty: 'Orta',
    emoji: '🥘',
    ingredients: [
      '1 adet bütün tavuk',
      '3 su bardağı süt',
      '2 yemek kaşığı un',
      '2 yemek kaşığı tereyağı',
      'Tuz'
    ],
    instructions: [
      'Tavuku tencereye alın.',
      'Süt, un, tuz ve tereyağını ekleyin.',
      'Kapağı kapalı olarak orta ateşte pişirin.',
      'Arada sırada çevirin.',
      'Sosu koyulaşıp tavuk pişene kadar devam edin.'
    ]
  },
  {
    id: 8,
    name: 'Tavuk Izgara',
    category: 'tavuk',
    time: '25 dk',
    difficulty: 'Kolay',
    emoji: '🍢',
    ingredients: [
      '4 adet tavuk but',
      '3 yemek kaşığı zeytinyağı',
      '1 limon',
      '2 diş sarımsak',
      'Tuz, kekik, karabiber'
    ],
    instructions: [
      'Tavukları yıkayın.',
      'Zeytinyağı, limon suyu ve baharatları karıştırın.',
      'Tavukları marine edin 15 dk bekletin.',
      'Izgara üzerinde 20 dakika çevirerek pişirin.'
    ]
  },
  {
    id: 9,
    name: 'Tavuk Şinitzel',
    category: 'tavuk',
    time: '30 dk',
    difficulty: 'Orta',
    emoji: '🍽️',
    ingredients: [
      '4 adet tavuk göğsü',
      '1 su bardağı galeta unu',
      '2 adet yumurta',
      '1 su bardağı un',
      'Tuz, karabiber',
      'Kızartma yağı'
    ],
    instructions: [
      'Tavukları bıçakla inceltin.',
      'Un, yumurta ve galeta ununu ayrı ayrı kaseye koyun.',
      'Tavukları önce una, sonra yumurtaya, sonra galetaya bulayın.',
      'Kızgın yağda iki yüzünü de kızarana kadar pişirin.'
    ]
  },
  {
    id: 10,
    name: 'Tavuk Dürüm',
    category: 'tavuk',
    time: '35 dk',
    difficulty: 'Kolay',
    emoji: '🌯',
    ingredients: [
      '300g tavuk göğsü',
      '4 adet lavaş ekmeği',
      '2 adet domates',
      '2 adet salatalık',
      'Marul',
      'Yoğurt',
      'Tuz, karabiber'
    ],
    instructions: [
      'Tavukları doğrayıp baharatlı tavada pişirin.',
      'Sebzeleri dilimleyin.',
      'Lavaşın içine yoğurt sürün.',
      'Tavuk ve sebzeleri ekleyin.',
      'Rulo yapıp servedin.'
    ]
  },

  // BALIK YEMEKLERİ (5 tarif)
  {
    id: 11,
    name: 'Izgara Levrek',
    category: 'balik',
    time: '30 dk',
    difficulty: 'Kolay',
    emoji: '🐟',
    ingredients: [
      '1 adet levrek',
      '1 limon',
      'Zeytinyağı',
      'Tuz, kekik',
      '2 diş sarımsak'
    ],
    instructions: [
      'Balığı yıkayın ve kurulayın.',
      'Üzerine çizik atın.',
      'Zeytinyağı, limon suyu ve baharatları karıştırıp sürün.',
      'Izgara üzerinde her yüzü 10 dakika pişirin.'
    ]
  },
  {
    id: 12,
    name: 'Balık Buğulama',
    category: 'balik',
    time: '35 dk',
    difficulty: 'Orta',
    emoji: '🥘',
    ingredients: [
      '1 adet çupra veya levrek',
      '1 adet soğan',
      '2 adet domates',
      'Yeşil biber',
      '1 limon',
      'Yarım çay bardağı zeytinyağı',
      '1 su bardağı sıcak su'
    ],
    instructions: [
      'Balığı yıkayın.',
      'Tencereye soğan, biber ve domatesleri dizin.',
      'Balığı üzerine koyun.',
      'Limon dilimleri ekleyin.',
      'Zeytinyağı ve suyu ekleyip kapağı kapalı pişirin.'
    ]
  },
  {
    id: 13,
    name: 'Midye Dolma',
    category: 'balik',
    time: '60 dk',
    difficulty: 'Zor',
    emoji: '🦪',
    ingredients: [
      '1 kg midye',
      '1 su bardağı pirinç',
      '1 adet soğan',
      '2 yemek kaşığı domates salçası',
      '1 demet maydanoz',
      'Tuz, karabiber, kırmızı biber',
      '2 yemek kaşığı zeytinyağı'
    ],
    instructions: [
      'Midyeleri yıkayıp açılmasını sağlayın.',
      'Soğanı kavurup pirinci ekleyin.',
      'Salça ve baharatları ilave edin.',
      'Maydanozu ekleyip karıştırın.',
      'Her midyeye harçtan koyun.',
      'Geniş tencereye dizip su ekleyip 20 dakika pişirin.'
    ]
  },
  {
    id: 14,
    name: 'Kalamar Tava',
    category: 'balik',
    time: '25 dk',
    difficulty: 'Orta',
    emoji: '🦑',
    ingredients: [
      '500g kalamar',
      '1 su bardağı un',
      '2 adet yumurta',
      '1 limon',
      'Kızartma yağı'
    ],
    instructions: [
      'Kalamarları halka şeklinde doğrayın.',
      'Yumurtayı çırpın.',
      'Kalamarları önce una sonra yumurtaya bulayın.',
      'Kızgın yağda kızarana kadar pişirin.',
      'Limonla servedin.'
    ]
  },
  {
    id: 15,
    name: 'Hamsi Tava',
    category: 'balik',
    time: '30 dk',
    difficulty: 'Kolay',
    emoji: '🐠',
    ingredients: [
      '500g hamsi',
      '1 su bardağı mısır unu',
      'Tuz',
      'Kızartma yağı'
    ],
    instructions: [
      'Hamsileri temizleyip yıkayın.',
      'Kurulayın.',
      'Mısır ununa tuz ekleyip karıştırın.',
      'Hamsileri una bulayın.',
      'Kızgın yağda kızarana kadar pişirin.'
    ]
  },

  // SEBZE YEMEKLERİ (5 tarif)
  {
    id: 16,
    name: 'Imam Bayıldı',
    category: 'sebze',
    time: '45 dk',
    difficulty: 'Orta',
    emoji: '🍆',
    ingredients: [
      '4 adet patlıcan',
      '2 adet soğan',
      '3 diş sarımsak',
      '2 adet domates',
      'Yeşil biber',
      'Yarım çay bardağı zeytinyağı',
      'Tuz'
    ],
    instructions: [
      'Patlıcanları şerit kesin.',
      'Tavada az yağda yumuşatın.',
      'Soğan ve sarımsakları kavurun.',
      'Domatesleri ekleyin.',
      'Patlıcanları dizip harcı üzerine koyun.',
      'Zeytinyağı ekleyip kısık ateşte pişirin.'
    ]
  },
  {
    id: 17,
    name: 'Menemen',
    category: 'sebze',
    time: '20 dk',
    difficulty: 'Kolay',
    emoji: '🍳',
    ingredients: [
      '3 adet domates',
      '2 adet yeşil biber',
      '2 adet yumurta',
      '2 yemek kaşığı zeytinyağı',
      'Tuz, karabiber'
    ],
    instructions: [
      'Biberleri doğrayıp tavada kavurun.',
      'Küp doğradığınız domatesleri ekleyin.',
      'Domatesler yumuşayana kadar pişirin.',
      'Yumurtaları kırıp karıştırın.',
      '2-3 dakika pişirip ateşten alın.'
    ]
  },
  {
    id: 18,
    name: 'Kabak Mücveri',
    category: 'sebze',
    time: '30 dk',
    difficulty: 'Kolay',
    emoji: '🥒',
    ingredients: [
      '3 adet kabak',
      '1 adet soğan',
      '2 adet yumurta',
      '3 yemek kaşığı un',
      '1 demet maydanoz',
      'Tuz, karabiber',
      'Kızartma yağı'
    ],
    instructions: [
      'Kabakları rendeleyin.',
      'Suyunu sıkın.',
      'Diğer malzemeleri ekleyip karıştırın.',
      'Kızgın tavada kaşıkla çevirerek pişirin.'
    ]
  },
  {
    id: 19,
    name: 'Turşu',
    category: 'sebze',
    time: '15 dk',
    difficulty: 'Kolay',
    emoji: '🥬',
    ingredients: [
      '1 kg sebze (salatalık, havuç, karnabahar)',
      '1 litre su',
      '1 su bardağı sirke',
      '3 yemek kaşığı tuz',
      '1 yemek kaşığı şeker'
    ],
    instructions: [
      'Sebzeleri yıkayıp kurutun.',
      'Suyu kaynatıp tuzu ekleyin, soğutun.',
      'Sirkeyi ve şekeri ekleyin.',
      'Kavanoza sebzeleri dizin.',
      'Turşu suyunu üzerine dökün.',
      'Kapağını kapatıp 1 hafta bekletin.'
    ]
  },
  {
    id: 20,
    name: 'Kuru Fasulye',
    category: 'sebze',
    time: '60 dk',
    difficulty: 'Kolay',
    emoji: '🫘',
    ingredients: [
      '2 su bardağı kuru fasulye',
      '1 adet soğan',
      '1 yemek kaşığı domates salçası',
      '1 adet domates',
      'Tuz, kırmızı toz biber'
    ],
    instructions: [
      'Fasulyeleri bir gece önceden ıslatın.',
      'Yeni suyla haşlayın.',
      'Soğanı kavurup salça ekleyin.',
      'Domatesi ilave edin.',
      'Haşlanmış fasulyeleri ekleyin.',
      'Kısık ateşte 40 dakika pişirin.'
    ]
  }
];

export const categories = [
  { id: 'et', name: 'Et Yemekleri', color: '#E74C3C', emoji: '🥩' },
  { id: 'tavuk', name: 'Tavuk Yemekleri', color: '#F39C12', emoji: '🍗' },
  { id: 'balik', name: 'Balık Yemekleri', color: '#3498DB', emoji: '🐟' },
  { id: 'sebze', name: 'Sebze Yemekleri', color: '#27AE60', emoji: '🥦' },
];

export function getRecipesByCategory(categoryId: string): Recipe[] {
  return recipes.filter(recipe => recipe.category === categoryId);
}

export function getRecipeById(id: number): Recipe | undefined {
  return recipes.find(recipe => recipe.id === id);
}
