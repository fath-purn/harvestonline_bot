const { FieldValue } = require('@google-cloud/firestore');
const User = require('./db');

const start = async (ctx) => {
    const snapshot = await User.orderBy('timestamp', 'desc').where('id_tele', '==', ctx.chat.id).get();
    const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    const ID = 1000 + data.length;

    const toString = (ID) => { return ID.toString() };

    if (data.length == 0) {
        var user = {
            "id_pribadi": toString(ID),
            "id_tele": ctx.chat.id,
            "timestamp": FieldValue.serverTimestamp(),
            "nama": ctx.chat.first_name,
            "uang": 100000000000000,
            "gem": 20,
            "exp": 0,
            "max_exp": 300,
            "energi": 60,
            "max_energi": 60,
            "level": 1
        };
        await User.add(user);
    };
}

module.exports = start;