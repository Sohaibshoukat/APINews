import React,{useEffect,useState} from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import InfiniteScroll from 'react-infinite-scroll-component';


const NewComponent =(props)=>{
  const [articles, setarticles] = useState([])
  const [loading, setloading] = useState(true)
  const [page, setpage] = useState(1)
  const [category, setcategory] = useState("business")
  const [totalResults, settotalResults] = useState(0)
  
  // async componentDidMount() {
  //   this.FetchingData()
  // }

  const FetchingData = async () => {
    props.setProgress(10);
    setloading(true)
    let url = `https://newsapi.org/v2/everything?q=${category}&language=${props.Language}&apiKey=${props.APIKey}&page=${page}&pagesize=${props.page_size}`;
    let data = await fetch(url)
    let ParseData = await data.json();
    setloading(false)
    setarticles(ParseData.articles)
    settotalResults(ParseData.totalResults)
    props.setProgress(100);
  }

  useEffect(() => {
    FetchingData()
  }, [])

  const fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/everything?q=${category}&language=${props.Language}&apiKey=${props.APIKey}&page=${page+1}&pagesize=${props.page_size}`;
    let data = await fetch(url);
    let ParseData = await data.json();
    setarticles(articles.concat(ParseData.articles))
    settotalResults(ParseData.totalResults)
    setpage(page+1)
  }

  const Change_categroy = async (event) =>{
    let url = `https://newsapi.org/v2/everything?language=${props.Language}&q=${event.target.value}&apiKey=${props.APIKey}&pagesize=${props.page_size}&page=${page}`;
    let data = await fetch(url)
    let ParseData = await data.json();
    setarticles(ParseData.articles)
    setcategory(event.target.value)
  
  }

    return (
      <>
        <div className="container">
          <h1 style={{marginTop:"90px"}}>Search by filter</h1>
          <div className="d-flex justify-content-center">
            <select onChangeCapture={Change_categroy} style={{ marginRight: "10px" }} className="form-select" id="selected" aria-label="Default select example">
              <option disabled defaultValue="0" >Open this select menu</option>
              <option value="business">business</option>
              <option value="entertainment">entertainment</option>
              <option value="health">health</option>
              <option value="science">science</option>
              <option value="sports">sports</option>
              <option value="technology">technology</option>
            </select>
          </div>
        </div>
        <div className='container my-2'>
          <h2>NewsFeed - Top Headlines</h2>
          {loading===true?<Spinner/>:""}

          <InfiniteScroll
            dataLength={articles.length}
            next={fetchMoreData}
            hasMore={articles.length !== totalResults}
            loader={<Spinner />}
          >
            <div className="row">
              {articles.map((elements) => {
                return (<div className="col-md-4" key={elements.url} >
                  <NewsItem 
                  title={elements.title ? elements.title.slice(0, 30) : ""} 
                  description={elements.description ? elements.description.slice(0, 80) : ""} 
                  imageUrl={elements.urlToImage} newsUrl={elements.url} 
                  author={elements.author ? elements.author.slice(0, 10) : "Uknown"} 
                  date={elements.publishedAt} Source={elements.source.name} />
                </div>)
              })}
            </div>
          </InfiniteScroll>

        </div>
      </>
    )
}

export default NewComponent