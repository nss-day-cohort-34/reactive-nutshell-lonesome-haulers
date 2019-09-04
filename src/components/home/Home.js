import React, { Component } from "react"
import HomeArticleCard from "./HomeArticleCard"
import HomeEventCard from "./HomeEventCard"
import HomeFriendCard from "./HomeFriendCard"

class Home extends Component {

    state = {
        background: ""
    }


    render() {
            return (
                <>
                    <h1 className="feature__name">Home</h1>
                    <HomeArticleCard
                        {...this.props}
                    />
                    <HomeEventCard
                        {...this.props}
                    />
                    <HomeFriendCard
                        {...this.props}
                    />

                </>
            )
        }
}

export default Home;