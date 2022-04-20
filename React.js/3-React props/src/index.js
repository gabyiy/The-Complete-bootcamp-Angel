import React from "react";
import ReactDOM from "react-dom";


const Card =(props)=>{

    return(
<>

<h2 className="my-style">{props.name}</h2>
<img
  src={props.img}
  alt="avatar_img"
/>
<p>{props.tel}</p>
<p>{props.email}</p>
</>
    )
}


ReactDOM.render(<div>
<h1>My contacts</h1>
<Card
 img="https://i.pinimg.com/originals/e3/94/47/e39447de921955826b1e498ccf9a39af.png" name="Chuck Norris"
tel="+918 372 574"
email="gmail@chucknorris.com"/>
<Card
    img="https://pbs.twimg.com/profile_images/625247595825246208/X3XLea04_400x400.jpg"
    name="Jack Bauer"
    tel="+987 654 321"
    email="jack@nowhere.com"
/>
<Card
    img="https://blackhistorywall.files.wordpress.com/2010/02/picture-device-independent-bitmap-119.jpg"
    name="Beyonce"
    tel="+123 456 789"
    email="b@beyonce.com"
/>
</div>
,
  document.getElementById("root")
);
