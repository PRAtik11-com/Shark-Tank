let productdata = []
let mainSection = document.getElementById("data-list-wrapper");
function pro(){
    fetch("http://localhost:3000/pitches").
    then((res) => {
        return res.json()
        // console.log(res.json());
        
    }).then((data) => {
        productdata = data
        return card(data)
        console.log(productdata);
        
        // console.log(card(data));
        
    }).catch((err) => {
        console.log(err);
    });
}
function card(data){
    let choose = data.map((el)=> {
       
        return titles(el.id,el.image,el.title,el.founder,el.category,el.price) 
    })
    mainSection.innerHTML = choose.join()
}

function titles(id,img,title,founder,category,price){
    return `
    <div class="card" data-id="${id}">
                <div class="card-img">
                <a href="cart.html?title=${encodeURIComponent(title)}&image=${encodeURIComponent(img)}&founder=${encodeURIComponent(founder)}&category=${encodeURIComponent(category)}&price=${encodeURIComponent(price)}" id="just">
                  <img src="${img}" alt="pitch">
                </a>  
                </div>
              
                <div class="card-body">
                  <h4 class="card-title">${title}</h4>
                  <p class="card-founder">${founder}</p>
                  <p class="card-category">${category}</p>
                  <p class="card-price">${price}</p>
                  <a href="#" class="card-link" data-id="${id}">Edit</a>
                  <button class="card-button" data-id="${id}">Delete</button>
                </div>
              </div>
    `
}
pro()


// pitch
let pitchTitleInput = document.getElementById("pitch-title");
let pitchImageInput = document.getElementById("pitch-image");
let pitchCategoryInput = document.getElementById("pitch-category");
let pitchfounderInput = document.getElementById("pitch-founder");
let pitchPriceInput = document.getElementById("pitch-price");
let pitchCreateBtn = document.getElementById("add-pitch");

pitchCreateBtn.addEventListener("click",cars)
function cars() {
        let cast = {
            title : pitchTitleInput.value,
            image : pitchImageInput.value,
            category : pitchCategoryInput.value,
            founder : pitchfounderInput.value,
            price : pitchPriceInput.value
        }
        fetch("http://localhost:3000/pitches", {
            method : 'POST',
            headers: {
                'Content-Type' : "application/json",
            },
            body : JSON.stringify(cast)
        }).then((response) => response.json()).
        then(data => console.log("Success",data)).
        catch((err) => console.log("Error:",err))           
}


document.addEventListener("click", (el) => {
    if (el.target.classList.contains("card-button")) {
        alert("Are you sure Do you want to delete this method")
        deleteProduct(el.target.dataset.id)
    }
})

function deleteProduct(id){
   fetch(`http://localhost:3000/pitches/${id}`, {
    method : "DELETE"
    })
}
// Update pitch
let updatePitchIdInput = document.getElementById("update-pitch-id");
let updatePitchTitleInput = document.getElementById("update-pitch-title");
let updatePitchImageInput = document.getElementById("update-pitch-image");
let updatePitchfounderInput = document.getElementById("update-pitch-founder");
let updatePitchCategoryInput = document.getElementById("update-pitch-category");
let updatePitchPriceInput = document.getElementById("update-pitch-price");
let updatePitchBtn = document.getElementById("update-pitch");


//Update price
let updatePricePitchId = document.getElementById("update-price-pitch-id");
let updatePricePitchPrice = document.getElementById("update-price-pitch-price");
let updatePricePitchPriceButton = document.getElementById("update-price-pitch");

//update Edit js method
document.addEventListener("click", (el) => {
    if(el.target.classList.contains("card-link")){
        updateProject(el.target.dataset.id)
        updatePrice(el.target.dataset.id)
        console.log(el.target.dataset.id);
        // alert("hello")  
    }
})
function noName(data){
    console.log(updatePitchIdInput.value = data.id, updatePitchTitleInput.value = data.title,updatePitchImageInput.value = data.image, updatePitchfounderInput.value = data.founder, 
        updatePitchCategoryInput.value = data.category, updatePitchPriceInput.value = data.price);
}
function updateProject(id){
    fetch(`http://localhost:3000/pitches/${id}`)
    .then((res) => {
        // console.log(res.json());
        return res.json()  
    }).then(data => { noName(data)}).
    catch((err) => console.log("Error",err))
}

updatePitchBtn.addEventListener("click", () => {
    let EditObj = {
        id : updatePitchIdInput.value,
        title : updatePitchTitleInput.value,
        image : updatePitchImageInput.value,
        founder : updatePitchfounderInput.value,
        category : updatePitchCategoryInput.value,
        price : updatePitchPriceInput.value
    }
    console.log(EditObj);
    fetch(`http://localhost:3000/pitches/${EditObj.id}`, {
        method : 'PUT',
            headers: {
                'Content-Type' : "application/json",
            },
            body : JSON.stringify(EditObj)     
    }) 
    .then((response) => response.json()).
    then(data => console.log("Success",data)).
    catch((err) => console.log("Error:",err))   
})

//update price with help of id
function justfine(data) {
    console.log(updatePricePitchId.value = data.id, updatePricePitchPrice.value = data.price);   
}

function updatePrice(id) {
    fetch(`http://localhost:3000/pitches/${id}`)
    .then((res) => {
        // console.log(res.json());
        return res.json()  
    }).then(data => { justfine(data)}).
    catch((err) => console.log("Error",err))
}

updatePricePitchPriceButton.addEventListener("click",() => {
    let PriceObj = {
        id : updatePricePitchId.value,
        price : updatePricePitchPrice.value
    }
    fetch(`http://localhost:3000/pitches/${PriceObj.id}`, {
        method : 'PATCH',
            headers: {
                'Content-Type' : "application/json",
            },
            body : JSON.stringify(PriceObj)
    }).then((response) => response.json()).
    then(data => console.log("Success",data)).
    catch((err) => console.log("Error:",err))   
})





//sort and filter
let sortAtoZBtn = document.getElementById("sort-low-to-high");
let sortZtoABtn = document.getElementById("sort-high-to-low");
let filterFood = document.getElementById("filter-Food");
let filterElectronics = document.getElementById("filter-Electronics");
let filterPersonalCare = document.getElementById("filter-Personal-Care");


//sort based on low to high
sortAtoZBtn.addEventListener("click", () => {
    // alert("hello")
    // let sortLow = productdata.filter((el) => {
    //     console.log(el.price);
    //     return el.price
    // })
    let setData = productdata.sort((a,b) => {
        return a.price - b.price
    })
    card(setData); 
})

//sort based on high to low
sortZtoABtn.addEventListener("click", () => {
    // alert("hello")
    let highDataset = productdata.sort((a,b) => {
        return b.price - a.price
    })
    card(highDataset)
}) 

//filter method
filterFood.addEventListener("click", () => {
   let filters = productdata.filter((el) => {
    return el.category === "Food"
   })
   console.log(filters);
   
   card(filters)
})
filterElectronics.addEventListener("click", () => {
    let filters = productdata.filter((el) => {
     return el.category === "Electronics"
    })
    console.log(filters);
    
    card(filters)
 })
 filterPersonalCare.addEventListener("click", () => {
    let filters = productdata.filter((el) => {
     return el.category === "Personal Care"
    })
    console.log(filters);
    
    card(filters)
 })

//Search by title/founder

let searchBySelect = document.getElementById("search-by-select");
let searchByInput = document.getElementById("search-by-input");
let searchByButton = document.getElementById("search-by-button");

// Problem 1. List of pitches on page load [3}


