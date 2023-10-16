import React from 'react'

import { getToursByUserId } from '@/app/api/getTours';

const Tours = async () => {
  const tours = await getToursByUserId('1');
  return (
    <div>page{console.log('tttooooouuuurs:', tours)}</div>
  )
}

export default Tours;