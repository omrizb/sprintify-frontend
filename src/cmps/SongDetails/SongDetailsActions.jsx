import { useState } from 'react'
import { SvgIcon } from "../SvgIcon"
import { SvgButton } from "../SvgButton.jsx"
import { changeViewMode } from '../../services/event-bus.service.js'
import { DropDownMenu } from '../Menus/DropDownMenu.jsx'

export function SongDetailsActions({ song }) {

    return (
        <div className="song-action-bar">
            <div className="song-action-bar-row">
                <div className="song-action-bar-container">
                    <div className="wrap-playPlaylist">
                        <button className="action-bar-btn playPlaylist icon btn-medium">
                            <SvgIcon iconName={"playPlaylist"} />
                        </button>
                    </div>
                    <SvgButton
                        btnClass={"action-bar-btn icon"}
                        svgIcon={"removePlaylist"}
                        svgClass={"svg-big1"}
                        tooltipTxt={`Remove from Your Library`}
                    />
                    <SvgButton
                        btnClass={"action-bar-btn icon"}
                        svgIcon={"addPlaylist"}
                        svgClass={"svg-big1"}
                        tooltipTxt={`Save to Your Library`}
                    />
                    <SvgButton
                        btnClass={"action-bar-btn icon"}
                        svgIcon={"dots"}
                        svgClass={"svg-big1"}
                        tooltipTxt={`More options for ${song.name}`}
                    />
                </div>
            </div>
        </div>
    )
}

