"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Item3s", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      p0: Sequelize.INTEGER, // device type
      access: Sequelize.BOOLEAN,
      p1: Sequelize.INTEGER, // version
      p2: Sequelize.STRING, // ownerId
      p3: Sequelize.BOOLEAN, // RFID 1
      p4: Sequelize.INTEGER, // RFID 2
      p5: Sequelize.INTEGER, // moikaID
      p6: Sequelize.INTEGER, // boxId
      p7: Sequelize.STRING, // Act_Language
      p8: Sequelize.STRING, // Hopper_Nomimnal
      p9: Sequelize.INTEGER, // Hoppr_Timeout;
      p10: Sequelize.STRING, // Coin_Nominal
      p11: Sequelize.INTEGER, // Bill_Nominal
      p12: Sequelize.STRING, // CashLess_Nominal
      p13: Sequelize.STRING, //coin count
      p14: Sequelize.STRING, // bill count
      p15: Sequelize.STRING, //cesh less count
      p16: Sequelize.STRING, // counin count total +
      p17: Sequelize.STRING, // bill count total +
      p18: Sequelize.STRING, //cash less count total +
      p19: Sequelize.STRING, // Card_Value
      p20: Sequelize.STRING, //Card_Count
      p21: Sequelize.STRING, //Hopper_Count
      p22: Sequelize.STRING, //Card_Recharge
      p23: Sequelize.STRING, //Card_Total_Count
      p24: Sequelize.STRING, //Hopper_Total_Count
      p24: Sequelize.STRING, //Card_Total_Recharge
      p25: Sequelize.STRING, // Hopper_Coin
      p26: Sequelize.STRING, //Hopper_Limit
      p27: Sequelize.STRING, //SleepManu_Count
      p28: Sequelize.STRING, //Roll_Time
      p29: Sequelize.STRING, //SleepManuPtr 0
      p30: Sequelize.STRING, //SleepManuPtr 1
      p31: Sequelize.STRING, //SleepManuPtr 2
      p32: Sequelize.STRING, //SleepManuPtr 3
      p33: Sequelize.STRING, //SleepManuPtr 4
      p34: Sequelize.STRING, //SleepManuPtr 5
      p35: Sequelize.STRING, //SleepManuColor 0
      p36: Sequelize.STRING, //SleepManuColor 1
      p37: Sequelize.STRING, //SleepManuColor 2
      p38: Sequelize.STRING, //SleepManuColor 3
      p39: Sequelize.STRING, //SleepManuColor 4
      p40: Sequelize.STRING, //SleepManuColor 5
      p41: Sequelize.STRING, //BonusSize
      p42: Sequelize.STRING, //BonusValue
      p43: Sequelize.STRING, //
      p44: Sequelize.STRING, //
      p45: Sequelize.STRING, //
      p46: Sequelize.STRING, //
      p47: Sequelize.STRING, //
      p48: Sequelize.STRING, //
      p49: Sequelize.STRING, //
      p50: Sequelize.STRING, //
      p51: Sequelize.STRING, //
      p52: Sequelize.STRING, //
      p53: Sequelize.STRING, //
      p54: Sequelize.STRING, //
      p55: Sequelize.STRING, //
      p56: Sequelize.STRING, //
      p57: Sequelize.STRING, //
      p58: Sequelize.STRING, //
      p59: Sequelize.STRING, //
      p60: Sequelize.STRING, //
      p61: Sequelize.STRING, //
      p62: Sequelize.STRING, //
      p63: Sequelize.STRING, //
      p64: Sequelize.STRING, //
      p65: Sequelize.STRING, //
      p66: Sequelize.STRING, //
      p67: Sequelize.STRING, //
      p68: Sequelize.STRING, //
      p69: Sequelize.STRING, //
      p70: Sequelize.STRING, //
      p71: Sequelize.STRING, //
      p72: Sequelize.STRING, //
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
      p127: Sequelize.STRING,
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
    await queryInterface.dropTable("Item3s");
  },
};
