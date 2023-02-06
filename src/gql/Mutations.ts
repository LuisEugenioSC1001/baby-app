import { gql } from "@apollo/client";

export const createGuest = gql`
  mutation createGuest($data: GuestInputType!) {
    createGuest(data: $data) {
      id
      name
      phone
      attend
      companion
      gifts {
        id
        name
        quantity
        unit
      }
    }
  }
`;
export const createGift = gql`
  mutation createGift($data: GiftInputType!) {
    createGift(data: $data) {
      id
      name
      quantity
      unit
    }
  }
`;
export const updateGift = gql`
  mutation updateGift($data: GiftPartialInputType!, $id: ID!) {
    updateGift(data: $data, id: $id) {
      id
      name
      quantity
      unit
    }
  }
`;
export const updateGuest = gql`
  mutation updateGuest($data: GuestPartialInputType, $id: ID!) {
    updateGuest(data: $data, id: $id) {
      id
      name
      phone
      attend
      companion
      gifts {
        id
        name
        quantity
        unit
      }
    }
  }
`;
