  class Accomodation {
	  

  // constructor
  constructor() {
	this._id;
	this.type;
    this.beds;
    this.maximumPeopleCount;
    this.complementAdresse;
    this.equipments = [];
    this.pictures = [];
    this.requirements = [];
    this.spaces = [];
    this._userId;
    this.actif = false;
    this.currentStep = 1;
  }

}

export default Accomodation;
