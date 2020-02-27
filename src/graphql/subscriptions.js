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
      flashCardMarkers {
        items {
          id
          groupId
          owner
          lat
          lng
          zoom
          frontText
          backText
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const onUpdateMarkerGroup = /* GraphQL */ `
  subscription OnUpdateMarkerGroup($owner: String!) {
    onUpdateMarkerGroup(owner: $owner) {
      id
      name
      flashCardMarkers {
        items {
          id
          groupId
          owner
          lat
          lng
          zoom
          frontText
          backText
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const onDeleteMarkerGroup = /* GraphQL */ `
  subscription OnDeleteMarkerGroup($owner: String!) {
    onDeleteMarkerGroup(owner: $owner) {
      id
      name
      flashCardMarkers {
        items {
          id
          groupId
          owner
          lat
          lng
          zoom
          frontText
          backText
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
