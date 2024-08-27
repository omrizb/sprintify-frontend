import { Footer } from "../cmps/Footer";
import { SearchTopic } from "../cmps/SearchTopic";
import { imgService } from "../services/imgService";

export function Search() {
    return (
        <div className="search-page">
            <h1>Browse all</h1>

            <section className="browse-topics">
                <SearchTopic topic={'Music'} imgKey={'music'} color = {'pink'} />
                <SearchTopic topic={'Podcasts'} imgKey={'podcasts'} color = {'green'} />
                <SearchTopic topic={'Live Events'} imgKey={'liveEvents'} color = {'purple'} />
                <SearchTopic topic={'Made For You'} imgKey={'madeForYou'} color = {'blue'} />
                <SearchTopic topic={'New Releases'} imgKey={'newReleases'} color = {'bright-green'} />
                <SearchTopic topic={'Pop'} imgKey={'pop'} color = {'turquoise'} />
            </section>

           
        
            <Footer/>
        </div>
    )
}