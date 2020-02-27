
//import Amplify, { Hub } from "@aws-amplify/core";
import { DataStore, Predicates } from "@aws-amplify/datastore";
import { MarkerGroup, FlashCardMarker} from "../../../models";

export const reducer = async (markers, action) => {
    switch(action.type) {
        case 'list':
            const markers = await DataStore.query(MarkerGroup, Predicates.ALL);
            return markers
        case 'delete':
            /*
            const toDelete = await DataStore.query(MarkerType, action.id);
            await DataStore.delete(toDelete);
            */
            return markers
        case 'update':
            return markers;
        case 'query':
            return markers;
        case 'save':
            switch(action.formType) {
                case 'flashCard':
                    await DataStore.save(
                        new FlashCardMarker({
                            lat: action.lat,
                            lng: action.lng,
                            zoom: action.zoom,
                            frontText: action.frontText,
                            backText: action.backText,
                        })
                    )
                    return markers;
                default: throw new Error();
            }
        case 'createGroup':
            await DataStore.save(
                new MarkerGroup({
                    name: action.name
                })
            )
            return markers;
        default: throw new Error();
    }
}
