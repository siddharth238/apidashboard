import { Button, TextField } from '@mui/material';
import React from 'react'
import CategoryIcon from '@mui/icons-material/Category';
import { useState, useEffect } from 'react'
import './Fetchapi.css'
import SearchIcon from '@mui/icons-material/Search';
function Fetchapi() {
    const [data, setData] = useState([]);
    const [input, setInput] = useState("");

    useEffect(() => {
        const fetchd = async () => {
            const result = await fetch('https://api.publicapis.org/entries');
            const jsonresult = await result.json()
            console.log(jsonresult)
            setData(jsonresult);
        }
        fetchd();
    }, [])
    const datatemp = data;

    return (
        <div className='page'>

            <div className='search'>
                <h2 className='search__text'>  Dashboard</h2>
                <TextField className='search__textfield' onChange={event => { setInput(event.target.value) }} id="outlined-basic" label="Search API" variant="outlined" />
               

            </div>
            <div className='data'>

                {!datatemp.entries.length ? <div><img src="https://miro.medium.com/max/1400/1*CsJ05WEGfunYMLGfsT2sXA.gif" /></div> : datatemp.entries.filter((i) => {
                    if (input === "") {
                        return i;
                    }
                    else if (i.API.toLowerCase().includes(input.toLowerCase())) {
                        return i;
                    }

                }).map((i, index) => {
                    return (
                        <div key={index} className='data__'>
                            <p className='data__api' >{i.API}</p>
                            <p className='data__description' > {i.Description}</p>
                            <a style={{ textDecoration: "none" }} href={i.Link} className='data__Link' ><Button variant="outlined">Learn More</Button>
                            </a>
                            <div className='data__category'><CategoryIcon style={{marginRight:"20"}}/><p className=' ' >{i.Category}</p></div>

                        </div>)
                })}
            </div></div>
    )

}
export default Fetchapi