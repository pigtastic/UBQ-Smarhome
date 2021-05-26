import { ObjectID } from 'mongodb';

export const generateObjectID = () => new ObjectID();

export const ensureObjectID = (id: string | ObjectID): ObjectID => {
  if (typeof id === 'string') {
    return new ObjectID(id);
  }

  return id;
};

export const compareObjectID = (first: ObjectID, second: ObjectID) => first.toHexString() === second.toHexString();

export const isValidObjectID = (toTest: ObjectID | string | null | undefined): boolean => {
  if (!toTest) {
    return false;
  }

  try {
    const id = ensureObjectID(toTest);

    return !!id;
  } catch (e) {
    return false;
  }
};
