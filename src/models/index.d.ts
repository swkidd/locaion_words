import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";



export declare class FlashCardMarker {
  readonly id: string;
  readonly groupId: string;
  readonly owner: string;
  readonly lat: number;
  readonly lng: number;
  readonly zoom: number;
  readonly frontText?: string;
  readonly backText?: string;
  constructor(init: ModelInit<FlashCardMarker>);
  static copyOf(source: FlashCardMarker, mutator: (draft: MutableModel<FlashCardMarker>) => MutableModel<FlashCardMarker> | void): FlashCardMarker;
}

export declare class MarkerGroup {
  readonly id: string;
  readonly name: string;
  readonly flashCardMarkers?: FlashCardMarker[];
  constructor(init: ModelInit<MarkerGroup>);
  static copyOf(source: MarkerGroup, mutator: (draft: MutableModel<MarkerGroup>) => MutableModel<MarkerGroup> | void): MarkerGroup;
}