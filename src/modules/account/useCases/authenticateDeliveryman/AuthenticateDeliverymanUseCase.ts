import { compare } from "bcrypt"
import { sign } from "jsonwebtoken"

import { prisma } from "../../../../database/prismaClient"

interface IAuthenticateDeliveryman {
  username: string
  password: string
}

export class AuthenticateDeliverymanUseCase {
  async execute({ username,password }: IAuthenticateDeliveryman) {
    // Receber username, password

    // Verificar se username cadastrado
    const deliveryman = await prisma.deliveryman.findFirst({
      where: {
        username
      }
    })

    if(!deliveryman) {
      throw new Error("Username or password invalid");
    }

    // Verificar se a senha corresponde ao username
    const passwordMatch = await compare(password, deliveryman.password)

    if(!passwordMatch) {
      throw new Error("Username or password invalid");
    }

    // Gerar o token
    const token = sign({ username }, "djshdIU@I#3iU#N77U#H@&#@*#@&#@&#@#", {
      subject: deliveryman.id,
      expiresIn: '1d'
    })

    return token
  }
}