var status = 0;
var TenPercentageScroll = 
    Array (
        2041308,
        2041305,
        2041311,
        2041302,
        2040602,
        2040612,
        2040627,
        2040622,
        2040619,
        2044502,
        2041058,
        2041020,
        2041008,
        2041017,
        2041023,
        2041002,
        2041011,
        2041014,
        2041005,
        2044702,
        2044602,
        2043302,
        2040310,
        2040318,
        2040329,
        2040328,
        2040302,
        2040330,
        2040323,
        2040331,
        2040200,
        2040205,
        2040105,
        2040100,
        2040805,
        2040802,
        2040825,
        2040816,
        2044902,
        2040016,
        2040002,
        2040031,
        2040005,
        2040026,
        2044809,
        2044802,
        2043114,
        2043102,
        2043214,
        2043202,
        2043019,
        2043002,
        2043008,
        2040505,
        2040502,
        2040514,
        2040517,
        2040534,
        2048005,
        2048002,
        2044402,
        2044414,
        2041108,
        2041105,
        2041111,
        2041102,
        2040902,
        2040928,
        2040925,
        2040920,
        2040933,
        2040915,
        2040760,
        2040702,
        2040705,
        2040708,
        2044314,
        2044302,
        2040727,
        2043802,
        2040402,
        2040422,
        2040412,
        2040427,
        2040419,
        2044114,
        2044102,
        2044214,
        2044202,
        2044014,
        2044002,
        2044015,
        2043702       
    );

var SixtyPercentageScroll =
    Array (
        2041307,
        2041304,
        2041310,
        2041301,
        2040601,
        2040613,
        2040625,
        2040621,
        2040618,
        2044501,
        2041019,
        2041007,
        2041016,
        2041022,
        2041001,
        2041010,
        2041013,
        2041004,
        2044701,
        2044601,
        2043301,
        2040311,
        2040317,
        2040326,
        2040301,
        2040321,
        2040201,
        2040206,
        2040106,
        2040101,
        2040804,
        2040826,
        2040801,
        2040824,
        2040817,
        2044901,
        2040017,
        2040001,
        2040029,
        2040004,
        2040025,
        2044807,
        2044801,
        2043112,
        2043101,
        2043212,
        2043201,
        2043017,
        2043001,
        2043009,
        2040504,
        2040501,
        2040513,
        2040516,
        2040532,
        2048012,
        2048011,
        2048004,
        2048013,
        2048001,
        2048010,
        2044401,
        2044412,
        2041107,
        2041104,
        2041110,
        2041101,
        2040901,
        2040927,
        2040924,
        2040919,
        2040931,
        2040914,
        2040759,
        2040701,
        2040704,
        2040707,
        2044312,
        2044301,
        2043801,
        2040401,
        2040421,
        2040413,
        2040425,
        2040418,
        2044112,
        2044101,
        2044212,
        2044201,
        2044012,
        2044001,
        2043701      
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
        } else if (status == 2 && mode == 0) {
            cm.sendNext("สงสัยเธอคงยังไม่เข้าใจในพลังของฉัน ไว้คราวหน้า คุยกับฉันอีกครั้ง แล้วฉันจะแสดงพลังให้เธอดู");
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
            home = "พลังที่ฉันมีอยู่ มันก็ไม่ได้มีอะไรมากหรอก เธออยากลองดูมั้ย?";
            home += "\r\n#L0#สุ่ม 10 Scroll เพื่อแลกเป็น Scroll ชิ้นใหม่#l";
            home += "\r\n#L1#ตรวจสอบรายชื่อไอเทม Scroll 10% ที่ได้รับจากการสุ่ม#l";
            home += "\r\n#L2#ตรวจสอบรายชื่อไอเทม Scroll 60% ที่ได้รับจากการสุ่ม#l";
            cm.sendSimple(home);
        } else if (status == 1) {
            rewards = "";
            if (selection > 0) {
                status = -1;
                rewards += "#eรายชื่อไอเทมที่จะได้รับจากการสุ่มมีดังนี้#n\r\n\r\n";
                if (selection == 1) {
                    for (i = 0; i < TenPercentageScroll.length; i++) {
                        rewards += "\t#i" + TenPercentageScroll[i] + "#\t#z" + TenPercentageScroll[i] + "#";
                        rewards += "\r\n";
                    }                
                } else {
                    for (i = 0; i < SixtyPercentageScroll.length; i++) {
                        rewards += "\t#i" + SixtyPercentageScroll[i] + "#\t#z" + SixtyPercentageScroll[i] + "#";
                        rewards += "\r\n";
                    }
                }
                cm.sendOk(rewards);
            } else {
                detected = 0;
                rewards += "#eกรุณาเลือก Scroll ที่ต้องการทำการสุ่ม#n";
                for (i = 0; i < TenPercentageScroll.length; i++) {
                    if (cm.getPlayer().getItemQuantity(TenPercentageScroll[i], false) >= 10) {
                        detected++;
                        rewards += "\r\n#L" + TenPercentageScroll[i] + "##i" + TenPercentageScroll[i] + "#\t#z" + TenPercentageScroll[i] + "# (มีอยู่ " + cm.getPlayer().getItemQuantity(TenPercentageScroll[i], false) + " ชิ้น)";
                    }
                }
                for (i = 0; i < SixtyPercentageScroll.length; i++) {
                    if (cm.getPlayer().getItemQuantity(SixtyPercentageScroll[i], false) >= 10) {
                        detected++;
                        rewards += "\r\n#L" + SixtyPercentageScroll[i] + "##i" + SixtyPercentageScroll[i] + "#\t#z" + SixtyPercentageScroll[i] + "# (มีอยู่ " + cm.getPlayer().getItemQuantity(SixtyPercentageScroll[i], false) + " ชิ้น)";
                    }
                }
                if (detected == 0) {
                    cm.sendOk("ไม่พบ Scroll ที่สามารถแลกได้");
                    cm.dispose();
                    cm.getPlayer().getClient().removeClickedNPC();
                    return;    
                }
                cm.sendSimple(rewards);
            }
        } else if (status == 2) {
            scrollType = 0;
            itemExchange = selection;
            for (i = 0; i < TenPercentageScroll.length; i++) {
                if (TenPercentageScroll[i] == itemExchange) {
                    scrollType = 1;
                }
            }
            for (i = 0; i < SixtyPercentageScroll.length; i++) {
                if (SixtyPercentageScroll[i] == itemExchange) {
                    scrollType = 2;
                }
            }            
            cm.sendYesNo("คุณต้องการนำ Scroll ต่อไปนี้ มาสุ่มแลกเป็น Scroll ชิ้นใหม่ใช่หรือไม่?\r\n\r\n#i" + selection + "#\t#z" + selection + "# จำนวน 10 ชิ้น");
        } else if (status == 3) {
            if (scrollType == 0) {
                cm.sendOk("เกิดข้อผิดพลาด กรุณาแจ้งผุ้ดูแล");
                cm.dispose();
                cm.getPlayer().getClient().removeClickedNPC();
                return; 
            }
            
            newArray = scrollType == 1 ? TenPercentageScroll : SixtyPercentageScroll;

            const ArrayList = Java.type('java.util.ArrayList');

            validItems = new ArrayList();
            for (i = 0; i < newArray.length; i++) {
                if (newArray[i] != itemExchange) {
                  validItems.add(newArray[i]);
                }
            }            

            index = Math.floor(Math.random() * validItems.size());
            newItem = validItems.get(index);

            if (isFull(2)) {
                cm.getPlayer().dropMessage(1, "ช่องเก็บของคุณเต็ม\r\nกรุณาตรวจสอบช่องเก็บของ\r\nประเภท " + Java.type('client.inventory.InventoryType').getByType(2).name() + " อีกครั้ง");
                cm.dispose();
                cm.getPlayer().getClient().removeClickedNPC();                
                return;
            }

            cm.sendOk("อะบรา...คาดาบรา!! รับไปซะ นี่คือ Scroll ชิ้นใหม่ของเธอ\r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0#\r\n\r\n\t#i" + newItem + "#\t#z" + newItem + "# จำนวน 1 ชิ้น");
            cm.gainItem(newItem, 1)
            cm.gainItem(itemExchange, -10);
            cm.dispose();
        }
    }
}

function isFull(slot) {
    return cm.getInventory(slot).isFull(0);
}