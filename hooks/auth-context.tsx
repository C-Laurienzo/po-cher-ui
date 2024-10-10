import { confirmSignUp, ISignInResponse, IUserInformation, refresh, signIn, signOut, signUp } from "@/utils/authorization";
import Storage from "@/utils/storage";
import { router } from "expo-router";
import { createContext, PropsWithChildren, useContext, useState } from "react";
import { useMutation, UseMutationResult } from "react-query";

const AuthContext = createContext<IAuthContext>({
    useSignIn: (setIsAuthenticated) => useMutation({
        mutationKey: 'SIGN_IN',
        mutationFn: ({
            password,
            email,
            phoneNumber
        }) => signIn(password, email, phoneNumber),
        onSuccess: (response: ISignInResponse) => {
            if (response.isChallenged) {
                switch (response.challengeName) {
                    case 'NEW_PASSWORD_REQUIRED':
                        router.push('(auth)/set-new-password');
                        break;
                }
            } else {
                setIsAuthenticated(true);
                router.push('(tabs)/opportunities');
            }
        },
        onError: (error: { status: number }) => {
            if (error.status == 424) {
                router.push('(auth)/verify-username');
            }
        }
    }),
    useSignOut: () => useMutation({
        mutationKey: 'SIGN_OUT',
        mutationFn: signOut,
        onSuccess: () => {
            Storage.removeAll();
            router.push('');
        }
    }),
    useSignUp: () => useMutation({
        mutationKey: 'SIGN_UP',
        mutationFn: ({ userInfo, password }) => signUp(userInfo, password),
        onSuccess: () => {
            router.push('(auth)/verify-username')
        }
    }),
    useConfirmSignUp: () => useMutation({
        mutationKey: 'CONFIRM_SIGN_UP',
        mutationFn: ({ confirmationCode, username }) => confirmSignUp(confirmationCode, username),
        onSuccess: () => {
            router.push('(tabs)/opportunities');
        }
    }),
    useRespondToChallenge: () => useMutation({
        mutationKey: 'RESPOND_TO_CHALLENGE',
    }),
    useRefresh: () => useMutation({
        mutationKey: 'REFRESH',
        mutationFn: refresh,
        onError: () => {
            router.push('(auth)/sign-in');
        }
    }),
    isAuthenticated: false,
    setIsAuthenticated: (_auth: boolean) => { }
});

const useAuth = () => {
    return useContext(AuthContext);
}

interface IAuthContext {
    useSignIn: (setIsAuthenticated: (auth: boolean) => void) => UseMutationResult<ISignInResponse, unknown, { password: string, email: string, phoneNumber: string }>,
    useSignOut: () => UseMutationResult,
    useSignUp: () => UseMutationResult<unknown, unknown, { userInfo: IUserInformation, password: string }>,
    useConfirmSignUp: () => UseMutationResult<unknown, unknown, { confirmationCode: string, username: string }>,
    useRespondToChallenge: () => UseMutationResult,
    useRefresh: () => UseMutationResult,
    isAuthenticated: boolean,
    setIsAuthenticated: (auth: boolean) => void
}

export const AuthProvider = ({ children }: PropsWithChildren) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const { useSignIn, useSignOut, useSignUp, useConfirmSignUp, useRespondToChallenge, useRefresh } = useAuth();

    return (
        <AuthContext.Provider value={{
            useSignIn,
            useSignOut,
            useSignUp,
            useConfirmSignUp,
            useRespondToChallenge,
            useRefresh,
            isAuthenticated,
            setIsAuthenticated
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export default useAuth;