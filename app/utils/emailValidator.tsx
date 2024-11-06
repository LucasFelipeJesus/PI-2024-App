export function EmailValidator(email: string) {
    const re = /\S+@\S+\.\S+/
    if (!email) return "E-mail não pode ser vazio."
    if (!re.test(email)) return "Ooops! Nós precisamos de um e-mail válido."
    return ""
}
