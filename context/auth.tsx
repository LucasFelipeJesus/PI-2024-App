import { router } from "expo-router"
import React, { createContext, ReactNode, useContext, useState } from "react"
import {
    createUserWithEmailAndPassword,
    initializeAuth,
    signInWithEmailAndPassword,
    signOut,
    UserCredential,
} from "firebase/auth"
import firebaseApp from "../app/services/firebase"
import * as SecureStore from "expo-secure-store"

interface UserLogin {
    email: string
    password: string
}

interface UserProfile {
    name?: string
    cpf?: string
    email?: string
    phone?: string
    cep?: string
    address?: string
    bairro?: string
    city?: string
    state?: string
    Image?: string
    token?: string
    especialities?: string
    services?: string[]
}

interface AuthContextType {
    user: UserLogin
    professional: UserProfile | null
    setUser: React.Dispatch<React.SetStateAction<UserLogin>>
    handleLogin: () => Promise<void>
    handleSignup: () => Promise<void>
    handleLogout: () => Promise<void>
}

interface AuthProviderProps {
    children: ReactNode
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<UserLogin>({ email: "", password: "" })
    const [professional, setProfessional] = useState<UserProfile | null>(null)
    const [token, setToken] = useState<string>("")

    const fetchProfessional = async (userId: string): Promise<UserProfile | null> => {
        if (!userId) return null

        try {
            const response = await fetch(
                `https://api-bckend.onrender.com/api/professional/${userId}`
            )

            if (!response.ok) {
                throw new Error("Falha ao obter detalhes do profissional")
            }

            const data: UserProfile = await response.json()
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

    const postProfessional = async (
        userId: string,
        userEmail: string
    ): Promise<UserProfile | null> => {
        if (!userId) return null

        try {
            const response = await fetch("https://api-bckend.onrender.com/api/professional", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: userEmail,
                    token: userId,
                    services: professional?.services || [],
                }),
            })

            if (!response.ok) {
                // Get more detailed error information
                const errorBody = await response.text()
                console.error(`HTTP error! status: ${response.status}, body: ${errorBody}`)

                // More specific error handling based on status code
                switch (response.status) {
                    case 400:
                        alert("Dados inválidos para registro do profissional")
                        break
                    case 409:
                        alert("Profissional já existe")
                        break
                    case 500:
                        alert("Erro interno do servidor. Tente novamente mais tarde.")
                        break
                    default:
                        alert("Falha ao registrar a conta do profissional")
                }

                throw new Error(`Registration failed: ${response.status}`)
            }

            const data: UserProfile = await response.json()
            setProfessional(data)

            await SecureStore.setItemAsync("email", data?.email || "")
            await SecureStore.setItemAsync("token", data?.token || "")

            return data
        } catch (error) {
            console.error("Erro ao inserir o profissional:", error)
            alert("Não foi possível criar sua conta. Verifique sua conexão e tente novamente.")
            return null
        }
    }

    const handleLogin = async (): Promise<void> => {
        // Input validation
        if (!user.email || !user.password) {
            alert("Por favor, digite seu e-mail e senha")
            return
        }

        try {
            const auth = initializeAuth(firebaseApp)
            const userCredential: UserCredential = await signInWithEmailAndPassword(
                auth,
                user.email,
                user.password
            )
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

    const handleSignup = async (): Promise<void> => {
        // Input validation
        if (!user.email || !user.password) {
            alert("Por favor, digite seu e-mail e senha")
            return
        }

        try {
            const auth = initializeAuth(firebaseApp)
            const userCredential: UserCredential = await createUserWithEmailAndPassword(
                auth,
                user.email,
                user.password
            )
            const userId = userCredential.user?.uid || ""

            // Store token and email
            await SecureStore.setItemAsync("token", userId)
            await SecureStore.setItemAsync("email", user.email)

            // Post professional
            await postProfessional(userId, user.email)

            // Redirect to registration page
            router.replace("provider/register")
        } catch (error) {
            console.error("Signup error:", error)
            alert("Usuário já registrado ou o registro falhou")
        }
    }

    const handleLogout = async (): Promise<void> => {
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

export function useAuth(): AuthContextType {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error("useAuth deve ser usado dentro de um AuthProvider")
    }
    return context
}
