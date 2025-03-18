import React, { useState, useEffect } from 'react'
import Autocomplete from '@mui/material/Autocomplete'
import Checkbox from '@mui/material/Checkbox'
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'
import Grid2 from '@mui/material/Grid2'
import TextField from '@mui/material/TextField'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Button from '@mui/material/Button'
import InputAdornment from '@mui/material/InputAdornment'
import DeleteIcon from '@mui/icons-material/Delete'
import Typography from '@mui/material/Typography'

interface GroceryItem {
  checked: boolean
  quantity: number
  name: string
}

export function ShoppingList() {
  const [items, setItems] = useState<GroceryItem[]>([])
  const [options, setOptions] = useState([])
  const [searchValue, setSearchValue] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.frontendeval.com/fake/food/${searchValue}`
        )
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const json = await response.json()
        setOptions(json)
      } catch (e) {
        //setError(e);
      } finally {
        //setLoading(false);
      }
    }

    // TODO: debounce
    fetchData()
  }, [searchValue])

  const handleCheck = (item: GroceryItem) => () => {
    setItems({
      ...items.map(it => {
        if (it.name === item.name) {
          it.checked = true
        }
        return it;
      })
    });
  }

  const handleAdd = (e: any, name: string) => {
    // TODO: increase quantity
    setItems([
      ...items,
      {
        checked: false,
        quantity: 1,
        name,
      },
    ])
  }

  const handleDelete = (item: GroceryItem) => () => {
    console.log('delete')
  }

  const handleSearch = (e: any) => {
    if (e?.target?.value) {
      setSearchValue(e?.target?.value)
    }
  }

  return (
    <Paper>
      <Grid2 container padding={2} spacing={2} direction="column">
        <Typography variant="h6">My Shopping List</Typography>
        <Autocomplete
          options={options}
          inputValue={searchValue ?? ''}
          renderInput={(params) => (
            <TextField {...params} label="Search Groceries" />
          )}
          filterOptions={(x) => x}
          sx={{ width: '500px' }}
          onChange={handleAdd}
          onInputChange={handleSearch}
          disableClearable
          freeSolo
        />
        <hr />
        <List
          sx={{
            width: '100%',
            maxWidth: 360,
            bgcolor: 'background.paper',
          }}
        >
          {items.map((item, i) => {
            const { checked, quantity, name } = item
            return (
              <ListItem
                key={i}
                secondaryAction={
                  <IconButton edge="end" aria-label="delete">
                    <DeleteIcon />
                  </IconButton>
                }
                disablePadding
              >
                <ListItemButton role={undefined} onClick={handleCheck(item)} dense>
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={checked}
                      tabIndex={-1}
                      disableRipple
                    />
                  </ListItemIcon>
                  <ListItemText primary={`${quantity} ${name}`} />
                </ListItemButton>
              </ListItem>
            )
          })}
        </List>
      </Grid2>
    </Paper>
  )
}
