// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { MarkerType } = initSchema(schema);

export {
  MarkerType
};