import { router } from "expo-router"
import React, { createContext, ReactNode, useContext, useEffect, useState } from "react"
import {
    createUserWithEmailAndPassword,
    initializeAuth,
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth"
import firebaseApp from "../app/services/firebase"
import * as SecureStore from "expo-secure-store"

interface IUserLogin {
    email: string
    password: string
}

interface IAuthContext {
    user: IUserLogin
    setUser: (user: IUserLogin) => void
    handleLogin: () => void
    handleSignup: () => void
    handleLogout: () => void
}

interface IAuthProviderProps {
    children: ReactNode
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext)

export const AuthProvider: React.FC<IAuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<IUserLogin>({ email: "", password: "" })

    const handleLogin = () => {
        if (!user || user.email == "" || user.password == "") {
            alert("Digite seu email e senha")
            return
        }
        const auth = initializeAuth(firebaseApp)
        signInWithEmailAndPassword(auth, user.email, user.password)
            .then((userCredential) => {
                SecureStore.setItemAsync("token", userCredential.user?.uid || "")
                SecureStore.setItemAsync("email", user?.email || "")
                setUser(user)
                router.replace("provider/(tabs)")
            })
            .catch(() => {
                alert("Usuário ou senha inválidos!")
            })
    }

    const handleSignup = () => {
        if (!user || user.email == "" || user.password == "") {
            alert("Digite seu email e senha")
            return
        }
        const auth = initializeAuth(firebaseApp)
        createUserWithEmailAndPassword(auth, user.email, user.password)
            .then((userCredential) => {
                SecureStore.setItemAsync("token", userCredential.user?.uid || "")
                SecureStore.setItemAsync("email", user?.email || "")
                setUser(user)

                // Buscar o cadastro do usuário no banco de dados da API
                // Se o usuário for encontrado, redirecionar para a tela de Home
                // router.replace("provider/(tabs)")

                // caso contrário, redirecionar para a tela de cadastro
                router.replace("provider/register")
            })
            .catch(() => {
                alert("Usuário já cadastrado!")
            })
    }

    const handleLogout = () => {
        const auth = initializeAuth(firebaseApp)
        SecureStore.deleteItemAsync("token")
        SecureStore.deleteItemAsync("email")
        signOut(auth)
        router.push("../../")
    }

    return (
        <AuthContext.Provider value={{ user, setUser, handleLogin, handleSignup, handleLogout }}>
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
