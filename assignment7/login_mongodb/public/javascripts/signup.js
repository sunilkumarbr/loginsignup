var form = document.getElementById('form'),

    uname = form.name,
    email = form.email,
    password = form.password,
    submit = form.submit;

setTimeout(function() {
    uname.focus();
}, 500);

var outFinal = function(x) {
    if (x.value === '') {
        x.parentElement.style.color = 'white';
        x.style.height = "2px";
        x.style.width = "210px";
        x.style.borderBottom = "2px solid white";
    }
};


var inputHeightFinal = function(y) {
    if (parseInt(y.style.height) <= 30 || parseInt(y.style.width) <= 210) {
        h = parseInt(y.style.height);
        w = parseInt(y.style.width);
        // console.log("in "+h);
        h += 1;
        w += 2;
        if (parseInt(y.style.height) <= 30)
            y.style.height = h + "px";
        y.style.width = w + "px";
        setTimeout(function() {
            inputHeightFinal(y);
        }, 5);
    }
};



var focusFinal = function(y) {
    y.parentElement.style.color = '#00BFA5';
    y.style.height = "0px";
    y.style.width = "0px";
    y.style.borderBottom = "2.5px solid #26A69A";
    inputHeightFinal(y);
};

submit.onclick = function() {
    name = uname.value;
    pass = password.value;
    e = email.value;

    if (name === '' || pass === '' || e === '' || name === ' ' || e === ' ' || pass === ' ') {
        if (name === '' || name === ' ')
            uname.focus();
        else if (!name.match(/^[a-zA-Z][a-zA-Z0-9 ]*$/)) {
            uname.focus();
            uname.style.borderBottom = "2.5px solid red";
        } else if (e === '' || e === ' ') {
            uname.style.borderBottom = "2.5px solid #26A69A";
            email.focus();
        } else if (!e.match(/^[a-zA-Z0-9_.+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/)) {
            email.focus();
            email.style.borderBottom = "2.5px solid red";
        } else {
            email.style.borderBottom = "2.5px solid #26A69A";
            password.focus();
        }

        return false;
    }
};
