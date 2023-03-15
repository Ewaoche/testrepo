
const Participant = require('../../models/Participant');

class ParticipantRepository {

 
    async getParticipantByEmail(email){
       
        const existingParticipant = await Participant.findOne({ email: email });
        
        return existingParticipant;
    };
    
 
    async createParticipant(payload){
       
        const participant = await Participant.create(payload);
        
        return participant;
    };
    
    async getAllParticipant(){
       
        const participants = await Participant.find();
        
        return participants;
    };


    async getParticipantById(Id){
       
        const participant = await Participant.findById(Id);
        
        return participant;
    };
    
 
    
    
}


module.exports = ParticipantRepository;