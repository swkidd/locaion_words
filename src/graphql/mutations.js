/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createFlashCardMarker = /* GraphQL */ `
  mutation CreateFlashCardMarker(
    $input: CreateFlashCardMarkerInput!
    $condition: ModelFlashCardMarkerConditionInput
  ) {
    createFlashCardMarker(input: $input, condition: $condition) {
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
export const updateFlashCardMarker = /* GraphQL */ `
  mutation UpdateFlashCardMarker(
    $input: UpdateFlashCardMarkerInput!
    $condition: ModelFlashCardMarkerConditionInput
  ) {
    updateFlashCardMarker(input: $input, condition: $condition) {
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
export const deleteFlashCardMarker = /* GraphQL */ `
  mutation DeleteFlashCardMarker(
    $input: DeleteFlashCardMarkerInput!
    $condition: ModelFlashCardMarkerConditionInput
  ) {
    deleteFlashCardMarker(input: $input, condition: $condition) {
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
export const createMarkerGroup = /* GraphQL */ `
  mutation CreateMarkerGroup(
    $input: CreateMarkerGroupInput!
    $condition: ModelMarkerGroupConditionInput
  ) {
    createMarkerGroup(input: $input, condition: $condition) {
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
export const updateMarkerGroup = /* GraphQL */ `
  mutation UpdateMarkerGroup(
    $input: UpdateMarkerGroupInput!
    $condition: ModelMarkerGroupConditionInput
  ) {
    updateMarkerGroup(input: $input, condition: $condition) {
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
export const deleteMarkerGroup = /* GraphQL */ `
  mutation DeleteMarkerGroup(
    $input: DeleteMarkerGroupInput!
    $condition: ModelMarkerGroupConditionInput
  ) {
    deleteMarkerGroup(input: $input, condition: $condition) {
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
