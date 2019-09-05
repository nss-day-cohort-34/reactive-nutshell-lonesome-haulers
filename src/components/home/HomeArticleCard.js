import React, { Component } from "react"



class HomeArticleCard extends Component {



    render() {
        console.log(this.props)
        if (this.props.articles.length !== 0) {
        return (
            <div className="card">
               <div className="card-content">
                 <h3 className="home_h3">Featured Article</h3>
                 <h4><i>Title: <span className="card-articleTitle">{this.props.articles[0].title}</span></i></h4>
                 <p className="home_p"><i>Synopsis: {this.props.articles[0].synopsis}</i></p>
                 <p className="home_p"><i>URL: <a href={this.props.articles[0].url}>{this.props.articles[0].url}</a></i></p>
                 <p className="home_p"><i>Created: {this.props.articles[0].timestamp}</i></p>
               </div>
           </div>
        )
    } else {
        return <h3 className="home_h3 no_h3">No Posted Articles</h3>
    }
}
}

export default HomeArticleCard