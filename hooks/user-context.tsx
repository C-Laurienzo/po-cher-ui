import { IUserInformation } from "@/utils/authorization";
import { createContext, Dispatch, PropsWithChildren, Reducer, useContext, useReducer } from "react";

const emptyUser: IUserInformation = {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: ''
}

const UserContext = createContext<[IUserInformation, Dispatch<UserAction>]>([emptyUser, () => {}]);

const useUser = () => {
    return useContext(UserContext);
}

const userReducer: Reducer<IUserInformation, UserAction> = (user: IUserInformation, action: UserAction) => {    
    switch(action.type) {
        case 'update':
            if (action.field) {
                return {
                    ...user,
                    [action.field]: action.value
                };
            }

            throw Error('Missing user field!');
        case 'reset':
            return emptyUser;
        default:
            throw Error('Unknown user action!');
    }
}

export type UserAction = {
    type: 'update' | 'reset',
    field?: 'firstName' | 'lastName' | 'email' | 'phoneNumber',
    value?: string
}

export const UserProvider = ({ children }: PropsWithChildren) => {
    const [user, dispatch] = useReducer(userReducer, emptyUser)

    return (
        <UserContext.Provider value={[user, dispatch]}>
            {children}
        </UserContext.Provider>
    );
}

export default useUser;