import { useEffect, useState } from 'react'
import { Loading } from '../Components/Loader'
import { Opening } from '../Components/Opening'
export const FlipBook =()=> {
    const [Isloading,setIsloading] = useState (false);

    useEffect(()=> {
        setIsloading(false)
    },[])
    return(
        <>
            <Loading isLoading={Isloading} />
            <div>
                <Opening 
                NamaPengantin="Haya & Dio"
                TanggalNikah="10 Desember 2026" />
            </div>
        </>
    )
}