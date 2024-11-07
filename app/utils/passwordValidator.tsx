export function PasswordValidator(password: string | any[]) {
    if (!password) return "A senha não pode ser vazia."
    if (password.length < 6) return "A senha deve ter pelo menos 6 caracteres."
    return ""
}
