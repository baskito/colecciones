const mongoose = require('mongoose');

const dbConnection = async() => {

    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect(process.env.DB_CNN_HOME);
        // await mongoose.connect(process.env.DB_CNN);

        console.log('BD Online');
    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de iniciar la BB ver logs');
    }
}

module.exports = {
    dbConnection
}