import { useNavigate }
from "react-router-dom";

export default function TrainerCard({
trainer
}){

const navigate =
useNavigate();

return(

<div

className="trainer-card"

onClick={()=>
navigate(
`/trainers/${trainer._id}`
)
}

>

<img
  src={trainer.photo}
  alt={trainer.trainerName}
  className="trainer-image"
  onError={(e) => {
    console.log(
      "Trainer image failed:",
      trainer.photo
    );
  }}
/>

<h3>

{trainer.trainerName}

</h3>

<p>

{
trainer.specializations?.join(", ")
}

</p>

<p>

Experience:
{" "}
{trainer.experience}
{" "}
Years

</p>

<p>

⭐
{" "}
{trainer.rating || 0}

</p>

</div>

);

}