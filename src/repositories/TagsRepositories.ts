import {EntityRepository, Repository} from 'typeorm'
import {Tag} from '../entities/Tag'

@EntityRepository(Tag)//defining the type
class TagsRepositories extends Repository<Tag>{

}

export {TagsRepositories}