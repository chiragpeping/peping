import { useAppDispatch } from '../../redux/hooks'
import { setNav as setReducerNav } from '../../redux/slices/navitem.slice'
import { useEffect, useState } from 'react'

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { LicenseInfo } from '@mui/x-data-grid-pro';
import { useAddplandateMutation, useDeletepostMutation } from '../../services/articles.service'
import { Formik, Form, Field } from 'formik'
import Moment from 'react-moment';
LicenseInfo.setLicenseKey(
    'x0jTPl0USVkVZV0SsMjM1kDNyADM5cjM2ETPZJVSQhVRsIDN0YTM6IVREJ1T0b9586ef25c9853decfa7709eee27a1e',
);


const Profile = (props: any) => {
    const [addplandate] = useAddplandateMutation()
    const [useDeletePostMutation] = useDeletepostMutation()
    const dispatch = useAppDispatch()
    dispatch(setReducerNav({
        index: 0,
        value: "Gut Profile",
        data: null
    }))
    const [plandate, setPlanDate] = useState(props.patientInfo.plandate);

    const [userinfo, setUserinfo] = useState(props.patientInfo);


    useEffect(() => {
        setPlanDate(props.patientInfo.plandate)
        console.log(props.patientInfo.plandate)
    }, [props.patientInfo]);



    const changeNav = (index: number, val: string, data: any) => {


        if (data) {
            var addedData: any = {}
            addedData = { ...data }

            addedData['uid'] = props.patientInfo._id
            dispatch(setReducerNav({
                index: index,
                value: val,
                data: addedData

            }))
        }
        else {
            dispatch(setReducerNav({
                index: index,
                value: val,
                data: data

            }))
        }
    }
    changeNav(-1, "", plandate[0])
    const DeleteDiet = (id: any) => {
        console.log(id)
        useDeletePostMutation({
            pid: id,
            id: props.patientInfo._id
        }).then((data: any) => {
                        setPlanDate(data.data)
        })
    }



    const addNewDitePlan = (data: any) => {
        let v = { "start": data.plandate[0]['$d'], "end": data.plandate[1]['$d'] }
        data['plandate'] = v;
        addplandate(data).then((data: any) => {
            console.log(data)
            setPlanDate(data.data)
        })
    }



    return (
        <>

            <div className="patient_main_div">
                <div className="patient_plan_div">
                    <div className="patient_name_div">
                        <div className="single_patient_div">
                            <h6 className="black_color">     {props.patientInfo?.name}    </h6>
                            <a href="" className="d-block">     {props.patientInfo?.phone}</a>
                            <a >     {props.patientInfo?.email}</a>
                        </div>
                    </div>
                    <div className="different_profile_div">
                        <div className="deit_plan_div profile_list">
                            <ul>
                                <li>
                                    <div className="diet_div" id="profile" onClick={() => { changeNav(0, "Gut Profile", null) }}>
                                        <p className="black_color font-bold">Gut Profile</p>
                                    </div>

                                </li>
                                <li>
                                    <div className="diet_div" id="prior" onClick={() => { changeNav(1, "Prior Treatments", null) }}>
                                        <p className="black_color font-bold">Prior Treatments</p>
                                    </div>

                                </li>
                                <li>
                                    <div className="diet_div" id="genereal_medicine" onClick={() => { changeNav(2, "General Medicine", null) }} >
                                        <p className="black_color font-bold">General Medicine</p>
                                    </div>

                                </li>
                                <li>
                                    <div className="diet_div" id="lifestyle" onClick={() => { changeNav(3, "Lifestyle", null) }} >
                                        <p className="black_color font-bold">Lifestyle</p>
                                    </div>

                                </li>
                                <li>
                                    <div className="diet_div" id="mindfulness" onClick={() => { changeNav(4, "Mindfulness", null) }}>
                                        <p className="black_color font-bold">Mindfulness</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <Formik
                        initialValues={{}}

                        onSubmit={(values, { setSubmitting }) => {
                            setTimeout(() => {

                                console.log(JSON.stringify(values, null, 2));


                                addNewDitePlan(values)

                                setSubmitting(false);
                            }, 400);
                        }}

                    >
                        {({ isSubmitting, values, setFieldValue }) => (

                            <Form >                 <div className="select_deit_date pb-4">
                                <div className="new_plan_div">

                                    <h6 className="black_color">Create Diet Plan</h6>
                                </div>
                                <div className="deit_date_div">
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DemoContainer components={['DateRangePicker']}>
                                            <DateRangePicker localeText={{ start: 'Start Date', end: 'End Date' }}
                                                onChange={date => {

                                                    setFieldValue('plandate', date)

                                                    setFieldValue('id', props.patientInfo?._id)


                                                }



                                                }


                                            />
                                        </DemoContainer>
                                    </LocalizationProvider>
                                </div>
                                <div className="edit_delete_button full_width">
                                    <Field

                                        name="id"

                                        type="hidden"
                                        value={props.patientInfo?._id}
                                    />
                                    <button disabled={isSubmitting} className="diet_button border_button">Create</button>
                                </div>
                            </div></Form>


                        )}
                    </Formik>

                    <div className="deit_plan_div diet_date_active">
                        <h6 className="black_color">Diet Plan    </h6>
                        <ul>
                            <li>
                                

                                {plandate.map((data: any, index: any) => {

                                    return (
                                        <div id="third_div" className="diet_div">
                                            <div className="single_diet_plan_div">
                                                <div className="diet_plan_date_div">
                                                    <span className="black_color font-bold">
                                                        <Moment format="DD MMM">
                                                            {data.start}
                                                        </Moment>
                                                        -
                                                        <Moment format="DD MMM YY">
                                                            {data.end}
                                                        </Moment>
                                                    </span>

                                                     
                                                {
                                                    (!data.public)?   
                                                    <a href={void (0)} className="orange_color" onClick={() => { changeNav(-1, "", data) }} >Continue    </a>
:
                                                    <a   onClick={() => { changeNav(-1, "", data) }}  className="parrot_color">Published </a>

                                                }
                                                </div>

                                                <div className="diet_plan_button_div">
                                                {
                                                    ( data.public)? 

                                                    <a href={'http://54.190.34.238:8080/generatereport/'+userinfo['_id']+ "/" + data['_id']  }  className="black_color">Download PDF</a>
                                                    :           <a   className="black_color"  style={{opacity: 0.3}} >Download PDF</a> }
                                                
                                           
                                                                                            <div className="diet_edit_button">
                                                    <a href={void (0)} onClick={() => { changeNav(-1, "", data) }}  >Edit</a>
                                                    <a href={void (0)} onClick={() => { DeleteDiet(data._id) }}>Delete</a>
                                                </div>
 
                                                </div>
                                            </div>
                                        </div>

                                    )

                                })}


                            </li>
                        </ul>
                    </div>
                </div>


            </div>

        </>
    )
}
export default Profile  