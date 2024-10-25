import { router } from "expo-router"
import React, { createContext, ReactNode, useContext, useState } from "react"
import { initializeAuth, signInWithEmailAndPassword } from "firebase/auth"
import firebaseApp from "../app/services/firebase"
import * as SecureStore from 'expo-secure-store'

interface IUserLogin {
    email: string
    password: string
}

interface IAuthContext {
    user: IUserLogin
    setUser: (user: IUserLogin) => void
    handleLogin: () => void
}

interface IAuthProviderProps {
    children: ReactNode
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext)

export const AuthProvider: React.FC<IAuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<IUserLogin>({ email: "", password: "" })

    const handleLogin = () => {
        if (!user || user.email == '' || user.password == '') {
            alert('Digite se email e senha')
            return
        }
        const auth = initializeAuth(firebaseApp)
        signInWithEmailAndPassword(auth, user.email, user.password)
            .then((userCredential) => {
                SecureStore.setItemAsync('token', userCredential.user?.uid || '')
                setUser(user)
                router.push('home')
            })
            .catch(() => {
                alert('Usuário ou senha inválidos!')
            })
    }

    return (
        <AuthContext.Provider value={{ user, setUser, handleLogin }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth deve ser usado dentro de um AuthProvider')
    }
    return context
}   
