import { SvgIcon } from "./SvgIcon";

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

                <div className="album-image">

                    <div className="choose-photo">
                        <div>
                            <SvgIcon iconName={'music'} />  
                        </div>
                    </div>

                    <div className="edit-image">
                        <button className="edit-image-btn">
                            <div>
                                <SvgIcon iconName={'edit'} svgClass={'dots'} />  
                            </div>
                        </button>
                    </div>

                    <div className="more">
                        <button>
                            <SvgIcon iconName={'dots'} /> 
                            <span className="hidden-visually">Edit photo</span>
                        </button>
                    </div>

                </div>

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

                <div className="save">
                    <button className="save-btn" >
                        <span>Save</span>
                    </button> 
                </div>

                <p className="disclaimer">
                    By proceeding, you agree to give Sprintify acces to the image you choose 
                    to upload. Please make sure you have the right to upload the image.
                </p>
            </div>
        </div>
    )
}