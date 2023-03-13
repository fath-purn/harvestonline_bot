const { Keyboard } = require("grammy");
const User = require('./db');

const status = async (ctx) => {
    const snapshot = await User.orderBy('timestamp', 'desc').where('id_tele', '==', ctx.chat.id).get();
    const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));


    const keyStatus = new Keyboard()
        .text("Status")
        .text("Jalan-jalan").row()
        .text("Barang")
        .text("Kebun")
        .text("Ternak")
        .resized().selected();


    const chatStatus = `==============================
👨‍🌾${data[0].nama} Lv.${data[0].level}👨
==============================
/setting - /address

Uang: ${data[0].uang}💰 /cash
Gem: ${data[0].gem} 💎 /gem

EXP: ${data[0].exp}/${data[0].max_exp}
Energi: ${data[0].energi}/${data[0].max_energi} /restore

==============================
`;
    return { chatStatus, keyStatus };
}



module.exports = status;