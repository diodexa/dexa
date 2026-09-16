import type { Invitation } from "../../../types/invitationType";

interface Props {
  data: Invitation;
}

const Closing = ({ data }: Props) => {
  const images = data.gallery ?? [];
  // const [currentImage, setCurrentImage] = useState(images.length - 1);

  // useEffect(() => {
  //   if (images.length <= 1) return;

  //   const interval = setInterval(() => {
  //     setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  //   }, 4000);

  //   return () => clearInterval(interval);
  // }, [images.length]);


  return (
    <section className="relative flex min-h-screen w-full items-center justify-center overflow-hidden px-6 pb-8 pt-16 text-center " style={{  color: data.theme?.contrasfont }}>
        <div className="absolute inset-0 w-full h-full bg-white/80"/>
        <div className="relative z-10 flex min-h-[calc(100vh-6rem)] w-full max-w-[500px] flex-col items-center">
            <div>
            <p className="text-[9px] uppercase tracking-[.5em] ">Our Wedding Day</p>
            <h2 className="mt-3 text-5xl" style={{ color: data.theme?.warna3 }}>Thank you</h2>
            </div>
            {images.length > 0 && (
            <div className="relative mt-9">
                <div className="absolute -inset-3 rounded-[45%] border opacity-20" style={{ borderColor: data.theme?.warna3 }} />
                <div className="relative h-[310px] w-[230px] overflow-hidden rounded-[45%]" style={{ border: `3px solid ${data.theme?.warna3}60` }}>
                {images.map((image, index) => (
                    <div key={index} className="absolute inset-0" style={{ opacity: 0, animation: "zoomfade 12s infinite", animationDelay: `${index * 4}s` }}>
                    <img src={image} alt="" className="h-full w-full object-cover" />
                    </div>
                ))}
                </div>
            </div>
            )}
            <div className="mt-9 max-w-[350px]">
            <p className="whitespace-pre-line text-xs leading-6 ">{data.Closing}</p>
            </div>
            <div className="mt-8">
            <p className="mb-2 text-[8px] uppercase tracking-[.4em] ">With Love</p>
            <p className="text-4xl font-Tempting" style={{ color: data.theme?.warna3 }}>{data.NamabridePanggilan} & {data.NamagroomPanggilan}</p>
            </div>
            <footer className="mt-auto flex flex-col items-center justify-center pt-10">
            <div className="w-10">
                <img src="/logo-dio.webp" alt="" />
            </div>
            <p className="text-[9px] tracking-[.25em] ">dexa-invitation.com</p>
            </footer>
        </div>
    </section>
  );
};

export default Closing;