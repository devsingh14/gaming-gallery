// GSAP animations for gallery items
document.addEventListener('DOMContentLoaded', () => {
    const galleryItems = document.querySelectorAll('.gallery-item');

    // Animate gallery items on load
    gsap.fromTo(galleryItems, 
        { opacity: 0, y: 50 }, 
        { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: "power2.out" }
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
