



import { NextFunction, Request, Response } from 'express';
import config from '../../config';
import { JwtPayload, Secret } from 'jsonwebtoken';
import httpStatus from 'http-status';
import ApiError from '../../errors/ApiErrors';
import { jwtHelpers } from '../../helpars/jwtHelpers';
import User from '../modules/User/user.model';

const extractToken = (authorizationHeader?: string): string | null => {
  if (!authorizationHeader) return null;
  const parts = authorizationHeader.split(' ');
  return parts.length === 2 ? parts[1] : authorizationHeader;
};

const auth = (...roles: string[]) => {
  return async (
    req: Request & { user?: any },
    res: Response,
    next: NextFunction
  ) => {
    try {
      const token = extractToken(req.headers.authorization);
      console.log("token is", token)
      if (!token) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
      }

      const verifiedUser = jwtHelpers.verifyToken(
        token,
        config.jwt.access_token_secret as Secret
      );

      if (!verifiedUser?.email) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
      }

      const user = await User.findOne({ email: verifiedUser.email });

      if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User not found!');
      }


      

      if (roles.length && !roles.includes(user.role)) {
        throw new ApiError(
          httpStatus.FORBIDDEN,
          'Forbidden! You are not authorized!'
        );
      }
      req.user = user;

      next();
    } catch (err) {
      next(err);
    }
  };
};



export default auth;
