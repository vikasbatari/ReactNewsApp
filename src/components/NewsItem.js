import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    let { title, description, imageUrl, newsurl,author,publishDate,source } = this.props;
    return (
      <>
        <div className="card my-4">
        <span className="position-absolute top-0  translate-middle badge rounded-pill bg-danger" style={{ left: '90%',zIndex: '1'
   }}>
   {source}
    
  </span>
          <img
            style={{ height: "150px" }}
            src={imageUrl}
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
            <p className="card-text"><small className="text-muted"> By:-{author?author:"Unknown"} On:- {new Date(publishDate).toGMTString()}</small></p>
            <a href={newsurl} target="_blank" className="btn btn-dark">
              Go somewhere
            </a>
          </div>
        </div>
        
      </>
    );
  }
}

export default NewsItem;
