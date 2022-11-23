import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getShapesData, Shape } from 'actions/getShapesData';
import { allFiltersShapes } from 'helpers';

import {
  Loading,
  MenuShapeColor,
  MenuShapeColorShade,
  ShapeType
} from 'constants/constants';

type GetShapesDataPayload = Array<Shape>;

export type ShapeState = {
  shapes: Array<Shape>;
  shapesDisplayed: Array<Shape>;
  loading: Loading;
  columns: number;
  colors: Array<MenuShapeColor>;
  colorShade: MenuShapeColorShade;
  shapeTypes: Array<ShapeType>;
};

const initialState: ShapeState = {
  shapes: [],
  shapesDisplayed: [],
  loading: Loading.INITIAL,
  columns: 4,
  colors: [
    MenuShapeColor.RED,
    MenuShapeColor.GREEN,
    MenuShapeColor.BLUE,
    MenuShapeColor.YELLOW
  ],
  colorShade: MenuShapeColorShade.ALL,
  shapeTypes: [ShapeType.CIRCLE, ShapeType.SQUARE]
};

const shapeSlice = createSlice({
  name: 'shape',
  initialState,
  reducers: {
    setColumns: (state, action: PayloadAction<number>) => {
      state.columns = action.payload;
    },
    setColors: (state, action: PayloadAction<Array<MenuShapeColor>>) => {
      state.colors = [...action.payload];
      state.shapesDisplayed = allFiltersShapes({
        shapes: state.shapes,
        colors: state.colors,
        shapeTypes: state.shapeTypes,
        colorShade: state.colorShade
      });
    },
    setColorShade: (state, action: PayloadAction<MenuShapeColorShade>) => {
      state.colorShade = action.payload;
      state.shapesDisplayed = allFiltersShapes({
        shapes: state.shapes,
        colors: state.colors,
        shapeTypes: state.shapeTypes,
        colorShade: state.colorShade
      });
    },
    setShapeTypes: (state, action: PayloadAction<Array<ShapeType>>) => {
      state.shapeTypes = [...action.payload];
      state.shapesDisplayed = allFiltersShapes({
        shapes: state.shapes,
        colors: state.colors,
        shapeTypes: state.shapeTypes,
        colorShade: state.colorShade
      });
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getShapesData.pending, (state: ShapeState) => {
      state.loading = Loading.PENDING;
    });

    builder.addCase(
      getShapesData.fulfilled,
      (state: ShapeState, action: PayloadAction<GetShapesDataPayload>) => {
        state.loading = Loading.SUCCESS;
        state.shapes = [...action.payload];
        state.shapesDisplayed = [...action.payload];
      }
    );

    builder.addCase(
      getShapesData.rejected,
      (state: ShapeState, action: any) => {
        state.loading = Loading.ERROR;
        console.log(`Error occurred: ${JSON.stringify(action.error)}`);
      }
    );
  }
});

export const { setColumns, setColors, setColorShade, setShapeTypes } =
  shapeSlice.actions;
export default shapeSlice.reducer;
