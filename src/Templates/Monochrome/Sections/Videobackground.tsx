interface Props {
  src?: string;
  overlay?: boolean;
}

const VideoBackground = ({ src, overlay = true }: Props) => {
  if (!src) return null;

  return (
    <>
      <video autoPlay muted loop playsInline
        className="absolute inset-0 w-full h-full object-cover">
        <source src={src} type="video/mp4" />
      </video>

      {overlay && (
        <div className="absolute inset-0 bg-black/45" />
      )}
    </>
  );
};

export default VideoBackground;