import fetch from 'node-fetch';
import translate from '@vitalets/google-translate-api'; // Import the Google Translate API
const handler = (m) => m;

handler.before = async (m) => {
  const chat = global.db.data.chats[m.chat];
  if (chat.simi) {
    if (/^.*false|disnable|(turn)?off|0/i.test(m.text)) return;
    let textodem = m.text;
    try {
      const ressimi = await fetch(`https://api.simsimi.net/v2/?text=${encodeURIComponent(textodem)}&lc=ar`);
      const data = await ressimi.json();
      // If you don't want to send a message in this scenario, just remove the following line:
      // if (data.success == 'No s\u00e9 lo qu\u00e9 est\u00e1s diciendo. Por favor ense\u00f1ame.') return m.reply(`${lol}`); 
      // Translate Simsimi's response to Arabic
      const translatedResponse = await translate(data.success, { from: 'en', to: 'ar' }); 
      await m.reply(translatedResponse.text); // Send the translated response
    } catch {
      // ... (rest of the code remains the same)
    }
    return !0;
  }
  return true;
};
export default handler;
