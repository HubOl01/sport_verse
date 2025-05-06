import { Menu } from '@mui/icons-material';
import styles from './Header.module.scss';
import { IconButton } from '@mui/material';

interface HeaderSmallProps {
    open: boolean
    onOpen: () => void;
}

export default function HeaderSmall(props: HeaderSmallProps) {


    return (
        <div className={`${styles.headerSmall} flex items-center justify-between`}>
            <IconButton

                aria-label="open drawer"
                onClick={props.onOpen}
                edge="start"
                sx={[
                    {
                        mr: 2,
                        color: "white"
                    },
                    props.open && { display: 'none' },
                ]}
            >
                <Menu />
            </IconButton>
        </div>

    )
}
