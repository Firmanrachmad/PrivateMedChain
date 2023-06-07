import { useEffect, useState } from 'react'

function Transactions () {
    const [allImage, setallImage] = useState([]);

    useEffect(()=>{
        getImage()
    },[])

    function getImage (){
        fetch("http://localhost:5000/get-image", {
            method: "GET",

        }).then((res) => res.json()).then((data) => {
            console.log(data)
            setallImage(data.data)
        })
    }

    return (
        <div className="App">
            <h2>All Documents</h2>
            {allImage.map(data=>{
                return (
                    <img width={100} height={100} src={data.image}/>
                )
            })}
        </div>
    )
}


export default Transactions;