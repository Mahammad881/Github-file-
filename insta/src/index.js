import React from 'react';
import ReactDOM from 'react-dom/client';
import "./index.css";


const title="hanif";
const author="Microdegree";
function Booklist(props){
  console.log(props)
  const{title,author}=props;
  return(
    <>
    <h1>{props.title}</h1>
    <p>
      {props.author}
    </p>
    </>
  );
}



const root=ReactDOM.createRoot(document.getElementById('root'));
root.render(<Booklist/>)



