import React from 'react'
import Cookie from 'universal-cookie'
import { useState, useEffect } from 'react'

let backendUrl = "https://cryptogymbackend-production.up.railway.app/api/membresiascliente/"
let cookies = new Cookie()
let idCliente = cookies.get('id')
let getmembresiascliente = async () => {
    let response = await fetch(backendUrl + idCliente)
    let data = await response.json()
    return data
}

export default function MembresiaCliente() {
    let [membresias, setMembresias] = useState()
    useEffect(() => {
        getmembresiascliente().then(data => {
            console.log(data.data)
            console.log(membresias)
            setMembresias(data.data)
            console.log(membresias)
        })
    }, [])

  return (
    <div>Membresia Cliente</div>
  )
}
