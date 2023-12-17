import React from 'react'
import {useState,useEffect} from "react";
import { copy ,linkIcon,loader,tick} from "../assets";
import { useLazyGetSummaryQuery } from '../services/article';
import { stringify } from 'postcss';
  

const Demo = () => {
 const [article,setArticle] = useState({
  url:"",
  summary:"",
 })

 const [copied,setCopied] = useState("");

 const [allArticles, setAllArticles] = useState([])

 const [getSummary ,{error ,isFetching}] = useLazyGetSummaryQuery();
 useEffect(()=>{
  const articlesFromLocalStorage=JSON.parse(localStorage.getItem("articles"))
 })

  const handleSubmit= async (e)=>{
  e.preventDefault();
  const { data }= await getSummary({articleUrl:article.url});

  if(data?.summary){
    const newArticle = {
      ...article,
      summary:data.summary
    }
    const updatedAllArticles= [newArticle,...allArticles]
    setArticle(newArticle);
    setAllArticles(updatedAllArticles);
    console.log(newArticle);

    localStorage.setItem("articles",JSON.stringify(updatedAllArticles));
  }
 }

const handleCopy=(copyUrl)=>{
  setCopied(copyUrl);
  navigator.clipboard.writeText(copyUrl);
  setTimeout(() => {
    setCopied(false)
  }, 4000);
}

  return (
    <section className='mt-16 w-full max-w-xl'>
    {/*Search */}
    <div className="flex flex-col w-full gap-2">

      <form className="relative flex justify-center items-center"
      onSubmit={handleSubmit}
      >
    <img 
        src={linkIcon}
        className='absolute left-0 my-2 ml-3 w-5' />
    <input 
      type="url"
      placeholder='Enter an URL'
      value={article.url}
      onChange={(e)=>setArticle({
        ...article,url : e.target.value
      })}
      className='url_input peer'
    />
    <button 
      type="submit"
      className='submit_btn peer-focus:border-gray-100 peer-focus:text-grey-700 '>
        ✓
      </button>
      </form>
      <div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
        {allArticles.map((item,index)=>{
          <div className='link_card'
                onClick={()=>setArticle(item)}
                key={`link-${index}`}>
                <div className='copy_btn' onClick={()=>{
                  handleCopy(item.url)
                }}>
                  <img 
                    src={copied=== item.url?tick:copy}
                    classname='w-[40%] h-[40%] object-contain'/>
                </div>
                <p className='flex-1 text-blue-600 text-sm font-medium truncate'>
                  {item.url}
                </p>
                </div>
        })}
      </div>
    </div>
      <div className='my-10 max-w-full flex justify-center items-center'>
        { isFetching ? ( <img src={loader} className="w-20 h-20 object-contain"/>)
          :error? (
            <p className="font-inter text-black font-bold text-center">
              Looks like you need to read the WHOLE Article 😅😅
              <br/>
              <span className='font-normal text-grey-700'>
                {error?.data?.error}
              </span>
            </p>
          ):( article.summary && (
              <div className="flex flex-col gap-3">
              <h2 className='font-bold text-grey-600 text-xl'>
                Article <span className='blue_gradient'>Summary</span>
              </h2>
              <div className='summary_box'>
                  <p className='font-inter font-medium text-sm text-grey-700'>
                    {article.summary}
                  </p>

              </div>
              </div>
          )

          )
        }
      </div>
    </section>
  )
}

export default Demo;