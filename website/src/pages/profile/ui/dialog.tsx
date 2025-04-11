import { Dialog, DialogTitle } from "@mui/material";
import { useEffect, useState } from "react";
import { IStatusProfile } from "../../../shared/model/IStatusProfile";
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import { DialogStatusList } from "./dialogStatus";
import { IProfile } from "../../../shared/model/IProfile";

export interface dialogProps {
    keepMounted: boolean;
    value: string;
    open: boolean;
    status: IStatusProfile;
    profile: IProfile;
    onClose: (value?: string) => void;
}

export function DialogStatus(props: dialogProps) {
    const { onClose, value: valueProp, open, ...other } = props;
    const [value, setValue] = useState(valueProp);

    const [openList, setOpenList] = useState(false);
    const [valueStatus, setValueStatus] = useState<IStatusProfile | null>(props.status || null);
    useEffect(() => {
        if (props.status) {
            setValueStatus(props.status);
        }
    }, [props.status]);

    if (props.open) {
        if (!open) {
            setValue(valueProp);
        }
    }

    const handleClose = () => {
        onClose(value);
    };
    const handleCloseList = (newValue?: IStatusProfile) => {
        setOpenList(false);

        if (newValue) {
            setValueStatus(newValue);
        }
    };
    const handleEditClick = () => {
        setOpenList(true);
    };
    const handleSelectedStatus = (status: IStatusProfile) => {
        setValueStatus(status);
    };
    return (
        <Dialog
            sx={{
                '& .MuiDialog-paper': {
                    width: '80%',
                    position: 'relative',
                },
            }}
            maxWidth="xs"
            open={open}
            onClose={handleClose}
            {...other}
        >
            <DialogTitle
                className="self-center text-center"
                sx={{
                    padding: 2,
                    position: 'relative',
                    width: '100%',
                }}
            >
                <IconButton
                    aria-label="edit"
                    onClick={handleEditClick}
                    sx={{
                        position: 'absolute',
                        top: "5px",
                        right: "20px",
                    }}
                >
                    <EditIcon />
                </IconButton>
                <DialogStatusList keepMounted={false} value={valueStatus!} open={openList} onClose={handleCloseList} onSelectStatus={handleSelectedStatus} profile={props.profile} />

                {/* Основной контент заголовка */}
                <div style={{ fontSize: '40px', userSelect: 'none' }}>
                    {valueStatus?.svg_image || "Нет изображения"}
                </div>
                <div style={{ fontSize: '25px' }}>
                    {valueStatus?.title || "Нет заголовка"}
                </div>
                <div style={{
                    margin: "5px 10px 0px 10px",
                    lineHeight: "1.3",
                }}>
                    {valueStatus?.desc || "Нет описания"}
                </div>
            </DialogTitle>
        </Dialog>
    );
}