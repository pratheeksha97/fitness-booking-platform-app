import Sidebar from "./Sidebar";

export default function Layout({

children

}){

return(

<div>

<Sidebar/>

<div

style={{

marginLeft:"260px",

padding:"30px",

minHeight:"100vh",

background:"#f4ecf8"

}}

>

{children}

</div>

</div>

);

}