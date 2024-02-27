import React, { useEffect, useState } from 'react'
import styles from "./styles.module.css"
import List from './components/list';
import Alert from './components/alert';
const getLocalStorage = () => {
  const storedList = localStorage.getItem("list");
  const list = JSON.parse(storedList) || [];
  return list;
};

function App() {
  const [name,setName] = useState('')
  const[list,setList] = useState(getLocalStorage())
  const [isEditing,setIsEditing] = useState(false)
  const[editID,setEditID] = useState(null)
  const[alert,setAlert] = useState({show:false,msg:'',type:''})
  
  const handleSubmit = (e) => {
    e.preventDefault()
    if(!name){
      showAlert(true,'danger','please enter value')
    }
    else if(name && isEditing){
      //console.log('Editing - Before map:', list); // Add this line
      setList(list.map((item)=>{
        if(item.id === editID){
          return{...item,title:name}
        }
        return item
      }))
      //console.log('Editing - After map:', list); // Add this line
      setName('')
      setEditID(null)
      setIsEditing(false)
      showAlert(true,'success','value changed')
    }
    else{
      //console.log('Adding - Before setList:', list); // Add this line
      showAlert(true,'success','item added to the list')
      const newItem = {id:new Date().getTime().toString(),title:name}
console.log(list)
      setList([...list,newItem])
      console.log('Adding - After setList:', list); // Add this line
      setName('')
    }
  }
  const showAlert = (show=false,type="",msg="") => {
    setAlert({show,type,msg})
  }
  const clearList = () => {
    showAlert(true,'danger','empty list')
    setList([])
  }
  const removeItem = (id) => {
     showAlert(true,'danger','item removed')
     setList(list.filter((item)=> item.id !== id))
  }
  const editItem = (id) => {
    const specificItem = list.find((item)=> item.id === id)
    setIsEditing(true)
    setEditID(id)
    setName(specificItem.title)
  }
  useEffect(()=>{
    localStorage.setItem('list',JSON.stringify(list))
  },[list])
 return(
  <section className={styles.sectioncenter}>
    <form className={styles.groceryform} onSubmit={handleSubmit}>
      {alert.show && <Alert {...alert} removeAlert = {showAlert} list = {list}/>}
      <h3>grocery bud</h3>
      <div className={styles.formcontrol}>
        <input type="text" className={styles.grocery} 
        placeholder='e.g eggs' value={name} onChange={(e)=>setName(e.target.value)}/>
        <button type='submit' className={styles.submitbtn}>
          {isEditing ? 'edit' : 'submit'}
        </button>
      </div>
    </form>
    {list.length > 0 && ( 
     <div className={styles.grocerycontainer}>
     <List items = {list} removeItem = {removeItem} editItem = {editItem}/>
     <button className={styles.clearbtn} onClick={clearList}>clear items</button>
    </div>
    )
    }
 
  </section>
 )
  
}

export default App;
