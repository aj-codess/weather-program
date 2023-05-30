const input=document.querySelector("#sh");
const s_buttom=document.querySelector(".search_but");

const input_display=document.querySelector("#stateDisplay");
const icon=document.querySelector(".icon_dis");
const temp_cel=document.querySelector(".temp_dis");
const brief_dis=document.querySelector(".brief_display");
const date_dis=document.querySelector(".date_display");
const temp_fa=document.querySelector(".tempF");
const humidity=document.querySelector(".hum");
const feelLike=document.querySelector(".feel");

let prompt_box=document.querySelector(".prompt");
let main_content=document.querySelector(".main");
let flow_but=document.querySelector(".flow");
prompt_box.style.display="none";
main_content.style.display="block";
flow_but.addEventListener("click",()=>{
    if(prompt_box.style.display=="none" && main_content.style.display=="block"){
        prompt_box.style.display="block";
        main_content.style.display="none";
    }else{
        prompt_box.style.display="none";
        main_content.style.display="block";
    }
});

let back_but=document.querySelector(".back");
back_but.addEventListener("click",()=>{
    prompt_box.style.display="none";
    main_content.style.display="block";
});

let hist=document.querySelector(".his");
let hist_content=document.querySelector(".list");
hist_content.style.display="none";
hist.addEventListener("click",()=>{
    prompt_box.style.display="none";
    main_content.style.display="none";
    hist_content.style.display="block"
});



// main 



let storeQuery;
let key_rf=new Array();


// getting and manipulation from Local Dirrectory Management System (LDMS) snippet
//querying and initializement of false
let div=document.querySelectorAll("#con");
let ret_fun=()=>{
    let key_ref=localStorage.getItem("key_ref");
    let ref=JSON.parse(key_ref);
    let getLast=ref[ref.length -1];

    let getFrom_dataBase=localStorage.getItem(`${getLast}`);
    let dataBase=JSON.parse(getFrom_dataBase);

    input_display.innerText=dataBase.location.name;
    icon.innerHTML=`<img class="icon_img" src=${dataBase.current.condition.icon}>`;
    temp_cel.innerText=dataBase.current.temp_c;
    brief_dis.innerText=dataBase.current.condition.text;
    date_dis.innerText=dataBase.current.last_updated;
    temp_fa.innerText=dataBase.current.temp_f;
    humidity.innerText=dataBase.current.humidity;
    feelLike.innerText=dataBase.current.feelslike_c;
}
// end of LDMS

// functionality trigger snippet
const trigger_store=()=>{
    storeQuery=input.value;
    executeAPI();
}


// button click and enter key events
s_buttom.addEventListener("click",()=>{
    trigger_store();
});

document.addEventListener("keyup",(key)=>{
    key.keyCode===13?trigger_store():null;
});
//end of event

//storage checks system snippet (local dirrectory management checks (LDMS checks))

let late_run=(data_obj,ref)=>{
    let checks=(ret,ref)=>{
        if(ref!==localStorage.getItem(`${ret.location.name}`)){
            localStorage.setItem(`${ref}`,JSON.stringify(ret));
        }else{
            localStorage.setItem(`${ref}`,JSON.stringify(ret))
        };
        key_rf.push(ref);
        localStorage.setItem("key_ref",JSON.stringify(key_rf));
        ret_fun();
    };
    checks(data_obj,ref)
};

//storage checks system snippet


// live API
let executeAPI=()=>{

const url = `https://weatherapi-com.p.rapidapi.com/current.json?q=${storeQuery}`;
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '1bf0b2c797msh145cb104462d1eep1edddcjsn85821727c7e0',
		'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
	}
};

let getData=async()=>{
    const response = await fetch(url, options);
    const result = await response.json();
    return result;
};

getData().then((data)=>{
    let reference=data.location.name;
    late_run(data,reference);
}).catch((error)=>{
    console.log(error)
});

};