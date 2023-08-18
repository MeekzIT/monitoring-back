"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Items", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      p0: Sequelize.INTEGER, // 1-moyka, 2-cux
      access: Sequelize.BOOLEAN,
      p1: Sequelize.INTEGER, // 1056,
      p2: Sequelize.INTEGER, // ownerId
      p3: Sequelize.BOOLEAN, // online te offline
      p4: Sequelize.INTEGER, // Moyki hamary
      p5: Sequelize.INTEGER, // M1-i hamari takaynelutyuny
      p6: Sequelize.INTEGER, // hayastan 3001 (kartoshki id owneri hamar #1)
      p7: Sequelize.STRING, // hayastan 0 (kartoshki id owneri hamar #2)
      p8: Sequelize.STRING, // langId heto stugvi ete 0=>ruseren
      p9: Sequelize.INTEGER, // 1|0 kam stop kam standart
      p10: Sequelize.STRING, // zri kartochki chap (or` 500dram)
      p11: Sequelize.INTEGER, // kopeki tesaky
      p12: Sequelize.STRING, // toxtpoxi tesaky
      p13: Sequelize.STRING, // bankayini tesaky
      p14: Sequelize.STRING, // kopeki qanak obshi kopeki tivy  CoinCount*CoinNominal aktual (karanq 0acnenq)
      p15: Sequelize.STRING, //tuxt qanak obshi tuxt tivy  BillCount*BillNominal  aktual  (karanq 0acnenq)
      p16: Sequelize.STRING, // qarti obshi tivy CashLessCount*CashLessNominal aktual (karanq 0acnenq)
      p17: Sequelize.STRING, // CoinCountTotal*CoinNominal chzroyacacf
      p18: Sequelize.STRING, //tuxy BillCountTotal*BillNominal
      p19: Sequelize.STRING, //qartov CashLessCountTotal*CashLessNominal
      p20: Sequelize.STRING, // kuroky toxcelu heto matory anjatvelu jamanakahatvac
      p21: Sequelize.STRING, // 1 rejimi tevoxutyun yst CoinNominal
      p22: Sequelize.STRING, // 2 rejimi tevoxutyun yst CoinNominal
      p23: Sequelize.STRING, // 3 rejimi tevoxutyun yst CoinNominal
      p24: Sequelize.STRING, // 4 rejimi tevoxutyun yst CoinNominal
      p25: Sequelize.STRING, // 5 rejimi tevoxutyun yst CoinNominal
      p26: Sequelize.STRING, // 6 rejimi tevoxutyun yst CoinNominal
      p27: Sequelize.STRING, // Rejimi anvanum 0-16
      p28: Sequelize.STRING, // Rejimi anvanum
      p29: Sequelize.STRING, // Rejimi anvanum
      p30: Sequelize.STRING, // Rejimi anvanum
      p31: Sequelize.STRING, // Rejimi anvanum
      p32: Sequelize.STRING, // Rejimi anvanum
      p33: Sequelize.STRING, // guyni hamaranishy 15 1y verev 5y nerqev 0-6 amen meky
      p34: Sequelize.STRING, // guyni hamaranishy 15 1y verev 5y nerqev
      p35: Sequelize.STRING, // guyni hamaranishy 15 1y verev 5y nerqev
      p36: Sequelize.STRING, // guyni hamaranishy 15 1y verev 5y nerqev
      p37: Sequelize.STRING, // guyni hamaranishy 15 1y verev 5y nerqev
      p38: Sequelize.STRING, // guyni hamaranishy 15 1y verev 5y nerqev
      p39: Sequelize.STRING, // rejimi ogtagorcman jamanak yst ropeneri (0 acman hnaravorutyamb)
      p40: Sequelize.STRING, // rejimi ogtagorcman jamanak yst ropeneri (0 acman hnaravorutyamb)
      p41: Sequelize.STRING, // rejimi ogtagorcman jamanak yst ropeneri (0 acman hnaravorutyamb)
      p42: Sequelize.STRING, // rejimi ogtagorcman jamanak yst ropeneri (0 acman hnaravorutyamb)
      p43: Sequelize.STRING, // rejimi ogtagorcman jamanak yst ropeneri (0 acman hnaravorutyamb)
      p44: Sequelize.STRING, // rejimi ogtagorcman jamanak yst ropeneri (0 acman hnaravorutyamb)
      p45: Sequelize.STRING, // rejimi ogtagorcman jamanaky aranc 0 acman
      p46: Sequelize.STRING, // rejimi ogtagorcman jamanaky aranc 0 acman
      p47: Sequelize.STRING, // rejimi ogtagorcman jamanaky aranc 0 acman
      p48: Sequelize.STRING, // rejimi ogtagorcman jamanaky aranc 0 acman
      p49: Sequelize.STRING, // rejimi ogtagorcman jamanaky aranc 0 acman
      p50: Sequelize.STRING, // rejimi ogtagorcman jamanaky aranc 0 acman
      p51: Sequelize.STRING, // Buttoni tuylatvutyan poxi chap
      p52: Sequelize.STRING, // Buttoni tuylatvutyan poxi chap
      p53: Sequelize.STRING, // Buttoni tuylatvutyan poxi chap
      p54: Sequelize.STRING, // Buttoni tuylatvutyan poxi chap
      p55: Sequelize.STRING, // Buttoni tuylatvutyan poxi chap
      p56: Sequelize.STRING, // Buttoni tuylatvutyan poxi chap
      p57: Sequelize.STRING, // Reklamneri qanak
      p58: Sequelize.STRING, // inchqan jamanaky mek poxi reklamy
      p59: Sequelize.STRING, // inch reklam tpi  0-8
      p60: Sequelize.STRING, // inch reklam tpi 0-8
      p61: Sequelize.STRING, // inch reklam tpi 0-8
      p62: Sequelize.STRING, // inch reklam tpi 0-8
      p63: Sequelize.STRING, // inch reklam tpi 0-8
      p64: Sequelize.STRING, // inch reklam tpi 0-8
      p65: Sequelize.STRING, // reklami guyny 0-6
      p66: Sequelize.STRING, // reklami guyny 0-6
      p67: Sequelize.STRING, // reklami guyny 0-6
      p68: Sequelize.STRING, // reklami guyny 0-6
      p69: Sequelize.STRING, // reklami guyny 0-6
      p70: Sequelize.STRING, // reklami guyny 0-6
      p71: Sequelize.STRING, // reklami guyny 0-6
      p72: Sequelize.STRING,
      p73: Sequelize.STRING,
      p74: Sequelize.STRING,
      p75: Sequelize.STRING,
      p76: Sequelize.STRING,
      p77: Sequelize.STRING,
      p78: Sequelize.STRING,
      p79: Sequelize.STRING,
      p70: Sequelize.STRING,
      p71: Sequelize.STRING,
      p72: Sequelize.STRING,
      p73: Sequelize.STRING,
      p74: Sequelize.STRING,
      p75: Sequelize.STRING,
      p77: Sequelize.STRING,
      p78: Sequelize.STRING,
      p79: Sequelize.STRING,
      p80: Sequelize.STRING,
      p81: Sequelize.STRING,
      p82: Sequelize.STRING,
      p83: Sequelize.STRING,
      p84: Sequelize.STRING,
      p85: Sequelize.STRING,
      p86: Sequelize.STRING,
      p87: Sequelize.STRING,
      p88: Sequelize.STRING,
      p89: Sequelize.STRING,
      p90: Sequelize.STRING,
      p91: Sequelize.STRING,
      p92: Sequelize.STRING,
      p93: Sequelize.STRING,
      p94: Sequelize.STRING,
      p95: Sequelize.STRING,
      p96: Sequelize.STRING,
      p97: Sequelize.STRING,
      p98: Sequelize.STRING,
      p99: Sequelize.STRING,
      p100: Sequelize.STRING,
      p101: Sequelize.STRING,
      p102: Sequelize.STRING,
      p103: Sequelize.STRING,
      p104: Sequelize.STRING,
      p105: Sequelize.STRING,
      p106: Sequelize.STRING,
      p107: Sequelize.STRING,
      p108: Sequelize.STRING,
      p109: Sequelize.STRING,
      p110: Sequelize.STRING,
      p111: Sequelize.STRING,
      p112: Sequelize.STRING,
      p113: Sequelize.STRING,
      p114: Sequelize.STRING,
      p115: Sequelize.STRING,
      p116: Sequelize.STRING,
      p117: Sequelize.STRING,
      p118: Sequelize.STRING,
      p119: Sequelize.STRING,
      p120: Sequelize.STRING,
      p121: Sequelize.STRING,
      p122: Sequelize.STRING,
      p123: Sequelize.STRING,
      p124: Sequelize.STRING,
      p125: Sequelize.STRING,
      p126: Sequelize.STRING,
      p127: Sequelize.STRING,
      p128: Sequelize.STRING,
      p129: Sequelize.STRING,
      p130: Sequelize.STRING,
      p131: Sequelize.STRING,
      p132: Sequelize.STRING,
      p133: Sequelize.STRING,
      p134: Sequelize.STRING,
      p135: Sequelize.STRING,
      p136: Sequelize.STRING,
      p137: Sequelize.STRING,
      p138: Sequelize.STRING,
      p139: Sequelize.STRING,
      p140: Sequelize.STRING,
      p141: Sequelize.STRING,
      p142: Sequelize.STRING,
      p143: Sequelize.STRING,
      p144: Sequelize.STRING,
      p145: Sequelize.STRING,
      p146: Sequelize.STRING,
      p147: Sequelize.STRING,
      p148: Sequelize.STRING,
      p149: Sequelize.STRING,
      datatime: Sequelize.STRING,
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Items");
  },
};
