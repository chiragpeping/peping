import { Inject, Injectable } from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { Patient } from './entities/patient.entity';
 
import { Model } from 'mongoose';
import { json } from 'stream/consumers';


@Injectable()
export class PatientService {


  constructor(@Inject('PATIENT_MODEL') private readonly patientModel: Model<Patient>) {}

  
  create(createPatientDto: CreatePatientDto) {
    const createdCat = this.patientModel.create(createPatientDto);
    return createdCat;
  }

  findAll() {
    return this.patientModel.find().exec();
  }



  async addplandate( plandate ){
    let  id = plandate.id;
    let  plandateval =  plandate.plandate  ;
    return await this.patientModel.findByIdAndUpdate(id, { $push: { plandate: plandateval } } ,  {new: true}).exec();

  
 
    

  }


async addMeal( id , mealplan , plandate ){ 

 return await  this.patientModel.findOneAndUpdate({ _id: id, "plandate._id": plandate }, { "$push": { 'plandate.$.mealplan': mealplan } }, {new: true}).exec()



}


async addGuideLine( id , guideline , plandate ){ 

  return await  this.patientModel.findOneAndUpdate({ _id: id, "plandate._id": plandate }, { "$push": { 'plandate.$.guideline': { guidehtml: guideline } } } , {new: true} ).exec()
 
 
 
 }


 async deleteMeal( pid , itemId , plandate ){ 

  return await  this.patientModel.findOneAndUpdate({ _id: pid, 'plandate._id': plandate }, { $pull: { 'plandate.$.mealplan': { _id: itemId } } }, { new:true }).exec()
 
 
 
 }

 async deleteGuide( pid , itemId , plandate ){ 


  return await  this.patientModel.findOneAndUpdate({ _id: pid, 'plandate._id': plandate }, { $pull: { 'plandate.$.guideline': { _id: itemId } } }, { new: true }).exec()
 
 
 
 }



 async  updateMeal( id , guideline , plandate, updateGuideID , type , time , mealhtml  ){ 


  return await  this.patientModel.findOneAndUpdate({ _id: id, "plandate._id": plandate }, {
    "$set": {
        'plandate.$.mealplan.$[outer].mealhtml': mealhtml,
        'plandate.$.mealplan.$[outer].time': time,
        'plandate.$.mealplan.$[outer].type': type,

    }
}, {
    arrayFilters: [
        { "outer._id": updateGuideID }
    ],
    new : true
}  ).exec()
 
 
 
 }


 

 async  updateGuide(  id , guideline , plandate, updateGuideID   ){ 


  console.log("==")
  console.log( id , guideline , plandate, updateGuideID )

  return await  this.patientModel.findOneAndUpdate({ _id: id, "plandate._id": plandate }, 
  { "$set": { 'plandate.$.guideline.$[outer].guidehtml': guideline } }, {

    arrayFilters: [
        { "outer._id": updateGuideID }
    ],
    new : true,
}).exec()
 
 
 
 }


 async  addPatient( obj  ){ 


  
 
  return await  this.patientModel.create(obj)
 
 
 
 }


 async  updateStatus( obj  ){ 


 
  
 
  return await  this.patientModel.findOneAndUpdate({ _id: obj.id, "plandate._id": obj.did }, { $set: { "plandate.$.public": obj.status } } ,  {new: true}).exec()
 
 
 
 }





  removedeletediteplan(pid , plandate) {
    
   return this.patientModel.findOneAndUpdate({ _id: pid }, { $pull: { plandate: { _id: plandate } } }, {new: true}).exec() 
  }
}
