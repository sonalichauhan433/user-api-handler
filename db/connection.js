const Mongoose = require('mongoose');
Mongoose.Promise = Promise;

let options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  autoIndex: true,
  useUnifiedTopology: true,
  useFindAndModify:false,
};

// if (process.env.NODE_ENV === 'prod' || process.env.NODE_ENV ==='stage' ) {
//   options = {
//     ...options,
//     // replSet: {
//       // rs_name: "rs0",
//       // readPreference: "secondaryPreferred"
//     // }
//   };
// }
Mongoose.connect(process.env.MONGODB_URI + process.env.MONGODB_NAME, options);
const connection = Mongoose.connection;
connection.on('error', function () {
  console.log('MongoDB Connection Error. Please make sure that MongoDB is running.');
  process.exit(1);
});

connection.once('open',function callback(){
  console.log("Database ", Mongoose.connection.states[Mongoose.connection.readyState]);
})


