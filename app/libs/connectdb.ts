

import mongoose from 'mongoose';

const {MONGODB_PASSWORD} = process.env;

if(!MONGODB_PASSWORD){
    throw new Error("Invalid env variables: MONGO_PASSQORD");
}

export const connectDB = async () => {
    try{
        const { connection } = await mongoose.connect(MONGODB_PASSWORD as string);

        if(connection.readyState === 1){
            return Promise.resolve(true);
        }

    }catch(err){
        return Promise.reject(err);
    }
}


