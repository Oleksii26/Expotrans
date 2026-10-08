const burger = document.getElementById('burger');
const nav = document.getElementById('nav');
const links = nav.querySelectorAll('a');
const body = document.body;


burger.addEventListener('click', () => {
    burger.classList.toggle('active');
    nav.classList.toggle('active');
});

links.forEach(link => {
    link.addEventListener('click', () => {
        burger.classList.remove('active');
        nav.classList.remove('active');
    });
});

// cookie
const cookie = document.querySelector('.cookie');

if (cookie) {
    const buttons = cookie.querySelectorAll('.accept-coocie');
    const body = document.body;

    // перевірка: чи вже закривали
    const cookieSeen = localStorage.getItem('cookie-seen');

    if (!cookieSeen) {
        setTimeout(() => {
            cookie.classList.add('active');
            body.style.overflow = 'hidden';
        }, 1000);
    }

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            localStorage.setItem('cookie-seen', 'true');

            cookie.classList.remove('active');
            body.style.overflow = 'auto';
        });
    });
}

// slider equip
document.querySelectorAll('[data-slider]').forEach((slider) => {
    const slides = slider.querySelectorAll('[data-slide]');
    const track = slider.querySelector('[data-slider-track]');
    const btnNext = slider.querySelector('[data-slider-next]');
    const btnPrev = slider.querySelector('[data-slider-prev]');

    let current = 0;

    let startX = 0;
    let endX = 0;
    const threshold = 50;

    function updateSlider() {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i <= current);
        });

        btnPrev?.classList.toggle('inactive', current === 0);
        btnNext?.classList.toggle('inactive', current === slides.length - 1);
    }

    function next() {
        if (current < slides.length - 1) {
            current++;
            updateSlider();
        }
    }

    function prev() {
        if (current > 0) {
            current--;
            updateSlider();
        }
    }

    btnNext?.addEventListener('click', next);
    btnPrev?.addEventListener('click', prev);

    slider.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    });

    slider.addEventListener('touchend', (e) => {
        endX = e.changedTouches[0].clientX;
        handleSwipe();
    });

    let isDragging = false;

    slider.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.clientX;
    });

    slider.addEventListener('mouseup', (e) => {
        if (!isDragging) return;
        isDragging = false;
        endX = e.clientX;
        handleSwipe();
    });

    function handleSwipe() {
        const diff = startX - endX;

        if (Math.abs(diff) < threshold) return;

        if (diff > 0) next();
        if (diff < 0) prev();
    }

    updateSlider();
});

// slider etaps

(() => {
const etapsSlides = document.querySelectorAll('.etaps-slide');
const slider = document.querySelector('.etaps-slider');
const progress = document.querySelector('.etaps-progress');

let currentIndex = 0;
let isThrottled = false;

document.querySelectorAll('.etaps-slide-title').forEach(el => {
    el.dataset.text = el.textContent.trim();
});

    function animateText(el) {
        const text = el.dataset.text || el.textContent.trim();
        el.textContent = '';

        const words = text.split(' ');

        words.forEach((word, wordIndex) => {
            const wordSpan = document.createElement('span');
            wordSpan.classList.add('word');

            [...word].forEach((char, charIndex) => {
                const span = document.createElement('span');
                span.classList.add('char');

                span.textContent = char;

                const baseDelay = wordIndex * 8; 
                span.style.animationDelay = `${(baseDelay + charIndex) * 0.03}s`;

                wordSpan.appendChild(span);
            });

            el.appendChild(wordSpan);

            if (wordIndex < words.length - 1) {
                el.appendChild(document.createTextNode(' '));
            }
        });
    }

function runTextAnimation(slide) {
    const title = slide.querySelector('.etaps-slide-title');
    if (!title) return;

    animateText(title);
}

if (!slider || !progress || etapsSlides.length === 0) {
    return
} else {

    etapsSlides[0].classList.add('active');

    const firstList = etapsSlides[0].querySelector('.etaps-slide-list');
    if (firstList) firstList.classList.add('active');

    runTextAnimation(etapsSlides[0]);

    progress.style.width = `${(1 / etapsSlides.length) * 100}%`;

    function updateProgress() {
        const percent = ((currentIndex + 1) / etapsSlides.length) * 100;
        progress.style.width = `${percent}%`;
    }

    function changeSlide(direction) {
        if (isThrottled) return;
        isThrottled = true;

        const currentSlide = etapsSlides[currentIndex];
        const currentList = currentSlide?.querySelector('.etaps-slide-list');

        currentSlide.classList.remove('active');
        if (currentList) currentList.classList.remove('active');

        currentIndex += direction;

        if (currentIndex < 0) currentIndex = 0;
        if (currentIndex >= etapsSlides.length) currentIndex = etapsSlides.length - 1;

        const nextSlide = etapsSlides[currentIndex];
        const nextList = nextSlide?.querySelector('.etaps-slide-list');

        nextSlide.classList.add('active');
        if (nextList) nextList.classList.add('active');

        runTextAnimation(nextSlide);

        updateProgress();

        setTimeout(() => {
            isThrottled = false;
        }, 500);
    }

    function handleWheel(e) {
        if (window.innerWidth < 950) return;

        const isScrollingDown = e.deltaY > 0;
        const isScrollingUp = e.deltaY < 0;

        const atFirstSlide = currentIndex === 0;
        const atLastSlide = currentIndex === etapsSlides.length - 1;

        if ((atFirstSlide && isScrollingUp) || (atLastSlide && isScrollingDown)) {
            return;
        }

        e.preventDefault();

        if (isScrollingDown) changeSlide(1);
        else if (isScrollingUp) changeSlide(-1);
    }

    slider.addEventListener('wheel', handleWheel, { passive: false });
}

})();

// ln

const translations = {
    en: {
        header_about: "ABOUT US",
        header_services: "SERVICES",
        header_stages: "PRODUCTION STAGES",
        header_contacts: "CONTACTS",
        header_btn: "CONTACT US",
        form_title1: "Have Questions?",
        form_title2: "Order a Service",
        form_sub_title: "Leave your contact details and we will get in touch with you",
        form_name: "Your full name",
        form_number: "Phone number*",
        form_message: "Message",
        form_text: "* The WhatsApp application must be installed on the provided phone number.",
        form_button: "Send",
        form_thanks: "THANKS!",
        form_error: "Unfortunately, an error has occurred.",
        form_success: "Your contact details have been successfully submitted.",
        form_repeat: "Please try again.",
        error_title: "Page not found",
        error_button: "Go to the homepage",
        home_title: "COMPOSITE SOLUTIONS",
        home_sub_title: "Cutting-edge composite solutions setting new engineering standards",
        home_order: "Order a service",
        about_text1: "EXPOTRANS is a forward-thinking engineering and manufacturing company specializing in advanced composite technologies and custom industrial solutions.",
        about_text2: "We handle the entire process in-house — from concept development and engineering to tooling, production, and final assembly. With a strong focus on innovation, precision, and efficiency, we deliver fully integrated solutions while independently managing every stage of the project lifecycle.",
        about_button: "Our products",
        services_title: "We offer the following range of services:",
        services_item1: "Manufacturing",
        services_sub_item1: "Master model",
        services_item2: "Production",
        services_sub_item2: "of matrices from MDF and composite materials",
        services_item3: "Manufacturing products in accordance with",
        services_sub_item3: "technical requirements",
        services_item4: "Assembly of components in accordance with drawings",
        services_sub_item4: "and technical standards",
        equipment: "Equipment",
        equipment_title: "We operate modern high-precision equipment that enables us to implement complex engineering solutions with maximum accuracy and quality.",
        equipment_item11: "CNC machines",
        equipment_item12: "4-axis (milling)",
        equipment_item21: "CNC",
        equipment_item22: "machining machine",
        equipment_item23: "for polystyrene products (in-house production)",
        equipment_item32: "laser machine",
        equipment_item33: "(in-house production)",
        equipment_item42: "lathe machine",
        equipment_item51: "Specialized",
        equipment_item52: "paint booth",
        equipment_item53: "for professional coating of products",
        equipment_item61: "3D scanner",
        equipment_item62: "for high-precision modeling",
        equipment_button: "Learn more",
        etaps_title1: "3D model development",
        etaps_title2: "Model milling",
        etaps_title3: "Polymerization",
        etaps_title4: "Priming and varnishing coating",
        etaps_title5: "Assembly",
        etaps_title6: "Mold formation",
        etaps_title7: "Diagnostic and preparation stage",
        etaps_title11: "Analysis of the technical requirements",
        etaps_title12: "3D modeling and digital design",
        etaps_title13: "Use of 3D scanning",
        etaps_title14: "Client approval",
        etaps_title15: "Optimization and preparation for production",
        etaps_text11: "After receiving the technical requirements, our engineers thoroughly analyze the project specifications and begin creating a digital 3D model of the future product.",
        etaps_text12: "Based on the obtained data, a precise engineering 3D model is created, taking into account all technical parameters, functional requirements, and the client’s specifications.",
        etaps_text13: "For maximum accuracy, we use a modern 3D scanner that enables the reproduction of complex shapes and their integration into a digital model.",
        etaps_text14: "After completing the 3D model, we present it to the client for approval. This is an important stage that allows the result to be reviewed and necessary adjustments to be made.",
        etaps_text15: "If necessary, our team promptly adapts the model to ensure it fully meets the technical requirements and the client’s expectations.",
         etaps_title21: "Start of master model production",
        etaps_title22: "CNC milling",
        etaps_title23: "Sanding",
        etaps_title24: "Quality control",
         etaps_text21: "After approval of the 3D model, we manufacture a master model or mold from high-quality MDF using a modern CNC milling machine.",
        etaps_text22: "CNC milling technology ensures high machining accuracy, stable parameters, and perfect reproduction of each detail’s geometry in accordance with the digital model.",
        etaps_text23: "After milling is completed, the master model or mold undergoes thorough sanding and surface preparation.",
        etaps_text24: "The final step is inspection by the quality control department, which ensures compliance with high standards of quality and accuracy.",
        etaps_title31: "Start of polymerization",
        etaps_title32: "Process features",
        etaps_title33: "Completion of polymerization",
        etaps_text31: "After sanding and preparation, the master model or mold proceeds to the stage of impregnation with a special polymer resin.",
        etaps_text32: "Using rollers, the resin is evenly applied to the surface, ensuring complete and uniform saturation of the material. This process increases the strength, dimensional stability, and durability of the product.",
        etaps_text33: "After the resin is applied, the master model or mold is placed in a special curing oven for polymerization. During this process, the material gains its final strength and becomes ready for subsequent production stages.",
        etaps_title41: "Final finishing",
        etaps_title42: "Varnishing",
        etaps_title43: "Sanding and polishing",
        etaps_text41: "After polymerization is completed, the model proceeds to the finishing stage.",
        etaps_text42: "Next, the surface is coated with a special varnish that provides smoothness, protection, and easy release of the master model or product.",
        etaps_text43: "After the coating is applied, the surface undergoes sanding and polishing to achieve maximum precision and an ideal finish.",
        etaps_title51: "Assembly stage",
        etaps_title52: "Mold formation",
        etaps_title53: "Attention to detail",
        etaps_title54: "Completion of assembly",
        etaps_text51: "In the case of manufacturing composite molds (including gelcoat molds), the master model proceeds to the assembly stage.",
        etaps_text52: "Experienced specialists install the required components and form the structure of the future mold.",
        etaps_text53: "Special attention is given to assembly precision and compliance with technical requirements.",
        etaps_text54: "After assembly is completed, the master model is transferred to the next stage — the formation of the composite mold.",
        etaps_title61: "Gelcoat application",
        etaps_title62: "Laying reinforcement fabrics",
        etaps_title63: "Transition to the final production stage",
        etaps_text61: "The first stage of forming is the application of a gelcoat layer onto the master model using a professional spray gun. The gelcoat creates a perfectly smooth and precise surface for the future product.",
        etaps_text62: "Next, reinforcement fabrics are applied in layers with resin to ensure the strength and structural stability of the product.",
        etaps_text63: "After this, the mold undergoes the curing process and proceeds to the final stage of production.",
        etaps_title71: "Product inspection",
        etaps_title72: "Sanding and polishing",
        etaps_title73: "Completion of quality control",
        etaps_text71: "At this stage, the geometric dimensions and the product surface are inspected for potential hidden defects, as well as compliance with drawings and technical documentation.",
        etaps_text72: "Next, the surface is refined to an ideal condition through sanding and polishing. If necessary, a special protective coating is applied for further use.",
        etaps_text73: "After quality control is completed, the product is transferred to composite manufacturing. It is then used as a base for serial production of products.",
        crumbs_home: "Home",
        prod_title: "EXPOTRANS Products",
        prod_sub_title: "Thanks to the experience of our engineering and design team",
        prod_sub_title2: "the company is capable of handling large-scale composite products.",
        prod_slide1: "Aerodynamic elements",
        prod_slide1_list1: "Wing consoles",
        prod_slide1_list2: "Ailerons",
        prod_slide1_list3: "Elevators and rudders",
        prod_slide1_list4: "Flaps",
        prod_slide1_list5: "Tail components",
        prod_slide2: "UAV bodies and housings, aerodynamic fairings",
        prod_slide3: "Unmanned marine systems",
        prod_slide3_list1: "Hull structures of surface unmanned vehicles",
        prod_slide3_list2: "Composite hulls for boat-type vessels",
        prod_slide3_list3: "Sealed structures for operation in aquatic environments",
        prod_slide4: "Structural and functional components",
        prod_slide4_list1: "Load-bearing composite components",
        prod_slide4_list2: "Internal assemblies",
        prod_slide4_list3: "Fasteners / Mounting elements",
        equip_title: "EXPOTRANS Equipment",
        equip_sub_title1: "The availability of",
        equip_sub_title2: "our own engineering and design base",
        equip_sub_title3: "allows the company not only to operate equipment, but also to independently manufacture and program large-scale machines for specific production processes.",
        equip1_title: "Filament winding machine for composite products",
        equip1_text: "Designed for working with carbon or glass fiber roving.",
        equip1_sub_title: "Used for:",
        equip1_item1: "inding reinforcing fibers",
        equip1_item2: "local reinforcement of structures.",
        equip2_title: "3- and 4-axis CNC milling machines",
        equip2_text1: "Machines for machining complex geometric shapes using stationary and rotary methods.",
        equip2_sub_title: "Equipment dimensions:",
        equip2_item1: "Working area: 2100 × 5100 mm",
        equip2_item2: "Machining height: 450 mm",
        equip2_item3: "Maximum part diameter for rotary machining: up to 900 mm",
        equip2_text2: "This equipment enables the machining of both flat and complex three-dimensional parts with high precision.",
        equip3_title: "In-house CNC machine park for machining polystyrene materials",
        equip3_text: "The equipment is configured for specific production tasks and ensures precise shaping of geometry for further finishing or integration into composite structures.",
        equip4_title: "CNC laser cutting machines for plywood cutting",
        equip4_sub_title: "The equipment is used for:",
        equip4_item1: "production of auxiliary tooling and structural components",
        equip4_item2: "manufacturing of mounting elements",
        equip5_title: "Lathe machines",
        equip5_item1: "machining of metal components",
        equip5_item2: "processing of aluminum and other structural components",
        equip5_item3: "production of inserts, bushings, fasteners, and auxiliary elements",
        equip5_text: "This equipment enables the company to handle part of the related machining tasks in-house without outsourcing to third-party manufacturers.",
        equip6_title: "Curing ovens for polymerization",
        equip6_text1: "The company is equipped with large-scale curing ovens for the polymerization of composite products:",
        equip6_sub_title1: "Oven No. 1",
        equip6_sub_title2: "Oven No. 2",
        equip6_sub_title3: "Additional ovens",
        equip6_item11: "Dimensions: 9160 × 24480 × 2300 mm",
        equip6_item12: "Maximum temperature: up to 80°C",
        equip6_item13: "Thermal power: 67.5 kW",
        equip6_item21: "Dimensions: 9160 × 12300 × 2300 mm",
        equip6_item22: "Maximum temperature: up to 160°C",
        equip6_item23: "Thermal power: 67.5 kW",
        equip6_text21: "In addition to large-scale chambers, the company operates four additional 6 × 6 m ovens, which can be used for processing smaller products and assemblies.",
        equip6_text22: "Capability for specialized thermal processes.",
        equip6_text23: "The available equipment and personnel expertise allow not only the polymerization of composite products but also, when required, the application of vulcanization processes for products and assemblies where specified by project technical requirements.",
        equip7_title: "Vacuum and specialized technological systems",
        equip7_text1: "The company is equipped with a complete range of vacuum equipment for vacuum forming processes of composite products.",
        equip7_text2: "The systems include",
        equip7_text3: "vacuum pumps, pipelines, and automation components",
        equip7_text4: "as well as auxiliary equipment for vacuum bagging, controlled vacuum generation, and stable support of the curing process.",
        equip7_text5: "A separate area of the company’s engineering expertise is the capability to develop and manufacture",
        equip7_text6: "autoclave equipment",
        equip7_text7: "At the current stage, this method is not used in serial production processes; however, the existing engineering and production base allows the company to develop solutions in the field of autoclave systems.",
        equip8_title: "Painting chambers",
        equip8_text: "Used for the application of two-component composite finishing coatings.",
        equip9_title: "In-house 3D printing department",
        equip9_sub_title: "50 printers used for:",
        equip9_item1: "production of auxiliary components",
        equip9_item2: "printing of assemblies and inserts",
        equip9_text: "The in-house 3D printing capability reduces production preparation time and increases flexibility in implementing non-standard technical solutions.",
        equip10_title: "3D scanners and reverse engineering",
        equip10_sub_title: "3D scanners are used in the production cycle, enabling:",
        equip10_item1: "digitizing existing products and geometrically complex objects",
        equip10_item2: "performing reverse engineering",
        equip10_item3: "reproducing geometry for further design, scaling, or tooling production",
        equip10_text1: "This is particularly important when working with",
        equip10_text2: "large-scale",
        equip10_text3: "or",
        equip10_text4: "complex-shaped components",
        equip10_text5: ", which can be reproduced by dividing them into separate sections and subsequently assembling them into a single object.",
        cookie_text: "We use cookies to improve user experience. By continuing to browse, you agree to the use of cookies.",
        cookie_learn: "Learn more",
        cookie_allow: "Allow all",
        cookie_reject: "Reject all",
        policy_title: "Privacy Policy",
     
    }
};

function getCurrentLang() {
    return localStorage.getItem('lang') || 'uk';
}

function setSwitchUI(lang) {
    document.querySelectorAll('.lang-switch').forEach(btn => {
        if (lang === 'en') {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

function saveDefaultTexts() {
    document.querySelectorAll('[data-key]').forEach(el => {
        if (!el.dataset.default) {
            el.dataset.default = el.textContent;
        }
        if (el.placeholder && !el.dataset.defaultPlaceholder) {
            el.dataset.defaultPlaceholder = el.placeholder;
        }
    });
}

function setLanguage(lang) {
    const elements = document.querySelectorAll('[data-key]');

    document.body.classList.add('lang-switching');

    setTimeout(() => {

        elements.forEach(el => {
            const key = el.dataset.key;
            const tag = el.tagName.toLowerCase();

            // УКРАЇНСЬКА (дефолт)
            if (lang === 'uk') {
                if (tag === 'input' || tag === 'textarea') {
                    if (el.dataset.defaultPlaceholder) {
                        el.placeholder = el.dataset.defaultPlaceholder;
                    }
                } else {
                    if (el.dataset.default) {
                        el.textContent = el.dataset.default;
                    }
                }
                return;
            }

            // АНГЛІЙСЬКА
            const dict = translations.en;
            if (!dict[key]) return;

            if (tag === 'input' || tag === 'textarea') {
                el.placeholder = dict[key];
            } else {
                el.textContent = dict[key];
            }
        });

        // фікс для твоїх етапів
        setTimeout(() => {
            document.querySelectorAll('.etaps-slide-title').forEach(el => {
                el.dataset.text = el.textContent.trim();
            });
        }, 0);

        // зберігаємо
        localStorage.setItem('lang', lang);

        // синхронізуємо кнопку
        setSwitchUI(lang);

        document.body.classList.remove('lang-switching');

    }, 200);
}


// CLICK HANDLER
document.querySelectorAll('.lang-switch').forEach(btn => {
    btn.addEventListener('click', () => {
        const next = getCurrentLang() === 'uk' ? 'en' : 'uk';
        setLanguage(next);
    });
});


// INIT
document.addEventListener('DOMContentLoaded', () => {
    saveDefaultTexts();

    const lang = getCurrentLang();
    setLanguage(lang);
    setSwitchUI(lang);
});

// form



document.addEventListener('DOMContentLoaded', () => {

    const body = document.body;

    const overlay = document.querySelector('.overlay');
    const formCommunication = document.querySelector('.overlay-form-communication');
    const formThanks = document.querySelector('.overlay-form-thanks');

    const titleAsk = document.querySelector('.overlay-title-ask');
    const titleOrder = document.querySelector('.overlay-title-order');

    const closeBtn = document.querySelector('.close');
    const thanksBtn = document.querySelector('.thanks-btn');

    const askQuestion = document.querySelectorAll('.ask-question');
    const orderService = document.querySelectorAll('.order-a-service');

    // ------------------------
    // ВІДКРИТТЯ
    // ------------------------
    const openOverlay = (type) => {
        overlay?.classList.add('active');

        formCommunication?.classList.remove('d-none');
        formThanks?.classList.add('d-none');

        titleAsk?.classList.add('d-none');
        titleOrder?.classList.add('d-none');

        if (type === 'ask') titleAsk?.classList.remove('d-none');
        if (type === 'order') titleOrder?.classList.remove('d-none');

        body.style.overflow = 'hidden';
    };

    // ------------------------
    // ЗАКРИТТЯ
    // ------------------------
    const closeOverlay = (e) => {
        e?.preventDefault();

        overlay?.classList.remove('active');
        body.style.overflow = 'auto';

        titleAsk?.classList.add('d-none');
        titleOrder?.classList.add('d-none');

        formCommunication?.classList.remove('d-none');
        formThanks?.classList.add('d-none');
    };

    askQuestion.forEach(el => el.addEventListener('click', () => openOverlay('ask')));
    orderService.forEach(el => el.addEventListener('click', () => openOverlay('order')));

    closeBtn?.addEventListener('click', closeOverlay);
    thanksBtn?.addEventListener('click', closeOverlay);


   

});


