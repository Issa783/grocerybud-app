import React, { useEffect } from "react";
import styles from "../styles.module.css"
const Alert = ({type,msg,removeAlert,list}) => {
    console.log(type)
    useEffect(()=>{
        const timeout = setTimeout(()=>{
         removeAlert()
        },3000)
        return ()=>clearTimeout(timeout);  //clean up when component unmounts
    },[list])
    return(
         <p className={`${styles.alert}  ${type=='success' && styles.alertsuccess} ${type=='danger' && styles.alertdanger}`}>{msg}</p>
         
    )
}
export default Alert