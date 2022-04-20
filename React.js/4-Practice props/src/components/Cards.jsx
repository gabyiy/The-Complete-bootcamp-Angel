import React from "react"


const Cards = (props)=>{

return(
<div>
<div className="card">
  <div className="top">
    <h2 className="name">{props.name}</h2>
    <img className="circle-img"
      src={props.img}
      alt="avatar_img"
    />
  </div>
  <div className="bottom">
    <p>{props.tel}</p>
    <p>{props.email}</p>
  </div>
</div>
</div>
)
}
export default Cards