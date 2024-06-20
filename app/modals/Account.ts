import mongoose from 'mongoose';

const AccountSchema = new mongoose.Schema({
    providers: {
        type: String
    },
    type: { 
        type: String
    },
    providersAccountId: {
        type: String
    },
    access_token: {
        type: String
    },
    expires_at: {
        type: Date
    },
    scope: {
        type: String
    },
    token_type: {
        type: String
    }, 
    id_token: {
        type: String
    },
    userId: {
        type: String,
        ref: "User"
    }
});

const Account = mongoose.models.Account || mongoose.model("Account", AccountSchema);
export default Account;