const amqp = require('amqplib');

let channel, connection;

const connectRabbitMQ = async () => {
  try {
    connection = await amqp.connect(process.env.RABBITMQ_URL);
    channel = await connection.createChannel();
    console.log("✅ Connected to RabbitMQ");
  } catch (err) {
    console.error("❌ RabbitMQ connection failed", err);
  }
};

const getChannel = () => channel;

module.exports = { connectRabbitMQ, getChannel };
