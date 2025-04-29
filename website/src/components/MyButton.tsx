import { Button } from '@mui/material'
import React from 'react'
import { ColorBackground } from '../shared/styles/colors'

interface ButtonProps {
    onClick: () => void
    label: string,
    style?: React.CSSProperties,
    secondary?: boolean
    textButton?: boolean
    styleButton?: React.CSSProperties
    disabled?: boolean
}

export default function MyButton(props: ButtonProps) {
    return (
        props.textButton ?
            <Button sx={
                props.styleButton ??
                {
                    color: "black",
                    // borderRadius: "30px",
                    justifyContent: "start",
                    textTransform: 'none',
                    width: "100%",
                    fontSize: "18px",
                    padding: "5px 8px 5px 0px",
                }}
                onClick={props.onClick}
                disabled={props.disabled}
            >{props.label}
            </Button>
            :
            <Button
                variant={!props.secondary ? "contained" : "outlined"}
                component="label"
                onClick={props.onClick}
                sx={!props.secondary ?
                    props.styleButton ?? {
                        backgroundColor: "#4758d6",
                        color: "#FFFFFF",
                        borderRadius: "10px",
                        // width: "100%",
                    } : props.styleButton ?? {
                        color: ColorBackground,
                        borderColor: ColorBackground,
                        borderRadius: "10px",
                        "&.Mui-disabled": {
                            color: ColorBackground || "black",
                            borderColor: ColorBackground || "black",
                            opacity: 1,
                            textTransform: 'none',
                        }
                    }}
                style={props.style}
                disabled={props.disabled}
            >
                {props.label}
            </Button>
    )
}
