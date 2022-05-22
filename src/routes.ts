import { Router } from "express";
import { ensureAuthenticateClient } from "./middlewares/ensureAuthenticateClient";
import { ensureAuthenticateDeliveryman } from "./middlewares/ensureAuthenticateDeliveryman";
import { AuthenticateClientController } from "./modules/account/useCases/authenticateClient/AuthenticateClientController";
import { AuthenticateDeliverymanController } from "./modules/account/useCases/authenticateDeliveryman/AuthenticateDeliverymanController";
import { CreateClientController } from "./modules/clients/useCases/createClient/CreateClientController";
import { FindAllDeliveriesController } from "./modules/clients/useCases/deliveries/FindAllDeliveriesController";
import { CreateDeliveryController } from "./modules/deliveries/useCases/createDelivery/CreateDeliveryCOntroller";
import { FindAllAvailableController } from "./modules/deliveries/useCases/findAllAvailable/FindAllAvailableController";
import { UpdateDeliverymanController } from "./modules/deliveries/useCases/updateDeliveryman/UpdateDeliverymanController";
import { CreateDeliverymanController } from "./modules/deliveryman/useCases/createDeliveryman/CreateDeliverymanController";
import { FindAllDeliveriesDeliverymanController } from "./modules/deliveryman/useCases/findAllDeliveries/FindAllDeliveriesDeliverymanController";

const routes = Router()

const createClientController = new CreateClientController()
const authenticateClientController = new AuthenticateClientController()
const createDeliverymanController = new CreateDeliverymanController()
const authenticateDeliverymanController = new AuthenticateDeliverymanController()
const createDeliveryController = new CreateDeliveryController()
const findAllAvailableUseCase = new FindAllAvailableController()
const updateDeliverymanController = new UpdateDeliverymanController()
const findAllDeliveriesController = new FindAllDeliveriesController()
const findAllDeliveriesDeliverymanController = new FindAllDeliveriesDeliverymanController()

routes.post('/clients/authenticate', authenticateClientController.handle)
routes.post('/deliveryman/authenticate', authenticateDeliverymanController.handle)
routes.post('/clients', createClientController.handle)
routes.post('/deliveryman', createDeliverymanController.handle)
routes.post('/delivery', ensureAuthenticateClient, createDeliveryController.handle)
routes.get('/delivery/available', ensureAuthenticateDeliveryman, findAllAvailableUseCase.handle)
routes.patch('/delivery/updateDeliveryman/:id', ensureAuthenticateDeliveryman,updateDeliverymanController.handle)
routes.get('/clients/deliveries', ensureAuthenticateClient, findAllDeliveriesController.handle)
routes.get('/deliveryman/deliveries', ensureAuthenticateDeliveryman, findAllDeliveriesDeliverymanController.handle)

export { routes }