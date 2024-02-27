import React from "react";
import styles from "../styles.module.css"
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
const List = ({items,removeItem,editItem}) => {
    return(
        <div className={styles.grocerylist}>
          {items.map((item)=>{
            const{id,title} = item;
            return <article className={styles.groceryitem} key={id}>
                <p className={styles.title}>{title}</p>
                <button type="button" className={styles.editbtn} onClick={()=>editItem(id)}>
                <FaEdit />
                </button>
                <button type="button" className={styles.deletebtn} onClick={()=>removeItem(id)}>
                 <FaTrash />
                 </button>
            </article>
          })}
        </div>
    )
}
export default List