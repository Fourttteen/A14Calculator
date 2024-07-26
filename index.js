const TelegramBot = require('node-telegram-bot-api')

const token = '7368834237:AAE4eebaZlUgXApJuA_t1IwwGJZ58_Ml2I0'

const bot = new TelegramBot(token, { polling: true })

const commands = [
  {
    command: "start",
    description: "Starts the bot"
  },
  {
    command: "help",
    description: "Help menu"
  },
  {
    command: "clear",
    description: "Clears the chat"
  },
  {
    command: "add",
    description: "Adds two numbers"
  },
  {
    command: "sub",
    description: "Subtracts two numbers"
  },
  {
    command: "mul",
    description: "Multiplies two number"
  },
  {
    command: "div",
    description: "Divides two numbers"
  },
]
const ids = []
bot.setMyCommands(commands)
bot.on('text', async (msg) => {
  const chatId = msg.chat.id

  ids.push(msg.message_id)

  if (msg.text === '/start') {
    const message = await bot.sendMessage(chatId, 'The bot has started, type /help for help', {})
    ids.push(message.message_id)
  } else if (msg.text === "/help") {
    const message = await bot.sendMessage(chatId, '/add <Number1> <Number2> - add two numbers\n/sub <Number1> <Number2> - subtract two numbers\n/mul <Number1> <Number2> - multiply two numbers\n/div <Number1> <Number2> - divide two numbers\n/clearchat - delete chat history', {
    })
    ids.push(message.message_id)
  } else if (msg.text.startsWith('/add')) {
    const addnum1 = +msg.text.split(' ')[1]
    const addnum2 = +msg.text.split(' ')[2]
    const message = await bot.sendMessage(chatId, addnum1 + addnum2, {
    })
    ids.push(message.message_id)
  } else if (msg.text.startsWith('/sub')) {
    const subnum1 = +msg.text.split(' ')[1]
    const subnum2 = +msg.text.split(' ')[2]
    const message = await bot.sendMessage(chatId, subnum1 - subnum2, {
    })
    ids.push(message.message_id)
  } else if (msg.text.startsWith('/mul')) {
    const mulnum1 = +msg.text.split(' ')[1]
    const mulnum2 = +msg.text.split(' ')[2]
    const message = await bot.sendMessage(chatId, mulnum1 * mulnum2, {
    })
    ids.push(message.message_id)
  } else if (msg.text.startsWith('/div')) {
    const divnum1 = +msg.text.split(' ')[1]
    const divnum2 = +msg.text.split(' ')[2]
    const message = await bot.sendMessage(chatId, divnum1 / divnum2, {
    })
    ids.push(message.message_id)
  } else if (msg.text === ('/clear')) {
    bot.deleteMessages(chatId, ids)
  } else {
    const message = await bot.sendMessage(chatId, 'Did not recognise the command\nIf you need help, type /help', {
    })
    ids.push(message.message_id)
  }
})