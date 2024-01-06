export default function todoinput(props){
    const {savetodo}=props;
    function addtodo(e){
        if(e.key==="Enter"){
            if(e.target.value!==""){
                savetodo(e.target.value)
                e.target.value="";
            }else{
                alert("Todo Cannot be Empty");
            }
        }
    }
    return(
        <div>
            <h2>Enter Your Todo</h2>
            <input type="text" placeholder="Enter Something" onKeyDown={addtodo}/>
        </div>
    )
}