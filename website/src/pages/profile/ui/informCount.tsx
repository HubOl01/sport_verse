import { CircularProgress, Typography } from "@mui/material"

interface InformCountProps {
    count?: number
    title: string,
    isLoading: boolean
    onClick?: () => void
}

export default function InformCount(props: InformCountProps) {
    return (
        <div onClick={props.onClick} style={{
            cursor: props.onClick ? "pointer" : undefined,
            display: "flex", flexDirection: "column", alignItems: "center",
        }}>
            {!props.isLoading ?
                <Typography textAlign={"center"} variant="h5" fontWeight={600}>
                    {props.count}
                </Typography> :
                <CircularProgress size={20} thickness={4} sx={{ color: "#4758d6" }} />
            }
            <Typography textAlign={"center"} lineHeight={1.2} variant="body1">
                {props.title}
            </Typography>
        </div>
    )
}