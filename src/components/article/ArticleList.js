import React, { Component } from 'react'
//import the components we will need
import ArticleCard from './ArticleCard'
import ArticleManager from '../../modules/ArticleManager'
import AddArticleModal from './AddArticleModal'

class ArticleList extends Component {
    //define what this component needs to render
    state = {
        articles: [],
    }

componentDidMount(){
    this.didMountFunction()
}

didMountFunction = () => {
    console.log("ARTICLE LIST: ComponentDidMount");
    //getAll from ArticleManager and hang on to that data; put it in state
    ArticleManager.getAll()
    .then((articles) => {
        this.setState({
            articles: articles
        })
    })
}

deleteArticle = id => {
    ArticleManager.delete(id)
    .then(() => {
      ArticleManager.getAll()
      .then((newArticles) => {
        this.setState({
            articles: newArticles
        })
      })
    })
  }
  
render(){

    console.log("ARTICLE LIST: Render");

    return(
    <React.Fragment>
        <AddArticleModal
            didMountFunction={this.didMountFunction}
        />
        <section className="section-content">
        <button type="button"
            className="btn"
            onClick={() => {this.props.history.push("/articles")}}>
            
        </button>
        </section>
        <div className="container-cards">
      {this.state.articles.map(article =>
        
        <ArticleCard
            key={article.id}
            article={article}
            deleteArticle={this.deleteArticle}
            {...this.props}
            />
      )}
        </div>
    </React.Fragment>
    )
}
}

export default ArticleList