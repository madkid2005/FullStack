import "./Modal.css"
function Modal(props) {
return(

    <div className="bg-dark">
        <p className="App">

        {props.children}
        <br></br>
         <button onClick={props.hand} >Close</button>
        </p>
    </div>

)
}
export default Modal;