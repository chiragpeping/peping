import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PatientService } from './patient.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { concatMapTo } from 'rxjs';




@Controller('patient')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Post()
  create(@Body() createPatientDto: CreatePatientDto) {
    return this.patientService.create(createPatientDto);
  }



  @Post("/addplandate")
    async  createplandate(@Body() plandate: CreatePatientDto) {


          let data = await this.patientService.addplandate(plandate);

         return data['plandate'];


    }


    
  @Post("/deleteplandate")
  async  deleteplandate(@Body() value: any) {
  
    var pid  =  value.id    
    var plandate =  value.pid

      let data = await this.patientService.removedeletediteplan(pid , plandate);

       return data['plandate'];


  }


  @Post("/addMeal")
  async  addMeal(@Body() value: any) {
  
    let id = value.id;
    let mealplan = value.mealplan;
    let plandate = value.plandate;

    let data = await this.patientService.addMeal(id , mealplan , plandate);


 var d = data['plandate'].find(node=>{

  return node._id ==   plandate 

 });



      return d ;


  }


  @Post("/addguideline")
  async  addGuide(@Body() value: any) {
  
    let id = value.id;
    let guideline = value.guideline;
    let plandate = value.plandate;

    let data = await this.patientService.addGuideLine(id , guideline , plandate);
  
    
    console.log(data)


    var finalData = data['plandate'].find(node=>{

      return node._id ==   plandate 

    });

  
      return finalData ;


  }




  @Post("/deletelan")
  async  deletelan(@Body() value: any) {
  
    let pid = value.pid;
    let itemId = value.itemId;
    let plandate =  value.plandate;

    let data = await this.patientService.deleteMeal(pid , itemId , plandate);
  
    
    console.log(data)


    var finalData = data['plandate'].find(node=>{

      return node._id ==   plandate 

    });

  
      return finalData ;


  }



  
  @Post("/deleteguide")
  async  deleteguide(@Body() value: any) {  
    let pid = value.pid;
    let itemId = value.itemId;
    let plandate =  value.plandate;
    let data = await this.patientService.deleteGuide(pid , itemId , plandate);
    var finalData = data['plandate'].find(node=>{
      return node._id ==   plandate 
    });  
    return finalData ;
  }



@Post("/updateplan")
async  updateplan(@Body() value: any) {  
  
  let id = value.pid;
  let guideline = value.guideline;
  let plandate = value.plandate;
  let updateGuideID = value._id;

  let type = value.type;
  let time = value.time;
  let mealhtml = value.mealhtml;


  let data = await this.patientService.updateMeal(id , guideline , plandate, updateGuideID , type , time , mealhtml  );
  var finalData = data['plandate'].find(node=>{
    return node._id ==   plandate 
  });  
  return finalData ;




}


@Post("/updateGuide")
async  updateGuide(@Body() value: any) {  
  
  let id  = value.id;
  let guideline = value.guideline;
  let plandate = value.plandate;
  let updateGuideID = value.updateGuideID;

  console.log(value)
  console.log( id , guideline , plandate, updateGuideID )

  let data = await this.patientService.updateGuide(id , guideline , plandate, updateGuideID   );

  console.log(data)
  var finalData = data['plandate'].find(node=>{
    return node._id ==   plandate 
  });  
  return finalData ;

}




@Post("/addpatient")
async  addpatient(@Body() value: any) {    
  let patientData =   {
    name: value.name,
    email: value.email,
    complaints: value.complaints,
    age: value.age,
    height: value.height,
    phone: value.phone,
    weight: value.weight
}
  let data = await this.patientService.addPatient( patientData  ); 
  return data ;
}


@Post("/updatestatus")
async  updatestatus(@Body() value: any) {    
  let patientData =  {
    "id": value.id,
    "did": value.did,
    "status": value.status
  }


  let data = await this.patientService.updateStatus( patientData  ); 
  return data ;
}












  



  @Get()
  findAll() {
    return this.patientService.findAll();
  }

 
 
  @Delete(':id')
  remove(@Param('id') id: string) {
    // return this.patientService.remove(+id);
  }
}
