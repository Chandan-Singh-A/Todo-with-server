import { useEffect, useState } from 'react'
import Todoitems from './component/todoitems/index'
import style from './style.module.css'
import Todoinput from './component/input/input'
const username = prompt("enter your name");
console.log(username);
function App() {
  const [arr, setarr] = useState([])
  useEffect(() => {
    function gettodos(username) {
      fetch("http://localhost:2000/gettodos/?username=" + username)
      .then((result) => {
        return result.json();
      }).then((result) => {
        setarr(result);
      }).catch((err) => {
        console.log(err);
      });
    }
    gettodos(username)
  }, []);

  function savetodo(todo) {
    console.log(todo);
    let id = Math.random();
    let ob = {
      id: id,
      todo: todo,
      status: false,
      name: username
    }
    setarr([...arr, ob]);
    fetch("http://localhost:2000/savetodos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: id, todo: todo, status: false, username: username })
    }).then((result) => {
      console.log(result);
    }).catch((err) => {
      console.log(err);
    });
  }
  function checkboxpdate(id) {
    let arr2 = [...arr]
    const index = arr2.findIndex((todo) => {
      return todo.id == id
    })
    console.log(index);
    arr2[index].status = !arr2[index].status;
    setarr(arr2);
    fetch("http://localhost:2000/updatecheckbox/?id="+id,{
      method:"PUT",
    }).then((result) => {
      console.log("object");
    }).catch((err) => {
      console.log(err);
    });
  }
  function deletetodo(id) {
    let arr2 = arr.filter((todo) => {
      return todo.id != id
    })
    setarr(arr2);
  }
  return (
    <div className={style.container}>
      <div>
        {arr.map(value => <Todoitems data={value} checkboxpdate={checkboxpdate} deletetodo={deletetodo} key={value.id} />)}
      </div>
      <div>
        <Todoinput savetodo={savetodo} />
      </div>
    </div>
  )
}
export default App