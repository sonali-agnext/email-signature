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
// watermark(['https://file.removal.ai/preview/716ff022-d983-4f2c-b38d-0b4f50dd0d3c_shutterstock_648907024.png', 'image/download.png'])
//   .image(watermark.image.upperLeft(0.5))
//   .then(function (img) {
//     document.getElementById('upper-left').appendChild(img);
//   });
async function run() {
    const imgUrl =
      "https://file.removal.ai/preview/716ff022-d983-4f2c-b38d-0b4f50dd0d3c_shutterstock_648907024.png";
    //1. Convert the image path to canvas
    const tempCanvas = await imgToCanvas(imgUrl);
    //2. Add watermark to canvas
    const canvas = addWatermark(tempCanvas, "https://agnext.com/wp-content/uploads/2021/03/cropped-logo-grad.png");
    //3. Convert canvas to img
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    // const img =       
    //   fetch("https://quickchart.io/watermark?mainImageUrl=https://file.removal.ai/preview/55b0a2fb-a0e8-49bd-ac60-2fd962bb62b4_shutterstock_648907024.png&markImageUrl=https://agnext.com/wp-content/uploads/2021/03/cropped-logo-grad.png&markRatio=0.25", requestOptions)
    //     .then(response => response.text())
    //     .then(function(result){
    //         console.log(result);
    //     })
    //     .catch(error => console.log('error', error));;
        const imageUrl = "https://quickchart.io/watermark?mainImageUrl=https://file.removal.ai/preview/55b0a2fb-a0e8-49bd-ac60-2fd962bb62b4_shutterstock_648907024.png&markImageUrl=https://agnext.com/wp-content/uploads/2021/03/cropped-logo-grad.png&markRatio=0.25";

        (async () => {
          const response = await fetch(imageUrl)
          const imageBlob = await response.blob()
          const reader = new FileReader();
          reader.readAsDataURL(imageBlob);
          reader.onloadend = () => {
            const base64data = reader.result;
            const img = document.createElement("img");
            img.src = base64data;
            img.setAttribute ("crossorigin", "anonymous");
            document.body.appendChild((img));
          }
        })()
    //View effects
    
}
run();

async function imgToCanvas(url) {
    //Create img element
    const img = document.createElement("img");
    img.src = url;
    img.setAttribute ("crossorigin", "anonymous"); // prevent failed to execute 'todataurl' on 'htmlcanvas element' caused by cross domain: tainted canvas may not be exported
    await new Promise((resolve) => (img.onload = resolve));
    //Create the canvas DOM element and set its width and height to be the same as the picture
    const canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    //The coordinates (0,0) indicate that the drawing starts from here and is equivalent to an offset.
    canvas.getContext("2d").drawImage(img, 0, 0);
    return canvas;
}

function addWatermark(canvas, text) {
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "red";
    ctx.textBaseline = "middle";
    ctx.fillText('', 20, 20);
    return canvas;
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

function showPreview(event){		
    if(event.target.files.length > 0){
        var myHeaders = new Headers();
        myHeaders.append("Rm-Token", "62bacdd957e371.06369301");
        
        var formdata = new FormData();
        formdata.append("image_file", event.target.files[0], "shutterstock_648907024.jpg");
        formdata.append("image_url", "url_to_image");
        
        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: formdata,
          redirect: 'follow'
        };

        fetch("https://api.removal.ai/3.0/remove", requestOptions)
          .then(response => response.text())
          .then(function(result){
            console.log(result);
            
          })
          .catch(error => console.log('error', error));


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