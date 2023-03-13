const User = require('./db');

const start = async (ctx) => {
    const snapshot = await User.orderBy('timestamp', 'desc').where('id_tele', '==', ctx.chat.id).get();
    const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    const ID = 1000 + data.length;

    const toString = (ID) => { return ID.toString() };
    console.log(data.length)
    if (data.length == 0) {
        var user = {
            "id_pribadi": toString(ID),
            "id_tele": ctx.chat.id,
            "timestamp": FieldValue.serverTimestamp()
        };
        await User.add(user);
    };
}

const setname = async (ctx) => {
    const query = ctx.message.text.split(' ').slice(1).join(' ');
    const snapshot = await User.orderBy('timestamp', 'desc').where('id_tele', '==', ctx.chat.id).get();
    const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    if(!query) {
        return ctx.reply('Untuk mengubah nama, ketik /setname (namabaru)\n\nHanya gunakan huruf dan angka latin(10.000? per ganti)')
    };

    var user = {
        "nama": query
    };

    await User.doc(data[0].id).update(user);
    return ctx.reply('Nama berhasil diubah')
};

module.exports = setname;