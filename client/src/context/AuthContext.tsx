import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import {UserTypes} from "../types.ts";
import apiRequest from "../libs/apiRequest.ts";

type AuthContextTypes = {
    user: UserTypes | null
    token: string | null
    loading: boolean;
    authCheckComplete: boolean;
    setUser: (user: UserTypes | null) => void;
    setToken: (token: string | null) => void
}

const AuthContext = createContext<AuthContextTypes>({
    user: null,
    token: null,
    loading: false,
    authCheckComplete: false,
    setUser: () => {},
    setToken: () => {}
})

const AuthProvider = ({children}: {children: ReactNode}) => {

    const [token, setToken] = useState<string | null>(null)
    const [user, setUser] = useState<UserTypes | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [authCheckComplete, setAuthCheckComplete] = useState<boolean>(false)

    useEffect(() => {
        setLoading(true)
        const fetchUser = async () => {
            try {
                const authResponse = await apiRequest.get('/auth/get-token')
                const {accessToken} = authResponse.data

                if(accessToken) {
                    setToken(accessToken)
                    apiRequest.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`
                    const userResponse = await apiRequest.get('/users/user-info')
                    setUser(userResponse.data)
                }
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
            }catch (err) {
                setUser(null)
            }finally {
                setLoading(false)
                setAuthCheckComplete(true)
            }
        }

        fetchUser()
    }, [])

    const sharedValues = {
        user,
        token,
        loading,
        authCheckComplete,
        setUser,
        setToken
    }

    return (
        <AuthContext.Provider value={sharedValues}>{children}</AuthContext.Provider>
    )

}

export const useAuth = () => useContext(AuthContext)
export default AuthProvider