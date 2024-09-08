document.addEventListener("DOMContentLoaded", function() {
    const reviewForm = document.getElementById('reviewForm');
    const gallery = document.getElementById('gallery');
    const toggleLanguage = document.getElementById('toggleLanguage');

    // Load existing reviews from localStorage
    loadReviews();

    // Handle form submission to add a new review
    reviewForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
        const reviewIndex = reviewForm.getAttribute('data-edit-index');

        if (reviewIndex !== null && reviewIndex !== '') {
            // Editing an existing review
            const review = reviews[reviewIndex];
            updateReview(review);
            reviews[reviewIndex] = review;
            localStorage.setItem('reviews', JSON.stringify(reviews));
            reviewForm.removeAttribute('data-edit-index');
        } else {
            // Adding a new review
            const name = document.getElementById('name').value;
            const description = document.getElementById('description').value;
            const website = document.getElementById('website').value;
            const instagram = document.getElementById('instagram').value;
            const linkedin = document.getElementById('linkedin').value;
            const facebook = document.getElementById('facebook').value;
            const spotify = document.getElementById('spotify').value;
            const imageUpload = document.getElementById('imageUpload').files[0];

            const reader = new FileReader();
            reader.onload = function(e) {
                const imageData = e.target.result;

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

                reviews.push(review);
                localStorage.setItem('reviews', JSON.stringify(reviews));
                displayReview(review, reviews.length - 1);
            };
            reader.readAsDataURL(imageUpload);
        }

        reviewForm.reset();
        reviewForm.removeAttribute('data-edit-index');
    });

    // Load reviews from localStorage
    function loadReviews() {
        const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
        reviews.forEach((review, index) => displayReview(review, index));
    }

    // Display a review on the page
    function displayReview(review, index) {
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

        // Add edit button
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.addEventListener('click', function() {
            loadReviewIntoForm(review, index);
        });
        info.appendChild(editButton);

        card.appendChild(info);
        gallery.appendChild(card);
    }

    // Load a review into the form for editing
    function loadReviewIntoForm(review, index) {
        document.getElementById('name').value = review.name;
        document.getElementById('description').value = review.description;
       
