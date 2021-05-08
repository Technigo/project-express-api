import React, { useEffect, useCallback } from 'react';
import styled from 'styled-components/macro';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Card } from '../components/Card'
import { generateSingleItem } from '../reducers/netflix';

export const DetailScreen = () => {
    const title = useParams();
    const dispatch = useDispatch()
    const item =useSelector(store => store.netflix.currentItem)

    const onSingleItem = useCallback(() => {
      dispatch(generateSingleItem(title.title.toString().toLowerCase().replace(" ", "")));
     return console.log("done")
    }, [dispatch, title])

    useEffect(() => {
      onSingleItem()
      return console.log("work")
      }, [onSingleItem]);


  console.log(item.cast)
    
    return <Card {...item} />
}