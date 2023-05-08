import { useEffect } from 'react';
import { useRegisterMutation } from '../../services/auth.service';
import './homePage.css'
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useAppDispatch } from '../../redux/hooks'
import { NotificationManager } from 'react-notifications'
const HomePage = () => {

  const [register, { data, error, isLoading }] = useRegisterMutation()
  const dispatch = useAppDispatch()
  useEffect(() => {
    if (data && !error) { 
      NotificationManager.success(`Patient added sucessfully`)  
    } else if (error) {
      NotificationManager.error('Please check your connection')
     }
  }, [data, error, dispatch])
  
  const handleSignup = (formValue: {
     name: string;
      phone: string ;
      email : string;
      age:string,
      weight :string,
      height:string,
      complaints: string
    }) => {       
     const {  name, phone, email, age, weight, height, complaints } = formValue

     register({  name, phone, email, age, weight, height, complaints })

  }



  return (
    <>
    <center>
    <div className="user-wrapper">
       <h1>Create New Patient</h1>
       <Formik 
          initialValues={  

            {
            "name":"",
            "phone":"",
            "email":"",
            "age": "" ,
            "weight": "",
            "height":"",
            "complaints":""
          
          }

            }
          validate={(values:object) => {
            const errors = {};
           
            return errors;
          }}
            
               onSubmit={handleSignup}
       >
         {({  handleSubmit, handleChange, isSubmitting, handleBlur, values, touched, isValid, errors  }) => (
           <form action="" noValidate   onSubmit={handleSubmit}>


<ul>

<li>         <Field
               type="text"
               name="name"
               placeholder="Enter your fullname"
             />
            </li>

            <li>         <Field
               type="text"
               name="phone"
               placeholder="Phone Number"
             />
            </li>
 
            <li>         <Field
               type="email"
               name="email"
               placeholder="Email Address"
             />
            </li>

            <li className='midbox'>
              
              <Field
               type="text"
               name="age"
               placeholder="age"
             />
                   <Field
               type="text"
               name="height"
               placeholder="height"
             />
                   <Field
               type="text"
               name="width"
               placeholder="width"
               className="last"
             />
            </li>

            <li> 

<Field as="textarea"   id="topic" name="complaints" /> 

            </li>
            <li> 
             <button type="submit" disabled={isSubmitting}>
               Submit
             </button> </li>




</ul>

     

       
           

 

           </form>
         )}
       </Formik>
       </div>
     </center>
 
    </>
  )
}
export default HomePage
