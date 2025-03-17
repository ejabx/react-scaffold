import React, { useState, useEffect } from 'react'
import Paper from '@mui/material/Paper'
import Grid2 from '@mui/material/Grid2'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import InputAdornment from '@mui/material/InputAdornment'
import Typography from '@mui/material/Typography'

function isNumeric(str: string) {
    return !isNaN(+str) && isFinite(+str)
}

export function NumberInput(props: any) {
    const { onChange, onError } = props
    const validate = (e: any) => {
        const value: string = e.target.value
        onChange(e.target.value)
        onError(!isNumeric(value))
    }

    return (
        <TextField
            {...props}
            onChange={validate}
            error={!isNumeric(props.value)}
        />
    )
}

export function MorgageCalculator() {
    const [principle, setPrinciple] = useState('500000')
    const [interest, setInterest] = useState('3')
    const [loanLength, setLoanLength] = useState('30')
    const [morgage, setMorgage] = useState(0)
    const [error, setError] = useState(false)

    const calculateMorgage = () => {
        const P: number = parseFloat(principle)
        const r: number = parseFloat(interest) / 12 / 100
        const n: number = parseFloat(loanLength) * 12

        if (!error) {
            const newMorgage: number = (r * P) / (1 - (1 + r) ** (-1 * n))
            setMorgage(Math.round(newMorgage * 100) / 100)
        }
    }

    useEffect(() => {
        calculateMorgage()
    }, [])

    return (
        <Paper>
            <Grid2
                container
                padding={2}
                spacing={2}
                width={500}
                direction="column"
            >
                <NumberInput
                    id="principle"
                    label="Principle Loan Amount"
                    variant="outlined"
                    value={principle}
                    onChange={setPrinciple}
                    onError={setError}
                />
                <NumberInput
                    id="interest"
                    label="Interest Rate"
                    variant="outlined"
                    value={interest}
                    onChange={setInterest}
                    onError={setError}
                />
                <NumberInput
                    id="loan_length"
                    label="Length of Loan"
                    variant="outlined"
                    value={loanLength}
                    onChange={setLoanLength}
                    onError={setError}
                />
                <Grid2 container width={500}>
                    <Button
                        disabled={error}
                        variant="contained"
                        onClick={calculateMorgage}
                    >
                        Calculate
                    </Button>
                    <Typography variant="h6">
                        Your monthly morgage payment will be ${morgage}
                    </Typography>
                </Grid2>
            </Grid2>
        </Paper>
    )
}
