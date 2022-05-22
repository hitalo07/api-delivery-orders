import { hash } from "bcrypt"
import { prisma } from "../../../../database/prismaClient"

interface ICreateDeliveryman {
  username: string
  password: string
}

export class CreateDeliverymanUseCase {
  async execute({ username, password }: ICreateDeliveryman) {
    // Validar se o usuário já existe
    const deliverymanExists = await prisma.deliveryman.findFirst({
      where: {
        username: {
          mode: 'insensitive'
        }
      }
    })

    if(deliverymanExists) {
      throw new Error("Client already exists")
    }

    // Criptogragar a senha
    const hashPassword = await hash(password, 10)

    // Salvar o client
    const client = await prisma.deliveryman.create({
      data: {
        username,
        password: hashPassword
      }
    })

    return client
  }
}