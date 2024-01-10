import {useState, useEffect} from 'react'
import {FaAngleDoubleRight} from 'react-icons/fa'

// const url = 'https://' api

const Design = () => {
    const [loading, setLoading] = useState(true)
    const [jobs, setJobs] = useState([])
    const [value, setValue] = useState(0)

    const fetchJobs = async () =>{
        const response = await fetch(url)
        const newJobs = await response.json()
        setJobs(newJobs)
        setLoading(false)
    }

    useEffect(() => {
        fetchJobs()
    },[])

    if(loading){
        return(
            <section className='section loading'>
                <div id="loading-bar-spinner" class="spinner">
                    <div class="spinner-icon"></div>
                </div>
            </section>
        )
    }

    const {company, dates, duties, title} = jobs[value]

    return(
        <section className='section jobs'>
            <div className="title">
                <h2 style={{margin: '3rem'}}>Experience</h2>
                <div className="underline"></div>
            </div>
            <div className="jobs-center">
                <div className="btn-container">
                    {jobs.map((item, index)=>{
                        return(
                            <button
                            key={item.id}
                            onClick={()=>setValue(index)}
                            className={`job-btn ${index === value && 'active-btn'}`}
                            >{item.company}</button>
                        )
                    })}
                </div>
                {/* Job Info */}
                <article className="job-info">
                    <h3>{title}</h3>
                    <h4>{company}</h4>
                    <p className="job-date">{dates}</p>
                    {duties.map((duty, index)=>{
                        return(
                            <div key={index} className="job-desc">
                                <FaAngleDoubleRight className = "job-icon"></FaAngleDoubleRight>
                                <p>{duty}</p>
                            </div>
                        )
                    })}
                </article>
            </div>
            <button type='button' className='btn'>
                More Info
            </button>
        </section>
    )
}

export default Design