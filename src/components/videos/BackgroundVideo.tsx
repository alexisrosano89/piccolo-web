interface VideoProps {
    /** Segundo desde el que arranca el video. */
    starts?: number;
    /** ID del video de YouTube (lo que va después de "watch?v=" en la URL). */
    videoId?: string;
}

/**
 * Video de YouTube de fondo: sin sonido, en loop, sin controles y cubriendo toda la sección.
 *
 * Usa el reproductor oficial de YouTube (iframe), sin jQuery ni plugins externos: antes se cargaban
 * jQuery + jquery.mb.YTPlayer desde otros servidores en cada visita y a veces el video no aparecía.
 * Mientras carga (o si YouTube no responde) se ve la foto de fondo de la sección.
 */
const BackgroundVideo: React.FC<VideoProps> = ({ starts = 0, videoId }) => {
    if (!videoId) return null;

    const params = new URLSearchParams({
        autoplay: "1",
        mute: "1",
        loop: "1",
        playlist: videoId, // necesario para que "loop" funcione con un solo video
        controls: "0",
        modestbranding: "1",
        playsinline: "1",
        rel: "0",
        disablekb: "1",
        iv_load_policy: "3",
        start: String(starts),
    });

    return (
        <div className="video-bg-iframe" aria-hidden="true">
            <iframe
                src={`https://www.youtube-nocookie.com/embed/${videoId}?${params.toString()}`}
                title="Video de fondo"
                allow="autoplay; encrypted-media; picture-in-picture"
                loading="lazy"
                tabIndex={-1}
                referrerPolicy="strict-origin-when-cross-origin"
            />
        </div>
    );
};

export default BackgroundVideo;
