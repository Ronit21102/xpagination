import { useEffect, useState } from "react";
import "./App.css"

function App() {
   
   const [details,setDetails] = useState([]);
   const [page,setPage] = useState(1);
  useEffect(()=>{
     
     const fetchData = async()=>{ 
         try {
           const resp = await fetch('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json')
           const json = await resp.json();
           console.log(json)
           setDetails(json)
         } catch (error) {
          console.log(error)
         }
     }
      fetchData()
  },[])

  const handleDec = ()=>{
     if(page===1)
      return ;
     setPage(page=>page-1);
  }
  const hadleInc = ()=>{
    if(page === Math.ceil(details.length/10))
     return;

    setPage(page=>page+1)
  }
  return (
  <div>
    <div className="App">
          <h3>Employee Data Table</h3>
          <table className="table">
            <thead >
              <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              </tr>
            </thead>
             
             {details.slice((page-1)*10,page*10).map((detail,ind)=>(
              <tbody key={ind}>
                <tr>
                  <td>{detail.id}</td>
                  <td>{detail.name}</td>
                  <td>{detail.email}</td>
                  <td>{detail.role}</td>
                </tr>
              </tbody>
             ))}
          </table>
 
     <div className="buttons">
        <button type="button" onClick={handleDec}>
            previous
        </button>
        <div>{page}</div>
        <button type="button" onClick={hadleInc}>
            Next
        </button>
     </div>
     </div>
  </div>
  );
}

export default App;
