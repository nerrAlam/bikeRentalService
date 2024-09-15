
// all the imporst here
import { StatusCodes } from "http-status-codes";
import AppError from "../../error/appError";
import { TUser, TUserLogin } from "./user.interface";
import { User } from "./user.model";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../../config";

// store the use into the database
const signUpUserIntoDd = async (payload: TUser) => {

    const { email, phone } = payload;
    const userByEmail = await User.findOne({ email });


    if (userByEmail) {
        throw new AppError(StatusCodes.NOT_ACCEPTABLE, 'This User is allready exsist.');
    }

    const userByPhone = await User.findOne({ phone });

    if (userByPhone) {
        throw new AppError(StatusCodes.NOT_ACCEPTABLE, 'This User is allready exsist.');
    }

    const result = await User.create(payload);
    return result;
}



// user log in into data base
const userLoginIntoDb = async (payload: TUserLogin) => {
    const { email, password } = payload;


    const userByEmail = await User.findOne({ email });

    if (!userByEmail) {
        throw new AppError(StatusCodes.NOT_FOUND, 'Not Found');
    }

    if (userByEmail?.isDeleted === true) {
        throw new AppError(StatusCodes.FORBIDDEN, 'This user is deleted.');
    }


    if (userByEmail.password !== password) {
        throw new AppError(StatusCodes.UNAUTHORIZED, 'The password is not matched.');
    }

    const jwtPayload = {
        userEmail: userByEmail.email,
        userRole: userByEmail.role,
    }

    const accessToken = jwt.sign(
        jwtPayload,
        config.accessTokenSecret as string,
        {
            expiresIn: config.accessTokenExpires,
        }
    )

    return {
        accessToken,

    };
};


// get user from data base
const getUserFromDb = async (payload: string) => {

    let email;

    jwt.verify(payload, config.accessTokenSecret as string, function (error, decoded) {
        if (error) {
            throw new AppError(StatusCodes.UNAUTHORIZED, 'You have no access to this route.');
        }

        const { userEmail } = decoded as JwtPayload;
        email = userEmail;
    })

    const user = await User.findOne({ email });
    if (!user) {
        throw new AppError(StatusCodes.NOT_FOUND, 'Not Found.');
    }

    if (user?.isDeleted === true) {
        throw new AppError(StatusCodes.FORBIDDEN, 'This user is deleted.');
    }

    return user;
}



// update the user into data base
const updateUserIntoDb = async (userPayload: Partial<TUser>, tokenPayload: string) => {
    let email;

    jwt.verify(tokenPayload, config.accessTokenSecret as string, function (error, decoded) {
        if (error) {
            throw new AppError(StatusCodes.UNAUTHORIZED, 'You have no access to this route.');
        }

        const { userEmail } = decoded as JwtPayload;
        email = userEmail;
    });

    const user = await User.findOne({ email });

    if (!user) {
        throw new AppError(StatusCodes.NOT_FOUND, 'Not Found.');
    }

    if (user?.isDeleted === true) {
        throw new AppError(StatusCodes.FORBIDDEN, 'This user is deleted.');
    }

    const newUserData = await User.findOneAndUpdate({email}, userPayload, {new: true} );
    return newUserData;

}


// export all the user services
export const userService = {
    signUpUserIntoDd,
    userLoginIntoDb,
    getUserFromDb,
    updateUserIntoDb,
};