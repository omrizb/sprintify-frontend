import { SvgButton } from "./SvgButton";


export function SearchBox({ handleChange, isBrowse }) {


    return (
        <div className="search-box">
            <div>
                <SvgButton
                    btnClass="btn-search-nav"
                    svgIcon="search"
                    svgClass="svg-big1"
                    tooltipTxt="Search"
                />
            </div>
            <input
                type="text"
                name="txt"
                placeholder="What do you want to play?"
                onChange={handleChange}
                required
            />
            <div className="flex-center-center">
                <div className="border-element">
                </div>
            </div>
            <div>
                <SvgButton
                    btnClass="btn-search-nav"
                    svgIcon={isBrowse ? 'browseFull' : 'browse'}
                    svgClass="svg-big1"
                    tooltipTxt="Browse"
                />
            </div>
        </div>
    )

}