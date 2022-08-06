const notificationsServiceSid = process.env.MESSAGING_NOTIFICATIONS_SERVICE_SID;
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const smsNumber = process.env.SMS_NUMBER;
const smsNotificationsNumber = process.env.SMS_NOTIFICATIONS_NUMBER;
const myPhone = process.env.TWILIO_PHONE;
const client = require('twilio')(accountSid, authToken);

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::notification.notification', ({ strapi }) => ({
  async loginNotification(code, phoneNumber) {
    await client.messages
      .create({
        body: `Blocktickets: ${code} is your verification code. Code expires in 5 minutes. Do not share with anyone.`,
        messagingServiceSid: notificationsServiceSid,
        to: phoneNumber,
        from: process.env.NODE_ENV === 'development' ? myPhone : smsNumber,
      })
      .then(message => console.log(message.body))
      .catch(error => console.log('Twilio Verification Error ', error))
      .done()
  },
  async acceptTransferNotification(entry, fromUser, user) {
    await client.messages
      .create({
        body: `Blocktickets: Great News!!!, ${user.firstName} has accepted your transfer`,
        messagingServiceSid: notificationsServiceSid,
        to: phoneNumber,
        from: process.env.NODE_ENV === 'development' ? myPhone : smsNumber,
      })
      .then(message => console.log(message.body))
      .catch(error => console.log('Twilio Verification Error ', error))
      .done()
  }
}))
