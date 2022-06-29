function titleCase(str) {
    var splitStr = str.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
        // You do not need to check if i is larger than splitStr length, as your for does that for you
        // Assign it back to the array
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
    }
    // Directly return the joined string
    return splitStr.join(' '); 
}
function inputMethod(name) {
    var inputName = document.getElementById(name).value;
    if(name == "name" || name == "profile"){
        document.getElementById('replace-'+name).innerText = titleCase(inputName);
    }else{
        document.getElementById('replace-'+name).innerText = inputName;
    }		
}
function inputSocial(){
    var inputName = document.getElementById('social').value;
    var html = '';
    if(inputName != ''){
        html += '<a href="'+inputName+'" target="_blank" style="display:inline-table;width:20px;"><img style="width:20px; display:inline-table;" src="http://agnext.in/images/socialiconblackb.png"></a>';
    }
    
    document.getElementById('mob_area').innerHTML = html;
    
}
function showPreview(event){		
    if(event.target.files.length > 0){
        var data = new FormData();
        data.append("image_file", event.target.files[0]);
        // data.append("image_url", "url_to_image");

        // var xhr = new XMLHttpRequest();
        // xhr.withCredentials = true;

        // xhr.addEventListener("readystatechange", function() {
        //     if(this.readyState === 4) {
        //         console.log(this.responseText);
        //     }
        // });

        // xhr.open("POST", "https://api.remove.bg/v1.0");
        // xhr.setRequestHeader("X-Api-Key", "cHAPmXFUNCYG4QXwS4MYNed6");
        // xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
        // xhr.setRequestHeader('Access-Control-Allow-Credentials', true);

        // xhr.send(data);

            const url = "https://api.remove.bg/v1.0" ;
            
            fetch(url, {
                method : "POST",
                mode: 'cors',
                headers: { 'Content-Type': 'multipart/form-data', 'X-Api-Key': 'cHAPmXFUNCYG4QXwS4MYNed6'  },
            })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(response.error)
                }
                return response.json();
            })
            .then(data => {
                console.log('log',data.messages);
            })
            .catch(function(error) {
                console.log('error',error);
            });


        // var selectedFile = event.target.files[0];
        //     var reader = new FileReader();

        //     var imgtag = document.getElementById("profile-image");
        //     imgtag.title = selectedFile.name;

        //     reader.onload = function(event) {
        //         imgtag.src = event.target.result;
        //     };

        //     reader.readAsDataURL(selectedFile);
        // }
    }
}
function copyToClipboard() {
    document.getElementById('copy').style.display='unset';
    var r = document.createRange();
    r.selectNode(document.getElementById('copyable'));
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(r);
    document.execCommand('copy');
    window.getSelection().removeAllRanges();
    hideLoadingDiv()
}
function hideLoadingDiv() {
setTimeout(function(){
    document.getElementById('copy').style.display='none';
},3000)
}

function removingBackground(){
    
}