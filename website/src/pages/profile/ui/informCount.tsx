import { Typography } from "@mui/material"

interface InformCountProps {
    count: string
    title: string
    onClick?: () => void
}

export default function InformCount(props: InformCountProps) {
    return (
        <div onClick={props.onClick} style={{
            cursor: props.onClick ? "pointer" : undefined,
        }}>
            <Typography textAlign={"center"} variant="h5" fontWeight={600}>
                {props.count}
            </Typography>
            <Typography textAlign={"center"} lineHeight={1.2} variant="body1">
                {props.title}
            </Typography>
        </div>
    )
}