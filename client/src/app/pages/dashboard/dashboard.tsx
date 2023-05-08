import { useEffect, useState } from 'react'
import { Card, Button } from 'react-bootstrap'
import { useGetMyArticlesMutation } from '../../services/articles.service'
import { IPatient } from '../../interfaces/articles.interface'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { resetState, selectAuthenticatedUser, setAuthenticatedUser } from '../../redux/slices/auth.slice'
import Profile from './profile'
import ProfileDetails from './profiledetail'
import { useSelector } from 'react-redux'
import { store } from '../../redux/store'
import { userSlice } from '../../redux/slices/user.slice'
 


const Dashboard = () => {
 
    const { name, access_token } = useAppSelector(selectAuthenticatedUser)
    const dispatch = useAppDispatch()

    const [getMyArticles, { data, error, isLoading }] = useGetMyArticlesMutation()
    const [articles, setArticles] = useState<IPatient[]>([])
    const [usermasterData, setuserMasterData] = useState<IPatient[]>([])
  
    useEffect(() => {
      getMyArticles(null)
    }, [])
  
    useEffect(() => {
      if (data && !error) {
        setArticles(data)
        setuserMasterData(data)
        setData(data[0]);
        console.log('MayArticlesPage:: data:', data)
      } else if (error) {
        console.log(`MayArticlesPage:: Error getting articles`, error)
      }
    }, [data, error])



    
 
    const logout = () => {
        dispatch(resetState())
        
      }
    

      const [patientD, setData] = useState<any>(  );
       
 
      const parentToChild = (i:any,v:any) => {
        console.log(v)
        setData(v);
      }

      const filterBySearch = (event:any) => {
        // Access input value

      
        
        const query = event.target.value;
        // Create copy of item list
        console.log(query)
        var updatedList = [...articles];
        // Include all elements which includes the search query
        updatedList = updatedList.filter((item) => {
          return  item.name.toLowerCase().indexOf(query.toLowerCase()) !== -1;
        });
        // Trigger render with updated values
        if (query){
          setArticles(updatedList);
        }
else{
  setArticles(usermasterData);
  
}
     
      };

      const childToParent = (data:any)=>{

        console.log(data)
        console.log(patientD)
        setData(data)
        


      }


  return (
    <>
      <div className="patient_main_div">
        <div className="search_main_div">
            <div className="search_div">
                <form action="">
                    <input type="text" name="" id="" className="search_input" placeholder="Search by name" onChange={filterBySearch} />
                    <img src="image/search_icon.svg" alt="" className="img-fluid search_icon" />
                </form>
            </div>
            <div className="patient_name_list">
                {/* <div className="single_patient_div  ">
                    <h6 className="grey_color">Sumitra Kumar</h6>
                    <a href="">+91 888392883</a>
                </div> */}
                {articles.map((patient, index) => {
                    return (
                        <div className={`single_patient_div ${(patient?._id==patientD._id) ? "active" : ""}`} onClick={() => parentToChild(index,patient)}>
                        <h6 className="black_color">{patient.name} </h6>
                        <a href={void(0)}>{patient.phone}</a>
                        <span className="green_got"></span>
                    </div>
                    )
                })}
                 
                
            </div>
            <div className="logout_div">
                <div className="logo_image">
                    <img src="image/logo.png" alt="" className="img-fluid" width="45" height="45" />
                </div>
                <div className="login_name">
                    <h6 className="black_color">{ name }</h6>
                    <a  onClick={logout}  className="logout_button">Logout</a>
                </div>
            </div>
        </div>

            { (patientD) ? <Profile   patientInfo={patientD}/> : "loading" }
           <ProfileDetails   patientInfo={patientD}  childToParent={childToParent} />

      

    </div>
    
    </>
  )
}
export default Dashboard
