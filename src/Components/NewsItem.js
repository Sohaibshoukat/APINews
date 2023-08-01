import React from 'react'
import News_extra from './News_extra.jpg';

const NewsItem=(props)=> {

    let {title,description, imageUrl,newsUrl,author,date,Source}=props;
    return (
      <>
        <div className="card my-2">
            <img src={imageUrl?imageUrl:News_extra} className="card-img-top" alt="..."/>
            <div className="card-body">
                <h5 className="card-title">{title}...</h5>
                <span className="badge text-bg-primary">{Source}</span>
                <p className="card-text">{description}...</p>
                <p className="card-text"><small className="text-muted">By {author} on {new Date(date).toGMTString()}</small></p>
                <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-sml btn-primary">Read More</a>
            </div>
        </div>
      </>
    )
}

export default NewsItem