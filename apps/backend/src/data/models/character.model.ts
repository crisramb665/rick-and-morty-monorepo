/** npm imports */
import { Table, Column, Model, DataType } from 'sequelize-typescript'

/**
 * Declaring Table Schema for characters table. Using decorators for better readability
 */
@Table({ tableName: 'characters' })
export class Character extends Model<Character> {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id!: number

  @Column(DataType.STRING)
  name!: string

  @Column(DataType.STRING)
  status!: string

  @Column(DataType.STRING)
  species!: string

  @Column(DataType.STRING)
  type!: string

  @Column(DataType.STRING)
  gender!: string

  //! only storing the origin name string
  //! the full object is not needed
  @Column(DataType.STRING)
  origin!: string

  //! only storing the location string
  @Column(DataType.STRING)
  location!: string

  @Column(DataType.STRING)
  image!: string

  @Column(DataType.ARRAY(DataType.STRING))
  episode!: string[]

  @Column(DataType.STRING)
  url!: string

  @Column(DataType.STRING)
  created!: string
}
