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
      state.productList = [...state.productList, ...action.payload];
    },
    clearProductList: state => {
      state.productList = [];
    },
    updateCategoryList: (state, action: PayloadAction<Array<any>>) => {
      state.categoryList = action.payload;
    },
  },
});

export const {updateProductList, updateCategoryList, clearProductList} =
  generalSlice.actions;

export default generalSlice.reducer;
