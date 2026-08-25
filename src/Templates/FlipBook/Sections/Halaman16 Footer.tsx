import type { Invitation } from "../../../types/invitationType";

interface Props {
  data: Invitation;
  
}

const Halaman16 = ({ data }: Props) => {


  return (
    <div className="Kertas__half Kertas__half--back w-full h-full"
      style={{ background: data.theme?.warna1, color: data.theme?.warna2}}>
        <div className="h-full w-full flex flex-col items-center justify-center">
          <img src="/logo-dio.webp" className="max-h-25 w-auto object-contain" alt="Logo dexa-invitation.com" />
          <p>dexa-invitation.com</p>
        </div>
        <div>

        </div>

    </div>
  );
};

export default Halaman16;