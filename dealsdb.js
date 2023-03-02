const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/Topkart', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to database');
}).catch((error) => {
  console.log('Error connecting to database', error);
});

module.exports = mongoose;
