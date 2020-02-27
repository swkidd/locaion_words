// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { FlashCardMarker, MarkerGroup } = initSchema(schema);

export {
  FlashCardMarker,
  MarkerGroup
};