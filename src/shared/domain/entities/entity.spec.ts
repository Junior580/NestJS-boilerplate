import { validate as uuidValidate } from 'uuid';
import { Entity } from './entity';

interface StubProps {
  prop1: string;
  prop2: number;
}

class StubEntity extends Entity<StubProps> {}

describe('Entity unit test', () => {
  it('should set props, date and id', () => {
    const props = {
      prop1: 'value1',
      prop2: 1,
    };
    const entity = new StubEntity(props);

    expect(entity.props).toStrictEqual(props);
    expect(entity._id).not.toBeNull();
    expect(uuidValidate(entity._id)).toBeTruthy();
    expect(entity._createdAt).not.toBeNull();
    expect(entity._createdAt).toBeTruthy();
  });

  it('should accept a valid id', () => {
    const props = {
      prop1: 'value1',
      prop2: 1,
    };
    const id = 'ca56176c-2667-4742-bb92-01e3fbbfec66';
    const entity = new StubEntity(props, id);
    expect(uuidValidate(entity._id)).toBeTruthy();
    expect(entity._id).toBe(id);
  });

  it('should convert an entity to a javascript object', () => {
    const props = {
      prop1: 'value1',
      prop2: 1,
    };
    const id = 'ca56176c-2667-4742-bb92-01e3fbbfec66';
    const createdAt = new Date('2024-01-07T03:36:30.756Z');
    const entity = new StubEntity(props, id, createdAt);
    console.log(entity);

    expect(entity.toJSON()).toStrictEqual({
      id,
      createdAt: new Date(createdAt),
      ...props,
    });
  });
});
