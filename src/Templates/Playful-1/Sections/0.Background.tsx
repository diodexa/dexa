import type { Invitation } from "../../../types/invitationType";

interface Props {
  data: Invitation;

  isOpen : boolean
}

const Background = ({ data }: Props) => {

    // const [scrollProgress, setScrollProgress] = useState(0);

    // useEffect(() => {
    // const handleScroll = () => {
    //     const scrollY = window.scrollY;

    //     const progress = Math.min(
    //     Math.max(scrollY / 300, 0),
    //     1
    //     );

    //     setScrollProgress(progress);
    // };

    // window.addEventListener("scroll", handleScroll);

    // return () => window.removeEventListener("scroll", handleScroll);
    // }, []);
  return (
    <section className={`relative flex h-screen items-start justify-center overflow-clip  text-center transition-all duration-2000 ease-out  `}
      style={{background: data.theme?.warnaweddingInvitation ,color: data.theme?.contrasfont,}}>

        
    </section>
        
  );
};

export default Background;
