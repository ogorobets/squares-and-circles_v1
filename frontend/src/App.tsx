import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { getShapesData } from 'actions/getShapesData';
import Loader from 'components/loader/Loader';
import { Loading } from 'constants/constants';
import { AppContainer, AppTitle, ErrorWrapper } from 'components/app/Styles';
import ShapesContainer from 'components/app/ShapesContainer';
import TopMenu from 'components/top-menu';

function App() {
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.shapes.loading);

  useEffect(() => {
    dispatch(getShapesData());
  }, [dispatch]);

  return (
    <AppContainer>
      <AppTitle>Круги и квадраты, v.1.0</AppTitle>
      <TopMenu />
      {loading === Loading.INITIAL || loading === Loading.PENDING ? (
        <Loader />
      ) : loading === Loading.ERROR ? (
        <ErrorWrapper>
          Sorry! An error occured while trying to fetch shapes data
        </ErrorWrapper>
      ) : (
        <ShapesContainer />
      )}
    </AppContainer>
  );
}

export default App;
