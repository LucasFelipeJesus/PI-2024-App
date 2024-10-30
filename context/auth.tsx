import { router } from "expo-router"
import React, { createContext, ReactNode, useContext, useState } from "react"
import { initializeAuth, signInWithEmailAndPassword, signOut } from "firebase/auth"
import firebaseApp from "../app/services/firebase"
import * as SecureStore from "expo-secure-store"

interface IUserLogin {
    email: string
    password: string
    type?: string
}

interface IAuthContext {
    user: IUserLogin
    setUser: (user: IUserLogin) => void
    handleLogin: () => void
    handleLogout: () => void
}

interface IAuthProviderProps {
    children: ReactNode
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext)

export const AuthProvider: React.FC<IAuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<IUserLogin>({ email: "", password: "", type: "" })

    const handleLogin = () => {
        if (!user || user.email == "" || user.password == "") {
            alert("Digite seu email e senha")
            return
        }
        const auth = initializeAuth(firebaseApp)
        signInWithEmailAndPassword(auth, user.email, user.password)
            .then((userCredential) => {
                SecureStore.setItemAsync("token", userCredential.user?.uid || "")
                setUser(user)
                const userType = user.type as string
                router.push(userType)
            })
            .catch(() => {
                alert("Usuário ou senha inválidos!")
            })
    }

    const handleLogout = () => {
        const auth = initializeAuth(firebaseApp)
        SecureStore.deleteItemAsync("token")
        user.email = ""
        user.password = ""
        user.type = ""
        signOut(auth)
        router.push("../")
    }

    return (
        <AuthContext.Provider value={{ user, setUser, handleLogin, handleLogout }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error("useAuth deve ser usado dentro de um AuthProvider")
    }
    return context
}
