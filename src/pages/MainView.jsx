import { useState } from 'react'
import { colorUtilService } from '../services/color.util.service'

import { MainViewHeader } from '../cmps/MainView/MainViewHeader'
import { MainViewBody } from '../cmps/MainView/MainViewBody'
import { HeaderFixer } from '../cmps/HeaderFixer'

export function MainView() {

    const [bgColor, setBgColor] = useState(null)

    return (
        <div className="main-view">
            <HeaderFixer
                header={<MainViewHeader />}
                className="top-rounded-box"
                // bgColor={bgColor && colorUtilService.adjustBrightness(bgColor, 0.4)}
                bgColor='gray'
            >
                <div className="secondary-background" style={{ backgroundColor: 'gray' }}></div>
                <div className="empty-header" style={{ height: '64px' }} />
                <MainViewBody />

            </HeaderFixer>
        </div>
    )
}