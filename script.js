// GSAP animations for gallery items
document.addEventListener('DOMContentLoaded', () => {
    const galleryCards = document.querySelectorAll('.gallery-card');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const friendsBtn = document.getElementById('friendsBtn');
    const closeFriendsBtn = document.getElementById('closeFriendsBtn');
    const friendsList = document.getElementById('friendsList');
    const galleryBtn = document.getElementById('galleryBtn');
    const gallery = document.querySelector('.gallery');

    // Gallery button functionality
    galleryBtn.addEventListener('click', () => {
        gallery.classList.toggle('hidden');

        if (!gallery.classList.contains('hidden')) {
            // Gallery opening: blur intro text and image, add backdrop layer
            const backdrop = document.createElement('div');
            backdrop.className = 'gallery-backdrop';
            backdrop.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.5);
                z-index: 1999;
                pointer-events: none;
            `;
            document.body.appendChild(backdrop);

            gsap.to('.who-section', { opacity: 0, duration: 0.5 });
            gsap.to('.featured-image-page', { opacity: 0, duration: 0.5 });

            // Adjust z-indexes for layering
            document.querySelector('.who-section').style.zIndex = '1998';
            document.querySelector('.featured-image-page').style.zIndex = '1998';
            gallery.style.zIndex = '2000';

            // Animate the gallery opening
            const galleryCardsToAnimate = document.querySelectorAll('.gallery-card');
            gsap.fromTo(galleryCardsToAnimate,
                {
                    opacity: 0,
                    rotationY: 90,
                    scale: 0.5,
                    y: -50,
                    z: 100
                },
                {
                    opacity: 1,
                    rotationY: 0,
                    scale: 1,
                    y: 0,
                    z: 0,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: "back.out"
                }
            );
        } else {
            // Gallery closing: remove blur and backdrop
            const backdrop = document.querySelector('.gallery-backdrop');
            if (backdrop) {
                gsap.to(backdrop, { opacity: 0, duration: 0.5, onComplete: () => backdrop.remove() });
            }
            gsap.to('.who-section', { opacity: 1, duration: 0.5 });
            gsap.to('.featured-image-page', { opacity: 1, duration: 0.5 });

            // Restore original z-indexes
            document.querySelector('.who-section').style.zIndex = '2500';
            document.querySelector('.featured-image-page').style.zIndex = '2400';
            gallery.style.zIndex = '';
        }
    });

    // Friends button functionality
    friendsBtn.addEventListener('click', () => {
        friendsList.classList.toggle('hidden');
        
        // Animate the list opening
        if (!friendsList.classList.contains('hidden')) {
            gsap.fromTo(friendsList,
                { scale: 0.8, opacity: 0 },
                { scale: 1, opacity: 1, duration: 0.4, ease: "back.out" }
            );
        }
    });

    // Close friends list button
    closeFriendsBtn.addEventListener('click', () => {
        gsap.to(friendsList,
            { scale: 0.8, opacity: 0, duration: 0.3, ease: "back.in" },
            () => {
                friendsList.classList.add('hidden');
            }
        );
    });

    // Close friends list when clicking outside
    document.addEventListener('click', (e) => {
        if (!friendsList.classList.contains('hidden') && 
            !friendsList.contains(e.target) && 
            e.target !== friendsBtn) {
            gsap.to(friendsList,
                { scale: 0.8, opacity: 0, duration: 0.3, ease: "back.in" },
                () => {
                    friendsList.classList.add('hidden');
                }
            );
        }
    });

    // Add hover effect to friends list items
    const friendItems = document.querySelectorAll('.friends-list li');
    friendItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            gsap.to(item, { duration: 0.2, color: '#00ffff' });
        });
        item.addEventListener('mouseleave', () => {
            gsap.to(item, { duration: 0.2, color: '#fff' });
        });
    });

    // Lightbox functionality with GSAP transitions
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    document.body.appendChild(lightbox);

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = document.createElement('img');
            img.src = item.src;
            img.alt = item.alt;
            lightbox.innerHTML = '';
            lightbox.appendChild(img);

            // Animate lightbox in
            gsap.to(lightbox, { opacity: 1, duration: 0.5, ease: "power2.out" });
            gsap.fromTo(img, 
                { scale: 0.8, opacity: 0 }, 
                { scale: 1, opacity: 1, duration: 0.5, ease: "power2.out" }
            );
            lightbox.classList.add('active');
        });
    });

    lightbox.addEventListener('click', () => {
        // Animate lightbox out
        gsap.to(lightbox, { opacity: 0, duration: 0.5, ease: "power2.out" });
        gsap.to(lightbox.querySelector('img'), 
            { scale: 0.8, opacity: 0, duration: 0.5, ease: "power2.out" }
        );
        setTimeout(() => {
            lightbox.classList.remove('active');
        }, 500);
    });
    
});

