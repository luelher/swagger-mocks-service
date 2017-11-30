let express = require('express');
let Swagmock = require('swagmock');
let request = require('request');
let utf8 = require('utf8');
let app = express();

const PORT = process.env.PORT || 3000
const INTEROPERABILITY_SERVER_URI = process.env.INTEROPERABILITY_SERVER_URI || 'http://devel.interoperabilidad.digital.gob.cl'
const RESPONSES_CODES = {'get': 200, 'post': 201, 'delete': 200, 'put': 200}

app.get('/', function (req, res) {
  res.send("Swagger Mock Service for Interoperability platform");
})

app.all('/:institution/:service/:version/*', function (req, res) {

  let resourcePath = '/'+req.params[0];
  let institution = req.params.institution;
  let service = req.params.service;
  let version = req.params.version;
  let swaggerPath = INTEROPERABILITY_SERVER_URI+'/organizations/'+institution+'/services/'+service+'/versions/'+version+'.json';
  swaggerPath = utf8.encode(swaggerPath);
  let mockgen = Swagmock(swaggerPath);
  var method = req.method.toLowerCase();
  // console.log(method+" "+resourcePath);

  mockgen.responses({
    path: resourcePath
  }, function (error, mock) {

    if(error == null){
      let url_splited = resourcePath.split('/');
      let last_item = url_splited.pop();
      let url_have_id = !isNaN(last_item)
      let resource;
      let keys = Object.keys(mock);
      let key_resourse;
      if(url_have_id){
        resource = '/'+url_splited.pop()+'/';
      }else{
        resource = '/'+last_item;
      }

      key_resourse = keys.find(function(item){return item.includes(resource)});
      let str_error = "Response schema for this resource is not defined in swagger file";

      // debugger;
      if(typeof key_resourse == 'undefined' && keys.indexOf(this.method) > -1){
        if(typeof mock[this.method] == 'undefined'){
          res.status(404).send({error: str_error});
        }else if(typeof mock[this.method]["responses"] == 'undefined'){
          res.status(404).send({error: str_error});
        }else if (typeof mock[this.method]["responses"][this.code] == 'undefined'){
          res.status(404).send({error: str_error});
        }else{
          res.send(mock[this.method]["responses"][this.code]);
        } 
      }else{
        if(typeof mock[key_resourse] == 'undefined'){
          res.status(404).send({error: str_error});
        }else if(typeof mock[key_resourse][this.method] == 'undefined'){
          res.status(404).send({error: str_error});
        }else if(typeof mock[key_resourse][this.method]["responses"] == 'undefined'){
          res.status(404).send({error: str_error});
        }else if (typeof mock[key_resourse][this.method]["responses"][this.code] == 'undefined'){
          res.status(404).send({error: str_error});
        }else{
          res.send(mock[key_resourse][this.method]["responses"][this.code]);
        } 
      }

    }else{
      res.status(500).send({error: error['message']});
    }
    
  }.bind({method: method, code: RESPONSES_CODES[method]}));
  
});

module.exports = app.listen(PORT, function () {
  console.log('listening on port '+PORT+'!');
});
