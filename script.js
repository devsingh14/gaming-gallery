// GSAP animations for gallery items
document.addEventListener('DOMContentLoaded', () => {
    const galleryCards = document.querySelectorAll('.gallery-card');
    const galleryItems = document.querySelectorAll('.gallery-item');

    // Shuffle effect on page load - cards flip and arrange
    gsap.fromTo(galleryCards, 
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
