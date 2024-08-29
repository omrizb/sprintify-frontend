import { EditStation } from "./EditStation";

export function Modal({ children, closeModal }) {

    return (<div className="modal">
        <div className="modal-backdrop" onClick={closeModal}>
            <div className="modal-content" onClick={ev => ev.stopPropagation()}>
                <EditStation station = {children} onCloseEdit = {closeModal} />
            </div>
        </div>
    </div>)
}