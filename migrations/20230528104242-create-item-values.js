"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("ItemValues", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      p0: Sequelize.INTEGER, // device type
      p1: Sequelize.INTEGER, // version
      p2: Sequelize.INTEGER, // ownerId
      p3: Sequelize.BOOLEAN, // RFID 1
      p4: Sequelize.INTEGER, // RFID 2
      p5: Sequelize.INTEGER, // moikaID
      p6: Sequelize.STRING, // boxId
      p7: Sequelize.STRING, // lang
      p8: Sequelize.STRING, // work mode
      p9: Sequelize.INTEGER, // freecard
      p10: Sequelize.STRING, // coin nominal
      p11: Sequelize.INTEGER, // nill nominal
      p12: Sequelize.STRING, // cash less nominall
      p13: Sequelize.STRING, //coin count
      p14: Sequelize.STRING, // bill count
      p15: Sequelize.STRING, //cesh less count
      p16: Sequelize.STRING, // counin count total +
      p17: Sequelize.STRING, // bill count total +
      p18: Sequelize.STRING, //cash less count total +
      p19: Sequelize.STRING, //rele off time
      p20: Sequelize.STRING, // 1 rejimi tevoxutyun yst CoinNominal
      p21: Sequelize.STRING, // 2 rejimi tevoxutyun yst CoinNominal
      p22: Sequelize.STRING, // 3 rejimi tevoxutyun yst CoinNominal
      p23: Sequelize.STRING, // 4 rejimi tevoxutyun yst CoinNominal
      p24: Sequelize.STRING, // 5 rejimi tevoxutyun yst CoinNominal
      p25: Sequelize.STRING, // 6 rejimi tevoxutyun yst CoinNominal
      p26: Sequelize.STRING, // Rejimi anvanum
      p27: Sequelize.STRING, //  Rejimi anvanum
      p28: Sequelize.STRING, // Rejimi anvanum
      p29: Sequelize.STRING, // Rejimi anvanum
      p30: Sequelize.STRING, // Rejimi anvanum
      p31: Sequelize.STRING, // Rejimi anvanum
      p32: Sequelize.STRING, // f1 goyn
      p33: Sequelize.STRING, // f2 guyn
      p34: Sequelize.STRING, // guyn
      p35: Sequelize.STRING, // guyn
      p36: Sequelize.STRING, // guyn
      p37: Sequelize.STRING, // guyn
      p38: Sequelize.STRING, // f count
      p39: Sequelize.STRING, // f count
      p40: Sequelize.STRING, // f count
      p41: Sequelize.STRING, // f count
      p42: Sequelize.STRING, // f count
      p43: Sequelize.STRING, // f count
      p44: Sequelize.STRING, // rejimi ogtagorcman jamanaky aranc 0 acman
      p45: Sequelize.STRING, // rejimi ogtagorcman jamanaky aranc 0 acman
      p46: Sequelize.STRING, // rejimi ogtagorcman jamanaky aranc 0 acman
      p47: Sequelize.STRING, // rejimi ogtagorcman jamanaky aranc 0 acman
      p48: Sequelize.STRING, // rejimi ogtagorcman jamanaky aranc 0 acman
      p49: Sequelize.STRING, // rejimi ogtagorcman jamanaky aranc 0 acman
      p50: Sequelize.STRING, // Buttoni tuylatvutyan poxi chap
      p51: Sequelize.STRING, // Buttoni tuylatvutyan poxi chap
      p52: Sequelize.STRING, // Buttoni tuylatvutyan poxi chap
      p53: Sequelize.STRING, // Buttoni tuylatvutyan poxi chap
      p54: Sequelize.STRING, // Buttoni tuylatvutyan poxi chap
      p55: Sequelize.STRING, // Buttoni tuylatvutyan poxi chap
      p56: Sequelize.STRING, // Reklamneri qanak
      p57: Sequelize.STRING, // inchqan jamanaky mek poxi reklamy
      p58: Sequelize.STRING, // inch reklam tpi  0-8
      p59: Sequelize.STRING, // inch reklam tpi  0-8
      p60: Sequelize.STRING, // inch reklam tpi 0-8
      p61: Sequelize.STRING, // inch reklam tpi 0-8
      p62: Sequelize.STRING, // inch reklam tpi 0-8
      p63: Sequelize.STRING, // inch reklam tpi 0-8
      p64: Sequelize.STRING, // reklami guyn
      p65: Sequelize.STRING, // reklami guyny 0-6
      p66: Sequelize.STRING, // reklami guyny 0-6
      p67: Sequelize.STRING, // reklami guyny 0-6
      p68: Sequelize.STRING, // reklami guyny 0-6
      p69: Sequelize.STRING, // reklami guyny 0-6
      p70: Sequelize.STRING, // bonus size
      p71: Sequelize.STRING, // bonus value
      p72: Sequelize.STRING, // bonus type
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
      p117: Sequelize.STRING,
      p118: Sequelize.STRING,
      p119: Sequelize.STRING,
      p120: Sequelize.STRING,
      p130: Sequelize.STRING,
      p131: Sequelize.STRING,
      p132: Sequelize.STRING,
      p133: Sequelize.STRING,
      p134: Sequelize.STRING,
      p135: Sequelize.STRING,
      p137: Sequelize.STRING,
      p138: Sequelize.STRING,
      p139: Sequelize.STRING,
      p140: Sequelize.STRING,
      p141: Sequelize.STRING,
      p142: Sequelize.STRING,
      p143: Sequelize.STRING,
      p144: Sequelize.STRING,
      p145: Sequelize.STRING,
      p147: Sequelize.STRING,
      p148: Sequelize.STRING,
      p149: Sequelize.STRING,
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
    await queryInterface.dropTable("ItemValues");
  },
};
