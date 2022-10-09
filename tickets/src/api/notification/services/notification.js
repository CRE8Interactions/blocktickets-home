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
  async acceptTransferNotification(user) {
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
  },
  async transferTickets(params) {
    let url;
    if (process.env.NODE_ENV === 'preview') url = 'https://preview.blocktickets.xyz';
    if (process.env.NODE_ENV === 'production') url = 'https://blocktickets.xyz';

    await client.messages
      .create({
        body: `${params.data.fromUser.firstName} ${params.data.fromUser.lastName} is sending you ticket(s) to ${params.data.event.name}. To Accept: ${url}`,
        messagingServiceSid: notificationsServiceSid,
        to: params.data.phoneNumberToUser,
        from: process.env.NODE_ENV === 'development' ? myPhone : smsNotificationsNumber,
      })
      .then(message => console.log(message.body))
      .catch(error => console.log('Twilio Transfer Notification Error ', error))
      .done()
  },
  async guestListNotification(guestList, event) {
    let url;
    if (process.env.NODE_ENV === 'preview') url = 'https://preview.blocktickets.xyz';
    if (process.env.NODE_ENV === 'production') url = 'https://blocktickets.xyz';
    if (process.env.NODE_ENV === 'development') url = 'http:localhost:3001';

    await client.messages
      .create({
        body: `Blocktickets: ${guestList.firstName} you've been added to the guestlist for ${event.name}. Access Passes at: ${url}`,
        messagingServiceSid: notificationsServiceSid,
        to: guestList.phoneNumber,
        from: process.env.NODE_ENV === 'development' ? myPhone : smsNotificationsNumber,
      })
      .then(message => console.log(message.body))
      .catch(error => console.log('Twilio Transfer Notification Error ', error))
      .done()
  }
}))
