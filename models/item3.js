"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Item3 extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Item3.init(
    {
      p0: DataTypes.INTEGER, // device type
      access: DataTypes.BOOLEAN,
      name: DataTypes.STRING,
      p1: DataTypes.INTEGER, // version
      p2: DataTypes.STRING, // ownerId
      p3: DataTypes.STRING, // RFID 1
      p4: DataTypes.INTEGER, // RFID 2
      p5: DataTypes.INTEGER, // moikaID
      p6: DataTypes.INTEGER, // boxId
      p7: DataTypes.STRING, // Act_Language
      p8: DataTypes.STRING, // Hopper_Nomimnal
      p9: DataTypes.INTEGER, // Hoppr_Timeout;
      p10: DataTypes.STRING, // Coin_Nominal
      p11: DataTypes.INTEGER, // Bill_Nominal
      p12: DataTypes.STRING, // CashLess_Nominal
      p13: DataTypes.STRING, //coin count
      p14: DataTypes.STRING, // bill count
      p15: DataTypes.STRING, //cesh less count
      p16: DataTypes.STRING, // counin count total +
      p17: DataTypes.STRING, // bill count total +
      p18: DataTypes.STRING, //cash less count total +
      p19: DataTypes.STRING, // Card_Value
      p20: DataTypes.STRING, //Card_Count
      p21: DataTypes.STRING, //Hopper_Count
      p22: DataTypes.STRING, //Card_Recharge
      p23: DataTypes.STRING, //Card_Total_Count
      p24: DataTypes.STRING, //Hopper_Total_Count
      p24: DataTypes.STRING, //Card_Total_Recharge
      p25: DataTypes.STRING, // Hopper_Coin
      p26: DataTypes.STRING, //Hopper_Limit
      p27: DataTypes.STRING, //SleepManu_Count
      p28: DataTypes.STRING, //Roll_Time
      p29: DataTypes.STRING, //SleepManuPtr 0
      p30: DataTypes.STRING, //SleepManuPtr 1
      p31: DataTypes.STRING, //SleepManuPtr 2
      p32: DataTypes.STRING, //SleepManuPtr 3
      p33: DataTypes.STRING, //SleepManuPtr 4
      p34: DataTypes.STRING, //SleepManuPtr 5
      p35: DataTypes.STRING, //SleepManuColor 0
      p36: DataTypes.STRING, //SleepManuColor 1
      p37: DataTypes.STRING, //SleepManuColor 2
      p38: DataTypes.STRING, //SleepManuColor 3
      p39: DataTypes.STRING, //SleepManuColor 4
      p40: DataTypes.STRING, //SleepManuColor 5
      p41: DataTypes.STRING, //BonusSize
      p42: DataTypes.STRING, //BonusValue
      p43: DataTypes.STRING, //
      p44: DataTypes.STRING, //
      p45: DataTypes.STRING, //
      p46: DataTypes.STRING, //
      p47: DataTypes.STRING, //
      p48: DataTypes.STRING, //
      p49: DataTypes.STRING, //
      p50: DataTypes.STRING, //
      p51: DataTypes.STRING, //
      p52: DataTypes.STRING, //
      p53: DataTypes.STRING, //
      p54: DataTypes.STRING, //
      p55: DataTypes.STRING, //
      p56: DataTypes.STRING, //
      p57: DataTypes.STRING, //
      p58: DataTypes.STRING, //
      p59: DataTypes.STRING, //
      p60: DataTypes.STRING, //
      p61: DataTypes.STRING, //
      p62: DataTypes.STRING, //
      p63: DataTypes.STRING, //
      p64: DataTypes.STRING, //
      p65: DataTypes.STRING, //
      p66: DataTypes.STRING, //
      p67: DataTypes.STRING, //
      p68: DataTypes.STRING, //
      p69: DataTypes.STRING, //
      p70: DataTypes.STRING, //
      p71: DataTypes.STRING, //
      p72: DataTypes.STRING, //
      p73: DataTypes.STRING,
      p74: DataTypes.STRING,
      p75: DataTypes.STRING,
      p76: DataTypes.STRING,
      p77: DataTypes.STRING,
      p78: DataTypes.STRING,
      p79: DataTypes.STRING,
      p70: DataTypes.STRING,
      p71: DataTypes.STRING,
      p72: DataTypes.STRING,
      p73: DataTypes.STRING,
      p74: DataTypes.STRING,
      p75: DataTypes.STRING,
      p77: DataTypes.STRING,
      p78: DataTypes.STRING,
      p79: DataTypes.STRING,
      p80: DataTypes.STRING,
      p81: DataTypes.STRING,
      p82: DataTypes.STRING,
      p83: DataTypes.STRING,
      p84: DataTypes.STRING,
      p85: DataTypes.STRING,
      p86: DataTypes.STRING,
      p87: DataTypes.STRING,
      p88: DataTypes.STRING,
      p89: DataTypes.STRING,
      p90: DataTypes.STRING,
      p91: DataTypes.STRING,
      p92: DataTypes.STRING,
      p93: DataTypes.STRING,
      p94: DataTypes.STRING,
      p95: DataTypes.STRING,
      p96: DataTypes.STRING,
      p97: DataTypes.STRING,
      p98: DataTypes.STRING,
      p99: DataTypes.STRING,
      p100: DataTypes.STRING,
      p101: DataTypes.STRING,
      p102: DataTypes.STRING,
      p103: DataTypes.STRING,
      p104: DataTypes.STRING,
      p105: DataTypes.STRING,
      p106: DataTypes.STRING,
      p107: DataTypes.STRING,
      p108: DataTypes.STRING,
      p109: DataTypes.STRING,
      p110: DataTypes.STRING,
      p111: DataTypes.STRING,
      p112: DataTypes.STRING,
      p113: DataTypes.STRING,
      p114: DataTypes.STRING,
      p115: DataTypes.STRING,
      p116: DataTypes.STRING,
      p117: DataTypes.STRING,
      p118: DataTypes.STRING,
      p119: DataTypes.STRING,
      p120: DataTypes.STRING,
      p121: DataTypes.STRING,
      p122: DataTypes.STRING,
      p123: DataTypes.STRING,
      p124: DataTypes.STRING,
      p125: DataTypes.STRING,
      p126: DataTypes.STRING,
      p127: DataTypes.STRING,
      p128: DataTypes.STRING,
      p129: DataTypes.STRING,
      p127: DataTypes.STRING,
      p130: DataTypes.STRING,
      p131: DataTypes.STRING,
      p132: DataTypes.STRING,
      p133: DataTypes.STRING,
      p134: DataTypes.STRING,
      p135: DataTypes.STRING,
      p136: DataTypes.STRING,
      p137: DataTypes.STRING,
      p138: DataTypes.STRING,
      p139: DataTypes.STRING,
      p140: DataTypes.STRING,
      p141: DataTypes.STRING,
      p142: DataTypes.STRING,
      p143: DataTypes.STRING,
      p144: DataTypes.STRING,
      p145: DataTypes.STRING,
      p146: DataTypes.STRING,
      p147: DataTypes.STRING,
      p148: DataTypes.STRING,
      p149: DataTypes.STRING,
      datatime: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Item3",
    }
  );
  return Item3;
};
