import { useState, useRef, useEffect } from 'react'
import { SvgIcon } from "./SvgIcon"




export function EditStation({station: stationToEdit, onCloseEdit, editStation}){
    
    const [station, setStation] = useState(stationToEdit)
    const [selectedFile, setSelectedFile] = useState(null)
    const fileInputRef = useRef(null)


    useEffect(() => {
        return () => {
            if (selectedFile) {
                URL.revokeObjectURL(URL.createObjectURL(selectedFile))
            }
        }
    }, [selectedFile])

    function handleChange(ev) {
        const value = ev.target.value
        const field = ev.target.name
    
        setStation(prevStation => ({...prevStation, [field]:value }))
    }

    const handleFileChange = (ev) => {
        const file = ev.target.files[0]
        console.log(file)
        if (file) {
            setSelectedFile(file)
            const imgUrl = URL.createObjectURL(selectedFile)
            console.log(imgUrl)
            setStation(prevStation => ({...prevStation, stationImgUrl:imgUrl }))
        }
    }

    function onSave(){
        editStation(station)
        onCloseEdit()
    }

    return(
        <div className = "edit-station">

            <div className = "header">
                <h1>Edit details</h1>
                <button onClick={onCloseEdit}>X</button> 
            </div>

            <div className = "body">

                <div className="album-image">

                    <div className="choose-photo">
                        <div>
                            {station.stationImgUrl ? (
                                    <img src={station.stationImgUrl} alt="" /> 
                                ) : (
                                    <SvgIcon iconName={'music'} />
                                )}
                        </div>
                    </div>


                    <div className="edit-image">
                        <button className="edit-image-btn" onClick={() => {fileInputRef.current.click()}}>
                            <div>
                                <SvgIcon iconName={'edit'}  />
                                <span>Choose photo</span>  
                            </div>
                        </button>

                        <input 
                            type="file" 
                            accept=".jpg, .jpeg, .png" 
                            onChange={handleFileChange} 
                            style={{ display: 'none' }} 
                            ref={fileInputRef} 
                        />
                        
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
                    name="name"
                    placeholder="Add a name"
                    value={station.name}
                    onChange={handleChange}
                    required
                     />
                </div>

                <div className="description">
                    <label htmlFor="text-area"></label>
                    <textarea 
                    name="description"
                    value={station.description}
                    onChange={handleChange} 
                    id="text-area"
                    placeholder="Add an optional description">
                    </textarea>
                </div>

                <div className="save">
                    <button onClick={onSave} className="save-btn" >
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