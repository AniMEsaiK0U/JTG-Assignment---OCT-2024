// Initialize Owl Carousel
$(document).ready(function(){
    $('.owl-carousel').owlCarousel({
        loop: true,
        margin: 20,
        nav: false,
        dots: true,
        autoplay: true,
        autoplayTimeout: 5000, // Adjust as needed
        autoplayHoverPause: true,
        responsive: {
            0: {
                items: 1,
                stagePadding: 30
            },
            600: {
                items: 2,
                stagePadding: 50
            },
            1000: {
                items: 3,
                stagePadding: 70
            }
        }
    });
});

// Apply scroll effect to header
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        const offset = 70;
        window.scrollTo({
            top: targetElement.offsetTop - offset,
            behavior: 'smooth'
        });
    });
});

// Log form data in console
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    // Capture form inputs
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    // Log values in the console
    console.log(`Name: ${name}, Email: ${email}, Message: ${message}`);
    alert(`Name: ${name}, Email: ${email}, Message: ${message}`);
});

// Display toast notification on form submit
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    // Trigger toast notification
    showToast();
    // Clear the form fields
    document.getElementById('contact-form').reset();
});

// Function to display the toast message
function showToast() {
    // Select toast element
    const toast = document.getElementById('toast');
    // Add 'show' class to make toast visible
    toast.className = "toast show";
    // Remove the 'show' class after 3 seconds to hide toast
    setTimeout(function() {
        toast.className = toast.className.replace("show", "");
    }, 3000);
}

// Modal functionality setup for adding new skills
const modal = document.getElementById("addSkillModal");
const openModalBtn = document.getElementById("openModalBtn");
const closeModalBtn = document.getElementById("closeModalBtn");
const submitSkillBtn = document.getElementById("submitSkillBtn");

// Open the modal when the 'ADD SKILL' button is clicked
openModalBtn.onclick = function() {
    modal.style.display = "flex";
    document.body.classList.add("modal-open");
}

// Close the modal when the 'CANCEL' button is clicked
closeModalBtn.onclick = function() {
    modal.style.display = "none";
    document.body.classList.remove("modal-open");
}

// Add new skill to the expertise section when 'ADD SKILL' is clicked in modal
submitSkillBtn.onclick = function() {
    // Get the values from the input fields
    const domain = document.getElementById("domain").value;
    const skillNames = document.querySelectorAll(".skill-name");
    const proficiencies = document.querySelectorAll(".skill-proficiency");

    // Select the container to add new skills
    const skillsContainer = document.querySelector(".expertise-container");

    if (domain) {
        const newSkillBox = document.createElement("div");
        newSkillBox.classList.add("expertise-card");

        let skillsHTML = `<h3>${domain}</h3>`;

        // Loop through all skill inputs and append each skill with proficiency
        for (let i = 0; i < skillNames.length; i++) {
            const skillName = skillNames[i].value;
            const proficiency = proficiencies[i].value;

            if (skillName && proficiency) {
                skillsHTML += `
                    <div class="skill-item">
                        <p>${skillName} <span>${proficiency}%</span></p>
                        <div class="progress-container">
                            <div class="progress-bar" style="width: ${proficiency}%;"></div>
                        </div>
                    </div>
                `;
            }
        }

        newSkillBox.innerHTML = skillsHTML;
        skillsContainer.appendChild(newSkillBox);

        // Clear input fields after submission
        document.getElementById("domain").value = "";
        skillNames.forEach(input => input.value = "");
        proficiencies.forEach(input => input.value = "");

        // Close the modal
        modal.style.display = "none";
        document.body.classList.remove("modal-open");
    } else {
        alert("Please fill in all fields.");
    }
}

// Close modal when user clicks outside of it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
        document.body.classList.remove("modal-open");
    }
}

// Allow modal to close with "Escape" key
window.onkeydown = function(event) {
    if (event.key === "Escape") {
        modal.style.display = "none";
        document.body.classList.remove("modal-open");
    }
}
