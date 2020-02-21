/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createMarkerType = /* GraphQL */ `
  mutation CreateMarkerType(
    $input: CreateMarkerTypeInput!
    $condition: ModelMarkerTypeConditionInput
  ) {
    createMarkerType(input: $input, condition: $condition) {
      id
      lat
      lng
      zoom
      text
      owner
    }
  }
`;
export const updateMarkerType = /* GraphQL */ `
  mutation UpdateMarkerType(
    $input: UpdateMarkerTypeInput!
    $condition: ModelMarkerTypeConditionInput
  ) {
    updateMarkerType(input: $input, condition: $condition) {
      id
      lat
      lng
      zoom
      text
      owner
    }
  }
`;
export const deleteMarkerType = /* GraphQL */ `
  mutation DeleteMarkerType(
    $input: DeleteMarkerTypeInput!
    $condition: ModelMarkerTypeConditionInput
  ) {
    deleteMarkerType(input: $input, condition: $condition) {
      id
      lat
      lng
      zoom
      text
      owner
    }
  }
`;
