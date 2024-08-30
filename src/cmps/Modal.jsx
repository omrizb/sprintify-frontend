import { EditStation } from "./EditStation";

export function Modal({ children, closeModal, editStation }) {

    return (<div className="modal">
        <div className="modal-backdrop" onClick={closeModal}>
            <div className="modal-content" onClick={ev => ev.stopPropagation()}>
                <EditStation station = {children} onCloseEdit = {closeModal} editStation={editStation} />
            </div>
        </div>
    </div>)
}