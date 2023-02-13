import HttpStatus from 'http-status-codes';
import * as UserService from '../services/user.service';


/**
 * Controller to create a new user
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const registerNewUser = async (req, res, next) => {
	try {
		const data = await UserService.newUserRegister(req.body);
		res.status(HttpStatus.CREATED).json({
			code: HttpStatus.CREATED,
			data: data,
			message: 'User register successfully'
		});
	} catch (error) {
		next(error);
	}
};

/**
 * Controller to login a user
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const login = async (req, res, next) => {
	try {
		const data = await UserService.login(req.body);
		res.status(HttpStatus.OK).json({
			code: HttpStatus.OK,
			data: data,
			message: 'user login successfully'
		});
	} catch (error) {
		next(error);
	}
};

/**
 * Controller for forgotPassword
 * 
 */
export const forgotPassword = async (req, res, next) => {
	try {
		const data = await UserService.forgotPassword(req.body);
		res.status(HttpStatus.ACCEPTED).json({
			code: HttpStatus.ACCEPTED,
			data: data,
			message: `Link to reset password sent to your email 📧  `
		});
	} catch (error) {
		next(error);
	}
}