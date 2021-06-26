import {Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn} from "typeorm";
import {v4 as uuid} from 'uuid'
import {Expose} from "class-transformer"

@Entity('Tags')
class Tag{

  @PrimaryColumn()
  readonly id:string;

  @Column()
  name:string;

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  //create a field named "hashtag" without insert in database
  @Expose({name:"hashTag"})
  hashTag():string{
    return `#${this.name}`
  }

  constructor(){
    if(!this.id){
      this.id=uuid()
    }
  }
}

export {Tag}