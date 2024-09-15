
// all the roles
export enum Role {
    Admin = 'admin',
    User = 'user',
}


// role type
type TRole = {
    role: Role;
};

// user type for sign up
export type TUser = {
    name: string;
    email: string;
    password: string;
    phone: string;
    address: string;
    role: TRole;
    isDeleted?: boolean;
    // _id?: string;
};


// user type for login
export type TUserLogin = {
    email: string;
    password: string;
}