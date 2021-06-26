import { Exclude } from "class-transformer";
import {Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn} from "typeorm";
import { v4 as uuid } from 'uuid'

@Entity('Users')
class User {
  @PrimaryColumn()
  readonly id:string;
  
  @Column()
  name:string;
  
  @Exclude()//to don't show the user password when listing all users
  @Column()
  password:string;
  
  @Column()
  email:string;
  
  @Column()
  admin:boolean;
  
  @CreateDateColumn()
  created_at:Date;
  
  @UpdateDateColumn()
  updated_at:Date;

  constructor(){
    //if id is null or undefined it means that we are creating an user otherwise it a search that we are doing
    if(!this.id){
      this.id=uuid()
    }
  }
}

export {User}