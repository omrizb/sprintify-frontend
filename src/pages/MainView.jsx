import { useState } from 'react'

import { colorUtilService } from '../services/color.util.service'

import { MainViewHeader } from '../cmps/MainView/MainViewHeader'
import { MainViewBody } from '../cmps/MainView/MainViewBody'
import { HeaderFixer } from '../cmps/HeaderFixer'

export function MainView() {

    const [bgColor, setBgColor] = useState('#121212')

    return (
        <div className="main-view">
            <HeaderFixer
                header={<MainViewHeader />}
                className="top-rounded-box"
                bgColor={colorUtilService.adjustBrightness(bgColor, 0.4)}
            >
                <div className="secondary-background" style={{ backgroundColor: bgColor }}></div>
                <div className="empty-header" style={{ height: '64px' }} />
                <MainViewBody onSetBgColor={setBgColor} />

            </HeaderFixer>
        </div>
    )
}