export function EditStation({station, onCloseEdit}){

    // console.log(station)

    // function onClose(){
    //     onCloseEdit()
    // }

    return(
        <div className = "edit-station">

            <div className = "header">
                <h1>Edit details</h1>
                <button>X</button> 
            </div>

            <div className = "body">
                <input accept="image/.jpg, image/.jpeg, image/.png" type="file" />

                <div className="album-image"></div>

                <div className="title">
                    <label htmlFor="text-input"> </label>
                    <input 
                    id="text-input"
                    type="text"
                    placeholder="Add a name"
                    value={station.name} />
                </div>

                <div className="description">
                    <label htmlFor="text-area"></label>
                    <textarea 
                    name="" 
                    id="text-area"
                    placeholder="Add an optional description">
                    </textarea>
                </div>

                <button className="save-btn" >Save</button>
                <p className="disclaimer">
                    By proceeding, you agree to give Sprintify acces to the image you choose 
                    to upload. Please make sure you have the right to upload the image.
                </p>
            </div>
        </div>
    )
}