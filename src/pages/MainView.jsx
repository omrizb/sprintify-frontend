import { array } from "prop-types"
import { MainViewHeader } from "../cmps/MainView/MainViewHeader"
import { MainViewBody } from "../cmps/MainView/MainViewBody"

export function MainView() {

    const count = 50

    function createSongs() {
        const songs = []
        for (let i = 0; i < count; i++) {
            songs.push(<li key={i}>Song {i + 1}</li>)
        }
        return songs
    }

    return (
        <div className="main-view">
            <MainViewHeader />
            <MainViewBody />
        
        </div>
    )
}