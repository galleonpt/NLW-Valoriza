import { Router } from 'express'
import { AuthenticateUserController } from './controllers/AuthenticateUserController'
import { CreateComplimentController } from './controllers/CreateComplimentController'
import { CreateTagController } from './controllers/CreateTagController'
import { CreateUserController } from './controllers/CreateUserController'
import { ListTagsController } from './controllers/ListTagsController'
import { ListUserReceiverComplimentsController } from './controllers/ListUserReceiverComplimentsController'
import { ListUsersByTagController } from './controllers/ListUsersByTagController'
import { ListUsersController } from './controllers/ListUsersController'
import { ListUserSenderComplimentsController } from './controllers/ListUserSenderComplimentsController'
import { ensureAdmin } from './middlewares/ensureAdmin'
import { ensureAuthenticated } from './middlewares/ensureAuthenticated'

const routes= Router()

const createUserController= new CreateUserController()
const createTagController= new CreateTagController()
const authenticateUserController= new AuthenticateUserController()
const createComplimentController= new CreateComplimentController()
const listUserSenderCompliments= new ListUserSenderComplimentsController()
const listUserReceiveCompliments= new ListUserReceiverComplimentsController()
const listTags= new ListTagsController()
const listUsers= new ListUsersController()
const listUsersByTag= new ListUsersByTagController()

routes.post('/login', authenticateUserController.handle)
routes.post('/register', createUserController.handle)

routes.post('/compliments', ensureAuthenticated, createComplimentController.handle)

routes.get('/users', ensureAuthenticated, listUsers.handle)

routes.get('/users/compliments/send', ensureAuthenticated, listUserSenderCompliments.handle)
routes.get('/users/compliments/receive', ensureAuthenticated, listUserReceiveCompliments.handle)

routes.get('/tags', ensureAuthenticated, listTags.handle)
routes.post('/tags', ensureAuthenticated, ensureAdmin, createTagController.handle)

routes.get("/tags/users", ensureAuthenticated, listUsersByTag.handle)

export {routes}