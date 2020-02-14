import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";



export declare class MarkerType {
  readonly id: string;
  readonly lat: number;
  readonly lng: number;
  readonly zoom: number;
  readonly text?: string;
  constructor(init: ModelInit<MarkerType>);
  static copyOf(source: MarkerType, mutator: (draft: MutableModel<MarkerType>) => MutableModel<MarkerType> | void): MarkerType;
}