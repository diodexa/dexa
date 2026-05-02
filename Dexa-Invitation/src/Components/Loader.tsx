interface LoaderProps {
  isLoading: boolean;
}

export const Loading =({isLoading}:LoaderProps)=> {

    return(
        <div className={isLoading?
            "visible fixed inset-0 flex flex-col items-center justify-center bg-white/70 backdrop-blur z-50"
            :
            "invisible"
        }>
            <img src="/logo-dio.webp" alt="Logo" className="w-[150px] animate-spin"/>

            <p>Memuat undangan...</p>
        </div>
    )
}