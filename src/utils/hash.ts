import bcrypt from 'bcrypt'

export const hashToken = async (token: string) => {
    return bcrypt.hash(token, 10)
}

export const compareToken = async (
    token: string,
    hash: string
) => {
    return bcrypt.compare(token, hash)
}
