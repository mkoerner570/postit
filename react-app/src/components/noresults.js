import SubsBar from "./subsbar"

function NoPage(){
    return(
        <div>
            <SubsBar/>
            <h1> Sorry, your search did not turn anything up.</h1>
            <h2> Maybe try being more specific?</h2>
        </div>
    )
}
export default NoPage
