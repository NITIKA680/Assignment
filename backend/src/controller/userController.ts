import { Request, Response } from 'express';
import Joi from 'joi';
import SendResponse from '../utils/response';
import StatusCodeEnum from '../utils/status';
import userStore from '../store/userStore';
import userInterface from '../interface/userInterface';
import MessageEnum from '../utils/msg';

const Store = new userStore()

export default class UserController {

    /**
     * Handles the creation of a new user.
     * 
     * Validates the request body, checks if a user with the provided email already exists,
     * and creates a new user if the email is not already in use.
     * 
     * @param req Request object containing the user data to be created
     * @param res Response object to send the result of the operation
     */

    public async newUser(req: Request, res : Response) {
        const schema = Joi.object().keys({
            user: Joi.string().required(),
            email: Joi.string().required(),
            interest: Joi.array().items(Joi.string().required()).required(),
            age: Joi.number().required(),
            mobile: Joi.number().required(),
        });

        const params = schema.validate(req.body, { abortEarly: false });
        if (params.error) {   
            return SendResponse(res, params.error, StatusCodeEnum.BAD_REQUEST);
        }
        const { email  } = req.body;
        try 
        {
            const userExist = await Store.findUserByEmail(email)
            if(userExist) {            
                return SendResponse(res, params.error,MessageEnum.USER_EXIST, StatusCodeEnum.BAD_REQUEST);
            }   
            const user = await Store.createUser(params.value)
            return SendResponse(res, user, StatusCodeEnum.OK);
        } catch (err) {
            return SendResponse(res, err.message, StatusCodeEnum.INTERNAL_SERVER_ERROR);
        }
        
    }

    /**
     * Handles the editing of an existing user.
     * 
     * Validates the request body, checks if a user with the provided email exists,
     * and updates the user's information if the user exists.
     * 
     * @param req Request object containing the updated user data
     * @param res Response object to send the result of the operation
     */

    public async editUser(req: Request, res: Response) {
        const schema = Joi.object({
            user: Joi.string().required(),
            email: Joi.string().email().required(),
            interest: Joi.array().items(Joi.string().required()).required(),
            age: Joi.number().required(),
            mobile: Joi.number().required().allow(null),
        });
        const { error, value } = schema.validate(req.body, { abortEarly: false });
        if (error) {
            return SendResponse(res, error.details, StatusCodeEnum.BAD_REQUEST);
        }
        const { email } = value;
        try {
            const userExist = await Store.findUserByEmail(email);
            if (!userExist) {
                return SendResponse(res, MessageEnum.NOT_EXIST, StatusCodeEnum.BAD_REQUEST);
            }
            const updatedUser = await Store.updateUser(email, value);            
            return SendResponse(res, updatedUser,"User updated Succefully", StatusCodeEnum.OK);
        } catch (err) {
            return SendResponse(res, err.message, StatusCodeEnum.INTERNAL_SERVER_ERROR);
        }
    }
    

    /**
     * Finds all users.
     * 
     * Retrieves all users from the database and sends the list of users as a response.
     * 
     * @param req Request object (not used)
     * @param res Response object to send the list of users
     */

    public async find(req: Request, res: Response) {
        try {
            const users: userInterface[] = await Store.findAllUsers();
            return SendResponse(res, users, MessageEnum.ALL_USERS, StatusCodeEnum.OK);
        } catch (error) {
            return SendResponse(res, error.message, StatusCodeEnum.INTERNAL_SERVER_ERROR);
        }
    }

   /**
     * Finds a single user by ID.
     * 
     * Retrieves a single user from the database based on the provided ID
     * and sends the user details as a response.
     * 
     * @param req Request object containing the user ID
     * @param res Response object to send the user details
     */

    public async findOne(req: Request, res: Response) {
        try {
            const userId = req.params.id;
            const user: userInterface = await Store.findOneUser(userId);
            if (!user) {
                return SendResponse(res, MessageEnum.INVALID_USER_ID, StatusCodeEnum.NOT_FOUND);
            }
            return SendResponse(res, user, MessageEnum.USER_DETAIL, StatusCodeEnum.OK);
        } catch (error) {
            return SendResponse(res, error.message, StatusCodeEnum.INTERNAL_SERVER_ERROR);
        }
    }

    /**
 * Deletes a single user by ID.
 * 
 * Deletes a single user from the database based on the provided ID.
 * 
 * @param req Request object containing the user ID
 * @param res Response object to send the deletion status
 */

public async deleteOne(req: Request, res: Response) {
    try {
        const userId = req.body._id;
        const user: userInterface = await Store.deleteUser(userId);
        if (!user) {
            return SendResponse(res, MessageEnum.INVALID_USER_ID, StatusCodeEnum.NOT_FOUND);
        }
        return SendResponse(res,[], MessageEnum.USER_DELETED, StatusCodeEnum.OK);
    } catch (error) {
        return SendResponse(res, error.message, StatusCodeEnum.INTERNAL_SERVER_ERROR);
    }
}

    

} 