
// all the imports here
import { JwtPayload } from "jsonwebtoken";


declare global {
    namespace Express {
        interface Request {
            user: JwtPayload;
        }
    }
}