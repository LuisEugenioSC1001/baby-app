import { atom } from "recoil";
export type giftType = {
  id?: string;
  name?: string;
  quantity?: number;
  unit?: string;
  quantityGift?: number;
};
export const giftsListState = atom({
  key: "giftsListState",
  default: [] as giftType[],
});
