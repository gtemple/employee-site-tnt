"use client"

import { useState } from 'react';
import { TextField, MenuItem, Select, SelectChangeEvent } from '@mui/material'

const UpdateTable = (props) => {
  const [city, setCity] = useState('');
  const {
    name,
    description
   } = props.site;
  const destinations = props.destinations;

  const handleChange = (event: SelectChangeEvent) => {
    setCity(event.target.value as string);
  };

  return (
    <div>
      {console.log('props:', name, destinations)}
      <form
        action="api/sites/update"
        method="post"
        className='form'
      >
        <TextField id="outlined-basic" label="Site Name" variant="outlined" type="text" name="name" defaultValue={name} required/>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={city}
          label="destination"
          onChange={handleChange}
        >
          {destinations.map(destination => {
            return <MenuItem value={destination.id}>{destination.name}</MenuItem>
          })}
        </Select>
        <TextField
        id="standard-textarea"
        className='extended-field'
        label="Description"
        defaultValue={description}
        multiline
        variant="outlined"
        />
        <button>Update</button>
      </form>
    </div>
  )
}

export default UpdateTable