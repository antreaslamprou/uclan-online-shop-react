interface Props {
    heading: string,
    type: string,
    src: string
}

export default function Video(props: Props) {
    return(
        <>
            <h2 className="text-orange mt-5 mb-3">{props.heading}</h2>
            <>
                {(props.type === 'link') ?
                    (<iframe src={props.src} title="Uclan embedded video"></iframe>
                ) : (
                    <video controls>
                        <source src={`${props.src}.mp4`} type="video/mp4" />
                        <source src={`${props.src}.webm`} type="video/webm" />
                        <source src={`${props.src}.ogg`} type="video/ogg" />
                        Your browser does not support HTML5 video.
                    </video>
                )}
            </>
        </>
    )
}