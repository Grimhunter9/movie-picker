import React, { useEffect, useState } from 'react';
import SanityClient from '../Client';
import { Link } from 'react-router-dom';


export default function Allseries() {



    const [seriesdata, setseries] = useState(null);


    useEffect(() => {





        SanityClient.fetch(

            `*[_type=='series']
    
                    {
                    title,
                    slug,
                    releaseDate,
                    poster{asset->{url},
                   
                   

                }}`
        )

            .then((data) => setseries(data))
            .catch(console.error);



    }, [])



    console.log()




    return (



        <div className="series-container-All">


            <h1 className="Tv">Trending Tv</h1>


            <div className="ser">

                {
                    seriesdata &&

                    seriesdata.map((Tv) => (



                        <div className="ser" key={Tv}>

                            <div className="pic-container">

                                <img className="series-pics" src={Tv.poster.asset.url} alt="poster-image" />

                                <span className="ser-text" key={Tv.title}>{Tv.title}</span>

                                <span className="date-ser" key={Tv.releaseDate}>{Tv.releaseDate}</span>

                            </div>

                        </div>



                    ))

                }

            </div>


        </div>


    )

}



{/*

                           

                    </Link>*/}