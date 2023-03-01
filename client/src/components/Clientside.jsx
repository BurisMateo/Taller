import React, { useEffect } from 'react'

const Clientside = () => {

useEffect(()=>{
    const fetchCheckOut = async () =>{
        const response = await fetch('api/order/1',{
            method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            user,
            product
        }),
    })
    const data = await response.json()
    console.log(data.global)

    if (data.global){
        const script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = 'https://sdk.mercadopago.com/js/v2'
        script.setAttribute ('data-preference-id', data.global)
        document.body.appendChild(script)

        const mp = new window.MercadoPago(process.env.MERCADO_PAGO_KEY,{
            locale:'es-AR'
        })

        mp.checkout({
            preference:{
                id:data.global
            },
            render:{
                container:'.cho-container',
                label:'Pagar',
            }
        })

    }

    }
})
    return (
        <>
            <div className='cho-container'>

            </div>
        </>
    )
}

export default Clientside;
