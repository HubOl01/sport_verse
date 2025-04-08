import { TextField } from '@mui/material'
import { ColorBackground } from '../shared/styles/colors'

interface Props {
    label: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    value: string
}

export default function MyTextField(props: Props) {
    return (
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
        />
    )
}
