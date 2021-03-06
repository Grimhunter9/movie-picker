import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SanityClient from '../Client.js';
import Portabletext from '@sanity/block-content-to-react';
import imageUrlBuilder from "@sanity/image-url";
import Star from './star.jpg';
import ModalVideo from 'react-modal-video';






const builder = imageUrlBuilder(SanityClient);

/*const Opentrailer = (url) => {

    window.open(url, "This is the trailer")
}*/

function urlFor(source) {
    return builder.image(source);
}

export default function Onepick() {

    const [Onepick, setonemovie] = useState(null);
    const [open, setOpen] = useState(false);
    const { slug } = useParams();



    useEffect(() => {

        SanityClient.fetch(
            `*[slug.current == $slug]{
                title,
                slug,
                overview,
                rating,
                url,
                posterpreview{asset->{_id,url}},
                poster{asset->{_id,url}},
             }`,
            { slug }
        )
            .then((data) => setonemovie(data[0]))
            .catch(console.error);
    }, [slug]);



    if (!Onepick) return <div style={{ color: "red" }}>Loading...</div>

    console.log(Onepick)


    return (
        <div>

            <div className="One-container" style={{ background: `url(${Onepick.posterpreview.asset.url})`, backgroundSize: "cover" }} />

            <div className="One-description-container">

                <div>
                    <img className="small" src={urlFor(Onepick.poster).url()} alt="" />
                </div>

                <div className="Text">
                    <p className="Text-title"> <h2>{Onepick.title}</h2></p>


                    <div className="Text-rate">
                        <img className="star" src={Star} />
                        <span className="rate">{Onepick.rating}</span>


                        <ModalVideo channel="youtube" autoplay isOpen={open} videoId={Onepick.url} onClose={() => setOpen(false)} />
                        <button className="Trailer-btn" onClick={() => setOpen(true)}>
                            Play Trailer
                        </button>

                    </div>





                </div>

            </div>

            <div className="One-description">
                <div>Overview</div>
                <Portabletext blocks={Onepick.overview} />

            </div>


        </div >
    )
}


