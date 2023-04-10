var status = 0;
var rewardArrays = Array(
    [
        10,
        [
            [2000017, 300, -1, 2],
            [2000015, 300, -1, 2],
            [2030000,  20, -1, 0]
        ],
        50000,
        0
    ],
    [
        30,
        [
            [2000016, 300, -1, 2],
            [2000018, 300, -1, 0],
            [1012071,   1,  7, 2],
            [5150052,   1,  7, 0]
        ],
        200000,
        0
    ],
    [
        50,
        [
            [2022181,   3, -1, 1],
            [2450064,   4, -1, 0],
            [5030000,   1, -1, 1]
        ],
        0,
        0
    ],
    [
        70,
        [
            [5130000,   1, 14, 1],
            [2000012, 300, -1, 1],
            [3010036,   1, -1, 1]
        ],
        0,
        5000
    ]
);

function start()
{
    status = -1;
    action(1,0,0);
}

function action(mode, type, selection) {

    const constants = Java.type('constants.game.GameConstants');

    if (mode == -1) {
        cm.dispose();
    } else {
        if (status == 0 && mode == 0) {
            cm.dispose();
            cm.getPlayer().getClient().removeClickedNPC();
            return;
        } else if (status >= 1 && mode == 0) {
            cm.dispose();
            cm.getPlayer().getClient().removeClickedNPC();
            return;
        }
        if (mode == 1) {
            status++;
        } else {
            status--;
        }
        if (status == 0) {
            home = "สวัสดีนักผจญภัยทั้งหลาย หากคุณพัฒนาตัวเองจนถึงเลเวลที่กำหนด คุณจะได้รับไอเทมจากเราไปเลย";
            home += "\r\n#L0#ตรวจสอบรายชื่อไอเทมที่จะได้รับ#l";
            for (i = 0; i < rewardArrays.length; i++) {
                if (cm.getLevel() >= rewardArrays[i][0]) {
                    if(!cm.isQuestCompleted(100000 + rewardArrays[i][0])) {
                        home += "\r\n#L" + rewardArrays[i][0] + "#ฉันต้องการรับรางวัลเมื่อถึงเลเวล " + rewardArrays[i][0] + "#l";
                    }
                }
            }
            cm.sendSimple(home);
        } else if (status == 1) {
            if (selection == 0) {
                rewards = "";
                status = -1;
                for (i = 0; i < rewardArrays.length; i++) {
                    rewards += "#e#bเลเวล " + rewardArrays[i][0] + "#k#n";
                    rewards += "\r\n\r\n";
                    for (x = 0; x < rewardArrays[i][1].length; x++) {
                        rewards += "\t#i" + rewardArrays[i][1][x][0] + ":#\t";
                        for (y = 0; y < rewardArrays[i][1][x][3]; y++) {
                            rewards += " ";
                        }
                        rewards += "#z" + rewardArrays[i][1][x][0] + "# จำนวน " + constants.numberWithCommas(rewardArrays[i][1][x][1]) + " ชิ้น " + (rewardArrays[i][1][x][2] > 0 ? "(" + rewardArrays[i][1][x][2] + " วัน)" : "" );
                        rewards += "\r\n";
                    } 
                    if (rewardArrays[i][2] > 0) {
                        rewards += "\t#fItem/Special/0900.img/09000003/iconRaw/0#\t" + constants.numberWithCommas(rewardArrays[i][2]) + " Meso#k#n\r\n";
                    }
                    if (rewardArrays[i][3] > 0) {
                        rewards += "\r\n\t#fItem/Special/MaplePoint.img/" + rewardArrays[i][3] + "/iconRaw#\t" + constants.numberWithCommas(rewardArrays[i][3]) + " Maple Point#k#n\r\n";
                    }                    
                    rewards += "\r\n";
                }
                cm.sendOk(rewards);
                return;
            } else {
                LevelingRewards = selection;
                cm.sendYesNo("คุณต้องการรับรางวัลของผู้เล่นที่ผ่านไปยังเลเวล " + LevelingRewards + " ใช่หรือไม่");
            }
        } else if (status == 2) {
            const ArrayList = Java.type('java.util.ArrayList');
            rewards = "ยินดีด้วย คุณผ่านการทดสอบของเราแล้ว คุณจะได้รับไอเทมดังต่อไปนี้\r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0#\r\n\r\n";
            for (i = 0; i < rewardArrays.length; i++) {
                if (rewardArrays[i][0] == LevelingRewards) {
                    rewardItems = new ArrayList();
                    rewardQuantities = new ArrayList();
                    for (x = 0; x < rewardArrays[i][1].length; x++) {
                        rewardItems.add(rewardArrays[i][1][x][0]);
                        rewardQuantities.add(rewardArrays[i][1][x][1]);

                        rewards += "\t#i" + rewardArrays[i][1][x][0] + ":#\t";
                        for (y = 0; y < rewardArrays[i][1][x][3]; y++) {
                            rewards += " ";
                        }
                        rewards += "#z" + rewardArrays[i][1][x][0] + "# จำนวน " + constants.numberWithCommas(rewardArrays[i][1][x][1]) + " ชิ้น " + (rewardArrays[i][1][x][2] > 0 ? "(" + rewardArrays[i][1][x][2] + " วัน)" : "" );
                        rewards += "\r\n";                        
                    }
                    if (!cm.canHoldAll(rewardItems, rewardQuantities)) {
                        cm.getPlayer().dropMessage(1, "ช่องเก็บของคุณเต็ม\r\nกรุณาตรวจสอบช่องเก็บของอีกครั้ง");
                        cm.dispose();
                        cm.getPlayer().getClient().removeClickedNPC();                
                        return;
                    }

                    for (z = 0; z < rewardArrays[i][1].length; z++) {
                        cm.gainItem(rewardArrays[i][1][z][0], rewardArrays[i][1][z][1], false, true, rewardArrays[i][1][z][2] * 24 * 60 * 60 * 1000);
                    }                    
                    
                    if (rewardArrays[i][2] > 0) {
                        rewards += "\t#fItem/Special/0900.img/09000003/iconRaw/0#\t" + constants.numberWithCommas(rewardArrays[i][2]) + " Meso#k#n\r\n";
                        cm.gainMeso(rewardArrays[i][2]);
                    }                    

                    if (rewardArrays[i][3] > 0) {
                        rewards += "\r\n\t#fItem/Special/MaplePoint.img/" + rewardArrays[i][3] + "/iconRaw#\t" + constants.numberWithCommas(rewardArrays[i][3]) + " Maple Point#k#n\r\n";
                        cm.getPlayer().getCashShop().gainCash(2, rewardArrays[i][3]);
                    }

                    cm.forceCompleteQuest(100000 + rewardArrays[i][0]);
                }
            }            
            cm.sendOk(rewards);
            cm.dispose();
        }
    }
}