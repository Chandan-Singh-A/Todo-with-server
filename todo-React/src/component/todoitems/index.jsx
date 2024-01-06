import style from './style.module.css'
export default function Todoitems({ data ,checkboxpdate,deletetodo}) {
    function onchangecheckbox(){
        console.log(data);
        checkboxpdate(data.id);
    }
    function deletetodo1(){
        console.log(data);
        deletetodo(data.id);
    }
    return (
        <div className={style.todoitem}>
            <li className={style.li}>
                {(data.status) ? <strike><p>{data.todo}</p></strike> : <p>{data.todo}</p>}
                <input type="checkbox" className={style.checkbox} checked={data.status} onChange={onchangecheckbox} />
                <span className={style.span} onClick={deletetodo1}>&#10006;</span>
            </li>
            <hr />
        </div>
    )
}