import React, { Component } from 'react';
import { Button } from 'reactstrap';
import "./Article.css"
import ArticleManager from "../../modules/ArticleManager"


let styles = {
  backgroundColor: 'cornsilk',
};

class ArticleCard extends Component {
  
  state = {
    featuredArticleCount: 0,
    loadingStatus: false,
    transition: "1s",
    backgroundColor1: "",
    backgroundColor2: "",
  }

  updateFeaturedArticleCountAdd = evt => {
    const featuredArticleCount= this.state.featuredArticleCount + 1
    evt.preventDefault()
    this.setState({ loadingStatus: true });
    const editedArticle = {
      id: this.props.article.id,
      title: this.props.article.title,
      synopsis: this.props.article.synopsis,
      url: this.props.article.url,
      timestamp: this.props.article.timestamp,
      userId: this.props.article.userId,
      featuredArticleCount: featuredArticleCount
    };
    console.log(editedArticle)

    ArticleManager.update(editedArticle)
      .then(() => this.props.updateArticles())
  }

  updateFeaturedArticleCountMinus = evt => {
    const featuredArticleCount= this.state.featuredArticleCount - 1
    evt.preventDefault()
    this.setState({ loadingStatus: true });
    const editedArticle = {
      id: this.props.article.id,
      title: this.props.article.title,
      synopsis: this.props.article.synopsis,
      url: this.props.article.url,
      timestamp: this.props.article.timestamp,
      userId: this.props.article.userId,
      featuredArticleCount: featuredArticleCount
    };

    ArticleManager.update(editedArticle)
      .then(() => this.props.updateArticles())
  }

  componentDidMount() {
    this.setState({
      featuredArticleCount: this.props.article.featuredArticleCount
    })
  }
  constructor() {
    super()
    this.mouseEnter = this.mouseEnter.bind(this);
    this.mouseLeave = this.mouseLeave.bind(this);
  }
  

  mouseEnter(event) {
   if (event.currentTarget.id === "1") {
    const foundUser = this.props.users.find(user => user.id === this.props.article.userId)
    this.setState({ backgroundColor1: foundUser.color })
   } else {
    const foundUser = this.props.users.find(user => user.id === this.props.article.userId)
    this.setState({ backgroundColor2: foundUser.color })
   }
  }

  mouseLeave() {
    this.setState({ 
      backgroundColor1: "white",
      backgroundColor2: "white"
   })
  }
  render() {
    const currentUser = JSON.parse(sessionStorage.getItem("credentials"))
    if (this.props.article.userId === currentUser.id) {
      return (
        <div className="card">
          <div className="card-content">
            <h2>Title: <span className="card-articleTitle">{this.props.article.title}</span></h2>
            <p>Synopsis: {this.props.article.synopsis}</p>
            <p>URL: <a href={this.props.article.url}>{this.props.article.url}</a></p>
            <p>Created: {this.props.article.timestamp}</p>
            <Button outline color="dark" size="sm"
              onClick={() => { this.props.history.push(`/articles/${this.props.article.id}/edit`) }}>Edit</Button>
            <Button outline color="danger" size="sm" onClick={() => this.props.deleteArticle(this.props.article.id)}>Delete</Button>
            <button id="1" onClick={this.updateFeaturedArticleCountAdd} onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave} style={{ backgroundColor: this.state.backgroundColor1,transition: this.state.transition }} disabled={this.state.loadingStatus} className="arrowButton1 arrowButton"><img className="arrow" src={require('../../img/arrow.png')} alt="up Button" /></button>
            <button id="2" onClick={this.updateFeaturedArticleCountMinus} onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave} style={{ backgroundColor: this.state.backgroundColor2,transition: this.state.transition }} disabled={this.state.loadingStatus} className="arrowButton2 arrowButton"><img className="arrow arrow-down" src={require('../../img/arrow.png')} alt="down Button" /></button>
          </div>
        </div>
      );
    } else {
      return <>
        <div className="card">
          <div className="card-content" style={styles}>
            <h2><i>Title: <span className="card-articleTitle">{this.props.article.title}</span></i></h2>
            <p><i>Synopsis: {this.props.article.synopsis}</i></p>
            <p><i>URL: <a href={this.props.article.url}>{this.props.article.url}</a></i></p>
            <p><i>Created: {this.props.article.timestamp}</i></p>
            <button id="1" onClick={this.updateFeaturedArticleCountAdd} onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave} style={{ backgroundColor: this.state.backgroundColor1,transition: this.state.transition }} disabled={this.state.loadingStatus} className="arrowButton3 arrowButton"><img className="arrow" src={require('../../img/arrow.png')} alt="up Button" /></button>
            <button id="2" onClick={this.updateFeaturedArticleCountMinus} onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave} style={{ backgroundColor: this.state.backgroundColor2,transition: this.state.transition }} disabled={this.state.loadingStatus} className="arrowButton"><img className="arrow arrow-down" src={require('../../img/arrow.png')} alt="down Button" /></button>
          </div>
        </div></>
    }
  }
}

export default ArticleCard;