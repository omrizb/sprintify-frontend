import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { loadStation, updateStation } from '../store/actions/station.actions'

// import { SvgIcon } from "../SvgIcon"
import { StationDetailsHeader } from '../cmps/StationDetails/StationDetailsHeader'


export function AddStation(){
    const { id } = useParams()
    const station = useSelector(storeState => storeState.stationModule.station)
    

    useEffect(() => {
        loadStation(id)
    }, [])

    // console.log(stations)
    return (
        <div className="add-station">
            <StationDetailsHeader station={station}  />
        </div> 
    )
}