import { Column, Entity, PrimaryColumn } from 'typeorm';
@Entity()
export default class Department {
  @PrimaryColumn({
    length: 18,
  })
  id: string;

  @Column()
  name?: string;

  user_ids: string[] = [];

  constructor(id: string) {
    this.id = id;
  }
}
