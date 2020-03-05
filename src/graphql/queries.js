/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const syncFlashCardMarkers = /* GraphQL */ `
  query SyncFlashCardMarkers(
    $filter: ModelFlashCardMarkerFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncFlashCardMarkers(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const getFlashCardMarker = /* GraphQL */ `
  query GetFlashCardMarker($id: ID!) {
    getFlashCardMarker(id: $id) {
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
export const listFlashCardMarkers = /* GraphQL */ `
  query ListFlashCardMarkers(
    $filter: ModelFlashCardMarkerFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFlashCardMarkers(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const syncMarkerGroups = /* GraphQL */ `
  query SyncMarkerGroups(
    $filter: ModelMarkerGroupFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncMarkerGroups(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const getMarkerGroup = /* GraphQL */ `
  query GetMarkerGroup($id: ID!) {
    getMarkerGroup(id: $id) {
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
export const listMarkerGroups = /* GraphQL */ `
  query ListMarkerGroups(
    $filter: ModelMarkerGroupFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMarkerGroups(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
