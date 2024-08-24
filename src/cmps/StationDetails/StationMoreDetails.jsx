export function StationMoreDetails() {
    return (
        <section className="station-more-details">
            <section className="About">
                <h1>About</h1>
                <LongTxt txt={station.description} />
            </section>
            <section className="links">
                <a href="#">Rating</a>
                <a href="#">tag</a>
            </section>
            <section className="up-next">
                <h1>Up next</h1>
            </section>
        </section>
    )
}