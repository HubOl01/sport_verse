import { Dialog, DialogTitle } from "@mui/material";
import { useState } from "react";
import { useQuery } from "react-query";
import { StatusProfileService } from "../../../shared/api/StatusProfile.service";
import { IStatusProfile } from "../../../shared/model/IStatusProfile";

export interface dialogProps {
    keepMounted: boolean;
    value: string;
    open: boolean;
    status: IStatusProfile;
    onClose: (value?: string) => void;
}
export function DialogStatus(props: dialogProps) {
    const { onClose, value: valueProp, open, ...other } = props;
    const { data: statuses } = useQuery(['statuses'], async () => StatusProfileService.getAll())
    const [value, setValue] = useState(valueProp);
    if (props.open) {
        if (!open) {
            setValue(valueProp)
        }
    }
    const handleClose = () => {
        onClose(value);
    };
    return (
        <Dialog
            sx={{ '& .MuiDialog-paper': { width: '80%', } }}
            maxWidth="xs"
            open={open}
            onClose={handleClose}
            {...other}
        >
            <DialogTitle className="self-center text-center"
                sx={{ padding: 2 }}
            >
                <div style={{
                    fontSize: '40px',
                    userSelect: 'none',
                }}>
                    {props.status?.svg_image}
                </div>
                <div style={{
                    fontSize: '25px',
                }}>
                    {props.status?.title}
                </div>
                {props.status?.desc}
            </DialogTitle>
        </Dialog>
    );
}