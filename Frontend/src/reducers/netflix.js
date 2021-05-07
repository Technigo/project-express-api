import { createSlice } from "@reduxjs/toolkit";

const netflix = createSlice({
  name: "netflix",
  initialState: {
    currentItem: { title: "fail" },
    items: [{}],
    filters: {
      category: null,
      singleCategory: null,
      media: null,
      page: 0,
    },
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
      let newPage;
      if (action.payload === "add") {
        newPage = store.filters.page + 1;
      } else {
        store.filters.page !== 0
          ? (newPage = store.filters.page - 1)
          : (newPage = store.filters.page);
      }
      store.filters.page = newPage;
    },
  },
});

export const generateSingleItem = (title) => {
  return (dispatch) => {
    fetch(`https://netflix-data.herokuapp.com/title/${title}`)
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
  let url = "";
  return (dispatch, getState) => {
    const media = getState().netflix.filters.media;
    const category = getState().netflix.filters.category;
    const singleCategory = getState().netflix.filters.singleCategory;
    const page = getState().netflix.filters.page;

    url = `https://netflix-data.herokuapp.com/${media}?${category}=${singleCategory}`;

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then((data) => dispatch(netflix.actions.setItemList(data)))
      .catch((error) => alert(`Ops, error: ${error}`));
  };
};

export default netflix;
