import {EntityRepository, Repository} from 'typeorm'
import {User} from '../entities/User'

@EntityRepository(User)//defining the type
class UserRepositories extends Repository<User>{

}

export {UserRepositories}