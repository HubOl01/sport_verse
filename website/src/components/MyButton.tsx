import { Button } from '@mui/material'
import React from 'react'
import { ColorBackground } from '../shared/styles/colors'

interface ButtonProps {
    onClick: () => void
    label: string,
    style?: React.CSSProperties,
    secondary?: boolean
}

export default function MyButton(props: ButtonProps) {
    return (
        <Button
            variant={!props.secondary ? "contained" : "outlined"}
            component="label"
            onClick={props.onClick}
            sx={!props.secondary ? {
                backgroundColor: "#4758d6",
                color: "#FFFFFF",
                borderRadius: "10px",
                // width: "100%",
            } : {
                color: ColorBackground,
                borderColor: ColorBackground,
                borderRadius: "10px",
            }}
            style={props.style}
        >
            {props.label}
        </Button>
    )
}
