import { v4 as uuidv4 } from 'uuid';

export abstract class Entity<Props = any> {
  public readonly _id: string;
  public readonly _createdAt: Date;
  public readonly props: Props;

  constructor(props: Props, id?: string, createdAt?: Date) {
    this.props = props;
    this._id = id || uuidv4();
    this._createdAt = createdAt || new Date();
  }

  get id(): string {
    return this._id;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  toJSON(): Required<{ id: string; createdAt: Date } & Props> {
    return {
      id: this._id,
      createdAt: this._createdAt,
      ...this.props,
    } as Required<{ id: string; createdAt: Date } & Props>;
  }
}
