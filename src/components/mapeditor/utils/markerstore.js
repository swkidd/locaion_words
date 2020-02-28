import React, { useState } from "react"

//import Amplify, { Hub } from "@aws-amplify/core";
import { DataStore, Predicates } from "@aws-amplify/datastore";
import { MarkerGroup, FlashCardMarker} from "../../../models";

//add groups delete groups etc
export const reducer = (state, action) => {
    console.log(action.type)
    switch(action.type) {
        case 'readGroups':
            return {...state, markerGroups: action.value }
        case 'currentGroup':
            const group = state.markerGroups.find(mg => mg.id === action.id)
            if (!group) return state;
            return {...state, currentGroup: group}
        case 'addGroup':
            return {...state, markerGroups: [...state.markerGroups, action.value]}
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
        case 'createPlace':
            return {...state, createPlace: action.value}
        case 'currentMarker':
            return {...state, currentMarker: action.value}
    }
}

export const asyncDispatch = (dispatch) => (action) => {
    console.log(action.type)
    switch(action.type) {
        case 'listGroups':
            DataStore.query(MarkerGroup, Predicates.ALL).then(mgs => {
                dispatch({type: "readGroups", value: mgs.map(mg => ({ name: mg.name, id: mg.id }))})
            });
            break
        case 'listMarkers':
            //have to list based on marker types and group id
            DataStore.query(FlashCardMarker, Predicates.ALL).then(ms => {
                dispatch({type: "readMarkers", value: ms.map(m => 
                    ({
                        groupId: m.groupId,
                        lat: m.lat,
                        lng: m.lng,
                        zoom: m.zoom,
                        frontText: m.frontText,
                        backText: m.backText,
                    })
                )})
            })
            
            break
        case 'delete':
            /*
            const toDelete = await DataStore.query(MarkerType, action.id);
            await DataStore.delete(toDelete);
            */
            break
        case 'update': break
        case 'query': break
        case 'save':
            if (!action.groupId) break;
            console.log(action.markerType)
            switch(action.markerType) {
                case 'flashCard':
                    const newMarker = {
                            groupId: action.groupId,
                            lat: action.lat,
                            lng: action.lng,
                            zoom: action.zoom,
                            frontText: action.frontText,
                            backText: action.backText,
                        }
                    DataStore.save(
                        new FlashCardMarker(newMarker)
                    )
                    break
                default: throw new Error();
            }
            break
        case 'createGroup':
            const resp = DataStore.save(
                new MarkerGroup({
                    name: action.name
                })
            )
            break
        case 'currentGroup': 
            dispatch({ type: 'currentGroup', id: action.id })
            break 
        case 'createPlace':
            dispatch({ type: 'createPlace', value: action.value })
            break
        case 'currentMarker':
            dispatch({ type: 'currentMarker', value: action.value })
            break
    }
}
