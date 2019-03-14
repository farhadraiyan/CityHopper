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
  let reqFields = ['userId']
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
  let userId = req.params.userid

  let allMessages
  try {
    allMessages = Message.find({ $or: [{ 'from': userId }, { 'to': userId }] })
    if (allMessages.length < 0 || !allMessages) {
      return res.status(400).send({
        error: 'Error getting all messages for the user, try agian later'
      })
    }
  } catch (error) {
    return res.status(400).send({
      error: error.message
    })
  }
  return res.status(200).send({
    message: 'Success',
    data: allMessages
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

module.exports = {
  findAll,
  findMessageById,
  findMessagesBySenderId,
  sendMessage
}
