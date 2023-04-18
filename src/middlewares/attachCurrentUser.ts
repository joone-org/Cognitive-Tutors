import { NextFunction, Request, Response } from 'express';
import { userServiceInstance } from '../services';

const attachCurrentUser = (activeOnly = true) => {
	return async (req: Request, res: Response, next: NextFunction) => {

		const user = req.token;

		try {
			const client = await userServiceInstance.getUserById(user.userId);

			if (!client) return res.sendStatus(403)

			// if (client.status === 'banned') return res.status(503).json({
			//     status: 'error',
			//     message: 'Sorry, you have been banned as you violated our terms and use.'
			// })

			if (client) {
				Reflect.deleteProperty(client, 'password');
				Reflect.deleteProperty(client, '_id');
			}

			req.currentUser = client;
			next();
		} catch (e) {
			// throw new Error('Internal Error');
			// console.log(e)
			return res.sendStatus(403)
		}

	};
}

export default attachCurrentUser;
