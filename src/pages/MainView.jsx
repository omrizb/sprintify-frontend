import { array } from "prop-types"
import { MainViewHeader } from "../cmps/MainView/MainViewHeader"
import { MainViewBody } from "../cmps/MainView/MainViewBody"

export function MainView() {

    

    return (
        <div className="main-view">
            <MainViewHeader />
            <MainViewBody />
        
        </div>
    )
}