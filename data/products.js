/**
 * 糕点产品数据配置
 * 
 * 在这里添加你的京式糕点产品
 * 每个产品包含：
 * - id: 唯一标识
 * - name: 产品名称（中英文）
 * - description: 产品描述
 * - price: 价格
 * - images: 产品图片（可以是本地路径或网络URL）
 * - category: 分类（京式糕点类型）
 * - heritageStory: 非遗故事
 * - specifications: 规格参数
 */

export const beijingStylePastries = [
  {
    id: 'pastry-001',
    name: {
      zh: '京八件礼盒',
      en: 'Beijing Eight Pieces Gift Box',
      ja: '北京八件ギフトボックス'
    },
    description: {
      zh: '传统京式糕点，八种口味，精美礼盒装。包含太师饼、枣花酥、麻饼等经典品种。',
      en: 'Traditional Beijing-style pastries with eight flavors in an exquisite gift box.',
      ja: '伝統的な北京スタイルのお菓子、8種類の味、精巧なギフトボックス入り。'
    },
    price: 128.00,
    stock: 50,
    images: [
      '/images/products/jing-ba-jian-1.jpg',
      '/images/products/jing-ba-jian-2.jpg'
    ],
    category: 'beijing-classic',
    heritageType: 'beijing-pastry',
    heritageStory: {
      zh: '京八件是北京传统名点，始于清代宫廷，由八种不同口味的糕点组成，象征吉祥如意。',
      en: 'Beijing Eight Pieces originated from the Qing Dynasty imperial court, consisting of eight different flavored pastries symbolizing good fortune.',
      ja: '北京八件は清朝の宮廷から始まった伝統的な名菓で、8種類の異なる味のお菓子で構成され、吉祥を象徴しています。'
    },
    specifications: {
      weight: '500g',
      shelfLife: '30天',
      ingredients: '小麦粉、白糖、食用油、芝麻、核桃、红枣等',
      storage: '常温避光保存'
    }
  },
  {
    id: 'pastry-002',
    name: {
      zh: '驴打滚',
      en: 'Lv Da Gun (Rolling Donkey)',
      ja: 'ロバのローリング'
    },
    description: {
      zh: '老北京传统小吃，外裹黄豆粉，内馅红豆沙，软糯香甜。',
      en: 'Traditional Beijing snack coated with soybean powder and filled with red bean paste.',
      ja: '伝統的な北京のスナック、きな粉をまぶし、あんこを詰めた柔らかくて甘いお菓子。'
    },
    price: 38.00,
    stock: 100,
    images: [
      '/images/products/lv-da-gun-1.jpg'
    ],
    category: 'beijing-classic',
    heritageType: 'beijing-pastry',
    heritageStory: {
      zh: '驴打滚是老北京传统小吃，因制作时在黄豆粉中滚动而得名，已有200多年历史。',
      en: 'Named after its rolling motion in soybean powder during preparation, this snack has over 200 years of history.',
      ja: 'きな粉の中で転がして作ることから名付けられ、200年以上の歴史があります。'
    },
    specifications: {
      weight: '300g',
      shelfLife: '3天（冷藏）',
      ingredients: '糯米粉、黄豆粉、红豆沙、白糖',
      storage: '冷藏保存'
    }
  },
  {
    id: 'pastry-003',
    name: {
      zh: '艾窝窝',
      en: 'Ai Wo Wo (Glutinous Rice Cake)',
      ja: 'アイウォウォ'
    },
    description: {
      zh: '清真风味糕点，糯米外皮，内馅芝麻、核桃、瓜子仁等，口感软糯香甜。',
      en: 'Halal-style pastry with glutinous rice exterior and sesame, walnut filling.',
      ja: 'ハラールスタイルのお菓子、もち米の外皮にゴマ、クルミの餡入り。'
    },
    price: 42.00,
    stock: 80,
    images: [
      '/images/products/ai-wo-wo-1.jpg'
    ],
    category: 'beijing-classic',
    heritageType: 'beijing-pastry',
    heritageStory: {
      zh: '艾窝窝是明代宫廷小吃，因其洁白如雪、形似窝窝而得名，深受皇室喜爱。',
      en: 'A Ming Dynasty imperial snack, named for its snow-white appearance and nest-like shape.',
      ja: '明代の宮廷スナックで、雪のように白く、巣のような形から名付けられました。'
    },
    specifications: {
      weight: '350g',
      shelfLife: '5天（冷藏）',
      ingredients: '糯米、芝麻、核桃、瓜子仁、白糖',
      storage: '冷藏保存'
    }
  },
  {
    id: 'pastry-004',
    name: {
      zh: '豌豆黄',
      en: 'Wan Dou Huang (Pea Cake)',
      ja: 'エンドウ豆ケーキ'
    },
    description: {
      zh: '宫廷御点，选用优质白豌豆，口感细腻，清甜不腻。',
      en: 'Imperial court delicacy made from premium white peas, delicate and refreshing.',
      ja: '宮廷の御菓子、上質な白エンドウ豆を使用、繊細で爽やかな味わい。'
    },
    price: 35.00,
    stock: 60,
    images: [
      '/images/products/wan-dou-huang-1.jpg'
    ],
    category: 'beijing-classic',
    heritageType: 'beijing-pastry',
    heritageStory: {
      zh: '豌豆黄是清宫御膳房的传统小吃，慈禧太后尤为喜爱，后传入民间成为京城名点。',
      en: 'A traditional snack from the Qing imperial kitchen, especially favored by Empress Dowager Cixi.',
      ja: '清朝の宮廷厨房の伝統的なスナックで、西太后が特に好んだお菓子です。'
    },
    specifications: {
      weight: '300g',
      shelfLife: '7天（冷藏）',
      ingredients: '白豌豆、白糖、琼脂',
      storage: '冷藏保存'
    }
  }
];

/**
 * 糕点分类配置
 */
export const pastryCategories = {
  'beijing-classic': {
    zh: '京式经典',
    en: 'Beijing Classic',
    ja: '北京クラシック'
  },
  'festival-special': {
    zh: '节令糕点',
    en: 'Festival Special',
    ja: '季節の特別'
  },
  'gift-box': {
    zh: '礼盒装',
    en: 'Gift Box',
    ja: 'ギフトボックス'
  },
  'daily-snack': {
    zh: '日常小吃',
    en: 'Daily Snack',
    ja: '日常スナック'
  }
};

/**
 * 获取所有产品
 */
export const getAllProducts = () => {
  return beijingStylePastries;
};

/**
 * 根据ID获取产品
 */
export const getProductById = (id) => {
  return beijingStylePastries.find(product => product.id === id);
};

/**
 * 根据分类获取产品
 */
export const getProductsByCategory = (category) => {
  return beijingStylePastries.filter(product => product.category === category);
};

/**
 * 搜索产品
 */
export const searchProducts = (keyword, language = 'zh') => {
  if (!keyword) return []; // 处理空搜索词
  
  const lowerKeyword = keyword.toLowerCase();
  
  return beijingStylePastries.filter(product => {
    // 使用 ?. 防止因为字段缺失导致的报错
    const name = product.name?.[language]?.toLowerCase() || '';
    const description = product.description?.[language]?.toLowerCase() || '';
    
    return name.includes(lowerKeyword) || description.includes(lowerKeyword);
  });
};