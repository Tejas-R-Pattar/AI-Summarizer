import React from 'react'
import {logo} from '../assets'

const Hero = () => {
  return (
    <header className='w-full flex flex-col justify-center items-center'>
      <nav className="flex justify-between items-center w-full mb-10 pt-3">
        <img src={logo} className='w-28 odject-contain'  />
        <button 
        type="button"
        onClick={()=>{ window.open("https://github.com/Tejas-R-Pattar/AI-Summarizer", "_blank")}}
        className="black_btn">
          GitHub
        </button>
      </nav>

    <h1 className='head_text'>
      Summarize Articles with <br />
      <span className='orange_gradient'>
        Open AI GPT-4
      </span>
    </h1>

    <h2 className="desc">
    Incorporate an AI article summarizer on your work to efficiently distill and present key information from articles, enhancing user experience and engagement.
    </h2>

    </header>
  )
}

export default Hero