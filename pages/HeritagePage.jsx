import { useTranslation } from 'react-i18next';
import { Typography, Card, Row, Col, Divider, Image } from 'antd';
import { useNavigate } from 'react-router-dom';
import { HeritageType } from '../models/Product';
import './HeritagePage.css';

const { Title, Paragraph } = Typography;

function HeritagePage() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  // Heritage content data with multilingual support
  const heritageContent = [
    {
      id: HeritageType.MAHJONG,
      title: {
        zh: '麻将',
        en: 'Mahjong',
        ja: '麻雀',
      },
      image: 'https://via.placeholder.com/600x400?text=Mahjong',
      content: {
        zh: '麻将是一种源于中国的策略游戏，使用一套144张麻将牌。麻将起源于明朝，至今已有数百年历史。游戏通常由四人进行，通过抓牌、打牌、吃牌、碰牌、杠牌等方式，最终和牌获胜。麻将不仅是一种娱乐活动，更是中国传统文化的重要组成部分，体现了中国人的智慧和策略思维。',
        en: 'Mahjong is a strategy game originating from China, using a set of 144 tiles. Mahjong originated in the Ming Dynasty and has a history of hundreds of years. The game is usually played by four people, through drawing, discarding, chowing, ponging, and konging tiles, ultimately winning by completing a hand. Mahjong is not only an entertainment activity but also an important part of traditional Chinese culture, reflecting Chinese wisdom and strategic thinking.',
        ja: '麻雀は中国発祥の戦略ゲームで、144枚の牌を使用します。麻雀は明朝に起源を持ち、数百年の歴史があります。通常4人でプレイし、牌を引く、捨てる、チー、ポン、カンなどの方法で、最終的に和了して勝利します。麻雀は娯楽活動であるだけでなく、中国の伝統文化の重要な一部であり、中国人の知恵と戦略的思考を反映しています。',
      },
      history: {
        zh: '麻将的历史可以追溯到明朝，相传由明朝的一位官员发明。最初的麻将牌数量较少，经过几百年的发展，逐渐演变成现在的144张牌。麻将在清朝时期广泛流行，并传播到世界各地。',
        en: 'The history of Mahjong can be traced back to the Ming Dynasty, reportedly invented by an official of the Ming Dynasty. The original Mahjong had fewer tiles, and after hundreds of years of development, it gradually evolved into the current 144 tiles. Mahjong became widely popular during the Qing Dynasty and spread around the world.',
        ja: '麻雀の歴史は明朝にまで遡ることができ、明朝の官僚によって発明されたと伝えられています。当初の麻雀は牌の数が少なく、数百年の発展を経て、現在の144枚の牌に進化しました。麻雀は清朝時代に広く普及し、世界中に広まりました。',
      },
    },
    {
      id: HeritageType.GO,
      title: {
        zh: '围棋',
        en: 'Go',
        ja: '囲碁',
      },
      image: 'https://via.placeholder.com/600x400?text=Go',
      content: {
        zh: '围棋是一种策略性两人棋类游戏，起源于中国，至今已有4000多年的历史。围棋使用黑白两色棋子，在19×19的棋盘上进行对弈。游戏的目标是通过占据更多的地盘来获胜。围棋被认为是世界上最复杂的棋类游戏之一，体现了东方哲学中的阴阳平衡和战略智慧。',
        en: 'Go is a strategic two-player board game originating from China, with a history of over 4000 years. Go uses black and white stones, played on a 19×19 board. The goal of the game is to win by occupying more territory. Go is considered one of the most complex board games in the world, reflecting the balance of yin and yang and strategic wisdom in Eastern philosophy.',
        ja: '囲碁は中国発祥の戦略的な二人用ボードゲームで、4000年以上の歴史があります。囲碁は黒と白の石を使用し、19×19の盤上でプレイされます。ゲームの目標は、より多くの領域を占領して勝利することです。囲碁は世界で最も複雑なボードゲームの一つと考えられており、東洋哲学における陰陽のバランスと戦略的知恵を反映しています。',
      },
      history: {
        zh: '围棋起源于中国古代，相传由尧帝发明，用于教育其子丹朱。围棋在春秋战国时期已经广泛流行，并在唐朝时期传入日本和朝鲜。围棋不仅是一种游戏，更是一种艺术和哲学的体现。',
        en: 'Go originated in ancient China, reportedly invented by Emperor Yao to educate his son Danzhu. Go was already widely popular during the Spring and Autumn and Warring States periods, and was introduced to Japan and Korea during the Tang Dynasty. Go is not only a game but also an embodiment of art and philosophy.',
        ja: '囲碁は古代中国に起源を持ち、堯帝が息子の丹朱を教育するために発明したと伝えられています。囲碁は春秋戦国時代にはすでに広く普及しており、唐朝時代に日本と朝鮮に伝わりました。囲碁はゲームであるだけでなく、芸術と哲学の体現でもあります。',
      },
    },
    {
      id: HeritageType.CHESS,
      title: {
        zh: '象棋',
        en: 'Chinese Chess',
        ja: '中国将棋',
      },
      image: 'https://via.placeholder.com/600x400?text=Chinese+Chess',
      content: {
        zh: '象棋是中国传统的棋类游戏，起源于战国时期，至今已有2000多年的历史。象棋使用32枚棋子，分为红黑两方，在9×10的棋盘上进行对弈。游戏的目标是将死对方的将（帅）。象棋体现了中国古代的军事思想和战略智慧，是中国文化的重要组成部分。',
        en: 'Chinese Chess is a traditional Chinese board game, originating from the Warring States period, with a history of over 2000 years. Chinese Chess uses 32 pieces, divided into red and black sides, played on a 9×10 board. The goal of the game is to checkmate the opponent\'s general. Chinese Chess reflects ancient Chinese military thought and strategic wisdom, and is an important part of Chinese culture.',
        ja: '中国将棋は中国の伝統的なボードゲームで、戦国時代に起源を持ち、2000年以上の歴史があります。中国将棋は32個の駒を使用し、赤と黒の2つの陣営に分かれ、9×10の盤上でプレイされます。ゲームの目標は、相手の将軍をチェックメイトすることです。中国将棋は古代中国の軍事思想と戦略的知恵を反映しており、中国文化の重要な一部です。',
      },
      history: {
        zh: '象棋的起源可以追溯到战国时期的"六博"游戏。经过漫长的发展，象棋在宋朝时期基本定型，形成了现在的规则和棋子。象棋在中国民间广泛流行，是重要的文化娱乐活动。',
        en: 'The origin of Chinese Chess can be traced back to the "Liubo" game of the Warring States period. After a long development, Chinese Chess was basically finalized during the Song Dynasty, forming the current rules and pieces. Chinese Chess is widely popular among Chinese people and is an important cultural and entertainment activity.',
        ja: '中国将棋の起源は、戦国時代の「六博」ゲームにまで遡ることができます。長い発展を経て、中国将棋は宋朝時代に基本的に確立され、現在のルールと駒が形成されました。中国将棋は中国の民間で広く普及しており、重要な文化娯楽活動です。',
      },
    },
    {
      id: HeritageType.DOMINOES,
      title: {
        zh: '骨牌',
        en: 'Dominoes',
        ja: 'ドミノ',
      },
      image: 'https://via.placeholder.com/600x400?text=Dominoes',
      content: {
        zh: '骨牌是一种古老的游戏工具，起源于中国宋朝，最初由骨头或象牙制成。骨牌游戏有多种玩法，包括推牌九、天九牌等。骨牌不仅是一种娱乐工具，也是中国传统文化的重要载体，体现了中国人的智慧和创造力。',
        en: 'Dominoes are an ancient gaming tool, originating from the Song Dynasty in China, originally made from bone or ivory. Domino games have various ways to play, including Pai Gow and Tien Gow. Dominoes are not only an entertainment tool but also an important carrier of traditional Chinese culture, reflecting Chinese wisdom and creativity.',
        ja: 'ドミノは古代のゲームツールで、中国の宋朝に起源を持ち、当初は骨や象牙で作られていました。ドミノゲームには、牌九や天九牌など、さまざまな遊び方があります。ドミノは娯楽ツールであるだけでなく、中国の伝統文化の重要な担い手でもあり、中国人の知恵と創造性を反映しています。',
      },
      history: {
        zh: '骨牌在宋朝时期出现，最初用于占卜和游戏。明清时期，骨牌游戏在民间广泛流行，并发展出多种玩法。骨牌后来传入欧洲，演变成现代的多米诺骨牌。',
        en: 'Dominoes appeared during the Song Dynasty, initially used for divination and games. During the Ming and Qing Dynasties, domino games became widely popular among the people, and various ways of playing were developed. Dominoes were later introduced to Europe and evolved into modern dominoes.',
        ja: 'ドミノは宋朝時代に登場し、当初は占いやゲームに使用されていました。明清時代には、ドミノゲームが民間で広く普及し、さまざまな遊び方が発展しました。ドミノは後にヨーロッパに伝わり、現代のドミノに進化しました。',
      },
    },
  ];

  // Get localized content
  const getLocalizedText = (textObj) => {
    const lang = i18n.language;
    return textObj[lang] || textObj.zh;
  };

  // Handle click on heritage card to navigate to products
  const handleCardClick = (heritageType) => {
    navigate(`/products?type=${heritageType}`);
  };

  return (
    <div className="heritage-page">
      <div className="heritage-header">
        <Title level={1}>{t('heritage.title')}</Title>
        <Paragraph className="heritage-intro">
          {i18n.language === 'zh' && '探索中国传统游戏的文化魅力，了解每一款糕点背后的非遗故事'}
          {i18n.language === 'en' && 'Explore the cultural charm of traditional Chinese games and learn the intangible cultural heritage stories behind each pastry'}
          {i18n.language === 'ja' && '中国の伝統的なゲームの文化的魅力を探求し、各お菓子の背後にある無形文化遺産の物語を学びましょう'}
        </Paragraph>
      </div>

      <Row gutter={[32, 32]}>
        {heritageContent.map((heritage) => (
          <Col xs={24} lg={12} key={heritage.id}>
            <Card
              hoverable
              className="heritage-card"
              cover={
                <Image
                  alt={getLocalizedText(heritage.title)}
                  src={heritage.image}
                  preview={false}
                  className="heritage-image"
                />
              }
              onClick={() => handleCardClick(heritage.id)}
            >
              <Title level={3}>{getLocalizedText(heritage.title)}</Title>
              
              <Divider orientation="left">
                {i18n.language === 'zh' && '文化介绍'}
                {i18n.language === 'en' && 'Cultural Introduction'}
                {i18n.language === 'ja' && '文化紹介'}
              </Divider>
              <Paragraph className="heritage-content">
                {getLocalizedText(heritage.content)}
              </Paragraph>

              <Divider orientation="left">
                {i18n.language === 'zh' && '历史渊源'}
                {i18n.language === 'en' && 'Historical Origin'}
                {i18n.language === 'ja' && '歴史的起源'}
              </Divider>
              <Paragraph className="heritage-history">
                {getLocalizedText(heritage.history)}
              </Paragraph>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default HeritagePage;
