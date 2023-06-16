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
      DeviceType: Sequelize.STRING, // 1-moyka, 2-cux
      P0: Sequelize.INTEGER, // 1-moyka, 2-cux
      P1: Sequelize.INTEGER, // 1056,
      name: Sequelize.STRING,
      P2: Sequelize.INTEGER, // ownerId
      P3: Sequelize.BOOLEAN, // online te offline
      P4: Sequelize.INTEGER, // Moyki hamary
      P5: Sequelize.INTEGER, // M1-i hamari takaynelutyuny
      P6: Sequelize.STRING, // hayastan 3001 (kartoshki id owneri hamar #1)
      P7: Sequelize.STRING, // hayastan 0 (kartoshki id owneri hamar #2)
      P8: Sequelize.STRING, // langId heto stugvi ete 0=>ruseren
      P9: Sequelize.INTEGER, // 1|0 kam stop kam standart
      P10: Sequelize.STRING, // zri kartochki chap (or` 500dram)
      P11: Sequelize.INTEGER, // kopeki tesaky
      P12: Sequelize.STRING, // toxtpoxi tesaky
      P13: Sequelize.STRING, // bankayini tesaky
      P14: Sequelize.STRING, // kopeki qanak obshi kopeki tivy  CoinCount*CoinNominal aktual (karanq 0acnenq)
      P15: Sequelize.STRING, //tuxt qanak obshi tuxt tivy  BillCount*BillNominal  aktual  (karanq 0acnenq)
      P16: Sequelize.STRING, // qarti obshi tivy CashLessCount*CashLessNominal aktual (karanq 0acnenq)
      P17: Sequelize.STRING, // CoinCountTotal*CoinNominal chzroyacacf
      P18: Sequelize.STRING, //tuxy BillCountTotal*BillNominal
      P19: Sequelize.STRING, //qartov CashLessCountTotal*CashLessNominal
      P20: Sequelize.STRING, // kuroky toxcelu heto matory anjatvelu jamanakahatvac
      P21: Sequelize.STRING, // 1 rejimi tevoxutyun yst CoinNominal
      P22: Sequelize.STRING, // 2 rejimi tevoxutyun yst CoinNominal
      P23: Sequelize.STRING, // 3 rejimi tevoxutyun yst CoinNominal
      P24: Sequelize.STRING, // 4 rejimi tevoxutyun yst CoinNominal
      P25: Sequelize.STRING, // 5 rejimi tevoxutyun yst CoinNominal
      P26: Sequelize.STRING, // 6 rejimi tevoxutyun yst CoinNominal
      P27: Sequelize.STRING, // Rejimi anvanum 0-16
      P28: Sequelize.STRING, // Rejimi anvanum
      P29: Sequelize.STRING, // Rejimi anvanum
      P30: Sequelize.STRING, // Rejimi anvanum
      P31: Sequelize.STRING, // Rejimi anvanum
      P32: Sequelize.STRING, // Rejimi anvanum
      P33: Sequelize.STRING, // guyni hamaranishy 15 1y verev 5y nerqev 0-6 amen meky
      P34: Sequelize.STRING, // guyni hamaranishy 15 1y verev 5y nerqev
      P35: Sequelize.STRING, // guyni hamaranishy 15 1y verev 5y nerqev
      P36: Sequelize.STRING, // guyni hamaranishy 15 1y verev 5y nerqev
      P37: Sequelize.STRING, // guyni hamaranishy 15 1y verev 5y nerqev
      P38: Sequelize.STRING, // guyni hamaranishy 15 1y verev 5y nerqev
      P39: Sequelize.STRING, // rejimi ogtagorcman jamanak yst ropeneri (0 acman hnaravorutyamb)
      P40: Sequelize.STRING, // rejimi ogtagorcman jamanak yst ropeneri (0 acman hnaravorutyamb)
      P41: Sequelize.STRING, // rejimi ogtagorcman jamanak yst ropeneri (0 acman hnaravorutyamb)
      P42: Sequelize.STRING, // rejimi ogtagorcman jamanak yst ropeneri (0 acman hnaravorutyamb)
      P43: Sequelize.STRING, // rejimi ogtagorcman jamanak yst ropeneri (0 acman hnaravorutyamb)
      P44: Sequelize.STRING, // rejimi ogtagorcman jamanak yst ropeneri (0 acman hnaravorutyamb)
      P45: Sequelize.STRING, // rejimi ogtagorcman jamanaky aranc 0 acman
      P46: Sequelize.STRING, // rejimi ogtagorcman jamanaky aranc 0 acman
      P47: Sequelize.STRING, // rejimi ogtagorcman jamanaky aranc 0 acman
      P48: Sequelize.STRING, // rejimi ogtagorcman jamanaky aranc 0 acman
      P49: Sequelize.STRING, // rejimi ogtagorcman jamanaky aranc 0 acman
      P50: Sequelize.STRING, // rejimi ogtagorcman jamanaky aranc 0 acman
      P51: Sequelize.STRING, // Buttoni tuylatvutyan poxi chap
      P52: Sequelize.STRING, // Buttoni tuylatvutyan poxi chap
      P53: Sequelize.STRING, // Buttoni tuylatvutyan poxi chap
      P54: Sequelize.STRING, // Buttoni tuylatvutyan poxi chap
      P55: Sequelize.STRING, // Buttoni tuylatvutyan poxi chap
      P56: Sequelize.STRING, // Buttoni tuylatvutyan poxi chap
      P57: Sequelize.STRING, // Reklamneri qanak
      P58: Sequelize.STRING, // inchqan jamanaky mek poxi reklamy
      P59: Sequelize.STRING, // inch reklam tpi  0-8
      P60: Sequelize.STRING, // inch reklam tpi 0-8
      P61: Sequelize.STRING, // inch reklam tpi 0-8
      P62: Sequelize.STRING, // inch reklam tpi 0-8
      P63: Sequelize.STRING, // inch reklam tpi 0-8
      P64: Sequelize.STRING, // inch reklam tpi 0-8
      P65: Sequelize.STRING, // reklami guyny 0-6
      P67: Sequelize.STRING, // reklami guyny 0-6
      P68: Sequelize.STRING, // reklami guyny 0-6
      P69: Sequelize.STRING, // reklami guyny 0-6
      P70: Sequelize.STRING, // reklami guyny 0-6
      P71: Sequelize.STRING, // reklami guyny 0-6
      P72: Sequelize.STRING,
      P73: Sequelize.STRING,
      P74: Sequelize.STRING,
      P75: Sequelize.STRING,
      P76: Sequelize.STRING,
      P77: Sequelize.STRING,
      P78: Sequelize.STRING,
      P79: Sequelize.STRING,
      P70: Sequelize.STRING,
      P71: Sequelize.STRING,
      P72: Sequelize.STRING,
      P73: Sequelize.STRING,
      P74: Sequelize.STRING,
      P75: Sequelize.STRING,
      P77: Sequelize.STRING,
      P78: Sequelize.STRING,
      P79: Sequelize.STRING,
      P80: Sequelize.STRING,
      P81: Sequelize.STRING,
      P82: Sequelize.STRING,
      P83: Sequelize.STRING,
      P84: Sequelize.STRING,
      P85: Sequelize.STRING,
      P86: Sequelize.STRING,
      P87: Sequelize.STRING,
      P88: Sequelize.STRING,
      P89: Sequelize.STRING,
      P90: Sequelize.STRING,
      P91: Sequelize.STRING,
      P92: Sequelize.STRING,
      P93: Sequelize.STRING,
      P94: Sequelize.STRING,
      P95: Sequelize.STRING,
      P97: Sequelize.STRING,
      P98: Sequelize.STRING,
      P99: Sequelize.STRING,
      P100: Sequelize.STRING,
      P101: Sequelize.STRING,
      P102: Sequelize.STRING,
      P103: Sequelize.STRING,
      P104: Sequelize.STRING,
      P105: Sequelize.STRING,
      P106: Sequelize.STRING,
      P107: Sequelize.STRING,
      P108: Sequelize.STRING,
      P109: Sequelize.STRING,
      P110: Sequelize.STRING,
      P111: Sequelize.STRING,
      P112: Sequelize.STRING,
      P113: Sequelize.STRING,
      P114: Sequelize.STRING,
      P115: Sequelize.STRING,
      P117: Sequelize.STRING,
      P118: Sequelize.STRING,
      P119: Sequelize.STRING,
      P120: Sequelize.STRING,
      P130: Sequelize.STRING,
      P131: Sequelize.STRING,
      P132: Sequelize.STRING,
      P133: Sequelize.STRING,
      P134: Sequelize.STRING,
      P135: Sequelize.STRING,
      P137: Sequelize.STRING,
      P138: Sequelize.STRING,
      P139: Sequelize.STRING,
      P140: Sequelize.STRING,
      P141: Sequelize.STRING,
      P142: Sequelize.STRING,
      P143: Sequelize.STRING,
      P144: Sequelize.STRING,
      P145: Sequelize.STRING,
      P147: Sequelize.STRING,
      P148: Sequelize.STRING,
      P149: Sequelize.STRING,
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
