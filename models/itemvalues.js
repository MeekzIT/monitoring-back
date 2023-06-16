"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ItemValues extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ItemValues.init(
    {
      DeviceType: DataTypes.STRING, // 1-moyka, 2-cux
      P0: DataTypes.INTEGER, // 1-moyka, 2-cux
      P1: DataTypes.INTEGER, // 1056,
      name: DataTypes.STRING,
      P2: DataTypes.INTEGER, // ownerId
      P3: DataTypes.BOOLEAN, // online te offline
      P4: DataTypes.INTEGER, // Moyki hamary
      P5: DataTypes.INTEGER, // M1-i hamari takaynelutyuny
      P6: DataTypes.STRING, // hayastan 3001 (kartoshki id owneri hamar #1)
      P7: DataTypes.STRING, // hayastan 0 (kartoshki id owneri hamar #2)
      P8: DataTypes.STRING, // langId heto stugvi ete 0=>ruseren
      P9: DataTypes.INTEGER, // 1|0 kam stop kam standart
      P10: DataTypes.STRING, // zri kartochki chap (or` 500dram)
      P11: DataTypes.INTEGER, // kopeki tesaky
      P12: DataTypes.STRING, // toxtpoxi tesaky
      P13: DataTypes.STRING, // bankayini tesaky
      P14: DataTypes.STRING, // kopeki qanak obshi kopeki tivy  CoinCount*CoinNominal aktual (karanq 0acnenq)
      P15: DataTypes.STRING, //tuxt qanak obshi tuxt tivy  BillCount*BillNominal  aktual  (karanq 0acnenq)
      P16: DataTypes.STRING, // qarti obshi tivy CashLessCount*CashLessNominal aktual (karanq 0acnenq)
      P17: DataTypes.STRING, // CoinCountTotal*CoinNominal chzroyacacf
      P18: DataTypes.STRING, //tuxy BillCountTotal*BillNominal
      P19: DataTypes.STRING, //qartov CashLessCountTotal*CashLessNominal
      P20: DataTypes.STRING, // kuroky toxcelu heto matory anjatvelu jamanakahatvac
      P21: DataTypes.STRING, // 1 rejimi tevoxutyun yst CoinNominal
      P22: DataTypes.STRING, // 2 rejimi tevoxutyun yst CoinNominal
      P23: DataTypes.STRING, // 3 rejimi tevoxutyun yst CoinNominal
      P24: DataTypes.STRING, // 4 rejimi tevoxutyun yst CoinNominal
      P25: DataTypes.STRING, // 5 rejimi tevoxutyun yst CoinNominal
      P26: DataTypes.STRING, // 6 rejimi tevoxutyun yst CoinNominal
      P27: DataTypes.STRING, // Rejimi anvanum 0-16
      P28: DataTypes.STRING, // Rejimi anvanum
      P29: DataTypes.STRING, // Rejimi anvanum
      P30: DataTypes.STRING, // Rejimi anvanum
      P31: DataTypes.STRING, // Rejimi anvanum
      P32: DataTypes.STRING, // Rejimi anvanum
      P33: DataTypes.STRING, // guyni hamaranishy 15 1y verev 5y nerqev 0-6 amen meky
      P34: DataTypes.STRING, // guyni hamaranishy 15 1y verev 5y nerqev
      P35: DataTypes.STRING, // guyni hamaranishy 15 1y verev 5y nerqev
      P36: DataTypes.STRING, // guyni hamaranishy 15 1y verev 5y nerqev
      P37: DataTypes.STRING, // guyni hamaranishy 15 1y verev 5y nerqev
      P38: DataTypes.STRING, // guyni hamaranishy 15 1y verev 5y nerqev
      P39: DataTypes.STRING, // rejimi ogtagorcman jamanak yst ropeneri (0 acman hnaravorutyamb)
      P40: DataTypes.STRING, // rejimi ogtagorcman jamanak yst ropeneri (0 acman hnaravorutyamb)
      P41: DataTypes.STRING, // rejimi ogtagorcman jamanak yst ropeneri (0 acman hnaravorutyamb)
      P42: DataTypes.STRING, // rejimi ogtagorcman jamanak yst ropeneri (0 acman hnaravorutyamb)
      P43: DataTypes.STRING, // rejimi ogtagorcman jamanak yst ropeneri (0 acman hnaravorutyamb)
      P44: DataTypes.STRING, // rejimi ogtagorcman jamanak yst ropeneri (0 acman hnaravorutyamb)
      P45: DataTypes.STRING, // rejimi ogtagorcman jamanaky aranc 0 acman
      P46: DataTypes.STRING, // rejimi ogtagorcman jamanaky aranc 0 acman
      P47: DataTypes.STRING, // rejimi ogtagorcman jamanaky aranc 0 acman
      P48: DataTypes.STRING, // rejimi ogtagorcman jamanaky aranc 0 acman
      P49: DataTypes.STRING, // rejimi ogtagorcman jamanaky aranc 0 acman
      P50: DataTypes.STRING, // rejimi ogtagorcman jamanaky aranc 0 acman
      P51: DataTypes.STRING, // Buttoni tuylatvutyan poxi chap
      P52: DataTypes.STRING, // Buttoni tuylatvutyan poxi chap
      P53: DataTypes.STRING, // Buttoni tuylatvutyan poxi chap
      P54: DataTypes.STRING, // Buttoni tuylatvutyan poxi chap
      P55: DataTypes.STRING, // Buttoni tuylatvutyan poxi chap
      P56: DataTypes.STRING, // Buttoni tuylatvutyan poxi chap
      P57: DataTypes.STRING, // Reklamneri qanak
      P58: DataTypes.STRING, // inchqan jamanaky mek poxi reklamy
      P59: DataTypes.STRING, // inch reklam tpi  0-8
      P60: DataTypes.STRING, // inch reklam tpi 0-8
      P61: DataTypes.STRING, // inch reklam tpi 0-8
      P62: DataTypes.STRING, // inch reklam tpi 0-8
      P63: DataTypes.STRING, // inch reklam tpi 0-8
      P64: DataTypes.STRING, // inch reklam tpi 0-8
      P65: DataTypes.STRING, // reklami guyny 0-6
      P67: DataTypes.STRING, // reklami guyny 0-6
      P68: DataTypes.STRING, // reklami guyny 0-6
      P69: DataTypes.STRING, // reklami guyny 0-6
      P70: DataTypes.STRING, // reklami guyny 0-6
      P71: DataTypes.STRING, // reklami guyny 0-6
      P72: DataTypes.STRING,
      P73: DataTypes.STRING,
      P74: DataTypes.STRING,
      P75: DataTypes.STRING,
      P76: DataTypes.STRING,
      P77: DataTypes.STRING,
      P78: DataTypes.STRING,
      P79: DataTypes.STRING,
      P70: DataTypes.STRING,
      P71: DataTypes.STRING,
      P72: DataTypes.STRING,
      P73: DataTypes.STRING,
      P74: DataTypes.STRING,
      P75: DataTypes.STRING,
      P77: DataTypes.STRING,
      P78: DataTypes.STRING,
      P79: DataTypes.STRING,
      P80: DataTypes.STRING,
      P81: DataTypes.STRING,
      P82: DataTypes.STRING,
      P83: DataTypes.STRING,
      P84: DataTypes.STRING,
      P85: DataTypes.STRING,
      P86: DataTypes.STRING,
      P87: DataTypes.STRING,
      P88: DataTypes.STRING,
      P89: DataTypes.STRING,
      P90: DataTypes.STRING,
      P91: DataTypes.STRING,
      P92: DataTypes.STRING,
      P93: DataTypes.STRING,
      P94: DataTypes.STRING,
      P95: DataTypes.STRING,
      P97: DataTypes.STRING,
      P98: DataTypes.STRING,
      P99: DataTypes.STRING,
      P100: DataTypes.STRING,
      P101: DataTypes.STRING,
      P102: DataTypes.STRING,
      P103: DataTypes.STRING,
      P104: DataTypes.STRING,
      P105: DataTypes.STRING,
      P106: DataTypes.STRING,
      P107: DataTypes.STRING,
      P108: DataTypes.STRING,
      P109: DataTypes.STRING,
      P110: DataTypes.STRING,
      P111: DataTypes.STRING,
      P112: DataTypes.STRING,
      P113: DataTypes.STRING,
      P114: DataTypes.STRING,
      P115: DataTypes.STRING,
      P117: DataTypes.STRING,
      P118: DataTypes.STRING,
      P119: DataTypes.STRING,
      P120: DataTypes.STRING,
      P130: DataTypes.STRING,
      P131: DataTypes.STRING,
      P132: DataTypes.STRING,
      P133: DataTypes.STRING,
      P134: DataTypes.STRING,
      P135: DataTypes.STRING,
      P137: DataTypes.STRING,
      P138: DataTypes.STRING,
      P139: DataTypes.STRING,
      P140: DataTypes.STRING,
      P141: DataTypes.STRING,
      P142: DataTypes.STRING,
      P143: DataTypes.STRING,
      P144: DataTypes.STRING,
      P145: DataTypes.STRING,
      P147: DataTypes.STRING,
      P148: DataTypes.STRING,
      P149: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "ItemValues",
    }
  );

  // let Item = sequelize.define("Item");

  // ItemValues.belongsTo(Item, {
  //   foreignKey: "itemId",
  // });

  return ItemValues;
};
