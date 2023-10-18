"use client"

import { useState } from 'react';
import { TextField, MenuItem, Select, SelectChangeEvent } from '@mui/material'


const SiteUpdateForm = (props) => {
  const [city, setCity] = useState(props.site.destination_id);
  const {
    id,
    name,
    description,
    address,
    postal,
    phone,
    destination_id
   } = props.site;
  const destinations = props.destinations;

  const handleChange = (event: SelectChangeEvent) => {
    setCity(event.target.value as string);
  };

  return (
    <div>
      <form
        action="http://localhost:3000/api/sites/update"
        method="post"
        className='form'
        id={id}
      >
        <input type="hidden" id="id" name="id" value={id}></input>
        <TextField id="outlined-basic" label="Site Name" variant="outlined" type="text" name="name" defaultValue={name} required/>
        <TextField id="outlined-basic" label="Street Address" variant="outlined" type="text" name="address" defaultValue={address} required/>
        <Select
          labelId="city"
          id="city"
          value={city}
          name="city"
          label="city"
          onChange={handleChange}
          required
        >
          {destinations.map(destination => {
            return <MenuItem value={destination.id}>{destination.name}, {destination.region}</MenuItem>
          })}
        </Select>
        <TextField id="outlined-basic" label="Postal Code" variant="outlined" type="text" name="postal" defaultValue={postal} required/>
        <TextField id="outlined-basic" label="Phone Number" variant="outlined" type="text" name="phone" defaultValue={phone} />

        <TextField
        id="standard-textarea"
        className='extended-field'
        label="Description"
        name='description'
        defaultValue={description}
        multiline
        variant="outlined"
        />
        <button>Update</button>
      </form>
    </div>
  )
}

export default SiteUpdateForm