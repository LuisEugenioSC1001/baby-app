import { gql } from "@apollo/client";

export const guest = gql`
  query guest($id: ID!) {
    guest(id: $id) {
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
export const gift = gql`
  query gift($id: ID!) {
    gift(id: $id) {
      id
      name
      quantity
      unit
    }
  }
`;

export const giftsList = gql`
  query giftsList {
    gifts {
      id
      name
      quantity
      unit
    }
  }
`;

export const guestsList = gql`
  query guestsList {
    guests {
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
