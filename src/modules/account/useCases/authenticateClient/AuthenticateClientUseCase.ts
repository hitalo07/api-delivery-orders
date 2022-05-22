import { compare } from "bcrypt"
import { sign } from "jsonwebtoken"

import { prisma } from "../../../../database/prismaClient"

interface IAuthenticateClient {
  username: string
  password: string
}

export class AuthenticateClientUseCase {
  async execute({ username,password }: IAuthenticateClient) {
    // Receber username, password

    // Verificar se username cadastrado
    const client = await prisma.clients.findFirst({
      where: {
        username
      }
    })

    if(!client) {
      throw new Error("Username or password invalid");
    }

    // Verificar se a senha corresponde ao username
    const passwordMatch = await compare(password, client.password)

    if(!passwordMatch) {
      throw new Error("Username or password invalid");
    }

    // Gerar o token
    const token = sign({ username }, "djshdIU@I#3iU#NI#U#H@&#@*#@&#@&#@#", {
      subject: client.id,
      expiresIn: '1d'
    })

    return token
  }
}