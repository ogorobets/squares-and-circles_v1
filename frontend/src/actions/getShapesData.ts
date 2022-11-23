import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export type Shape = {
  form: string;
  color: string;
  dark: boolean;
};

type GetShapesResponse = Array<Shape>;

export const getShapesData = createAsyncThunk(
  'shapes/getShapesQuery',
  async () => {
    const { data } = await axios.get<GetShapesResponse>(
      'http://localhost:8001/shapes',
      {
        headers: {
          Accept: 'application/json'
        }
      }
    );

    return data;
  }
);
