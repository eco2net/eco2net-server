import User from "src/entities/user.entity";

interface TokenPayload extends Omit <User, 'password'>{
}

export default TokenPayload;