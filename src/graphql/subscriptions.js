/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateFlashCardMarker = /* GraphQL */ `
  subscription OnCreateFlashCardMarker($owner: String!) {
    onCreateFlashCardMarker(owner: $owner) {
      id
      groupId
      owner
      lat
      lng
      zoom
      order
      frontText
      backText
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onUpdateFlashCardMarker = /* GraphQL */ `
  subscription OnUpdateFlashCardMarker($owner: String!) {
    onUpdateFlashCardMarker(owner: $owner) {
      id
      groupId
      owner
      lat
      lng
      zoom
      order
      frontText
      backText
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onDeleteFlashCardMarker = /* GraphQL */ `
  subscription OnDeleteFlashCardMarker($owner: String!) {
    onDeleteFlashCardMarker(owner: $owner) {
      id
      groupId
      owner
      lat
      lng
      zoom
      order
      frontText
      backText
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onCreateMarkerGroup = /* GraphQL */ `
  subscription OnCreateMarkerGroup($owner: String!) {
    onCreateMarkerGroup(owner: $owner) {
      id
      name
      owner
      order
      flashCardMarkers {
        id
        groupId
        owner
        lat
        lng
        zoom
        order
        frontText
        backText
        _version
        _deleted
        _lastChangedAt
      }
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onUpdateMarkerGroup = /* GraphQL */ `
  subscription OnUpdateMarkerGroup($owner: String!) {
    onUpdateMarkerGroup(owner: $owner) {
      id
      name
      owner
      order
      flashCardMarkers {
        id
        groupId
        owner
        lat
        lng
        zoom
        order
        frontText
        backText
        _version
        _deleted
        _lastChangedAt
      }
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onDeleteMarkerGroup = /* GraphQL */ `
  subscription OnDeleteMarkerGroup($owner: String!) {
    onDeleteMarkerGroup(owner: $owner) {
      id
      name
      owner
      order
      flashCardMarkers {
        id
        groupId
        owner
        lat
        lng
        zoom
        order
        frontText
        backText
        _version
        _deleted
        _lastChangedAt
      }
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
