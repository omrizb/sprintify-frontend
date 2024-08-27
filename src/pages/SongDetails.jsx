import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'


export function SongDetails() {

    const { id } = useParams()

   
    return (
        <div className="song-details">
            SONG DETAILS
        </div>
    )
}