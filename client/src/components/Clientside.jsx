import React, { useEffect } from 'react'

const Clientside = () => {

    const [title,SetTitle] = useState('Milanesa con pure');
    const [description,SetDescription] = useState('Conformada por una milanesa de carne con pure de papas natural');
    const [price,SetPrice] = useState(2000);
    const [url,SetUrl] = useState('https://www.recetasnestle.com.ar/sites/default/files/srh_recipes/1e13737ba00568d3938668193541fbad.jpg');


useEffect(()=>{
    const fetchCheckOut = async() => {
        const response =  await fetch('/api/order/<id>', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                prod:{
                    "title":title,
                    "description":description,
                    "price":price,
                    "url":url
                }


            }),
        })
        const data = await response.json()
        console.log(data.global)
    
        if (data.global) {
            const script = document.createElement('script')
            script.type = 'text/javascript'
            script.src = 'https://sdk.mercadopago.com/js/v2'
            script.setAttribute('data-preference-id', data.global)
            document.body.appendChild(script)
    
            const mp = new window.MercadoPago("TEST-56a61570-f1a9-42df-88a6-99a03d130151", {
                locale: 'es-AR'
            })
    
            mp.checkout({
                preference: {
                    id: data.global
                },
                render: {
                    container: '.cho-container',
                    label: 'Pagar',
                }
            })
    
        }
    }

    return (

        <div>

            <div className='card-container'>

                <h1 className='name' name="title">{title}</h1>
                <p name="description">{description}</p>
                <span name="price">${price}</span>
                <div className='comida'>
                    <img src= {url} alt="" name="imagen"/>
                </div>
                <button onClick={fetchCheckOut}>Comprar</button>
            </div>
            <div className='cho-container'>

            </div>

         </div>
    )
})}

export default Clientside;