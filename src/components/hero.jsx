import { logo } from '../assets'

const hero = () => {
  return <>
    <header className="w-full flex justify-center items-center flex-col">
      <nav className="flex justify-between items-center w-full mb-10 pt-3">
        <img src={logo} alt="logo" className='w-28 object-contain' />

        <button type='button' onClick={() => window.open('')} className='black_btn'>Github</button>
      </nav>

      <h1 className="head_text">
        Summarize Articles with&nbsp;
        <br className='max-md:hidden' /><span className='orange_gradient'>OpenAI GPT-4</span>
      </h1>

      <h2 className='desc'> Simplify your reading with Summize, an open-sourse article summarizer that transforms lengthy articles into clear and concise summaries.</h2>
    </header>
  </>
}

export default hero