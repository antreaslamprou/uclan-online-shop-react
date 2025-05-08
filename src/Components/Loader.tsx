interface Props {
    small?: boolean,
}

export default function Loader(props: Props) {
    return (
        <div className="d-flex justify-content-center align-items-center px-2 py-3" style={ props.small ? {  maxHeight: '20px' } : {  minHeight: '200px' }}>
            <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    )
}