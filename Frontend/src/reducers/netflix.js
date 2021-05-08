import { createSlice } from '@reduxjs/toolkit';

const netflix = createSlice({
  name: 'netflix',
  initialState: {
    currentItem: { title: 'fail' },
    items: [{}],
    filters: {
      category: null,
      singleCategory: null,
      media: null,
      page: 0
    },
    error: ''
  },
  reducers: {
    setItemList: (store, action) => {
      const newArr = action.payload.map((item) => {
        return { ...item };
      });
      store.items = newArr;
    },
    setCurrentItem: (store, action) => {
      const newItem = action.payload;
      store.currentItem = newItem;
    },
    setCategory: (store, action) => {
      const newFilter = { ...store.filters, category: action.payload };
      store.filters = newFilter;
    },
    setMedia: (store, action) => {
      const newFilter = { ...store.filters, media: action.payload };
      store.filters = newFilter;
    },
    setSingleCategory: (store, action) => {
      const newFilter = { ...store.filters, singleCategory: action.payload };
      store.filters = newFilter;
    },
    setPage: (store, action) => {
      const newPage = action.payload;
      store.filters.page = newPage;
    },
    setError: (store, action) => {
      const newError = action.payload;
      store.error = newError;
    }
  }
});

export const generateSingleItem = (title) => {
  return (dispatch) => {
    console.log(title)
    fetch(`https://netflix-api-data.herokuapp.com/title/${title}`)
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then((data) => dispatch(netflix.actions.setCurrentItem(data)));
  };
};

export const generateCategories = () => {
  let url = '';
  return (dispatch, getState) => {
    dispatch(netflix.actions.setError(''));
    const { media, category, singleCategory, page } = getState().netflix.filters;

    url = `https://netflix-api-data.herokuapp.com/${media}?${category}=${singleCategory}&page=${page}`;

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then((data) => dispatch(netflix.actions.setItemList(data)))
      .catch((error) => dispatch(netflix.actions.setError(error)));
  };
};

export default netflix;
