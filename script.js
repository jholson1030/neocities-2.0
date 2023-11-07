/* ===================================================
                    Clock
   =================================================== */

   function currentTime() {
    let date = new Date(); 
    let hh = date.getHours();
    let mm = date.getMinutes();
    let ss = date.getSeconds();
    let session = "AM";
  
    if(hh === 0){
        hh = 12;
    }
    if(hh > 12){
        hh = hh - 12;
        session = "PM";
     }
  
     hh = (hh < 10) ? "0" + hh : hh;
     mm = (mm < 10) ? "0" + mm : mm;
     ss = (ss < 10) ? "0" + ss : ss;
      
     let time = hh + ":" + mm + ":" + ss + " " + session;
  
    document.getElementById("clock").innerText = time; 
    let t = setTimeout(function(){ currentTime() }, 1000);
  }
  
  currentTime();

/* ==========================================================
                    Photo Gallery
   ========================================================== */  

  const images = document.querySelectorAll('.gallery-item img');
  // Get images src on click
  images.forEach(function(img) {
    img.addEventListener('click', function(event) {
        let imgSrc = event.target.src;
        // Extract the description from the data-description or the alt attribute 
        let description = event.target.getAttribute('data-description') || event.target.addEventListener;
        imgModal(imgSrc, description);
    });
  });

  // Creating the modal
let imgModal = function(src, descriptionText) {
    const modal = document.createElement('div');
    modal.setAttribute('class', 'modal');
    // Add the modal to the main section of the parent element
    document.querySelector('.body').append(modal);
    
    // Add image to modal
    const newImage = document.createElement('img');
    newImage.setAttribute('src', src);
    modal.append(newImage);
    // Add description to modal
    if (descriptionText) {
        const imageDescription = document.createElement('p');
        imageDescription.setAttribute('class', 'image-description');
        imageDescription.textContent = descriptionText;
        modal.append(imageDescription);
    }
    // Create close button
    const closeBtn = document.createElement('i');
    closeBtn.setAttribute('class', 'fas fa-times closeBtn');
    // Close function
    closeBtn.onclick = function() {
        modal.remove();
    }
    modal.append(closeBtn);
}


/* =============================================================
                        DANCE BREAK                             
   ============================================================= */



// Declare variables
let partyTime = document.querySelector('.party-time');
let danceBreakButton = document.querySelector('.dance-break-btn');
let danceBreak = document.querySelector('.dance-break');
let partyState = false;

function partyOn() {
    danceBreak.style.display = 'flex';
}

function partyOff() {
    danceBreak.style.display = 'none';
}

function toggleParty() {
    if (partyState) {
        partyOff();
        danceBreakButton.innerHTML = 'Make it a Party';
    } else {
        partyOn();
        danceBreakButton.innerHTML = 'DANCE!!!';
    }
    partyState = !partyState;
}

danceBreakButton.addEventListener('click', toggleParty);