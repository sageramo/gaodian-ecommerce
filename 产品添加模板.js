/**
 * 🎂 京式糕点产品添加模板
 * 
 * 复制下面的模板，填写你的产品信息，然后粘贴到 src/data/products.js 文件的 beijingStylePastries 数组中
 */

// ============================================
// 📋 产品模板（复制这个）
// ============================================
{
  id: 'pastry-XXX',  // ⚠️ 修改为唯一ID，如：pastry-005
  
  // 产品名称（三种语言）
  name: {
    zh: '产品中文名',      // 必填
    en: 'Product Name',   // 选填
    ja: '製品名'          // 选填
  },
  
  // 产品描述
  description: {
    zh: '这是产品的详细描述...',
    en: 'This is the product description...',
    ja: 'これは製品の説明です...'
  },
  
  price: 88.00,        // 价格（人民币）
  stock: 100,          // 库存数量
  
  // 产品图片（可以多张）
  images: [
    '/images/products/your-product-1.jpg',
    '/images/products/your-product-2.jpg'
  ],
  
  // 产品分类（选择一个）
  // 'beijing-classic' | 'festival-special' | 'gift-box' | 'daily-snack'
  category: 'beijing-classic',
  
  heritageType: 'beijing-pastry',  // 非遗类型
  
  // 非遗故事
  heritageStory: {
    zh: '这个糕点的历史故事...',
    en: 'The heritage story...',
    ja: '遺産ストーリー...'
  },
  
  // 产品规格
  specifications: {
    weight: '500g',              // 重量
    shelfLife: '30天',           // 保质期
    ingredients: '面粉、糖等',    // 配料
    storage: '常温避光保存'       // 储存方式
  }
},

// ============================================
// 🌟 常见京式糕点示例
// ============================================

// 示例1：桂花糕
{
  id: 'pastry-005',
  name: {
    zh: '桂花糕',
    en: 'Osmanthus Cake',
    ja: 'キンモクセイケーキ'
  },
  description: {
    zh: '选用优质桂花，香甜软糯，入口即化',
    en: 'Made with premium osmanthus flowers, sweet and soft',
    ja: '上質なキンモクセイを使用、甘くて柔らかい'
  },
  price: 45.00,
  stock: 80,
  images: [
    '/images/products/gui-hua-gao-1.jpg'
  ],
  category: 'beijing-classic',
  heritageType: 'beijing-pastry',
  heritageStory: {
    zh: '桂花糕是北京传统名点，始于明朝，以桂花入馔，香气扑鼻。',
    en: 'Osmanthus cake is a traditional Beijing delicacy dating back to the Ming Dynasty.',
    ja: 'キンモクセイケーキは明朝から続く北京の伝統的なお菓子です。'
  },
  specifications: {
    weight: '400g',
    shelfLife: '15天（冷藏）',
    ingredients: '糯米粉、桂花、白糖、蜂蜜',
    storage: '冷藏保存'
  }
},

// 示例2：萨其马
{
  id: 'pastry-006',
  name: {
    zh: '萨其马',
    en: 'Sachima',
    ja: 'サチマ'
  },
  description: {
    zh: '满族传统糕点，香甜酥软，层次分明',
    en: 'Traditional Manchu pastry, sweet and crispy with distinct layers',
    ja: '満州族の伝統的なお菓子、甘くてサクサク'
  },
  price: 32.00,
  stock: 120,
  images: [
    '/images/products/sa-qi-ma-1.jpg'
  ],
  category: 'beijing-classic',
  heritageType: 'beijing-pastry',
  heritageStory: {
    zh: '萨其马源于满族，清代传入北京，成为京城名点。',
    en: 'Sachima originated from the Manchu people and became popular in Beijing during the Qing Dynasty.',
    ja: 'サチマは満州族に起源を持ち、清朝時代に北京で人気になりました。'
  },
  specifications: {
    weight: '300g',
    shelfLife: '45天',
    ingredients: '面粉、鸡蛋、白糖、芝麻',
    storage: '常温密封保存'
  }
},

// 示例3：糖火烧
{
  id: 'pastry-007',
  name: {
    zh: '糖火烧',
    en: 'Sugar Fire Cake',
    ja: '砂糖火焼き'
  },
  description: {
    zh: '老北京传统小吃，外酥里嫩，甜而不腻',
    en: 'Traditional Beijing snack, crispy outside and tender inside',
    ja: '伝統的な北京のスナック、外はサクサク、中はしっとり'
  },
  price: 28.00,
  stock: 90,
  images: [
    '/images/products/tang-huo-shao-1.jpg'
  ],
  category: 'daily-snack',
  heritageType: 'beijing-pastry',
  heritageStory: {
    zh: '糖火烧是老北京传统小吃，因烤制时加糖而得名。',
    en: 'Sugar Fire Cake is named after the sugar added during baking.',
    ja: '砂糖火焼きは焼く際に砂糖を加えることから名付けられました。'
  },
  specifications: {
    weight: '250g',
    shelfLife: '5天',
    ingredients: '面粉、红糖、芝麻酱',
    storage: '常温保存，尽快食用'
  }
},

// 示例4：中秋月饼礼盒
{
  id: 'pastry-008',
  name: {
    zh: '京式月饼礼盒',
    en: 'Beijing-Style Mooncake Gift Box',
    ja: '北京スタイル月餅ギフトボックス'
  },
  description: {
    zh: '中秋佳节特供，多种口味，精美礼盒装',
    en: 'Mid-Autumn Festival special, multiple flavors in exquisite gift box',
    ja: '中秋節特別、複数の味、精巧なギフトボックス'
  },
  price: 188.00,
  stock: 40,
  images: [
    '/images/products/yue-bing-1.jpg',
    '/images/products/yue-bing-2.jpg'
  ],
  category: 'festival-special',
  heritageType: 'beijing-pastry',
  heritageStory: {
    zh: '京式月饼以自来红、自来白最为著名，是中秋节的传统美食。',
    en: 'Beijing-style mooncakes, especially Zilai Red and Zilai White, are traditional Mid-Autumn Festival delicacies.',
    ja: '北京スタイルの月餅、特に自来紅と自来白は、中秋節の伝統的な美味です。'
  },
  specifications: {
    weight: '800g',
    shelfLife: '60天',
    ingredients: '面粉、豆沙、核桃、冰糖',
    storage: '常温避光保存'
  }
},

// ============================================
// 📝 快速参考
// ============================================

/*
产品分类 (category):
- 'beijing-classic'    京式经典
- 'festival-special'   节令糕点
- 'gift-box'          礼盒装
- 'daily-snack'       日常小吃

常见京式糕点名称:
- 京八件、驴打滚、艾窝窝、豌豆黄
- 桂花糕、萨其马、糖火烧、糖耳朵
- 面茶、茶汤、炸糕、麻团
- 枣泥酥、核桃酥、杏仁酥
- 自来红、自来白（月饼）

价格参考:
- 小吃类: 20-50元
- 经典糕点: 50-100元
- 礼盒装: 100-200元
- 高端礼盒: 200元以上

保质期参考:
- 新鲜糕点: 3-7天（需冷藏）
- 常温糕点: 15-30天
- 密封包装: 30-60天
*/

// ============================================
// 🚀 使用步骤
// ============================================

/*
1. 复制上面的产品模板
2. 修改所有字段为你的产品信息
3. 确保 id 是唯一的（如 pastry-009, pastry-010...）
4. 准备产品图片并放到 public/images/products/ 目录
5. 打开 src/data/products.js 文件
6. 在 beijingStylePastries 数组末尾添加你的产品
7. 保存文件并刷新浏览器查看效果
*/
