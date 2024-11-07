export function DocumentValidator(document: string) {
    if (!document) return "O CPF ou CNPJ não pode ser vazio."
    return ""
}
