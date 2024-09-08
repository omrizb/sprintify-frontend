export function PopUp({ children, closePopUp }) {

    return (<div className="pop-up">
        <div className="pop-up-backdrop" onClick={closePopUp}>
            <div className="pop-up-content" onClick={ev => ev.stopPropagation()}>
                {children}
            </div>
        </div>
    </div>)
}