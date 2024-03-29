import dayjs from 'dayjs';
import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn } from 'typeorm';
import Department from './Department';

@Entity()
export default class User {
  @PrimaryColumn({
    length: 19,
  })
  id: string;

  @Column()
  displayName?: string;
  @Column()
  username?: string;

  @Column('date')
  joined_at?: string;

  @Column('date', { nullable: true })
  left_at?: string | null;

  @Column({ default: '' })
  comment?: string;

  @ManyToMany(() => Department, { eager: true })
  @JoinTable()
  departments?: Department[];

  @Column({ default: false })
  check1?: boolean;

  constructor(id: string) {
    this.id = id;
  }

  public isAlive() {
    return (
      this.left_at == undefined ||
      this.left_at == null ||
      dayjs(this.joined_at).isAfter(dayjs(this.left_at))
    );
  }
}
