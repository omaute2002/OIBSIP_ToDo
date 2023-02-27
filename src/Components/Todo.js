import React from "react";
import "./styles.css";
import { useState } from "react";
import { DelegatedPlugin } from "webpack";
import { useEffect } from "react";

// function to get the local data from local storage

const getLocalData = () => {
  const lists = localStorage.getItem("tasks")
  if(lists){
    return JSON.parse(lists) 
  }
  else{
    return [] // else we will return an empty array or no tasks
  }

}
// get local data return the array that array we are passing into items useState


const ToDo = () => {
  const [inputData, setInputData] = useState(); //input data receive karaila
  const [items, setItems] = useState(getLocalData()); // add the input items into the list
  const [isEditItem, setIsEditItem] = useState("");
  const [toggleButton, setToggleButton] = useState(false);

  //function to add the item in the todolit
  //here we will create an array of the tasks
  const addItem = () => {
    if (!inputData) {
      alert("please fill the data inside todolist");
    }
    else if(inputData && toggleButton){
      setItems(
        items.map((currElement) =>{
          if(currElement.id === isEditItem){
            return{...currElement, name: inputData} //this will display the previous tasks and additional data as well
          }
          return currElement; // if we dont make any changes then let that data as it is
        })
      )
      setInputData("");
      setIsEditItem("");
      setToggleButton(false);
    } 
    else {
        // For delete operation we have to identify the each task by using unique indentifier so creating an object 
        const newInputItem = {
            id: new Date().getTime().toString(),
            name : inputData,

        }
      setItems([...items, newInputItem]); // passing that created object into the function 
      //now to make the input tag empty after clicking the add button 
      setInputData("");
    }
  };

  //function to edit the items in the
  const editItem = (index) =>{
    const item_todo_edited = items.find((currElement) => {
      return currElement.id === index;
    });
    setInputData(item_todo_edited.name);
    setIsEditItem(index);
    setToggleButton(true);
  }


  console.log(items.id);

  // ============================================================================
  // procedure for delete the item from the todolist
  // ========= =================================================

  const deleteItem = (index) => {
    const updatedItems = items.filter((currElement) => {
      return currElement.id !== index;
    });
    setItems(updatedItems) // passing the upadted list into the items' list 
  }

  //Funtion to remove all the elements in the todolist
  const removeAll = () => {
    setItems([]) // this is passing an empty array inside the set items function 
  }

  // useEffect to store the tasks into the local storage 
  useEffect(()=>{
    localStorage.setItem("tasks", JSON.stringify(items))
  },[items])



  // this is thing which we see on web page
  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            {/* <img src="./images/todo.svg" alt="todologo" /> */}
            <figcaption>Add your List Here ✌🏼</figcaption>
          </figure>
          <div className="addItems">
            <input
              type="text"
              placeholder="🧍 Add Item"
              className="form-control"
              value={inputData}
              onChange={(event) => setInputData(event.target.value)}
            />
            {
              toggleButton ? (
                <i className="fa fa-solid fa-pen-to-square" onClick={addItem}></i>
              ) : (
                <i className="fa fa-solid fa-plus" onClick={addItem}></i>
              )
            }
            
          </div>
          {/* Show our items */}
          
          <div className="showItems"></div>
          {items.map((currElement) => {
            return (
              <div className="eachItem" key={currElement.id}>
                <h2>{currElement.name}</h2>
                <div className="todo-btn">
                  <i className="fa fa-solid fa-pen-to-square" onClick={() => editItem(currElement.id)}></i>
                  <i className="fa fa-solid fa-trash" onClick={() => deleteItem(currElement.id)}></i>
                </div>
              </div>
            );
          })}
          {/* remove all items */}

          <div className="showItems">
            <button className="btn effect04" data-sm-link-text="Remove All" onClick={removeAll}>
              <span>CHECK LIST</span>
            </button>
          </div>
        </div>
      </div>
      <div>

      </div>
    </>
  );
};

export default ToDo;









