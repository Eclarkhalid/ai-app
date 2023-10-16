import { useState, useEffect } from "react"
import { copy, linkIcon, loader, tick } from '../assets'

import { useLazyGetSummaryQuery } from "../services/article";



const demo = () => {

  const [article, setArticle] = useState({
    url: '',
    summary: '',
  });

  const [allArticles, setAllArticles] = useState([]);

  const [copied, setCopied] = useState("")

  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();

  useEffect(() => {
    const articlesFromLocalStorage = JSON.parse(
      localStorage.getItem('articles')
    )

    if (articlesFromLocalStorage) {
      setAllArticles(articlesFromLocalStorage)
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await getSummary({
      articleUrl: article.url
    });

    if (data?.summary) {
      const newArticle = { ...article, summary: data.summary };
      const updatedAllArticles = [newArticle, ...allArticles];
      setArticle(newArticle);
      setAllArticles(updatedAllArticles);

      localStorage.setItem('articles', JSON.stringify(updatedAllArticles));
    }
  }

  const handleCopy = (copyUrl) => {
    setCopied(copyUrl);
    navigator.clipboard.writeText(copyUrl);
    setTimeout(() => setCopied(false), 4000);
  }
  return <>
    <section className="mt-16 w-full max-w-xl min-h-screen">
      {/* search */}
      <div className="flex flex-col w-full gap-2">
        <form action="" className="relative flex justify-center items-center" onSubmit={handleSubmit}>
          <img src={linkIcon} alt="link"
            className="absolute left-0 my-2 ml-3 w-5"
          />
          <input type="url" placeholder="Enter a Url for the article"
            value={article.url}
            onChange={(e) => setArticle({
              ...article,
              url: e.target.value
            })}
            required
            className="url_input peer"
          />

          <button type="submit" className="submit_btn peer-focus:border-gray-700
          peer-focus:text-gray-700
          ">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </button>
        </form>

        {/* Browser url history */}
        <div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
          {allArticles.map((item, index) => (
            <div
              key={`link-${index}`}
              onClick={() => setArticle(item)}
              className="link_card"
            >
              <div className="copy_btn" onClick={() => handleCopy(item.url)}>
                <img src={copied === item.url ? tick : copy} alt="copy" className="w-[40%] h-[40%] object-contain" />

              </div>
              <p className="flex-1 font-satoshi text-blue-700 font-medium text-sm truncate">
                {item.url}
              </p>

              <div onClick={() => handleCopy(item.summary)}>
                {
                  copied === item.summary ? <p className="flex-1 font-inter text-red-700 font-medium text-sm truncate">
                    Copied
                  </p> : <p className="flex-1 font-inter text-blue-700 font-medium text-sm truncate">
                    Copy Summary
                  </p>
                }
              </div>
            </div>

          ))}
        </div>
      </div>

      {/* display results */}

      <div className="my-10 max-w-full flex justify-center items-center">
        {isFetching ? (
          <img src={loader} alt="loader" className="w-20 h-20 object-contain" />
        ) : error ? (
          <p className="font-inter font-bold text-black text-center">
            Sorry, an error occured!!
            <span className="font-satoshi font-normal text-gray-700">
              {error?.data?.error}
            </span>
          </p>
        ) : (
          article.summary && (
            <div className="flex flex-col gap-3">
              <h2 className="font-satoshi font-bold text-gray-600 text-xl">
                Article <span className="blue_gradient">Summary</span>
              </h2>
              <div className="summary_box">
                <p className="font-inter font-medium text-xl text-gray-700">{article.summary}</p>
              </div>
            </div>
          )
        )}
      </div>
    </section>
    <hr className="my-2" />

    <footer className=" b-0 p-2 text-lg w-full text-center ">
      <p className="font-inter">This project was created by Eric Gitau || <span className="text-blue-500 text-bold"><a href="http://localhost:5173/projects">Eclar Khalid</a></span> &copy; 2023</p>
    </footer>
  </>
}

export default demo