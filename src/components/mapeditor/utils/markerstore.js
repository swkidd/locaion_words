
//import Amplify, { Hub } from "@aws-amplify/core";
import { DataStore, Predicates } from "@aws-amplify/datastore";
import { MarkerGroup, FlashCardMarker} from "../../../models";

//add groups delete groups etc
export const reducer = (state, action) => {
    switch(action.type) {
        case 'readGroups':
            return {...state, markerGroups: action.value }
        case 'addGroup':
            return {...state, markerGroups: [...state.markerGroups, action.value] }
        case 'deleteGroup':
            return {...state, markerGroups: state.markerGroups.filter(mg => mg.id !== action.id)}
        case 'updateGroup':
            return {...state, markerGroups: state.markerGroups.map(mg => {
                if (mg.id === action.id) return {...mg, ...action.value}  
                else return mg
            })}
        case 'readMarkers':
            return {...state, markers: action.value }
        case 'addMarker':
            return {...state, markers: [...state.markers, action.value] }
        case 'deleteMarker':
            return {...state, markers: state.markers.filter(m => m.id !== action.id)}
        case 'updateMarker':
            return {...state, markers: state.markers.map(m => {
                if (m.id === action.id) return {...m, ...action.value}  
                else return m
            })}
        default: throw new Error()
    }
}

const asyncDispatch = (dispatch, action) => {
    switch(action.type) {
        case 'listGroups':
            console.log("LIST GROUPS")
            DataStore.query(MarkerGroup, Predicates.ALL).then(mg => {
                dispatch({type: "readGroups", value: mg})   
            });
        case 'delete':
            console.log("DELETE")
            /*
            const toDelete = await DataStore.query(MarkerType, action.id);
            await DataStore.delete(toDelete);
            */
        case 'update':
            console.log("UPDATE")
        case 'query':
            console.log("QUERY")
        case 'save':
            console.log("SAVE")
            switch(action.formType) {
                case 'flashCard':
                    const newMarker = {
                            groupId: action.currentGroup,
                            lat: action.lat,
                            lng: action.lng,
                            zoom: action.zoom,
                            frontText: action.frontText,
                            backText: action.backText,
                        }
                    DataStore.save(
                        new FlashCardMarker(newMarker)
                    )
                default: throw new Error();
            }
        case 'createGroup':
            console.log("CREATE GROUP")
            DataStore.save(
                new MarkerGroup({
                    name: action.name
                })
            ).then(_ => {
                dispatch({type: "groups", markerGroups: })   
            })
        case 'currentGroup':
            console.log("CURRENT GROUP")
        default: throw new Error();
    }
}
