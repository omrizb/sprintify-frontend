import { useState } from 'react'
import { MainViewHeader } from '../cmps/MainView/MainViewHeader'
import { MainViewBody } from '../cmps/MainView/MainViewBody'

export function MainView() {

    const [bgColor, setBgColor] = useState(null)

    return (
        <div className="main-view">
            <div className="secondary-background" style={{ backgroundColor: 'gray' }}></div>
            <MainViewHeader />
            <MainViewBody />
        </div>
    )
}