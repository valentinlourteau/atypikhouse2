import Base64 from 'base-64';

class DecryptToken {

  constructor(token) {
    const tokenBody = token.split('.')[1];
    const decodedTokenBody = Base64.decode(tokenBody);
    this.datas = JSON.parse(decodedTokenBody);
  }

  get data() {
    return this.datas;
  }

  set data(value) {
    this.datas = value;
  }

}

export default DecryptToken;