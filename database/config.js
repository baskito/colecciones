const mongoose = require('mongoose');

const dbConnection = async() => {

    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect('mongodb+srv://mean_user_colec:IninCqUTUn7401iF@cluster0.b1wx4.mongodb.net/test?tlsInsecure=true');
        // await mongoose.connect('mongodb+srv://mean_user_colec:IninCqUTUn7401iF@cluster0.b1wx4.mongodb.net/test?tls=true&tlsInsecure=true&tlsCertificateKeyFile=C%3A%5Cmongosh%5Cbin%5Cdevice1.includesprivatekey.pem');

        console.log('BD Online');
    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de iniciar la BB ver logs');
    }
}

module.exports = {
    dbConnection
}