export default function ClassCard({

item,
bookClass

}){

return(

<div className="class-card">

<h4>

{item.title}

</h4>

<p>

Trainer:
{item.trainer?.name}

</p>

<p>

{item.startTime}
-
{item.endTime}

</p>

<p>

₹{item.price}

</p>

<p>

Seats:
{item.availableSeats}

</p>

<button
onClick={()=>
bookClass(item._id)
}
>

Book Class

</button>

</div>

);

}