import { useEffect, useState } from "react";

interface PropsPengantin {
    NamaPengantin : string
    TanggalNikah : string
}
export const Opening = ({NamaPengantin,TanggalNikah}:PropsPengantin) => {
    const [TamuUndangan,SetTamuUndangan] = useState("Tamu Undangan")
    const [isOpen,SetisOpen] = useState(false)
    
    const capitalize = (text: string) =>
    text.replace(/\b\w/g, char => char.toUpperCase())

    useEffect(() => {
    const nama = new URLSearchParams(window.location.search).get('to')
    SetTamuUndangan(capitalize(nama || 'Tamu Undangan'))
    }, [])


    return (
        <>
            <div className={isOpen? "invisible" : 
                "visible"}>
                <h1>Wedding Invitation</h1>
                <strong>{NamaPengantin} </strong>
                <p>{TanggalNikah} </p>
                <p> dear : </p> 
                <p> {TamuUndangan} </p>
                <button onClick={()=>SetisOpen(true)}> Buka Undangan</button>

            </div>
        </>
    )
}