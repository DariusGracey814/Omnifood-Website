class mobileNavigation {

    constructor(buttonsMenu, header, year, navigation, pageBody, logo, allLinks,heroSection) {
        this.buttonsMenu = document.querySelector(buttonsMenu);
        this.header = document.querySelector(header);
        this.year = document.querySelector(year);
        this.navigation = document.querySelector(navigation);
        this.pageBody = document.querySelector(pageBody);
        this.logo = document.querySelector(logo);
        this.allLinks = document.querySelectorAll(allLinks);
        this.heroSection = document.querySelector(heroSection);
    }

    // FUNCTIONALITY
    init() {
        this.checkFlexGap();
        this.updateYear();
        this.smoothScrollAnimation();
        this.stickyNavigation();

        this.buttonsMenu.addEventListener('click', (evt) => this.openNavigation(evt), false);


    }

    // Fixing flexbox gap property missing in some Safari versions
    checkFlexGap() {
        var flex = document.createElement('div');
        flex.style.display = 'flex';
        flex.style.flexDirection = "column";
        flex.style.gap = '1px';

        flex.appendChild(document.createElement('div'));
        flex.appendChild(document.createElement('div'));

        document.body.appendChild(flex);
        var isSupported = flex.scrollHeight === 1;
        flex.parentNode.removeChild(flex);
        console.log(isSupported);

        if (!isSupported) document.body.classList.add('no-flexbox-gap');    
    }

    // Update year in footer copyright
    updateYear() {
        const yearEl = this.year;
        const currentYear = new Date().getFullYear();
        
        yearEl.textContent = currentYear;
    }

    // Toggling mobile navigation
    openNavigation() {
       const status = this.header.classList.toggle('nav-open');

       (status) ? this.navigation.setAttribute('aria-expanded', 'true') : this.navigation.setAttribute('aria-expanded', 'false')   
    }

    // Smooth Scrolling
    smoothScrollAnimation() {
        const headerEl = this.header;
        
        this.allLinks.forEach(function(link) {

            link.addEventListener('click', function(evt) {
                evt.preventDefault();
                
                const href = link.getAttribute('href');

                // Scroll back to top
                if (href === '#') {
                    window.scrollTo({
                        top: 0,
                        behavior: "smooth"
                    })
                }

                if (href !== '#' && href.startsWith('#')) {
                    //  Getting target section of link
                   const targetSection =  document.querySelectorAll(href)[0];
                   
                    //  Scrolling to target sections on link click
                    targetSection.scrollIntoView({behavior: "smooth" });

                }

                // Close mobile navigation
                if (link.classList.contains('nav-link')) {
                    headerEl.classList.toggle('nav-open');
                }
            })
        })
    }


    // Sticky Navigation
    stickyNavigation() {
        const sectionHeroEl = this.heroSection;
        const bodyEl = this.pageBody;
        
        // Intersection Observer
        const obs = new IntersectionObserver(function(entires){
                const ent = entires[0];

                // activate sticky nav when hero is 0% of the viewport
                if (ent.isIntersecting === false) {
                    bodyEl.classList.add('sticky');
                }
                else {
                    bodyEl.classList.remove('sticky');
                }

        }, {
            root: null,
            threshold: 0,
            rootMargin: '-80px',
        })

        // Watch for hero to be 0% of the viewport and activate sticky nav
        obs.observe(sectionHeroEl);

    }

}

const mobileNavigation_Omnifood = new mobileNavigation('.btn-mobile-nav', '.masthead', '.year', '.primary-nav', 'body', '.logo', 'a', '.hero-section');

mobileNavigation_Omnifood.init();

