/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getMarkerType = /* GraphQL */ `
  query GetMarkerType($id: ID!) {
    getMarkerType(id: $id) {
      id
      lat
      lng
      zoom
      text
      owner
    }
  }
`;
export const listMarkerTypes = /* GraphQL */ `
  query ListMarkerTypes(
    $filter: ModelMarkerTypeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMarkerTypes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        lat
        lng
        zoom
        text
        owner
      }
      nextToken
    }
  }
`;
