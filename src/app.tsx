import React, { useState, useEffect } from 'react'
import Paper from '@mui/material/Paper'
import Grid2 from '@mui/material/Grid2'
import Typography from '@mui/material/Typography'

export function App() {
    return (
        <Paper variant='outlined'>
            <Grid2 margin={5} padding={5}>
                <Typography align='center'>Hello, World</Typography>
            </Grid2>
        </Paper>
    )
}