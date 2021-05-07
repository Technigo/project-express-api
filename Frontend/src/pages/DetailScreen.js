import React, { useEffect } from 'react';
import styled from 'styled-components/macro';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Card } from '../components/Card'
import { generateSingleItem } from '../reducers/netflix';

export const DetailScreen = () => {
    const title = useParams();
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(generateSingleItem(title.title));
      }, [title, dispatch]);

  const item = useSelector(store => store.netflix.currentItem)

  console.log(item.cast)
    
    return <Card {...item} />
}