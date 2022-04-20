import React from "react"
import Avatar from "./Avatar"
import Details from "./Details"


const Cards = (props)=>{

return(
<div>
<div className="card">
  <div className="top">
    <h2 className="name">{props.name}</h2>
    <Avatar img={props.img}/>
  </div>
  <div className="bottom">
  <Details 
    email ={props.email}
    tel={props.tel}
  />
  </div>
</div>
</div>
)
}
export default Cards