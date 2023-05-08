import { useEffect, useState } from 'react'
import { Card, Button } from 'react-bootstrap'
 
import { IPatient } from '../../interfaces/articles.interface'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { selectSelectedNav } from '../../redux/slices/navitem.slice'
import { useDispatch, useSelector } from 'react-redux'
import Moment from 'react-moment'

import { createTheme, ThemeProvider } from '@mui/material/styles'
import parse, { domToReact } from 'html-react-parser';
import MUIRichTextEditor from 'mui-rte'
 
import { Formik, Form, Field, useFormikContext   } from 'formik'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { setNav as setReducerNav } from '../../redux/slices/navitem.slice'
import { useAddplandateMutation, useDeletepostMutation , useAddmealMutation  , useAddguidelineMutation ,useDeleteMealMutation, useDeleteGuideMutation , useUpdatemealMutation , useUpdateGuideMutation, useUpdateStatusMutation } from '../../services/articles.service'
import { type } from 'os'


const ProfileDetails = (props:any) => {   

    console.log(props)

    const { index, value , data } = useAppSelector(selectSelectedNav)
    const [addmeal] = useAddmealMutation()
    const [addguideline] = useAddguidelineMutation()
    const [deleteMeal] = useDeleteMealMutation()
    const [deleteGuide] = useDeleteGuideMutation()
    const [updateMeal] = useUpdatemealMutation()
    const [updateGuide] = useUpdateGuideMutation()
    const [updateStatus] = useUpdateStatusMutation()
    
    
    


    // const[allmealplan,setAllmealplan]  = useState( data) ; 
    const allmealplan  = data;
 

    const[pubStatus,setPublic]= useState(0)
    



    const [mealplan, setMealplan] =  useState([]);
    const [guideline, setGuideline] =  useState<any>([]); 
    const [tab, setTab] =  useState(1);
 
    useEffect(() => { 
        console.log(data)        
        setPublic(data?.public)

        setMealplan(data?.mealplan);
        setGuideline(data?.guideline);
    }, [allmealplan]);







    const [evalue, setValue] = useState('Type Meal Options');
    const [etime, setTime] = useState(null);
    const [etype, setType] = useState(null);
    const [ meaid , setMealid ] = useState(null)
    const [ guideId , setGuideId] = useState(null)
    
 
 

   const editMealPlan = (meal:any)=>{ 

    
    setMealid(meal._id)
    setValue(meal.mealhtml)
    setTime(meal.time)
    setType(meal.type)

    }


    const editGuidePlan = (guide:any)=>{ 

     

        setgValue(guide.guidehtml);
        setGuideId(guide._id)

    
    
        }



    
    
    const resetMeal = ()=>{

        setMealid(null)
        setValue("Type Meal Options")
        setTime(null)
        setType(null)

    }


    
    
    const [gvalue, setgValue] = useState('Type Guideline Options');




    const dispatch = useAppDispatch()
 
    
    const addMeal= (obj:any)=>{



        if(meaid){

            obj['_id'] = meaid
            obj['mealhtml'] =obj.mealplan.mealhtml
            obj['time'] = obj.mealplan.time
            obj['type'] = obj.mealplan.type
            obj['pid'] = obj.id 
 
            console.log(obj)

            updateMeal(obj).then((d:any)=>{

                resetMeal()
             
                var val = {...d.data }
    
                val['uid'] = data?.uid
    
                dispatch(setReducerNav({
                    index : index,
                    value : value,             
                    data:  val
                }))

            })

      

        }
        else{
             addmeal(obj).then((d:any)=>{
            
                resetMeal()
             
              var val = {...d.data }
  
              val['uid'] = data?.uid
  
              dispatch(setReducerNav({
                  index : index,
                  value : value,             
                  data:  val
              }))
          })}
      

    }
    const addGuideline= (obj:any)=>{

        if (guideId){
         var fianlValues =   {
         "id":obj.id,
         "guideline": obj.guideline,
         "plandate": obj.plandate,
         "updateGuideID":  guideId }
 
         console.log(fianlValues)

         updateGuide(fianlValues).then((d:any)=>{

            var val = {...d.data } 
            val['uid'] = data?.uid 
            dispatch(setReducerNav({
                index : index,
                value : value,             
                data: val
            }))

         })

        }
        else{
            addguideline(obj).then((d:any)=>{ 
                setgValue('Type Guideline Options');
                var val = {...d.data } 
                val['uid'] = data?.uid 
                dispatch(setReducerNav({
                    index : index,
                    value : value,             
                    data: val
                }))
            })
        }
       
    }

    const deleteMealPlan = (id:any)=> {          
        let obj = 
        
        {   itemId :  id ,
            pid :  data?.uid ,
            plandate  : data?._id 
        }    
            deleteMeal( obj ).then((d:any)=>{

                var val = {...d.data } 
                val['uid'] = data?.uid 
                dispatch(setReducerNav({
                    index : index,
                    value : value,             
                    data: val
                }))

            })

    }

    const deleteGuideLine = (id:any)=> {  
        let obj = 
        {   itemId :  id ,
            pid :  data?.uid ,
            plandate  : data?._id 
        }    

        
        deleteGuide( obj ).then((d:any)=>{

            var val = {...d.data } 
            val['uid'] = data?.uid 
            dispatch(setReducerNav({
                index : index,
                value : value,             
                data: val
            }))

        })


    }

    const updateStatusAction = ()=>{
    
         
        let obj = { 
            id :  data?.uid ,
            did :  data?._id  ,
            status : true
        }

        updateStatus(obj).then((d:any)=>{
            console.log(d)

            props.childToParent(d.data)

            setPublic(1)

        })


    }



  return (
    <>
      <div className="patient_main_div" style={{width: "100%"}}>     
        <div className="date_diet_div">
        { (data ) ?  <div className={`single_diet_div ${index<0?'active':""}`} id="first_div"  >
                <div className="description_div">
                    <div className="description_inner_div">
                        <div className="description_heading_div border_bottom">
                            <span className="black_color font-bold">    <Moment format="DD MMM">
                                                    {data.start}   
            </Moment>
-    
                                                     <Moment format="DD MMM YY">
                                                     {data.end}   
            </Moment>                                        </span>
                            <ul className="nav nav-tabs" id="myTab" role="tablist">
                                <li className="nav-item" role="presentation">
                                    <button className={`nav-link ${tab==1 ? 'active' : ''}`} id="create_meal-tab" data-bs-toggle="tab"
                                        data-bs-target="#create_meal" type="button" role="tab" onClick={()=>{setTab(1)}}
                                        aria-controls="create_meal" aria-selected="true">Create Meal Plan  </button>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <button className={`nav-link ${tab==2 ? 'active' : ''}`}id="profile-tab" data-bs-toggle="tab"
                                        data-bs-target="#profile" type="button" role="tab" aria-controls="profile"   onClick={()=>{setTab(2)}}
                                        aria-selected="false">Guideline </button>
                                </li>
                            </ul>
                        </div>

 
                  {(tab==1) ?         <div className="description_text_siv">
                            <div className="tab-content" id="myTabContent">
                                <div className="tab-pane" id="create_meal-tab" role="tabpanel"
                                    aria-labelledby="create_meal-tab" style={{ display:'block' }}>
                                  
                                  <Formik
          initialValues={{ 
            time : etime,
            type : etype
        
        }}  
        enableReinitialize
          onSubmit={( values, { setSubmitting }) => {
            setTimeout(() => {

              console.log(JSON.stringify(values, null, 2));
 
               let val =  JSON.parse(JSON.stringify(values)) ;

               val["id"]  = data.uid;
               val["plandate"]   = data._id; 

              let finalData = {
                 "id":val["id"],
                 "plandate":val["plandate"], 
                 "mealplan": {"mealhtml":  evalue ,"time":val["time"],"type":val["type"]}
                }

              
addMeal(finalData)


              setSubmitting(false);
            }, 400);
          }}

        >
          {({ isSubmitting, values, setFieldValue }) => (
            
                 <Form >  
                                    {/* <Field textarea  name="mealhtml" as="textarea"  className="jqte-test">Type Meal Options</Field> */}

                                    <ReactQuill theme="snow" value={evalue} onChange={setValue} />
                                    <div className="create_meal_plan_div border_bottom">
                                        <table className="meal_plan_table">
                                            <thead>
                                                <tr>
                                                    <td>
                                                        <div className="select_time_div">
                                                            <div className="time_div position-relative">
                                                                <Field type="text" id="start_time" 
                                                               
                                                                    name="time"
                                                                    placeholder="Select Time" 
                                                                      />

 
                                                                <img src="image/time_icon.svg" alt="" className="time_icon" />
                                                            </div>
                                                            <div className="custom-select">
                                                                <Field  as="select"    name="type"   >
                                                                    <option value="None"> None </option>
                                                                    <option value="Breakfast">Breakfast </option>
                                                                    <option value="Lunch"> Lunch </option>
                                                                    <option value="Snacks"> Snacks </option>
                                                                    <option value="Dinner">  Dinner  </option>
                                                                </Field>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                    
                                             <button className="diet_button orange_button" disabled={isSubmitting}  >
                                                { (meaid) ? 'Update This ' : ' Add This'  }
                                              
                                                
                                                </button>
                                                    </td>
                                                </tr>
                                            </thead>

                                        </table>
                                      
                                    </div>
                                    </Form>

          
                    )}
        </Formik>


                                    <table className="meal_plan_table">
                                    <table>
                                            <tbody>


                                            { data?.mealplan?.map((meal: any, index: any) => {
                                      
                                              return (  <tr  >
                                                <td>
                                                    <p className="font-bold black_color pb-2">{meal.time}</p>
                                                      <div>
                                                      <strong> {meal.type}  </strong>
                                                      { parse( meal.mealhtml )}    
                                                        </div> 
                                                </td>
                                                <td>
                                                    <div className="edit_delete_button">
                                                        <a href={void(0)} onClick={()=>{deleteMealPlan(meal._id)}} className="diet_button border_button">Delete</a>
                                                        <a href={void(0)} className="diet_button border_button" onClick={()=>{ editMealPlan(meal) }} >Edit</a>
                                                    </div>
                                                </td>
                                            </tr>  ) 
                                            })}
                                            </tbody>
                                        </table>
 </table>
                                    <div className="finsh_publish_div">
                                        {
                                            (!pubStatus)?  <a href={void(0)} onClick={updateStatusAction} className="diet_button border_button">Final Publish</a>  :
                                            <a href={'http://54.190.34.238:8080/generatereport/'+allmealplan['uid']+ "/" + allmealplan._id }   className="diet_button border_button">Download PDF</a>

                                        }

                                    </div>
                                </div>

                          

                            </div>
 
 
                   </div> :
                        <div className="description_text_siv"> 
                        <div className="tab-content" id="myTabContent">
                            <div className="tab-pane" id="create_meal-tab" role="tabpanel"
                                aria-labelledby="create_meal-tab" style={{ display:'block' }}>
                              
                              <Formik
      initialValues={{ 
        
    
    }}  

      onSubmit={( values, { setSubmitting }) => {
        setTimeout(() => {

          console.log(JSON.stringify(values, null, 2));

           let val =  JSON.parse(JSON.stringify(values)) ;

           console.log(data)

           val["id"]  = data.uid;
           val["plandate"]   = data._id; 

          let finalData = {
             "id":val["id"],
             "plandate":val["plandate"], 
             "guideline":    gvalue 
            }          
            addGuideline(finalData)

          setSubmitting(false);
        }, 400);
      }}

    >
      {({ isSubmitting, values, setFieldValue }) => (
        
             <Form >  
                               

                                <ReactQuill theme="snow" value={gvalue} onChange={setgValue} />
                                <div className="create_meal_plan_div border_bottom">
                                    <table className="meal_plan_table">
                                        <thead>
                                            <tr>
                                                <td>
                                                  
                                                </td>
                                                <td>
                                                
                                         <button className="diet_button orange_button" disabled={isSubmitting}  > 
                                         
                                         { (guideId) ? 'Update This ' : ' Add This'  }
                                         
                                       
                                         </button>
                                                </td>
                                            </tr>
                                        </thead>

                                    </table>
                                  
                                </div>
                                </Form>

      
                )}
    </Formik>


                                <table className="meal_plan_table">
                                <table>
                                        <tbody>


                                        { data?.guideline?.map((guide: any, index: any) => {
                                  
                                          return (  <tr>
                                            <td>
                                                <p className="font-bold black_color pb-2"> </p>
                                                  <div>

                                                  { parse( guide.guidehtml )}    
                                                  
                                                 


                                                  
                                                    </div> 
                                            </td>
                                            <td>
                                                <div className="edit_delete_button">
                                                    <a href={void(0)} onClick={()=>{deleteGuideLine(guide._id)}} className="diet_button border_button">Delete</a>
                                                    <a href={void(0)} onClick={()=>{ editGuidePlan(guide) }} className="diet_button border_button">Edit</a>
                                                </div>
                                            </td>
                                        </tr>  ) 
                                        })}
                                        </tbody>
                                    </table>
</table>
                                <div className="finsh_publish_div">
                                    <a href="" className="diet_button border_button">Final Publish</a>
                                </div>
                            </div>

                              <div  className="tab-pane" id="profile-tab" role="tabpanel" aria-labelledby="profile-tab">
                              
{/* 
                              <form> 
                                <div className="create_meal_plan_div border_bottom">
                                    <textarea name="textarea" className="jqte-test">Type Meal Options</textarea>
                                    <table className="meal_plan_table">
                                        <thead>
                                            <tr>
                                                <td>
                                                    <div className="select_time_div">
                                                        <div className="time_div position-relative">
                                                            <input type="text" id="start_time"
                                                                placeholder="Select Time" name="start_time"
                                                                 />
                                                            <img src="image/time_icon.svg" alt="" className="time_icon" />
                                                        </div>
                                                        <div className="custom-select">
                                                            <select>
                                                                <option value="0">Select Type</option>
                                                                <option value="1">One</option>
                                                                <option value="2">Two</option>
                                                                <option value="3">Three</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <button className="diet_button orange_button">Add This</button>
                                                </td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <p className="font-bold black_color pb-2">11:30 AM</p>
                                                    <p>5-7 nuts (soaked almonds/ pistas/ cashews/ walnuts)</p>
                                                </td>
                                                <td>
                                                    <div className="edit_delete_button">
                                                        <a href="" className="diet_button border_button">Delete</a>
                                                        <a href="" className="diet_button border_button">Edit</a>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <p className="font-bold black_color pb-2">11:30 AM</p>
                                                    <p>5-7 nuts (soaked almonds/ pistas/ cashews/ walnuts)</p>
                                                </td>
                                                <td>
                                                    <div className="edit_delete_button">
                                                        <a href="" className="diet_button border_button">Delete</a>
                                                        <a href="" className="diet_button border_button">Edit</a>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <p className="font-bold black_color pb-2">11:30 AM</p>
                                                    <p>5-7 nuts (soaked almonds/ pistas/ cashews/ walnuts)</p>
                                                </td>
                                                <td>
                                                    <div className="edit_delete_button">
                                                        <a href="" className="diet_button border_button">Delete</a>
                                                        <a href="" className="diet_button border_button">Edit</a>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <div className="finsh_publish_div">
                                        <a href="" className="diet_button border_button">Final Publish</a>
                                    </div>
                                </div>
</form> */}









                            </div>   

                        </div>


               </div>
                   
                   }  

             
                    </div>
                </div>
            </div> : null }
           
          


            <div className={`single_diet_div ${index==0?'active':""}`} id="profile">
                <div className="description_div">
                    <p className="orange_color font-400"> {value} </p>
                    <h6 className="black_color font-bold pb-4 border-bottom pt-2">Help us understand your symptoms better to diagnose properly with the following questions</h6>
                    <div className="sub_question mt-4">

                        <div className="single_question_list mb-5 ">
                            <h6 className="black_color font-600 pb-2">Any trigger foods that you suspect?</h6>
                            <p>Wheat, Milk, Sugar</p>
                        </div>
                        <div className="single_question_list mb-5 ">
                            <h6 className="black_color font-600 pb-2">Do you experience any of the following?</h6>
                            <p>Throat discomfort, Acidic Taste in mouth, Feeling of regurgitation, Trouble Swallowing Food Cough
                            </p>
                        </div>
                        <div className="single_question_list mb-5 ">
                            <h6 className="black_color font-600 pb-2">Any trigger foods that you suspect?</h6>
                            <p>Wheat, Milk, Sugar</p>
                        </div>
                    </div>
                </div>
            </div>


            <div className={`single_diet_div ${index==1?'active':""}`} id="prior">
                <div className="description_div">
                    <p className="orange_color font-400">{value}</p>
                    <h6 className="black_color font-bold pb-4 border-bottom pt-2">Help us understand your symptoms better to
                        diagnose properly with the following questions</h6>
                    <div className="sub_question mt-4">
                        <div className="single_question_list mb-5 ">
                            <h6 className="black_color font-600 pb-2">Do you experience any of the following?</h6>
                            <p>Throat discomfort, Acidic Taste in mouth, Feeling of regurgitation, Trouble Swallowing
                                Food Cough
                            </p>
                        </div>
                        <div className="single_question_list mb-5 ">
                            <h6 className="black_color font-600 pb-2">Any trigger foods that you suspect?</h6>
                            <p>Wheat, Milk, Sugar</p>
                        </div>
                        <div className="single_question_list mb-5 ">
                            <h6 className="black_color font-600 pb-2">Do you experience any of the following?</h6>
                            <p>Throat discomfort, Acidic Taste in mouth, Feeling of regurgitation, Trouble Swallowing
                                Food Cough
                            </p>
                        </div>
                        <div className="single_question_list mb-5 ">
                            <h6 className="black_color font-600 pb-2">Any trigger foods that you suspect?</h6>
                            <p>Wheat, Milk, Sugar</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`single_diet_div ${index==2?'active':""}`} id="genereal_medicine">
                <div className="description_div">
                    <p className="orange_color font-400">{value}</p>
                    <h6 className="black_color font-bold pb-4 border-bottom pt-2">Help us understand your symptoms better to
                        diagnose properly with the following questions</h6>
                    <div className="sub_question mt-4">
                        <div className="single_question_list mb-5 ">
                            <h6 className="black_color font-600 pb-2">Do you experience any of the following?</h6>
                            <p>Throat discomfort, Acidic Taste in mouth, Feeling of regurgitation, Trouble Swallowing
                                Food Cough
                            </p>
                        </div>
                        <div className="single_question_list mb-5 ">
                            <h6 className="black_color font-600 pb-2">Any trigger foods that you suspect?</h6>
                            <p>Wheat, Milk, Sugar</p>
                        </div>
                        <div className="single_question_list mb-5 ">
                            <h6 className="black_color font-600 pb-2">Do you experience any of the following?</h6>
                            <p>Throat discomfort, Acidic Taste in mouth, Feeling of regurgitation, Trouble Swallowing
                                Food Cough
                            </p>
                        </div>
                        <div className="single_question_list mb-5 ">
                            <h6 className="black_color font-600 pb-2">Any trigger foods that you suspect?</h6>
                            <p>Wheat, Milk, Sugar</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`single_diet_div ${index==3?'active':""}`} id="lifestyle">
                <div className="description_div">
                    <p className="orange_color font-400">{value}</p>
                    <h6 className="black_color font-bold pb-4 border-bottom pt-2">Help us understand your symptoms better to
                        diagnose properly with the following questions</h6>
                    <div className="sub_question mt-4">
                        <div className="single_question_list mb-5 ">
                            <h6 className="black_color font-600 pb-2">Do you experience any of the following?</h6>
                            <p>Throat discomfort, Acidic Taste in mouth, Feeling of regurgitation, Trouble Swallowing
                                Food Cough
                            </p>
                        </div>
                        <div className="single_question_list mb-5 ">
                            <h6 className="black_color font-600 pb-2">Any trigger foods that you suspect?</h6>
                            <p>Wheat, Milk, Sugar</p>
                        </div>
                        <div className="single_question_list mb-5 ">
                            <h6 className="black_color font-600 pb-2">Any trigger foods that you suspect?</h6>
                            <p>Wheat, Milk, Sugar</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`single_diet_div ${index==4?'active':""}`} id="mindfulness">
                <div className="description_div">
                    <p className="orange_color font-400">{value}</p>
                    <h6 className="black_color font-bold pb-4 border-bottom pt-2">Help us understand your symptoms better to
                        diagnose properly with the following questions</h6>
                    <div className="sub_question mt-4">
                        <div className="single_question_list mb-5 ">
                            <h6 className="black_color font-600 pb-2">Do you experience any of the following?</h6>
                            <p>Throat discomfort, Acidic Taste in mouth, Feeling of regurgitation, Trouble Swallowing
                                Food Cough
                            </p>
                        </div>
                        <div className="single_question_list mb-5 ">
                            <h6 className="black_color font-600 pb-2">Any trigger foods that you suspect?</h6>
                            <p>Wheat, Milk, Sugar</p>
                        </div>
                        <div className="single_question_list mb-5 ">
                            <h6 className="black_color font-600 pb-2">Do you experience any of the following?</h6>
                            <p>Throat discomfort, Acidic Taste in mouth, Feeling of regurgitation, Trouble Swallowing
                                Food Cough
                            </p>
                        </div>
                        <div className="single_question_list mb-5 ">
                            <h6 className="black_color font-600 pb-2">Any trigger foods that you suspect?</h6>
                            <p>Wheat, Milk, Sugar</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
    
    </>
  )
}
export default ProfileDetails
