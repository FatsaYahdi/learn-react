import { Spinner } from "react-bootstrap";

export default function Loading() {
    return (
        <div className="d-flex justify-content-center align-items-center">
            <Spinner animation="border" variant="primary">
            </Spinner>
            <span className="ms-2">Loading...</span>
        </div>
    );
}