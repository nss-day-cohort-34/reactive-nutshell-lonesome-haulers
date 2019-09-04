import React, { Component } from 'react'
//import the components we will need
import ArticleCard from './ArticleCard'
import ArticleManager from '../../modules/ArticleManager'
import AddArticleModal from './AddArticleModal'

class ArticleList extends Component {
    //define what this component needs to render

componentDidMount(){
    this.didMountFunction()
}

didMountFunction = () => {
    this.props.updateArticles()
}

deleteArticle = id => {
    ArticleManager.delete(id)
    .then(() => {
        this.didMountFunction()
    })
  }
  
render(){


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
      {this.props.articles.map(article =>
        
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