import { router } from "expo-router"
import React, { createContext, ReactNode, useContext, useState } from "react"
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

interface IUserProfile {
    name?: string
    image?: string
}

interface IAuthContext {
    user: IUserLogin
    professional: IUserProfile | null
    setUser: (user: IUserLogin) => void
    handleLogin: () => Promise<void>
    handleSignup: () => Promise<void>
    handleLogout: () => void
}

interface IAuthProviderProps {
    children: ReactNode
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext)

export const AuthProvider: React.FC<IAuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<IUserLogin>({ email: "", password: "" })
    const [professional, setProfessional] = useState<IUserProfile | null>(null)
    const [token, setToken] = useState<string>("")

    const fetchProfessional = async (userId: string) => {
        if (!userId) return null

        try {
            const response = await fetch(
                `https://api-bckend.onrender.com/api/professional/${userId}`
            )

            if (!response.ok) {
                throw new Error("Falha ao obter detalhes do profissional")
            }

            const data = await response.json()
            setProfessional(data)

            // Safely store profile information
            await SecureStore.setItemAsync("name", data?.name || "")
            await SecureStore.setItemAsync("image", data?.Image || "")

            return data
        } catch (error) {
            console.error("Erro ao buscar detalhes do profissional:", error)
            return null
        }
    }

    const handleLogin = async () => {
        // Input validation
        if (!user.email || !user.password) {
            alert("Por favor, digite seu e-mail e senha")
            return
        }

        try {
            const auth = initializeAuth(firebaseApp)
            const userCredential = await signInWithEmailAndPassword(auth, user.email, user.password)
            const userId = userCredential.user?.uid || ""

            // Store token and email
            setToken(userId)
            await SecureStore.setItemAsync("token", userId)
            await SecureStore.setItemAsync("email", user.email)

            // Fetch professional details
            await fetchProfessional(userId)

            // Navigate to provider tabs
            router.replace("provider/(tabs)")
        } catch (error) {
            console.error("Login error:", error)
            alert("E-mail ou senha inválidos")
        }
    }

    const handleSignup = async () => {
        // Input validation
        if (!user.email || !user.password) {
            alert("Por favor, digite seu e-mail e senha")
            return
        }

        try {
            const auth = initializeAuth(firebaseApp)
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                user.email,
                user.password
            )
            const userId = userCredential.user?.uid || ""

            // Store token and email
            await SecureStore.setItemAsync("token", userId)
            await SecureStore.setItemAsync("email", user.email)

            // Redirect to registration page
            router.replace("provider/register")
        } catch (error) {
            console.error("Signup error:", error)
            alert("Usuário já registrado ou o registro falhou")
        }
    }

    const handleLogout = async () => {
        try {
            const auth = initializeAuth(firebaseApp)

            // Remove all stored credentials
            await Promise.all([
                SecureStore.deleteItemAsync("token"),
                SecureStore.deleteItemAsync("email"),
                SecureStore.deleteItemAsync("name"),
                SecureStore.deleteItemAsync("image"),
            ])

            // Sign out and navigate
            await signOut(auth)
            router.push("../../")
        } catch (error) {
            console.error("Logout error:", error)
        }
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                professional,
                setUser,
                handleLogin,
                handleSignup,
                handleLogout,
            }}
        >
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
