const TelegramApi = require('node-telegram-bot-api')

const token = '6569694807:AAGSlCP1YWxKoROm2rVVxDHa_M2O93Z5Rb4'

const bot = new TelegramApi(token, {polling: true})


const start = () => {
    const userData = [
        { id: 755586498, name: 'maketostep', points: 2 },
        { id: 5877407418, name: 'bettermaker', points: 0 },
    ]
    
    function getPoints(ID) {
        const finded = userData.find(user => user.id === ID)
        return finded.points
    }
    
    bot.setMyCommands([
        {command: '/points', description: 'Узнать количество пивных очков'}
    ])
    
    bot.on('message', msg => {
        const text = msg.text
        const chatId = msg.chat.id
        const userId = msg.from.id

        if(text === '/points') {
            if( userData.find(user => user.id === userId) === undefined) {
                userData.push({ id: userId, name: msg.from.username, points: 0})
                return bot.sendMessage(chatId, `У тебя ${getPoints(userId)} пивных очка (очков)`) 
            } else {
                return bot.sendMessage(chatId, `У тебя ${getPoints(userId)} пивных очка (очков)`)
            }
        }
        if(text.startsWith('/add') && text[4] === ' ') {
            const target = msg.reply_to_message.from.first_name
            const targetId = msg.reply_to_message.from.id
            if(userId !== 755586498) {
                return bot.sendMessage(chatId, 'У вас нет доступа к этой команде.')
            } else {
                let num = 0;
                if(text[6] === undefined) {
                    num = Number(text[5])
                    // getPoints(targetId) += num
                    getPoints(targetId) + num
                    return bot.sendMessage(chatId, `${target} получил ${num} очков пива`)
                } else {
                    num = Number(text[5] + text[6])
                    getPoints(targetId) + num
                    return bot.sendMessage(chatId, `${target} получил ${num} очков пива`)
                }
            }
        }
    })
}

start()