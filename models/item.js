"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Item.init(
    {
      p0: DataTypes.INTEGER, // device type
      access:DataTypes.BOOLEAN,
      p1: DataTypes.INTEGER, // version
      p2: DataTypes.INTEGER, // ownerId
      p3: DataTypes.BOOLEAN, // RFID 1
      p4: DataTypes.INTEGER, // RFID 2
      p5: DataTypes.INTEGER, // moikaID
      p6: DataTypes.INTEGER, // boxId
      p7: DataTypes.STRING, // lang
      p8: DataTypes.STRING, // work mode
      p9: DataTypes.INTEGER, // freecard
      p10: DataTypes.STRING, // coin nominal
      p11: DataTypes.INTEGER, // nill nominal
      p12: DataTypes.STRING, // cash less nominall
      p13: DataTypes.STRING, //coin count
      p14: DataTypes.STRING, // bill count
      p15: DataTypes.STRING, //cesh less count
      p16: DataTypes.STRING, // counin count total +
      p17: DataTypes.STRING, // bill count total +
      p18: DataTypes.STRING, //cash less count total +
      p19: DataTypes.STRING, //rele off time
      p20: DataTypes.STRING, // 1 rejimi tevoxutyun yst CoinNominal
      p21: DataTypes.STRING, // 2 rejimi tevoxutyun yst CoinNominal
      p22: DataTypes.STRING, // 3 rejimi tevoxutyun yst CoinNominal
      p23: DataTypes.STRING, // 4 rejimi tevoxutyun yst CoinNominal
      p24: DataTypes.STRING, // 5 rejimi tevoxutyun ystaccess CoinNominal
      p25: DataTypes.STRING, // 6 rejimi tevoxutyun yst CoinNominal
      p26: DataTypes.STRING, // Rejimi anvanum
      p27: DataTypes.STRING, //  Rejimi anvanum
      p28: DataTypes.STRING, // Rejimi anvanum
      p29: DataTypes.STRING, // Rejimi anvanum
      p30: DataTypes.STRING, // Rejimi anvanum
      p31: DataTypes.STRING, // Rejimi anvanum
      p32: DataTypes.STRING, // f1 goyn
      p33: DataTypes.STRING, // f2 guyn
      p34: DataTypes.STRING, // guyn
      p35: DataTypes.STRING, // guyn
      p36: DataTypes.STRING, // guyn
      p37: DataTypes.STRING, // guyn
      p38: DataTypes.STRING, // f count
      p39: DataTypes.STRING, // f count
      p40: DataTypes.STRING, // f count
      p41: DataTypes.STRING, // f count
      p42: DataTypes.STRING, // f count
      p43: DataTypes.STRING, // f count
      p44: DataTypes.STRING, // rejimi ogtagorcman jamanaky aranc 0 acman
      p45: DataTypes.STRING, // rejimi ogtagorcman jamanaky aranc 0 acman
      p46: DataTypes.STRING, // rejimi ogtagorcman jamanaky aranc 0 acman
      p47: DataTypes.STRING, // rejimi ogtagorcman jamanaky aranc 0 acman
      p48: DataTypes.STRING, // rejimi ogtagorcman jamanaky aranc 0 acman
      p49: DataTypes.STRING, // rejimi ogtagorcman jamanaky aranc 0 acman
      p50: DataTypes.STRING, // Buttoni tuylatvutyan poxi chap
      p51: DataTypes.STRING, // Buttoni tuylatvutyan poxi chap
      p52: DataTypes.STRING, // Buttoni tuylatvutyan poxi chap
      p53: DataTypes.STRING, // Buttoni tuylatvutyan poxi chap
      p54: DataTypes.STRING, // Buttoni tuylatvutyan poxi chap
      p55: DataTypes.STRING, // Buttoni tuylatvutyan poxi chap
      p56: DataTypes.STRING, // Reklamneri qanak
      p57: DataTypes.STRING, // inchqan jamanaky mek poxi reklamy
      p58: DataTypes.STRING, // inch reklam tpi  0-8
      p59: DataTypes.STRING, // inch reklam tpi  0-8
      p60: DataTypes.STRING, // inch reklam tpi 0-8
      p61: DataTypes.STRING, // inch reklam tpi 0-8
      p62: DataTypes.STRING, // inch reklam tpi 0-8
      p63: DataTypes.STRING, // inch reklam tpi 0-8
      p64: DataTypes.STRING, // reklami guyn
      p65: DataTypes.STRING, // reklami guyny 0-6
      p66: DataTypes.STRING, // reklami guyny 0-6
      p67: DataTypes.STRING, // reklami guyny 0-6
      p68: DataTypes.STRING, // reklami guyny 0-6
      p69: DataTypes.STRING, // reklami guyny 0-6
      p70: DataTypes.STRING, // bonus size
      p71: DataTypes.STRING, // bonus value
      p72: DataTypes.STRING, // bonus type
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
      modelName: "Item",
    }
  );

  let Box = sequelize.define("Box");
  // let ItemValues = sequelize.define("ItemValues");

  Item.hasMany(Box, {
    foreignKey: "id",
  });

  // Item.hasOne(ItemValues, {
  //   foreignKey: "id",
  // });

  return Item;
};
