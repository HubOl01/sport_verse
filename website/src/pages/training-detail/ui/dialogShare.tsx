import { Box, Dialog, DialogContent, DialogTitle, IconButton, TextField } from "@mui/material";
import { useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import { FaWhatsapp } from "react-icons/fa6";
import { SlSocialVkontakte } from "react-icons/sl";
import { MdContentCopy } from "react-icons/md";
import { FaTelegramPlane } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { ColorBackground } from "../../../shared/styles/colors";



export interface dialogShareProps {
    keepMounted: boolean;
    value: string
    open: boolean;
    onClose: (value?: string) => void;
}

export function DialogShare(props: dialogShareProps) {
    const { onClose, value: valueProp, open, ...other } = props;
    const [value, setValue] = useState(valueProp);

    if (props.open && !open) {
        setValue(valueProp);
    }

    const handleClose = () => {
        onClose(value);
    };

    const copyLink = async () => {
        try {
            await navigator.clipboard.writeText(value);
            alert('Ссылка скопирована в буфер обмена!');
        } catch (err) {
            console.error('Failed to copy: ', err);
        }
    };

    // Шаринг в разные сервисы
    const shareToTelegram = () => {
        const url = `https://t.me/share/url?url=${encodeURIComponent(value)}&text=${encodeURIComponent("Посмотри это!")}`;
        window.open(url, '_blank');
    };

    const shareToWhatsApp = () => {
        const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(value)}`;
        window.open(url, '_blank');
    };

    const shareToVK = () => {
        const url = `https://vk.com/share.php?url=${encodeURIComponent(value)}`;
        window.open(url, '_blank');
    };

    const shareToGmail = () => {
        const subject = encodeURIComponent('Смотри, что я нашел!');
        const body = encodeURIComponent(`Ссылка: ${value}`);
        const url = `mailto:?subject=${subject}&body=${body}`;
        window.location.href = url;
        // или window.open(url, '_blank') - но mailto: обычно открывает почтовый клиент
    };

    return (
        <Dialog
            sx={{ '& .MuiDialog-paper': { width: '80%' } }}
            maxWidth="xs"
            open={open}
            onClose={handleClose}
            {...other}
        >
            <DialogTitle
                sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
            >
                Поделиться
                <IconButton size="small" onClick={handleClose}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            <DialogContent dividers sx={{ p: 2 }}>
                {/* Поле с ссылкой и кнопка "Скопировать" */}
                <Box display="flex" alignItems="center" gap={1}>
                    <TextField
                        fullWidth
                        label="Ссылка"
                        variant="outlined"
                        value={value}
                        sx={{
                            color: ColorBackground,
                        }}
                        InputProps={{ readOnly: true }}
                    />
                    <IconButton onClick={copyLink}>
                        <MdContentCopy />
                    </IconButton>
                </Box>

                {/* Иконки-ссылки для шаринга */}
                <Box
                    display="flex"
                    justifyContent="space-around"
                    alignItems="center"
                    mt={3}
                >
                    <IconButton onClick={shareToTelegram} title="Поделиться в Telegram">
                        <FaTelegramPlane size={24} />
                    </IconButton>
                    <IconButton onClick={shareToWhatsApp} title="Поделиться в WhatsApp">
                        <FaWhatsapp size={24} />
                    </IconButton>
                    <IconButton onClick={shareToVK} title="Поделиться в ВКонтакте">
                        <SlSocialVkontakte size={24} />
                    </IconButton>
                    <IconButton onClick={shareToGmail} title="Отправить на почту">
                        <MdOutlineEmail />
                    </IconButton>
                </Box>
            </DialogContent>
        </Dialog>
    );
}