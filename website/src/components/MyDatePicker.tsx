
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { ColorBackground } from '../shared/styles/colors'

interface Props {
    label: string,
    onChange: (e: Date | null) => void,
    value?: Date | null | undefined
}

export default function MyDatePicker(props: Props) {
    return (
        <DatePicker
            label={props.label}
            value={props.value}
            onChange={props.onChange}
            views={['year', 'month', 'day']}
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
        />
    )
}
