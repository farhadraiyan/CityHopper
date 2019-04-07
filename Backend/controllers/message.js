var User = require('../models/user');
const Message = require('../models/message')
const _ = require('lodash')

let findAll = async function (req, res) {
  let all
  try {
    all = await Message.find({})
  } catch (error) {
    res.status(400).send({
      message: 'Error getting messages..',
      error: error.message
    })
  }
  res.status(200).send({
    message: 'Success',
    data: all
  })
}

let findMessageById = async function (req, res) {
  let errors = {}
  let reqFields = ['messageId']
  console.log(req.params)
  // add fields to error if errors getting user information
  reqFields.forEach(function (field) {
    if (!req.params[field] || req.params[field] === '') {
      errors[field] = `${field.replace(/_/g, ' ')} is required`
    }
  })
  if (Object.keys(errors).length) {
    return res.status(400).send({
      msg: 'error finding message',
      errors: errors,
    })
  }
  let messageID = req.params.messageId
  let message
  try {
    message = await Message.findById(messageID)
    if (!message) {
      return res.status(400).send({
        message: 'Error retriving message'
      })
    }
  } catch (error) {
    return res.status(400).send({
      message: 'Error retriving message',
      error: error.message
    })
  }
  return res.status(200).send({
    message: 'Success',
    data: message
  })
}

let findMessagesBySenderId = async function (req, res) {
  let errors = {}
  let reqFields = ['userid']
  // add fields to error if errors getting user information
  reqFields.forEach(function (field) {
    if (!req.body[field] || req.body[field] === '') {
      errors[field] = `${field.replace(/_/g, ' ')} is required`
    }
  })

  if (Object.keys(errors).length) {
    return res.status(400).send({
      msg: 'error finding message',
      errors: errors,
    })
  }
  let userId = req.body.userid
  console.log(userId)
  let sentMessages
  try {
    sentMessages = await Message.find({'from': userId})
  } catch (error) {
    return res.status(400).send({
      error: error.message
    })
  }
  let recievedMessages
  try {
    recievedMessages = await Message.find({'to': userId})
  } catch (error) {
    return res.status(400).send({
      error: error.message
    })
  }
  let messagesSent = []
  if (sentMessages.length > 0) {
    let sender
    try {
      sender = await User.findById(sentMessages[0].from)
    } catch (error) {
      return res.status(400).send({
        error: error.message
      })
    }
    for (let message of sentMessages) {
      let reciever
      try {
        reciever = await User.findById(message.to)
      } catch (error) {
        return res.status(400).send({
          error: error.message
        })
      }
      let data = {
        id: message._id,
        message: message.message,
        to: {
          name: `${reciever.firstName} ${reciever.lastName}`,
          id: reciever._id
        },
        from: {
          name: `${sender.firstName} ${sender.lastName}`,
          id: sender._id
        },
        time: message.time_created
      }
      messagesSent.push(data)
    }
  }

  let messagesRecieved = []
  if (recievedMessages.length > 0) {
    let sender
    try {
      sender = await User.findById(recievedMessages[0].to)
    } catch (error) {
      return res.status(400).send({
        error: error.message
      })
    }
    for (let message of recievedMessages) {
      let reciever
      try {
        reciever = await User.findById(message.from)
      } catch (error) {
        return res.status(400).send({
          error: error.message
        })
      }
      let data = {
        id: message._id,
        message: message.message,
        to: {
          name: `${sender.firstName} ${sender.lastName}`,
          id: sender._id
        },
        from: {
          name: `${reciever.firstName} ${reciever.lastName}`,
          id: reciever._id
        },
        time: message.time_created
      }
      messagesRecieved.push(data)
    }
  }


  return res.status(200).send({
    sent: messagesSent,
    recieved: messagesRecieved
  })
}

let sendMessage = async function (req, res) {
  let errors = {}
  let reqFields = ['to', 'from', 'message']
  // add fields to error if errors getting user information
  reqFields.forEach(function (field) {
    if (!req.body[field] || req.body[field] === '') {
      errors[field] = `${field.replace(/_/g, ' ')} is required`
    }
  })

  if (Object.keys(errors).length) {
    return res.status(400).send({
      msg: 'error finding message',
      errors: errors,
    })
  }

  let data = _.pick(req.body, reqFields)

  let newMessage

  try {
    newMessage = await new Message(data)
  } catch (error) {
    return res.status(400).send({
      message: 'Error sending user message',
      error: error.message
    })
  }

  let savedMessage
  try {
    savedMessage = await newMessage.save()
  } catch (error) {
    return res.status(400).send({
      message: 'Error saving message',
      error: error.message
    })
  }
  res.status(200).send({
    message: 'Success',
    data: savedMessage
  })
}

let deleteMessage = async (req, res) => {
  let errors = {}
  let reqFields = ['msgId']
  reqFields.forEach(function(field){
    if(!req.body[field] || req.body[field] === ''){
      errors[field] = `${field.replace(/_/g,' ')} is required`
    }
  })
  if(Object.keys(errors).length){
    return res.status(400).send({
      msg: 'error deleting car',
      errors: errors
    })
  }

  let data = req.body
  console.log(data)
  let deleteMessage 
  try {
    deleteMessage = await Message.findByIdAndDelete(data.msgId)
    if(!deleteMessage){
      return res.status(400).send({
        msg: "Could not delete Message, Please try again"
      })
    }
    return res.status(200).send({
      msg: "Message Deleted Successfully",
      deleteMessage: deleteMessage
    })
  } catch (error) {
    return res.status(404).send({
      msg: "Message Not found"
    })
  }
}

module.exports = {
  findAll,
  findMessageById,
  findMessagesBySenderId,
  sendMessage,
  deleteMessage
}
