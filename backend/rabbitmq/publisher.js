const { getChannel } = require('./connection');

const publishToQueue = async (queueName, message) => {
  const channel = getChannel();
  if (!channel) return;

  await channel.assertQueue(queueName, { durable: true });
  channel.sendToQueue(queueName, Buffer.from(JSON.stringify(message)));
};

module.exports = { publishToQueue };
