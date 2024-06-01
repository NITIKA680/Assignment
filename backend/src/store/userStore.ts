import { userModel } from "../model/user";
import userInterface from "../interface/userInterface";


export default class userStore {

    public async createUser(data : userInterface) {
        return userModel.create(data)         
    }

    public async updateUser(email: string, data: userInterface) {
        try {
            const updatedUser = await userModel.findOneAndUpdate({ email }, data, { new: true, runValidators: true });
            if (!updatedUser) {
                throw new Error('User not found');
            }
            return updatedUser;
        } catch (error) {
            throw new Error(`Failed to update user: ${error.message}`);
        }
    }

    async findUserByEmail(email : string) {
       const user = await userModel.findOne({email})
        if(!user) {
          return null
        }
        return user
    }

    async findAllUsers() {
        return await userModel.find()
    }

    async findOneUser(userId: string) {
        return await userModel.findById(userId)
    }

    async deleteUser(userId: string) {
        try {
            const deletedUser = await userModel.findByIdAndDelete(userId);
            return deletedUser;
        } catch (error) {
            throw new Error('Error deleting user: ' + error.message);
        }
    }
        
}