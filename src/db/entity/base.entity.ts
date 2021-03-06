import { CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn } from 'typeorm';


export abstract class EntityBase {

  @PrimaryGeneratedColumn()
  public id: number;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;

}
