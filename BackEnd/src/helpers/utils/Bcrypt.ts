import bcrypt from 'bcryptjs'


export function hashedPasswordSync (value : string) {
    return bcrypt.hashSync(value , 10)
}

export function comparePassword (
    Password : string,
    hashedPassword : string
) {
    bcrypt.compare(Password , hashedPassword)
}