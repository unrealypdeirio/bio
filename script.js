document.addEventListener('DOMContentLoaded', function() {
    lucide.createIcons();
    createSnowfall();
    initAnimations();
});
function createSnowfall() {
    const snowContainer = document.getElementById('snow-container');
    const snowflakeCount = 50;
    const snowflakeChars = ['❄', '❅', '❆', '✦', '✧', '✨'];
    
    for (let i = 0; i < snowflakeCount; i++) {
        createSnowflake(snowContainer, snowflakeChars);
    }
    
    setInterval(() => {
        createSnowflake(snowContainer, snowflakeChars);
    }, 2000);
}

function createSnowflake(container, chars) {
    const snowflake = document.createElement('div');
    snowflake.className = 'snowflake';
    snowflake.innerHTML = chars[Math.floor(Math.random() * chars.length)];
    
    const startX = Math.random() * window.innerWidth;
    const duration = Math.random() * 3000 + 5000;
    const size = Math.random() * 0.8 + 0.5;
    const opacity = Math.random() * 0.6 + 0.4;
    
    snowflake.style.left = startX + 'px';
    snowflake.style.fontSize = size + 'rem';
    snowflake.style.opacity = opacity;
    snowflake.style.animationDuration = duration + 'ms';
    snowflake.style.animationDelay = Math.random() * 2000 + 'ms';
    
    container.appendChild(snowflake);
    
    setTimeout(() => {
        if (snowflake.parentNode) {
            snowflake.parentNode.removeChild(snowflake);
        }
    }, duration + 2000);
}

function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationDelay = '0s';
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, observerOptions);
    
    const cards = document.querySelectorAll('.section-card');
    cards.forEach(card => {
        card.style.animationPlayState = 'paused';
        observer.observe(card);
    });
    
    initSkillsInteraction();
    initTypingEffect();
    initParallaxEffects();
}

function initSkillsInteraction() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        item.addEventListener('click', function() {
            this.style.animation = 'bounce 0.6s ease';
            setTimeout(() => {
                this.style.animation = '';
            }, 600);
        });
    });
}

function initTypingEffect() {
    const subtitle = document.querySelector('.hero-subtitle');
    if (!subtitle) return;
    
    const originalText = subtitle.textContent;
    subtitle.textContent = '';
    
    let i = 0;
    const typeTimer = setInterval(() => {
        subtitle.textContent += originalText.charAt(i);
        i++;
        
        if (i >= originalText.length) {
            clearInterval(typeTimer);
            const cursor = document.createElement('span');
            cursor.innerHTML = '|';
            cursor.style.animation = 'blink 1s infinite';
            cursor.style.marginLeft = '2px';
            subtitle.appendChild(cursor);
            
            setTimeout(() => {
                if (cursor.parentNode) {
                    cursor.parentNode.removeChild(cursor);
                }
            }, 3000);
        }
    }, 100);
}

function initParallaxEffects() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.avatar-container');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
        
        const snowContainer = document.getElementById('snow-container');
        if (snowContainer) {
            snowContainer.style.transform = `translateY(${scrolled * 0.1}px)`;
        }
    });
}


const style = document.createElement('style');
style.textContent = `
    @keyframes bounce {
        0%, 20%, 53%, 80%, 100% {
            transform: translate3d(0,0,0) scale(1);
        }
        40%, 43% {
            transform: translate3d(0,-30px,0) scale(1.1);
        }
        70% {
            transform: translate3d(0,-15px,0) scale(1.05);
        }
        90% {
            transform: translate3d(0,-4px,0) scale(1.02);
        }
    }
    
    @keyframes blink {
        0%, 50% { opacity: 1; }
        51%, 100% { opacity: 0; }
    }
    
    .tech-tag {
        position: relative;
        overflow: hidden;
    }
    
    .tech-tag::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
        transition: left 0.5s;
    }
    
    .tech-tag:hover::before {
        left: 100%;
    }
    
    .social-link {
        position: relative;
        overflow: hidden;
    }
    
    .social-link::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 0;
        height: 0;
        background: rgba(255,255,255,0.1);
        border-radius: 50%;
        transform: translate(-50%, -50%);
        transition: width 0.6s, height 0.6s;
    }
    
    .social-link:hover::after {
        width: 300px;
        height: 300px;
    }
`;
document.head.appendChild(style);


document.addEventListener('DOMContentLoaded', function() {
    const techTags = document.querySelectorAll('.tech-tag');
    
    techTags.forEach(tag => {
        tag.addEventListener('click', function() {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = (event.clientX - rect.left - size / 2) + 'px';
            ripple.style.top = (event.clientY - rect.top - size / 2) + 'px';
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255,255,255,0.3)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s linear';
            ripple.style.pointerEvents = 'none';
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

function updateSocialLinks(telegramLink, discordLink) {
    const telegramEl = document.querySelector('.social-link.telegram');
    const discordEl = document.querySelector('.social-link.discord');
    
    if (telegramEl && telegramLink) {
        telegramEl.href = telegramLink;
    }
    
    if (discordEl && discordLink) {
        discordEl.href = discordLink;
    }
}

function updateAvatar(imageUrl) {
    const avatarPlaceholder = document.querySelector('.avatar-placeholder');
    if (avatarPlaceholder && imageUrl) {
        const img = document.createElement('img');
        img.src = imageUrl;
        img.alt = 'Avatar';
        img.style.width = '100%';
        img.style.height = '100%';
        img.style.borderRadius = '50%';
        img.style.objectFit = 'cover';
        
        const icon = avatarPlaceholder.querySelector('i');
        if (icon) {
            avatarPlaceholder.removeChild(icon);
        }
        avatarPlaceholder.appendChild(img);
    }
}

window.updateSocialLinks = updateSocialLinks;
window.updateAvatar = updateAvatar;