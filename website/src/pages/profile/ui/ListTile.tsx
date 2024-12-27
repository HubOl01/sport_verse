import styles from './Profile.module.scss'


interface ListTileProps {
    title: string,
    content: string
}
export default function ListTile({ title, content }: ListTileProps) {
    return (
        <div className='flex'>
            <div className={`${styles.title_about_title}`}>
                {title}
            </div>
            <div className={`${styles.title_about_content}`}>
                {content}
            </div>
        </div>
    )
}