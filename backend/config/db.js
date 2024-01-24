// const mongoose = require('mongoose');

// const connectDB = async () => {
//   try {
//     await mongoose.connect(process.env.MONGODB_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       useCreateIndex: true,
//     });
//     console.log('Connected to MongoDB');
//   } catch (error) {
//     console.error('Error connecting to MongoDB:', error.message);
//     process.exit(1); // Exit process with failure
//   }
// };

// module.exports = connectDB;

const { error } = require('console');
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI)
        console.log(`MongoDB Connected ${conn.connection.host}`.cyan.underline)
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1)
    }
}

module.exports = connectDB;