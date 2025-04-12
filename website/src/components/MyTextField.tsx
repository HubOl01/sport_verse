import { BaseTextFieldProps, FormControlProps, SlotProps, TextField } from '@mui/material'
import { ColorBackground } from '../shared/styles/colors'

interface Props {
    label: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    value: string
    isLines?: boolean
    isBorder?: boolean
    isAutocomplete?: boolean
    maxLength?: number,
    maxRows?: number,
    inputStyle?: React.CSSProperties,
}

export default function MyTextField(props: Props) {
    return (
        props.isBorder ?
            <TextField label={props.label} variant="outlined" sx={{
                width: '100%',
                '& label.Mui-focused': {
                    color: ColorBackground,
                },
                '& .MuiInput-underline:after': {
                    borderBottomColor: ColorBackground,
                },
                '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': {
                        borderColor: ColorBackground,
                    },
                    '&.Mui-focused fieldset': {
                        borderColor: ColorBackground,
                    },
                },
            }} onChange={props.onChange} value={props.value}
                multiline={props.isLines}
            /> : <TextField
                variant="standard"
                multiline={props.isLines}
                margin="none"
                autoFocus
                autoComplete={props.isAutocomplete ? undefined : 'off'}
                sx={{
                    width: "100%",
                    "& .MuiInputBase-root": {
                        margin: 0,
                        padding: 0,
                    },
                    "& .MuiInputBase-input": {
                        margin: 0,
                        padding: 0,
                    },

                }}
                value={props.value}
                onChange={props.onChange}
                placeholder={props.label}
                slotProps={{
                    htmlInput: { maxLength: props.maxLength },
                    input: {
                        maxRows: props.maxRows,
                        style: {
                            ...props.inputStyle,
                        },

                        disableUnderline: true,
                    },
                }}
            />
    )
}


