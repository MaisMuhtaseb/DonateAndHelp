import React from 'react'
import $ from 'jquery'
import axios from 'axios'

class Profile_Donor extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
     image:"",
     name:'',
     contactNum:'',
     description:'',
     address:'',
     user:'',
     email:''

   }
   this.onChange=this.onChange.bind(this);
   this.uploadPhoto=this.uploadPhoto.bind(this);

 }

 onChange(e){
  this.setState({
    [e.target.name]:e.target.value
  })
}

submit(name,contactNum,description,address){
  axios.post('/Profile_Donor', {
      // image: this.state.image,
      name: this.state.name,
      contactNum: this.state.contactNum,
      description: this.state.description,
      address: this.state.address
    })
  .then(response => {
    console.log('profile has been updated')
        // should go to the home page from here
      }).catch(error => {
        alert('wrong in profile update')
      })
    }

  uploadPhoto(photo){  // post the photo and get the photo in the same time
   var x=this
   var file = photo.target.files[0]
   var fileReader = new FileReader();
   fileReader.readAsDataURL(file);
   fileReader.onload = function(e) {
    axios.post('/photoDonor', {image: e.target.result})
    .then(res => {
    	console.log('hello Donor image', res)
             x.componentDidMount() // here i'm getting the photo from database
           })
    .catch(function (error) {
      console.log(error);
    });
  
  }

}

componentDidMount() { // this is the initial
  axios.get('/getImageDonor')
  .then(response => {
    this.fetchDonorData()
    console.log('jackel', response['data'])
    const posts = response['data']
     this.setState({  //changing the state to the new image that i fetch it from database
       image:posts.image
     })


   })
  .catch(function (error) {
   console.log(error);
 });
}

fetchDonorData(){
  var x = this
axios.get("/fetchDonorData").then(function(res){
  console.log("alo data is here",res.data)
  var user = res.data.username
  var email = res.data.email
  x.setState({
    user:user,
    email:email

  })
}).catch(function(err){
 console.log("error",err)
})
}

render () {
  return (
    <div>
    <span><img src = {this.state.image || "https://orig00.deviantart.net/3cc1/f/2012/247/1/b/meelo_facebook_default_profile_picture_by_redjanuary-d5dmoxd.jpg"} /> </span>
    <form> 
    <label className="btn  btn-primary" style={{color:"black"}}>
    <input type = "file" name="image" id="photo" style={{display:"none"}} onChange={this.uploadPhoto}/>
    Choose file
    </label>


    </form>

    
   
      <h1>{this.state.user}</h1>
      <h1>{this.state.email} </h1>
<br />
    <br />
   
 

    
    
  

    <label>Name:</label>
    <input type="text" name="name" onChange={this.onChange}/>
    <br/>
    <label>contactNum:</label>
    <input type="text" name="contactNum" onChange={this.onChange}/>
    <br/>
    <label>description:</label>
    <input type="text" name="description" onChange={this.onChange}/>
    <br/>
    <label>address:</label>
    <input type="text" name="address" onChange={this.onChange}/>
    <br/>
    
    <button onClick={()=>this.submit(this.state.name,this.state.contactNum,
      this.state.description,this.state.address)}>Submit</button>
    </div>
    )
}
}


export default Profile_Donor