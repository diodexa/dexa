import type { Invitation } from "../../types/invitationType";

interface Props {
  data: Invitation;
  scrollY: number;
  onNavigate: (scrollTo: number) => void;
}

const BottomNav = ({
  data,
  scrollY,
  onNavigate,
}: Props) => {
  return (
    <div
      className="fixed bottom-5 left-1/2 z-[999] flex w-[90%] max-w-[400px] -translate-x-1/2 items-center justify-around rounded-full px-4 py-2 shadow-lg backdrop-blur-[10px]"
      style={{
        background: `color-mix(in srgb, ${data.theme?.warnaButtonBorder} 30%, transparent)`}}>
      {data.nav?.map((item, index) => {
        const isActive = item.scrollEnd !== undefined
          ? scrollY >= item.scrollTo && scrollY <= item.scrollEnd
          : scrollY >= item.scrollTo - 250 &&
            scrollY < item.scrollTo + 250;

        return (
          <button
            key={index}
            type="button"
            onClick={() => onNavigate(item.scrollTo)}
            className={`flex flex-col items-center drop-shadow-[0_0_1px_black] text-xs transition ${
              isActive
                ? "scale-110"
                : "opacity-60"
            }`}
            style={{
              color: isActive
                ? data.theme?.warna3
                : data.theme?.warna2,
            }}
          >
            <i className={`fas ${item.icon} text-lg`} />
            <span>{item.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default BottomNav;