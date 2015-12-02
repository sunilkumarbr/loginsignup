var outFinal=function(x){
		if(x.value==='')
	 	{
	 		x.parentElement.style.color='white';
			x.style.height="2px";
			x.style.width="210px";
			x.style.borderBottom="2px solid white";
		}
	};


	var inputHeightFinal=function(y){
			if (parseInt(y.style.height) <= 30 || parseInt(y.style.width)<=210) 
			{
				h=parseInt(y.style.height);
				w=parseInt(y.style.width);
				// console.log("in "+h);
				h+=1;
				w+=2;
				if (parseInt(y.style.height) <= 30) 
				y.style.height=h+"px";
				y.style.width=w+"px";
				setTimeout(function(){
					inputHeightFinal(y);}, 5);
			}
	};

var focusFinal=function(y){
		y.parentElement.style.color='#00BFA5';
		y.style.height="0px";
		y.style.width="0px";
		y.style.borderBottom="2.5px solid #26A69A";
		inputHeightFinal(y);
	};


var form=document.getElementById('form');
	
		uname=form.username;
		password=form.password;
		
	setTimeout(function(){
		uname.focus();},500);


   var name,pass;
   submit.onclick=function(){
        name=uname.value;
        pass=password.value;

        if(name===''|| pass===''||name===' '|| pass===' '){
        	if(name===''||name===' ')
        	uname.focus();
        	else if(!name.match(/^[a-zA-Z][a-zA-Z0-9 ]*$/)){
        	uname.focus();
        	uname.style.borderBottom="2.5px solid red";
        	}
        	else{
        	uname.style.borderBottom="2.5px solid #26A69A";
        	password.focus();
        	}
        	return false;
        }
    };