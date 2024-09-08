document.addEventListener("DOMContentLoaded", function() {
    const reviewForm = document.getElementById('reviewForm');
    const gallery = document.getElementById('gallery');
    const toggleLanguage = document.getElementById('toggleLanguage');

    // Load existing reviews from localStorage
    loadReviews();

    // Handle form submission to add a new review
    reviewForm.addEventListener('submit', function(event) {
        event.preventDefault();

        // Get form data
        const name = document.getElementById('name').value;
        const description = document.getElementById('description').value;
        const website = document.getElementById('website').value;
        const instagram = document.getElementById('instagram').value;
        const linkedin = document.getElementById('linkedin').value;
        const facebook = document.getElementById('facebook').value;
        const spotify = document.getElementById('spotify').value;
        const imageUpload = document.getElementById('imageUpload').files[0];

        // Convert image to Base64 string
        const reader = new FileReader();
        reader.onload = function(e) {
            const imageData = e.target.result;

            // Create a new review object
            const review = {
                name,
                description,
                website,
                instagram,
                linkedin,
                facebook,
                spotify,
                imageData
            };

            // Save review to localStorage
            saveReview(review);

            // Display the review on the page
            displayReview(review);
        };
        reader.readAsDataURL(imageUpload);

        // Clear the form
        reviewForm.reset();
    });

    // Save review to localStorage
    function saveReview(review) {
        const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
        reviews.push(review);
        localStorage.setItem('reviews', JSON.stringify(reviews));
    }

    // Load reviews from localStorage
    function loadReviews() {
        const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
        reviews.forEach(review => displayReview(review));
    }

    // Display a review on the page
    function displayReview(review) {
        const card = document.createElement('div');
        card.className = 'woman-card';

        const img = document.createElement('img');
        img.src = review.imageData;
        card.appendChild(img);

        const info = document.createElement('div');
        info.className = 'woman-info';

        const h2 = document.createElement('h2');
        h2.textContent = review.name;
        info.appendChild(h2);

        const p = document.createElement('p');
        p.textContent = review.description;
        info.appendChild(p);

        const linksDiv = document.createElement('div');
        linksDiv.className = 'links';

        if (review.website) {
            const a = document.createElement('a');
            a.href = review.website;
            a.textContent = 'Website';
            a.target = '_blank';
            linksDiv.appendChild(a);
        }
        if (review.instagram) {
            const a = document.createElement('a');
            a.href = review.instagram;
            a.textContent = 'Instagram';
            a.target = '_blank';
            linksDiv.appendChild(a);
        }
        if (review.linkedin) {
            const a = document.createElement('a');
            a.href = review.linkedin;
            a.textContent = 'LinkedIn';
            a.target = '_blank';
            linksDiv.appendChild(a);
        }
        if (review.facebook) {
            const a = document.createElement('a');
            a.href = review.facebook;
            a.textContent = 'Facebook';
            a.target = '_blank';
            linksDiv.appendChild(a);
        }
        if (review.spotify) {
            const a = document.createElement('a');
            a.href = review.spotify;
            a.textContent = 'Spotify';
            a.target = '_blank';
            linksDiv.appendChild(a);
        }

        info.appendChild(linksDiv);
        card.appendChild(info);
        gallery.appendChild(card);
    }

    // Handle language toggle
    toggleLanguage.addEventListener('click', function() {
        const isEnglish = document.documentElement.lang === 'en';

        document.documentElement.lang = isEnglish ? 'sv' : 'en';
        document.querySelector('h1').textContent = isEnglish ? 'Mujeres Ikigai' : 'Mujeres Ikigai';
        document.querySelector('p').textContent = isEnglish ? 'Lyfter fram kvinnor som lever enligt Ikigai-modellen' : 'Highlighting women who live according to the Ikigai model';
        document.querySelector('h2').textContent = isEnglish ? 'Ladda upp en recension' : 'Upload a Review';
        toggleLanguage.textContent = isEnglish ? 'English' : 'Svenska';
        document.querySelector('input[type="text"]').placeholder = isEnglish ? 'Kvinnans namn' : 'Woman\'s Name';
        document.querySelector('textarea').placeholder = isEnglish ? 'Skriv din recension här...' : 'Write your review here...';
        document.querySelector('input[type="url"]').placeholder = isEnglish ? 'Hemsida (valfritt)' : 'Website (optional)';
        document.querySelectorAll('input[type="url"]')[1].placeholder = isEnglish ? 'Instagram (valfritt)' : 'Instagram (optional)';
        document.querySelectorAll('input[type="url"]')[2].placeholder = isEnglish ? 'LinkedIn (valfritt)' : 'LinkedIn (optional)';
        document.querySelectorAll('input[type="url"]')[3].placeholder = isEnglish ? 'Facebook (valfritt)' : 'Facebook (optional)';
        document.querySelectorAll('input[type="url"]')[4].placeholder = isEnglish ? 'Spotify (valfritt)' : 'Spotify (optional)';
        document.querySelector('button[type="submit"]').textContent = isEnglish ? 'Ladda upp recension' : 'Upload Review';
    });
});
