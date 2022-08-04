const mongo = require('mongoose');

async function connect() {
  try {
    await mongo.connect('mongodb://localhost:27017/Ecommerce', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connection Succes!!!');
  } catch (error) {
    console.log('Connection Failed!!!');
  }
}

module.exports = { connect };
