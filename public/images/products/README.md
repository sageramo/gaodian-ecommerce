# 产品图片目录

## 📁 目录说明

这个目录用于存放所有糕点产品的图片。

## 📸 图片命名规范

建议使用以下命名格式：

```
产品拼音-序号.jpg
```

示例：
- `jing-ba-jian-1.jpg` - 京八件第1张图片
- `jing-ba-jian-2.jpg` - 京八件第2张图片
- `lv-da-gun-1.jpg` - 驴打滚第1张图片
- `ai-wo-wo-1.jpg` - 艾窝窝第1张图片

## 🖼️ 图片要求

### 尺寸
- 推荐：800x800 像素（正方形）
- 最小：400x400 像素
- 最大：2000x2000 像素

### 格式
- JPG（推荐，文件小）
- PNG（支持透明背景）
- WebP（现代浏览器支持，文件更小）

### 文件大小
- 推荐：200KB - 500KB
- 最大：1MB

### 图片质量
- 清晰度高
- 光线充足
- 背景干净
- 突出产品特点

## 📋 当前产品图片列表

以下是需要准备的产品图片：

### 京八件礼盒
- [ ] `jing-ba-jian-1.jpg` - 礼盒整体
- [ ] `jing-ba-jian-2.jpg` - 打开后的内部

### 驴打滚
- [ ] `lv-da-gun-1.jpg` - 产品特写

### 艾窝窝
- [ ] `ai-wo-wo-1.jpg` - 产品特写

### 豌豆黄
- [ ] `wan-dou-huang-1.jpg` - 产品特写

## 🎨 拍摄建议

1. **光线**：使用自然光或柔和的灯光
2. **背景**：纯色背景（白色、木纹等）
3. **角度**：正面、45度角、俯视图
4. **细节**：展示产品纹理和特色
5. **摆盘**：可以搭配茶具、餐具增加美感

## 🔄 临时占位图

如果暂时没有产品图片，可以使用以下方式：

### 方式1：使用占位图服务
```javascript
images: [
  'https://via.placeholder.com/800x800?text=产品名称'
]
```

### 方式2：使用默认图片
在此目录下放置一个 `default-pastry.jpg` 作为默认图片。

## 📝 图片优化工具

推荐使用以下工具优化图片：

- **TinyPNG** (https://tinypng.com/) - 在线压缩
- **Squoosh** (https://squoosh.app/) - Google 出品
- **ImageOptim** - Mac 应用
- **RIOT** - Windows 应用

## 💡 示例目录结构

```
public/images/products/
├── README.md
├── jing-ba-jian-1.jpg
├── jing-ba-jian-2.jpg
├── lv-da-gun-1.jpg
├── ai-wo-wo-1.jpg
├── wan-dou-huang-1.jpg
├── gui-hua-gao-1.jpg
├── gui-hua-gao-2.jpg
└── default-pastry.jpg
```

## 🚀 上传图片后

1. 确保图片文件名与 `products.js` 中的路径一致
2. 刷新浏览器查看效果
3. 检查图片是否正常显示
4. 如有问题，查看浏览器控制台的错误信息

---

需要帮助？请参考主目录下的《如何添加糕点产品.md》文档。
