import BackgroundVideo from "./BackgroundVideo";
import shape6 from "/assets/img/shape/6.png"

const VideoV1 = () => {
    return (
        <>
            <div className="video-bg-area text-center text-light video-bg-live bg-fixed" style={{ backgroundImage: 'url(/assets/img/banner/3.jpg)' }}>
                <BackgroundVideo starts={5} videoId="hoiGV-N-2Gs" />
                <div className="video-bg-content">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8 offset-lg-2">
                                <h2 className="title">Cocina a la leña, recién hecha y servida en tu evento</h2>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="wavesshape">
                    <img src={shape6} alt="Shape" />
                </div>
            </div>
        </>
    );
};

export default VideoV1;