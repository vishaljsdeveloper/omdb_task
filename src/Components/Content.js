import React, { useState } from 'react'
import axios from 'axios'
import { apiKey } from '../API'

const Content = () => {
    const [serachTerm, setSearchTerm] = useState("")
    const [data, setData] = useState({})
    const [plot, setPlot] = useState(false)
    // console.log(serachTerm)
    console.log(data)

    const onSearchHandler = () => {
        if (!serachTerm) {
            return;
        }

        axios({
            method: 'GET',
            url: `http://www.omdbapi.com/?t=${serachTerm}&&apiKey=${apiKey}`
        }).then((response) => {
            // console.log(response.data)
            setData(response.data)
        })

        setPlot(false)
        setSearchTerm("")
    }
    return (
        <div className='w-full h-screen bg-slate-600 p-2'>
            <div className='w-full flex items-center justify-center'>
                <input
                    type='text'
                    placeholder='Search a movie'
                    className='w-[40%] text-center p-2 outline-none mr-2 rounded-md'
                    value={serachTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button
                    className='border border-white text-white rounded-md font-bold p-1 bg-slate-800'
                    onClick={onSearchHandler}
                >Search</button>
            </div>
            { data.Title?
            <div className='w-full mt-20 flex flex-wrap items-center justify-center'>
                <div onClick={() => setPlot(!plot)}
                className='w-[30%] h-[350px] '
                >
                    <img src={data.Poster} alt="movie name" style={{width:"100%", height:"350px"}}
                    className='border border-white rounded-md'/>
                </div>
                <div onClick={() => setPlot(!plot)}
                 className='text-white ml-4 w-[35%] h-[350px] overflow-auto bg-slate-800 p-5'>
                    <h1 className=' font-bold text-2xl'>Title :- {data.Title}</h1>
                    <p>IMDB Rating :- {data.imdbRating}</p>
                    <p>Release date :- {data.Released} </p>
                    <p>Genre :- {data.Genre}</p>
                    <p>Director :- {data.Director}</p>
                    <p>Actors :- {data.Actors}</p>
                    {
                        plot?<p>Plot:- {data.Plot}</p>:""
                    }

                </div>
            </div>:""
}
        </div>
    )
}

export default Content