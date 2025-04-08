import { ColorBackground } from '../shared/styles/colors'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'

interface Props {
    label: string,
    onChange: (e: Date | null) => void,
    value?: Date | null | undefined
}

export default function MyDateTimePicker(props: Props) {
    return (
        <DateTimePicker
            label={props.label}
            value={props.value}
            onChange={props.onChange}
            sx={{
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
            }}
            viewRenderers={{
                hours: null,
                minutes: null,
                seconds: null,
            }} />
        // <TextField label={props.label} variant="outlined" sx={{
        //     width: '100%',

        // }} onChange={props.onChange} value={props.value}
        // />
    )
}
