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
        if(name == "profile_url"){
            var preview = document.getElementById("profile-image");
            preview.src = inputName;
        }else{
            document.getElementById('replace-'+name).innerText = inputName;
        }        
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

function dataURLtoFile(dataurl, filename) {
 
    var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), 
        n = bstr.length, 
        u8arr = new Uint8Array(n);
        
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    
    return new File([u8arr], filename, {type:mime});
}

async function run() {
    var base64img = document.getElementById("cropped").src;
    
    
    //Usage example:
    var file = dataURLtoFile(base64img,'profile.png');
    console.log(file);
    var myHeaders = new Headers();
    myHeaders.append("Rm-Token", "62bd94a53c89f9.65018857");
    
    var formdata = new FormData();
    formdata.append("image_file", file , "shutterstock_648907024.png");
    formdata.append("image_url", "url_to_image");
    formdata.append("crop", 0);
    
    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: formdata,
    redirect: 'follow'
    };

    fetch("https://api.removal.ai/3.0/remove", requestOptions)
    .then(response => response.text())
    .then(function(result){
        var data=JSON.parse(result);
        if(data.status == 200){
            let url = data.preview_demo;
            addWatermark(url);
            
            console.log(data.preview_demo);
        }
        
    })
    .catch(error => console.log('error', error));
}

function addWatermark(url) {
    const imageUrl = "https://quickchart.io/watermark?mainImageUrl="+url+"&markImageUrl=https://lovely-halva-fbff3f.netlify.app/image/Band_only.png&markRatio=0&imageWidth=88&imageHeight=100&markWidth=90&position=bottom&margin=0";
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      fetch(imageUrl, requestOptions)
        .then(response => response.blob())
        .then(function(result){
            const reader = new FileReader();
            reader.readAsDataURL(result);
            reader.onloadend = () => {
                const base64data = reader.result;
                const img = document.createElement("img");
                img.src = base64data;
                img.setAttribute ("crossorigin", "anonymous");
                document.body.appendChild((img));
            }
        })
        .catch(error => console.log('error', error));
}

  function convasToImg(canvas) {
    //Create a new image object, which can be understood as dom
    var image = new Image();
    // canvas.toDataURL  It returns a string of Base64 encoded URLs
    //Specified format png
    image.src = canvas.toDataURL("image/png");
    image.className = 'watermarked';
    return image;
  }
let  cropper = '';
function showPreviewCanvas(event){		
    if(event.target.files.length > 0){
        let results = document.querySelector('.result'),
        img_result = document.querySelector('.img-result'),
        img_w = document.querySelector('.img-w'),
        img_h = document.querySelector('.img-h'),
        options = document.querySelector('.options'),  
        save = document.querySelector('.save'),      
        cropped = document.querySelector('.cropped'),
        dwn = document.querySelector('.download'),
        removebg = '',
        upload = document.querySelector('#file-input');
                // start file reader
        const reader = new FileReader();
        reader.onload = (e)=> {
        if(e.target.result){
                removebg = e.target.result;
                // create new image
                let img = document.createElement('img');
                img.id = 'image';
                img.src = removebg;
                // clean result before
                results.innerHTML = '';
                // append new image
                results.appendChild(img);
                // show save btn and options
                save.classList.remove('hide');
                options.classList.remove('hide');
                    // init cropper
                cropper = new Cropper(img, {
                    aspectRatio: 1,
                    viewMode: 1,
                    cropBoxResizable: false,
                    ready: function () {
                      croppable = true;
                    },

                }
                );
   
        }
        };
        reader.readAsDataURL(event.target.files[0]);

    }
}

function showPreview(event){		
    if(event.target.files.length > 0){
        // var selectedFile = event.target.files[0];
            // var reader = new FileReader();

        //     var imgtag = document.getElementById("profile-image");
        //     imgtag.title = selectedFile.name;

        //     reader.onload = function(event) {
        //         imgtag.src = dataURItoBlob(event.target.result);
        //     };

        //     
        // // }
        var src = URL.createObjectURL(event.target.files[0]);
        var preview = document.getElementById("profile-image");
        preview.src = src;
        // reader.readAsDataURL(selectedFile);
        // preview.style.display = "block";
    }
}
function copyToClipboard(event) {

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
function getRoundedCanvas(sourceCanvas) {
    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');
    var width = sourceCanvas.width;
    var height = sourceCanvas.height;

    canvas.width = width;
    canvas.height = height;
    context.imageSmoothingEnabled = true;
    context.drawImage(sourceCanvas, 0, 0, width, height);
    context.globalCompositeOperation = 'destination-in';
    context.beginPath();
    context.fillRect(0, 0, 88, 88);
    context.fillStyle = "#FFF";
    context.arc(width / 2, height / 2, Math.min(width, height) / 2, 0, 2 * Math.PI, true);
    context.fill();
    return canvas;
}

// save on click
function saveImage(event){
    event.preventDefault();
    let results = document.querySelector('.result'),
  img_result = document.querySelector('.img-result'),
  img_w = document.querySelector('.img-w'),
  img_h = document.querySelector('.img-h'),
  options = document.querySelector('.options'),  
  save = document.querySelector('.save'),      
  cropped = document.querySelector('.cropped'),
  dwn = document.querySelector('.download'),
  upload = document.querySelector('#file-input');
  var roundedCanvas;

    let croppedCanvas = cropper.getCroppedCanvas({
        fillColor: '#fff',
        width:88, height:88 // input value
      });
    // Round
    roundedCanvas = getRoundedCanvas(croppedCanvas);
      // remove hide class of img
    //   cropped.classList.remove('hide');
      img_result.classList.remove('hide');
      // show image cropped
      cropped.src = roundedCanvas.toDataURL();
      run();
  };