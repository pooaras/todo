import React, { useEffect, useState,useRef } from 'react'
import classes from './Todo.module.css'
import AddIcon from '@mui/icons-material/Add';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
const Todo = () => {
  const [task, setTask] = useState("")
  const [ListItems, setItems] = useState([]);
  const inputRef = useRef();
  const [tg, setTg] = useState(false)
  const [StrikeItems, setStrikeItems] = useState(0);
  // const [newItem, setnewItem] = useState('');
    // const [strike, setStrike] = useState(false);
    const AddItem = () => {
      if (task !== "")
      {
        setItems([...ListItems, { item: task, toggle: false, edit: false }]);
        inputRef.current.value = "";
      }
      setTask("")
     
    }
    // const [strikeStyle, setStrikeStyle] = useState('');
  const changeToStrike = (i) => {
    setItems(ListItems.map( (item,index) => {
      console.log(item)
      return i === index ? { ...item, toggle : item.toggle ? false : true } : item ;
    }
    ))
    // console.log(ListItems)
      // setStrikeStyle(strike ? 'text-decoration-none' : 'text-decoration-line-through');
      // setStrike(strike ? false : true);
      // console.log(strikeStyle,strike);
  }
    useEffect(() => {
      let count = 0;
      ListItems.forEach((each) => {
        if (each.toggle) count += 1;
      })
      setStrikeItems(count)
    }, [ListItems])
  
    const delItem = (e) => {
      setItems(ListItems.filter((each, index) => {
        return e !== index ;
      }))
      console.log(ListItems)
  }
  const editRef = useRef()
  const onEdit = (e, i) => {
    e.preventDefault();
    // console.log(e.target.input.value)
    
    setItems(ListItems.map((item, index) => {
      if (i === index) {
        e.target.elements[1].value=item.item
        // setnewItem(item.item)  
        return { ...item, edit: item.edit ? false : true }
      }
      else {
        return item;
      }
      // return i == index ? { ...item, edit: item.edit ? false : true } : 
      
    } ))   

  }
 
  const saveItem = (e, i) => {
    // console.log(e.target)
    e.preventDefault();
    setItems(ListItems.map((each,index) => {
      if (index === i) {
        return {...each, item:  e.target.elements[1].value, edit: each.edit ? false : true}
      }
      else return each
    }))       
  }    

  return (
    <>
      <div className={`z-0 shadow rounded ${classes.box}`}>
        <div className={`pb-4 ${classes.topContainer}`}>
              <h3 className='text-center mb-4 pt-4'>Todo List</h3>
        <p className='text-center mt-2'>You have {ListItems.length - StrikeItems} of {ListItems.length} tasks remaining</p>   
        </div> 
              <div className={classes.inputContainer}>
          <input type='text' ref={inputRef} onChange={(e) => { setTask(e.target.value);}} className={`border-0 ${classes.inputBox}`} placeholder='Add task...'/>
              <button className={classes.btn} onClick={AddItem}><AddIcon />  </button>
        </div>
              <div className='mt-4'>   
               {ListItems.map((each, index) => {
                // console.log(each,index)
                return <ul key={index} className='p-0'>
                <li className={` ${classes.listItemStyle} d-inline-block text-truncate w-75 ${ each.edit ? `d-none` : `d-inline`}`} onClick={() => { changeToStrike(index) }}>
                  {each.toggle ? <CheckCircleIcon style={{color:"6bffa0"}} /> : <RadioButtonUncheckedIcon />} <p className={`${classes.pTxt} d-inline ${each.toggle ? 'text-decoration-line-through fw-light' : 'text-decoration-none fw-bold'}`}>{each.item}</p>
                  </li>
                  <button className={classes.delbtn} onClick={() => { delItem(index) }}><DeleteIcon /></button>
                  <form className='d-inline' onSubmit={(e) => { !each.edit ? onEdit(e,index) : saveItem(e, index) }}>
                  <button type='submit' className={ `${classes.editIcon} ${each.edit ? `d-none` : `d-inline`} border-0 p-0 bg-transparent`}><EditIcon/></button>
                    <input ref={editRef} name={index} className={ `mx-4 ${each.edit ? `d-inline` : `d-none`}`} />
                  <button type='submit' className={ `${classes.saveBtn} border-0 bg-transparent ${each.edit ? `d-inline` : `d-none`}`} ><CheckCircleIcon style={{color:"6bffa0"}} /></button>
                  </form>          
                  <p className={`${classes.hoverTxt} bg-black text-white text-nowrap position-absolute z-1`}>{each.item}</p>
                </ul>
              })}
                </div>
          </div>
      
              
    
    </>
  )
}

export default Todo
