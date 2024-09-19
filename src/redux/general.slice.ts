import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

export interface GeneralState {
  productList: Array<any>;
  categoryList: Array<any>;
}

const initialState: GeneralState = {
  productList: [],
  categoryList: [],
};

export const generalSlice = createSlice({
  name: 'general',
  initialState,
  reducers: {
    updateProductList: (state, action: PayloadAction<Array<any>>) => {
      state.productList = action.payload;
    },
    updateCategoryList: (state, action: PayloadAction<Array<any>>) => {
      state.categoryList = action.payload;
    },
  },
});

export const {updateProductList, updateCategoryList} = generalSlice.actions;

export default generalSlice.reducer;
