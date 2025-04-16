interface InformCountProps {
    count: string
    title: string
}

export default function InformCount(props: InformCountProps) {
    return (
        <div>
            <div style={{ fontSize: "30px", fontWeight: "bold", textAlign: 'center' }}>
                {props.count}
            </div>
            <div style={{ fontSize: "14px", fontWeight: "bold", textAlign: 'center' }}>
                {props.title}
            </div>
        </div>
    )
}