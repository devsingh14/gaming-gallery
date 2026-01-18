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
        
        // Animate the gallery opening
        if (!gallery.classList.contains('hidden')) {
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
