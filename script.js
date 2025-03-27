// Script pour ajouter des interactions dynamiques au portfolio

document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling pour les liens du menu
    const navLinks = document.querySelectorAll('nav ul li a');

    navLinks.forEach(link => {
        link.addEventListener('click', event => {
            event.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 50,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Animation au scroll pour les sections
    const sections = document.querySelectorAll('section');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                entry.target.classList.remove('visible');
            }
        });
    }, {
        threshold: 0.2
    });

    sections.forEach(section => {
        observer.observe(section);
    });

    // Appliquer des styles pour les animations dynamiques
    const styleTag = document.createElement('style');
    styleTag.innerHTML = `
        section {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        
        section.visible {
            opacity: 1;
            transform: translateY(0);
        }

        .modal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            align-items: center;
            justify-content: center;
        }

        .modal-content {
            position: relative;
            background: #fff;
            padding: 20px;
            border-radius: 10px;
            max-width: 80%;
            text-align: center;
        }

        .modal-image {
            max-width: 100%;
            height: auto;
        }

        .close-button {
            position: absolute;
            top: 10px;
            right: 10px;
            font-size: 1.5rem;
            cursor: pointer;
        }
    `;
    document.head.appendChild(styleTag);

    // Message de confirmation pour le formulaire de contact
    document.getElementById('contactForm').addEventListener('submit', function(event) {
        event.preventDefault();

        document.getElementById('nomErreur').style.display = 'none';
        document.getElementById('emailErreur').style.display = 'none';
        document.getElementById('messageErreur').style.display = 'none';

        const nom = document.getElementById('nom').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        let isValid = true;

        if (nom === '') {
            document.getElementById('nomErreur').textContent = 'Veuillez entrer votre nom.';
            document.getElementById('nomErreur').style.display = 'block';
            isValid = false;
        }

        if (email === '') {
            document.getElementById('emailErreur').textContent = 'Veuillez entrer votre email.';
            document.getElementById('emailErreur').style.display = 'block';
            isValid = false;
        } else if (!isValidEmail(email)) {
            document.getElementById('emailErreur').textContent = 'Veuillez entrer un email valide.';
            document.getElementById('emailErreur').style.display = 'block';
            isValid = false;
        }

        if (message === '') {
            document.getElementById('messageErreur').textContent = 'Veuillez entrer votre message.';
            document.getElementById('messageErreur').style.display = 'block';
            isValid = false;
        }

        if (isValid) {
            document.getElementById('messageSucces').style.display = 'block';
            document.getElementById('contactForm').reset();
        }
    });

    function isValidEmail(email) {
        const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        return emailRegex.test(email);
    }

    // Galerie d'images interactive
    const projectCards = document.querySelectorAll('.grid-portfolio');
    const modal = document.createElement('div');
    modal.classList.add('modal');
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-button">&times;</span>
            <img src="" alt="Projet" class="modal-image">
        </div>
    `;
    document.body.appendChild(modal);

    const modalImage = modal.querySelector('.modal-image');
    const closeButton = modal.querySelector('.close-button');

    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            const imgSrc = card.querySelector('img').src;
            modalImage.src = imgSrc;
            modal.style.display = 'flex';
        });
    });

    closeButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});
