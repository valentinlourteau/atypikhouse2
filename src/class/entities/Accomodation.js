  class Accomodation {
	  

  // constructor
  constructor(_id, type, beds, maximumPeopleCount, complementAdresse, equipments, pictures) {
	this._id = _id;
	this.type = type;
    this.beds = beds;
    this.maximumPeopleCount = maximumPeopleCount;
    this.complementAdresse = complementAdresse;
    this.equipments = [];
    this.pictures = [];
  }

}

export default Accomodation;
