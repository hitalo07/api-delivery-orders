import { hash } from "bcrypt"
import { prisma } from "../../../../database/prismaClient"

interface ICreateClient {
  username: string
  password: string
}

export class CreateClientUseCase {
  async execute({ username, password }: ICreateClient) {
    // Validar se o usuário já existe
    const clientExists = await prisma.clients.findFirst({
      where: {
        username: {
          equals: username,
          mode: 'insensitive'
        }
      }
    })

    if(clientExists) {
      throw new Error("Client already exists")
    }

    // Criptogragar a senha
    const hashPassword = await hash(password, 10)

    // Salvar o client
    const client = await prisma.clients.create({
      data: {
        username,
        password: hashPassword
      }
    })

    return client
  }
}