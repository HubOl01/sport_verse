import { FormControl, IconButton, Input, InputAdornment, InputLabel, TextField } from '@mui/material'
import { ColorBackground } from '../shared/styles/colors'
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';

interface Props {
    label: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    value: string
    isLines?: boolean
    isBorder?: boolean
    isSearch?: boolean
    isAutocomplete?: boolean
    maxLength?: number,
    maxRows?: number,
    inputStyle?: React.CSSProperties,
    onClickSearch?: () => void,
    onClickClear?: () => void,
}

export default function MyTextField(props: Props) {
    return (
        props.isSearch ? <FormControl sx={{
            ...props.inputStyle,
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
        }}
            variant="standard">
            <InputLabel htmlFor="standard-search">{props.label}</InputLabel>
            <Input
                id="standard-search"
                onChange={props.onChange} value={props.value}
                endAdornment={
                    <InputAdornment position="end">
                        {
                            props.value !== '' ?
                                <IconButton
                                    onClick={props.onClickClear} aria-label="clear"
                                >
                                    <CloseIcon />
                                </IconButton> : <></>
                        }
                        <IconButton
                            onClick={props.onClickSearch} aria-label="search"
                        >
                            <SearchIcon />
                        </IconButton>
                    </InputAdornment>
                }
            />
        </FormControl> :
            props.isBorder ?
                <TextField label={props.label} variant="outlined" sx={
                    {
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
                    }}
                    slotProps={{
                        htmlInput: { maxLength: props.maxLength },
                        input: {
                            maxRows: props.maxRows,
                            style: {
                                ...props.inputStyle,
                            },
                        },
                    }}
                    onChange={props.onChange} value={props.value}
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


