import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from 'react-infinite-scroll-component';

export class News extends Component {
  static defaultProps = {
    country: "in",
    
    category: "general",
  };
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };
   capitalizeFirstLetter=(string)=> {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults:0
    };
    document.title= `${this.capitalizeFirstLetter(this.props.category)} - News Monkey`;
  }

  async update() {

    this.props.setProgress(0);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=14ed887261e2410eb0131425241b9120&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    this.props.setProgress(20);

    let data = await fetch(url);
    let parsdata = await data.json();
    this.props.setProgress(70);
    this.setState({
      articles: parsdata.articles,
      totalResults: parsdata.totalResults,
      loading: false,
    });
    this.props.setProgress(100);
  }

  async componentDidMount() {  

   this.update();

  }

  // handleNextClick = async () => {
   
  //   this.setState({
  //     page: this.state.page + 1 
  //     })
  //     this.update();
  // };

  // handlePrevClick = async () => {
    
  //   this.setState({
  //     page: this.state.page - 1 
  //     })
  //     this.update();
  // };

  fetchMoreData = async () => {

    this.setState({page:this.state.page +1})
    

    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=14ed887261e2410eb0131425241b9120&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    //this.setState({ loading: true });
    let data = await fetch(url);
    let parsdata = await data.json();

    this.setState({
      articles: this.state.articles.concat(parsdata.articles),
      totalResults: parsdata.totalResults,
      
    });
  };



  render() {
    return (
      <div className="container">
        <h3 className="text-center" style={{ margin: "25px 0px" }}>
          News Monkey - Top  {this.capitalizeFirstLetter(this.props.category)} Headlines
        </h3>
        {this.state.loading && <Spinner />}

        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner/>}
        >
           


        <div className="row">
          {
            this.state.articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    title={element.title ? element.title.slice(0, 35) : ""}
                    description={
                      element.description
                        ? element.description.slice(0, 55)
                        : ""
                    }
                    imageUrl={element.urlToImage}
                    newsurl={element.url}
                    author={element.author}
                    publishDate={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              );
            })}
        </div>
        </InfiniteScroll>


        {/* <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={this.handlePrevClick}
          >
            &larr; Previous
          </button>
          <button
            type="button"
            className="btn btn-dark"
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalResults / this.props.pageSize)
            }
            onClick={this.handleNextClick}
          >
            Next &rarr;
          </button>
        </div> */}
      </div>
    );
  }
}

export default News;
