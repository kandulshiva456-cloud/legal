const GO_LEGALS_CONFIG = {
    whatsappNumber: "91XXXXXXXXXX",
    formspreeEndpoint: "YOUR_FORMSPREE_ENDPOINT",
    emailAddress: "YOUR_EMAIL_ADDRESS",
    callNumber: "91XXXXXXXXXX",
    companyName: "Go Legals"
};

const HERO_VIDEO = "assets/video/go-legals-hero.mp4";

(function () {
    "use strict";

    var SELECTOR_FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

    var SERVICE_OPTIONS = [
        "Property Purchase",
        "Property Sale",
        "Title Verification",
        "Due Diligence",
        "Sale Agreement",
        "Sale Deed",
        "Builder Property",
        "Resale Property",
        "Agricultural Land",
        "Registration Assistance",
        "Document Review",
        "Mortgage",
        "Gift Deed",
        "Release / Relinquishment",
        "Will Deed",
        "Tri-Party Agreement",
        "Tax / Form 26QB",
        "Legal Consultation",
        "Other"
    ];

    var SERVICE_ALIASES = {
        "complete buyer assist package": "Property Purchase",
        "complete buyer assist": "Property Purchase",
        "buyer assist package": "Property Purchase",
        "registration package": "Registration Assistance",
        "due diligence package": "Due Diligence",
        "weekend registration package": "Registration Assistance",
        "title verification": "Title Verification",
        "title search": "Title Verification",
        "document review": "Document Review",
        "review of any document": "Document Review",
        "registration assistance": "Registration Assistance",
        "sro assistance": "Registration Assistance",
        "sale deed": "Sale Deed",
        "sale agreement": "Sale Agreement",
        "sale deed draft": "Sale Deed",
        "sale agreement draft": "Sale Agreement",
        "form 26qb": "Tax / Form 26QB",
        "tax assistance": "Tax / Form 26QB",
        "tax / form 26qb": "Tax / Form 26QB",
        "tan assistance": "Tax / Form 26QB",
        "agricultural land": "Agricultural Land",
        "agricultural land verification": "Agricultural Land",
        "legal consultation": "Legal Consultation",
        "physical consultation with lawyer": "Legal Consultation",
        "consultation": "Legal Consultation",
        "builder property": "Builder Property",
        "end to end legal assistance (builder property)": "Builder Property",
        "resale property": "Resale Property",
        "end to end legal assistance (resale property)": "Resale Property",
        "mortgage": "Mortgage",
        "mortgage registration": "Mortgage",
        "gift deed": "Gift Deed",
        "will deed": "Will Deed",
        "release deed": "Release / Relinquishment",
        "relinquishment deed": "Release / Relinquishment",
        "tri-party agreement": "Tri-Party Agreement",
        "property purchase": "Property Purchase",
        "property sale": "Property Sale",
        "legal drafting": "Other",
        "poa draft & registration": "Other"
    };

    var doc = document;
    var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    function $(sel, ctx) {
        return (ctx || doc).querySelector(sel);
    }

    function $$(sel, ctx) {
        return Array.prototype.slice.call((ctx || doc).querySelectorAll(sel));
    }

    function isConfigured(value) {
        return typeof value === "string" && value.trim() !== "" && !/[X]{4,}/.test(value);
    }

    function showToast(message) {
        var toast = $("[data-toast]");
        if (!toast) return;
        toast.textContent = message;
        toast.classList.add("is-visible");
        window.clearTimeout(toast._timer);
        toast._timer = window.setTimeout(function () {
            toast.classList.remove("is-visible");
        }, 5200);
    }

    function visibleFocusable(container) {
        return $$(SELECTOR_FOCUSABLE, container).filter(function (el) {
            return el.getClientRects().length > 0;
        });
    }

    function trapTab(container, event) {
        if (event.key !== "Tab") return;
        var items = visibleFocusable(container);
        if (!items.length) return;
        var first = items[0];
        var last = items[items.length - 1];
        if (event.shiftKey && doc.activeElement === first) {
            event.preventDefault();
            last.focus();
        } else if (!event.shiftKey && doc.activeElement === last) {
            event.preventDefault();
            first.focus();
        }
    }

    function lockScroll() {
        var gap = window.innerWidth - doc.documentElement.clientWidth;
        doc.body.style.paddingRight = gap > 0 ? gap + "px" : "";
        doc.body.classList.add("is-locked");
    }

    function unlockScroll() {
        doc.body.classList.remove("is-locked");
        doc.body.style.paddingRight = "";
    }

    function initHeader() {
        var header = $("[data-header]");
        if (!header) return;

        var onScroll = function () {
            header.classList.toggle("is-scrolled", window.scrollY > 24);
        };
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
    }

    function initMobileNav() {
        var toggle = $("[data-nav-toggle]");
        var menu = $("[data-mobile-nav]");
        if (!toggle || !menu) return;

        var closeBtn = $("[data-nav-close]", menu);
        var lastFocus = null;

        function openMenu() {
            var active = doc.activeElement;
            lastFocus = active && active !== doc.body ? active : toggle;
            menu.classList.add("is-open");
            toggle.setAttribute("aria-expanded", "true");
            menu.removeAttribute("aria-hidden");
            lockScroll();
            var target = closeBtn || visibleFocusable(menu)[0];
            if (target) target.focus();
        }

        function closeMenu() {
            menu.classList.remove("is-open");
            toggle.setAttribute("aria-expanded", "false");
            menu.setAttribute("aria-hidden", "true");
            unlockScroll();
            if (lastFocus && lastFocus.focus) lastFocus.focus();
        }

        toggle.addEventListener("click", function () {
            if (menu.classList.contains("is-open")) {
                closeMenu();
            } else {
                openMenu();
            }
        });

        if (closeBtn) closeBtn.addEventListener("click", closeMenu);

        $$("a", menu).forEach(function (link) {
            link.addEventListener("click", closeMenu);
        });

        menu.addEventListener("keydown", function (event) {
            if (event.key === "Escape") {
                event.preventDefault();
                closeMenu();
                return;
            }
            trapTab(menu, event);
        });

        window.addEventListener("resize", function () {
            if (window.innerWidth >= 1000 && menu.classList.contains("is-open")) {
                closeMenu();
            }
        });
    }

    function initHeroVideo() {
        var video = $("[data-hero-video]");
        if (!video) return;

        var applyMotionPreference = function () {
            if (reduceMotion.matches) {
                video.pause();
                try {
                    video.currentTime = 0;
                } catch (err) { /* ignore */ }
            } else {
                var playPromise = video.play();
                if (playPromise && typeof playPromise.catch === "function") {
                    playPromise.catch(function () { /* poster remains visible */ });
                }
            }
        };

        video.addEventListener("error", function () {
            var source = video.querySelector("source");
            if (source && source.getAttribute("src") !== HERO_VIDEO) {
                source.setAttribute("src", HERO_VIDEO);
                video.load();
                applyMotionPreference();
            }
        }, true);

        video.addEventListener("loadeddata", function () {
            doc.documentElement.classList.add("hero-video-ready");
        });

        applyMotionPreference();

        if (typeof reduceMotion.addEventListener === "function") {
            reduceMotion.addEventListener("change", applyMotionPreference);
        }

        window.pauseHeroVideo = function () {
            if (!reduceMotion.matches) video.pause();
        };
        window.resumeHeroVideo = function () {
            if (!reduceMotion.matches) {
                var p = video.play();
                if (p && typeof p.catch === "function") p.catch(function () { });
            }
        };
    }

    function initReveal() {
        var items = $$(".reveal");
        if (!items.length) return;

        if (reduceMotion.matches || !("IntersectionObserver" in window)) {
            items.forEach(function (el) {
                el.classList.add("is-in");
            });
            return;
        }

        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting || entry.boundingClientRect.top < 0) {
                    entry.target.classList.add("is-in");
                    observer.unobserve(entry.target);
                }
            });
        }, { rootMargin: "0px 0px -8% 0px", threshold: [0, 0.08] });

        items.forEach(function (el) {
            observer.observe(el);
        });

        window.setTimeout(function () {
            items.forEach(function (el) {
                if (!el.classList.contains("is-in")) {
                    var rect = el.getBoundingClientRect();
                    if (rect.top < window.innerHeight || rect.bottom < 0) el.classList.add("is-in");
                }
            });
        }, 2500);
    }

    function buildWhatsAppUrl(data) {
        var number = GO_LEGALS_CONFIG.whatsappNumber;
        var lines = [
            "Hello GO LEGALS,",
            "",
            "I would like to discuss a legal matter.",
            ""
        ];

        if (data) {
            var rows = [
                ["Name", data.name],
                ["Phone", data.phone],
                ["Email", data.email],
                ["Service Required", data.service],
                ["Property Type", data.propertyType],
                ["Transaction Stage", data.transactionStage],
                ["Location", data.location],
                ["Property Value", data.propertyValue],
                ["Details", data.details]
            ];
            rows.forEach(function (row) {
                if (row[1]) lines.push(row[0] + ": " + row[1]);
            });
        }

        return "https://wa.me/" + number + "?text=" + encodeURIComponent(lines.join("\n"));
    }

    function openWhatsAppEnquiry(data) {
        if (!isConfigured(GO_LEGALS_CONFIG.whatsappNumber)) {
            showToast("WhatsApp number is not configured yet. Set whatsappNumber in js/script.js (see README).");
            return;
        }
        window.open(buildWhatsAppUrl(data), "_blank", "noopener");
    }

    function buildMailBody(data) {
        var lines = ["Hello GO LEGALS,", "", "I would like to discuss a legal matter.", ""];
        [
            ["Name", data.name],
            ["Phone", data.phone],
            ["Email", data.email],
            ["Preferred Contact", data.preferredContact],
            ["Service Required", data.service],
            ["Property Type", data.propertyType],
            ["Transaction Stage", data.transactionStage],
            ["Location", data.location],
            ["Property Value", data.propertyValue],
            ["Details", data.details]
        ].forEach(function (row) {
            if (row[1]) lines.push(row[0] + ": " + row[1]);
        });
        return lines.join("\n");
    }

    function sendByEmail(data) {
        if (!isConfigured(GO_LEGALS_CONFIG.emailAddress)) {
            showToast("Email address is not configured yet. Set emailAddress in js/script.js (see README).");
            return;
        }
        var subject = "GO LEGALS enquiry — " + (data.service || "Legal assistance");
        var href = "mailto:" + GO_LEGALS_CONFIG.emailAddress +
            "?subject=" + encodeURIComponent(subject) +
            "&body=" + encodeURIComponent(buildMailBody(data));
        window.location.href = href;
    }

    var WIZARD_HTML = [
        '<div class="wz-backdrop" data-wz-backdrop hidden></div>',
        '<div class="wz" data-wz hidden>',
        '<div class="wz__panel" role="dialog" aria-modal="true" aria-label="GO LEGALS consultation enquiry" tabindex="-1" data-wz-panel>',
        '<header class="wz__head">',
        '<div class="wz__topline">',
        '<span class="wz__brand">GO LEGALS</span>',
        '<span class="wz__count" data-wz-count>01 / 04</span>',
        '<button type="button" class="wz__close" data-wz-close aria-label="Close enquiry form">&times;</button>',
        '</div>',
        '<ol class="wz__progress" data-wz-progress>',
        '<li class="wz-chip is-active"><b>01</b><span>Your Details</span></li>',
        '<li class="wz-chip"><b>02</b><span>Legal Requirement</span></li>',
        '<li class="wz-chip"><b>03</b><span>Property Details</span></li>',
        '<li class="wz-chip"><b>04</b><span>Review &amp; Submit</span></li>',
        '</ol>',
        '</header>',
        '<div class="wz__body" data-wz-body>',

        '<section class="wz__pane is-active" data-pane="1" data-step="1">',
        '<div class="wz__pane-head">',
        '<p class="tag">Step 01 — Your Details</p>',
        '<h2>Tell us who you are.</h2>',
        '<p>Share your contact details so we can respond to your legal requirement.</p>',
        '</div>',
        '<div class="field-grid field-grid--pair">',
        '<div class="field"><label for="wz_name">Full Name <span class="field__req">*</span></label>',
        '<input type="text" id="wz_name" name="full_name" autocomplete="name" aria-describedby="wz_name_err">',
        '<p class="field__error" id="wz_name_err"></p></div>',
        '<div class="field"><label for="wz_phone">Phone Number <span class="field__req">*</span></label>',
        '<input type="tel" id="wz_phone" name="phone" autocomplete="tel" inputmode="tel" aria-describedby="wz_phone_err">',
        '<p class="field__error" id="wz_phone_err"></p></div>',
        '</div>',
        '<div class="field"><label for="wz_email">Email <span class="field__req">*</span></label>',
        '<input type="email" id="wz_email" name="email" autocomplete="email" aria-describedby="wz_email_err">',
        '<p class="field__error" id="wz_email_err"></p></div>',
        '<fieldset class="fieldset" data-field="preferred_contact">',
        '<legend class="field__legend">Preferred Contact Method <span class="field__req">*</span></legend>',
        '<div class="opt-grid opt-grid--services">',
        ['WhatsApp', 'Phone', 'Email'].map(function (opt) {
            return '<label class="opt"><input type="radio" name="preferred_contact" value="' + opt + '"><span class="opt__mark opt__mark--radio"></span><span>' + opt + '</span></label>';
        }).join(''),
        '</div>',
        '<p class="field__error" id="wz_contact_err"></p>',
        '</fieldset>',
        '</section>',

        '<section class="wz__pane" data-pane="2" data-step="2">',
        '<div class="wz__pane-head">',
        '<p class="tag">Step 02 — Legal Requirement</p>',
        '<h2>What do you need help with?</h2>',
        '<p>Select every service that applies. You can choose more than one.</p>',
        '</div>',
        '<fieldset class="fieldset" data-field="service">',
        '<legend class="visually-hidden">Service required</legend>',
        '<div class="opt-grid opt-grid--services" data-service-grid>',
        SERVICE_OPTIONS.map(function (opt) {
            return '<label class="opt"><input type="checkbox" name="service" value="' + opt + '"><span class="opt__mark"></span><span>' + opt + '</span></label>';
        }).join(''),
        '</div>',
        '<p class="field__error" id="wz_service_err"></p>',
        '</fieldset>',
        '</section>',

        '<section class="wz__pane" data-pane="3" data-step="3">',
        '<div class="wz__pane-head">',
        '<p class="tag">Step 03 — Property Details</p>',
        '<h2>Details about the property.</h2>',
        '<p>Only what is needed to understand your requirement. Please do not upload documents here.</p>',
        '</div>',
        '<div class="field-grid field-grid--pair">',
        '<div class="field"><label for="wz_prop_type">Property Type <span class="field__req">*</span></label>',
        '<select id="wz_prop_type" name="property_type" aria-describedby="wz_prop_type_err">',
        '<option value="">Select property type</option>',
        ['Residential', 'Commercial', 'Land', 'Agricultural Land', 'Builder Property', 'Resale Property', 'Other'].map(function (o) {
            return '<option>' + o + '</option>';
        }).join(''),
        '</select><p class="field__error" id="wz_prop_type_err"></p></div>',
        '<div class="field"><label for="wz_stage">Transaction Stage</label>',
        '<select id="wz_stage" name="transaction_stage">',
        '<option value="">Select stage</option>',
        ['Planning', 'Negotiating', 'Agreement Stage', 'Registration Stage', 'Post-Registration', 'Need Legal Review', 'Other'].map(function (o) {
            return '<option>' + o + '</option>';
        }).join(''),
        '</select></div>',
        '<div class="field"><label for="wz_location">City / Area</label>',
        '<input type="text" id="wz_location" name="location" autocomplete="address-level2"></div>',
        '<div class="field"><label for="wz_value">Approximate Property Value</label>',
        '<input type="text" id="wz_value" name="property_value" placeholder="Optional" inputmode="numeric"></div>',
        '</div>',
        '<div class="field"><label for="wz_message">Tell Us More</label>',
        '<textarea id="wz_message" name="message" placeholder="A short outline of your requirement"></textarea></div>',

        '<div class="conditional" data-cond="26qb">',
        '<p class="conditional__title">Form 26QB details</p>',
        '<div class="field-grid field-grid--pair">',
        '<div class="field"><label for="wz_buyers">Number of Buyers <span class="field__req">*</span></label>',
        '<input type="number" min="1" id="wz_buyers" name="number_of_buyers" aria-describedby="wz_buyers_err"><p class="field__error" id="wz_buyers_err"></p></div>',
        '<div class="field"><label for="wz_sellers">Number of Sellers <span class="field__req">*</span></label>',
        '<input type="number" min="1" id="wz_sellers" name="number_of_sellers" aria-describedby="wz_sellers_err"><p class="field__error" id="wz_sellers_err"></p></div>',
        '<div class="field"><label for="wz_26qb_type">Property Type</label>',
        '<input type="text" id="wz_26qb_type" name="form26qb_property_type"></div>',
        '<div class="field"><label for="wz_26qb_loc">Location</label>',
        '<input type="text" id="wz_26qb_loc" name="form26qb_location"></div>',
        '</div></div>',

        '<div class="conditional" data-cond="review">',
        '<p class="conditional__title">Document review details</p>',
        '<div class="field-grid field-grid--pair">',
        '<div class="field"><label for="wz_doc_type">Document Type <span class="field__req">*</span></label>',
        '<select id="wz_doc_type" name="document_type" aria-describedby="wz_doc_type_err">',
        '<option value="">Select document type</option>',
        ['Sale Agreement', 'Sale Deed', 'Power of Attorney', 'Will Deed', 'Tri-Party Agreement', 'Title Document', 'Other'].map(function (o) {
            return '<option>' + o + '</option>';
        }).join(''),
        '</select><p class="field__error" id="wz_doc_type_err"></p></div>',
        '<div class="field"><label for="wz_doc_stage">Transaction Stage</label>',
        '<select id="wz_doc_stage" name="review_transaction_stage">',
        '<option value="">Select stage</option>',
        ['Planning', 'Negotiating', 'Agreement Stage', 'Registration Stage', 'Post-Registration', 'Other'].map(function (o) {
            return '<option>' + o + '</option>';
        }).join(''),
        '</select></div>',
        '<div class="field"><label for="wz_doc_loc">Property Location</label>',
        '<input type="text" id="wz_doc_loc" name="review_location"></div>',
        '</div></div>',

        '<div class="conditional" data-cond="consult">',
        '<p class="conditional__title">Consultation details</p>',
        '<div class="field-grid">',
        '<div class="field"><label for="wz_consult_type">Consultation Type <span class="field__req">*</span></label>',
        '<select id="wz_consult_type" name="consultation_type" aria-describedby="wz_consult_err">',
        '<option value="">Select consultation type</option>',
        '<option>Legal Consultation</option>',
        '<option>Physical Consultation with Lawyer</option>',
        '</select><p class="field__error" id="wz_consult_err"></p></div>',
        '<div class="field"><label for="wz_legal_req">Legal Requirement</label>',
        '<input type="text" id="wz_legal_req" name="legal_requirement" placeholder="Brief description of the matter"></div>',
        '<fieldset class="fieldset">',
        '<legend class="field__legend">Preferred Contact Method</legend>',
        '<div class="opt-grid opt-grid--services">',
        ['WhatsApp', 'Phone', 'Email'].map(function (opt) {
            return '<label class="opt"><input type="radio" name="preferred_contact_alt" value="' + opt + '"><span class="opt__mark opt__mark--radio"></span><span>' + opt + '</span></label>';
        }).join(''),
        '</div></fieldset>',
        '</div></div>',

        '<div class="conditional" data-cond="builder">',
        '<p class="conditional__title">Builder property details</p>',
        '<div class="field-grid field-grid--pair">',
        '<div class="field"><label for="wz_builder_name">Project / Builder Name</label>',
        '<input type="text" id="wz_builder_name" name="builder_project"></div>',
        '<div class="field"><label for="wz_builder_poss">Possession Status</label>',
        '<select id="wz_builder_poss" name="builder_possession">',
        '<option value="">Select status</option>',
        ['Ready to move', 'Under construction', 'Not decided'].map(function (o) {
            return '<option>' + o + '</option>';
        }).join(''),
        '</select></div>',
        '</div></div>',

        '<div class="conditional" data-cond="resale">',
        '<p class="conditional__title">Resale property details</p>',
        '<div class="field-grid field-grid--pair">',
        '<div class="field"><label for="wz_resale_age">Property Age</label>',
        '<select id="wz_resale_age" name="resale_age">',
        '<option value="">Select age</option>',
        ['0–5 years', '6–10 years', '11–20 years', 'Above 20 years', 'Not sure'].map(function (o) {
            return '<option>' + o + '</option>';
        }).join(''),
        '</select></div>',
        '<div class="field"><label for="wz_resale_occ">Occupancy</label>',
        '<select id="wz_resale_occ" name="resale_occupancy">',
        '<option value="">Select occupancy</option>',
        ['Occupied', 'Vacant', 'Not sure'].map(function (o) {
            return '<option>' + o + '</option>';
        }).join(''),
        '</select></div>',
        '</div></div>',
        '</section>',

        '<section class="wz__pane" data-pane="4" data-step="4">',
        '<div class="wz__pane-head">',
        '<p class="tag">Step 04 — Review &amp; Submit</p>',
        '<h2>Review your enquiry.</h2>',
        '<p>Check the details below, edit anything that needs changing, then choose how to send it.</p>',
        '</div>',
        '<dl class="review-list" data-review></dl>',
        '<div class="panel panel--notice" data-doc-warning hidden>',
        '<p class="panel__title">Please note</p>',
        '<p>Please do not upload confidential property or identity documents through this initial enquiry form. A secure document-sharing process can be discussed after your enquiry.</p>',
        '</div>',
        '<p class="footer-note" data-consent>By submitting this enquiry, you agree that GO LEGALS may contact you regarding your request.</p>',
        '<div class="submit-options">',
        '<button type="button" class="submit-option submit-option--wa" data-submit="whatsapp"><b>Continue on WhatsApp</b><span>Opens WhatsApp with your enquiry details, ready to send.</span></button>',
        '<button type="button" class="submit-option" data-submit="email"><b>Send by Email</b><span>Opens your email app with the enquiry written out.</span></button>',
        '<button type="button" class="submit-option submit-option--primary" data-submit="form"><b>Submit Consultation Request</b><span>Sends your enquiry directly to GO LEGALS.</span></button>',
        '</div>',
        '</section>',

        '<section class="wz__pane" data-pane="success">',
        '<div class="result">',
        '<span class="result__mark" aria-hidden="true">&#10003;</span>',
        '<h2>Thank You.</h2>',
        '<p>Your enquiry has been received. A member of GO LEGALS will review your requirement and get in touch with you.</p>',
        '<div class="result__actions">',
        '<button type="button" class="btn btn-secondary" data-wz-close>Close</button>',
        '<button type="button" class="btn btn-whatsapp" data-submit="whatsapp">Continue on WhatsApp</button>',
        '</div>',
        '</div>',
        '</section>',

        '<section class="wz__pane" data-pane="error">',
        '<div class="result result--error">',
        '<span class="result__mark" aria-hidden="true">!</span>',
        '<h2>Submission Failed.</h2>',
        '<p>We couldn\'t submit your enquiry right now. Please try again or continue on WhatsApp.</p>',
        '<p class="footer-note" data-error-note hidden></p>',
        '<div class="result__actions">',
        '<button type="button" class="btn btn-secondary" data-retry>Try Again</button>',
        '<button type="button" class="btn btn-whatsapp" data-submit="whatsapp">Continue on WhatsApp</button>',
        '</div>',
        '</div>',
        '</section>',

        '</div>',
        '<footer class="wz__foot" data-wz-foot>',
        '<button type="button" class="btn wz__back" data-wz-back hidden>Back</button>',
        '<button type="button" class="btn btn-primary" data-wz-next>Continue</button>',
        '</footer>',
        '</div>',
        '</div>'
    ].join("");

    var wizard = null;
    var backdrop = null;
    var panel = null;
    var body = null;
    var foot = null;
    var lastTrigger = null;
    var currentStep = 1;
    var preselectedService = null;

    function initWizard() {
        doc.body.insertAdjacentHTML("beforeend", WIZARD_HTML);
        wizard = $("[data-wz]");
        backdrop = $("[data-wz-backdrop]");
        panel = $("[data-wz-panel]");
        body = $("[data-wz-body]");
        foot = $("[data-wz-foot]");

        $("[data-wz-close]", panel).addEventListener("click", closeEnquiryWizard);
        backdrop.addEventListener("click", closeEnquiryWizard);

        $("[data-wz-next]", panel).addEventListener("click", function () {
            if (!validateStep(currentStep)) return;
            if (currentStep < 4) {
                showStep(currentStep + 1);
            }
        });

        $("[data-wz-back]", panel).addEventListener("click", function () {
            if (currentStep > 1) showStep(currentStep - 1);
        });

        panel.addEventListener("keydown", function (event) {
            if (event.key === "Escape") {
                event.preventDefault();
                closeEnquiryWizard();
                return;
            }
            trapTab(panel, event);
        });

        $$('input[name="service"]', panel).forEach(function (input) {
            input.addEventListener("change", function () {
                clearFieldError(input.closest("[data-field]"));
                updateConditionals();
            });
        });

        $$('input[name="preferred_contact"], input[name="preferred_contact_alt"]', panel).forEach(function (input) {
            input.addEventListener("change", function () {
                var group = input.getAttribute("name");
                var counterpart = group === "preferred_contact" ? "preferred_contact_alt" : "preferred_contact";
                $$('input[name="' + counterpart + '"]', panel).forEach(function (other) {
                    other.checked = other.value === input.value;
                });
                clearFieldError($('[data-field="preferred_contact"]', panel));
            });
        });

        $$("input, select, textarea", panel).forEach(function (el) {
            el.addEventListener("input", function () {
                var field = el.closest(".field");
                if (field) clearFieldError(field);
            });
            el.addEventListener("change", function () {
                var field = el.closest(".field");
                if (field) clearFieldError(field);
            });
        });

        body.addEventListener("click", function (event) {
            var edit = event.target.closest("[data-edit]");
            if (edit) {
                showStep(parseInt(edit.getAttribute("data-edit"), 10));
                return;
            }
            var submit = event.target.closest("[data-submit]");
            if (submit) {
                handleSubmit(submit.getAttribute("data-submit"), submit);
                return;
            }
            var retry = event.target.closest("[data-retry]");
            if (retry) {
                showStep(4);
            }
        });

        var openFromHash = function () {
            if (window.location.hash === "#enquire") {
                window.setTimeout(function () {
                    openEnquiryWizard("");
                }, 350);
            }
        };

        openFromHash();
        window.addEventListener("hashchange", openFromHash);
    }

    function clearFieldError(scope) {
        if (!scope) return;
        scope.classList.remove("has-error");
        var err = scope.querySelector(".field__error");
        if (err) err.textContent = "";
        var control = scope.querySelector("input, select, textarea");
        if (control) control.removeAttribute("aria-invalid");
    }

    function setFieldError(input, message) {
        var field = input.closest(".field");
        if (!field) return;
        field.classList.add("has-error");
        var err = field.querySelector(".field__error");
        if (err) err.textContent = message;
        input.setAttribute("aria-invalid", "true");
    }

    function setGroupError(fieldset, message) {
        var err = fieldset.querySelector(".field__error");
        if (err) err.textContent = message;
    }

    function selectedServices() {
        return $$('input[name="service"]:checked', panel).map(function (i) {
            return i.value;
        });
    }

    function preferredContact() {
        var checked = $('input[name="preferred_contact"]:checked', panel) ||
            $('input[name="preferred_contact_alt"]:checked', panel);
        return checked ? checked.value : "";
    }

    function isCondVisible(name) {
        var block = $('[data-cond="' + name + '"]', panel);
        return !!block && block.classList.contains("is-visible");
    }

    function updateConditionals() {
        var services = selectedServices().map(function (s) {
            return s.toLowerCase();
        });
        var map = {
            "26qb": services.indexOf("tax / form 26qb") > -1,
            "review": services.indexOf("document review") > -1,
            "consult": services.indexOf("legal consultation") > -1,
            "builder": services.indexOf("builder property") > -1,
            "resale": services.indexOf("resale property") > -1
        };
        Object.keys(map).forEach(function (key) {
            var block = $('[data-cond="' + key + '"]', panel);
            if (!block) return;
            block.classList.toggle("is-visible", map[key]);
            block.setAttribute("aria-hidden", map[key] ? "false" : "true");
        });
    }

    function validateStep(step) {
        var ok = true;

        if (step === 1) {
            var name = $("#wz_name", panel);
            var phone = $("#wz_phone", panel);
            var email = $("#wz_email", panel);
            var contactField = $('[data-field="preferred_contact"]', panel);

            if (name.value.trim().length < 2) {
                setFieldError(name, "Please enter your full name.");
                ok = false;
            }
            var digits = phone.value.replace(/\D/g, "");
            if (digits.length < 8 || digits.length > 15 || phone.value.trim().length < 8) {
                setFieldError(phone, "Please enter a valid phone number.");
                ok = false;
            }
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.value.trim())) {
                setFieldError(email, "Please enter a valid email address.");
                ok = false;
            }
            if (!preferredContact()) {
                setGroupError(contactField, "Please choose a preferred contact method.");
                ok = false;
            }
            if (!ok) focusFirstError();
        }

        if (step === 2) {
            if (!selectedServices().length) {
                setGroupError($('[data-field="service"]', panel), "Please select at least one service.");
                ok = false;
                focusFirstError();
            }
        }

        if (step === 3) {
            var propType = $("#wz_prop_type", panel);
            if (!propType.value) {
                setFieldError(propType, "Please select a property type.");
                ok = false;
            }

            if (isCondVisible("26qb")) {
                var buyers = $("#wz_buyers", panel);
                var sellers = $("#wz_sellers", panel);
                if (!buyers.value || parseInt(buyers.value, 10) < 1) {
                    setFieldError(buyers, "Please enter the number of buyers.");
                    ok = false;
                }
                if (!sellers.value || parseInt(sellers.value, 10) < 1) {
                    setFieldError(sellers, "Please enter the number of sellers.");
                    ok = false;
                }
            }

            if (isCondVisible("review")) {
                var docType = $("#wz_doc_type", panel);
                if (!docType.value) {
                    setFieldError(docType, "Please select the document type.");
                    ok = false;
                }
            }

            if (isCondVisible("consult")) {
                var consult = $("#wz_consult_type", panel);
                if (!consult.value) {
                    setFieldError(consult, "Please select a consultation type.");
                    ok = false;
                }
            }
            if (!ok) focusFirstError();
        }

        return ok;
    }

    function focusFirstError() {
        var err = $(".field.has-error input, .field.has-error select, .field.has-error textarea", panel);
        if (err) {
            err.focus();
            return;
        }
        var group = $(".fieldset .field__error:not(:empty)", panel);
        if (group) {
            var input = group.closest(".fieldset").querySelector("input");
            if (input) input.focus();
        }
    }

    function collectData() {
        var services = selectedServices();
        var serviceValue = services.join(", ");
        if (preselectedService && !services.some(function (s) {
            return s.toLowerCase() === preselectedService.toLowerCase();
        })) {
            serviceValue = preselectedService + (serviceValue ? " (+ " + serviceValue + ")" : "");
        }

        var data = {
            name: $("#wz_name", panel).value.trim(),
            phone: $("#wz_phone", panel).value.trim(),
            email: $("#wz_email", panel).value.trim(),
            preferredContact: preferredContact(),
            service: serviceValue,
            propertyType: $("#wz_prop_type", panel).value,
            transactionStage: $("#wz_stage", panel).value,
            location: $("#wz_location", panel).value.trim(),
            propertyValue: $("#wz_value", panel).value.trim(),
            details: $("#wz_message", panel).value.trim()
        };

        var extras = [];
        if (isCondVisible("26qb")) {
            extras.push("Form 26QB — Buyers: " + ($("#wz_buyers", panel).value || "—") +
                ", Sellers: " + ($("#wz_sellers", panel).value || "—") +
                ($("#wz_26qb_type", panel).value ? ", Property: " + $("#wz_26qb_type", panel).value : "") +
                ($("#wz_26qb_loc", panel).value ? ", Location: " + $("#wz_26qb_loc", panel).value : ""));
        }
        if (isCondVisible("review")) {
            extras.push("Document review — " + ($("#wz_doc_type", panel).value || "—") +
                ($("#wz_doc_stage", panel).value ? ", Stage: " + $("#wz_doc_stage", panel).value : "") +
                ($("#wz_doc_loc", panel).value ? ", Location: " + $("#wz_doc_loc", panel).value : ""));
        }
        if (isCondVisible("consult")) {
            extras.push("Consultation — " + ($("#wz_consult_type", panel).value || "—") +
                ($("#wz_legal_req", panel).value ? ", Requirement: " + $("#wz_legal_req", panel).value : ""));
        }
        if (isCondVisible("builder")) {
            extras.push("Builder property" +
                ($("#wz_builder_name", panel).value ? " — " + $("#wz_builder_name", panel).value : "") +
                ($("#wz_builder_poss", panel).value ? " (" + $("#wz_builder_poss", panel).value + ")" : ""));
        }
        if (isCondVisible("resale")) {
            extras.push("Resale property" +
                ($("#wz_resale_age", panel).value ? " — Age: " + $("#wz_resale_age", panel).value : "") +
                ($("#wz_resale_occ", panel).value ? ", Occupancy: " + $("#wz_resale_occ", panel).value : ""));
        }
        if (extras.length) {
            data.details = data.details ? data.details + "\n" + extras.join("\n") : extras.join("\n");
        }

        return data;
    }

    function renderReview() {
        var data = collectData();
        var list = $("[data-review]", panel);
        var rows = [
            ["Name", data.name, 1],
            ["Phone", data.phone, 1],
            ["Email", data.email, 1],
            ["Preferred Contact", data.preferredContact, 1],
            ["Service", data.service, 2],
            ["Property Type", data.propertyType, 3],
            ["Transaction Stage", data.transactionStage, 3],
            ["Location", data.location, 3],
            ["Property Value", data.propertyValue, 3],
            ["Additional Details", data.details, 3]
        ];

        list.innerHTML = rows.map(function (row) {
            var value = row[1] || "";
            var cls = value ? "" : " class=\"is-empty\"";
            var text = value ? escapeHtml(value) : "Not provided";
            return '<div class="review-row">' +
                '<dt>' + row[0] + '</dt>' +
                '<button type="button" class="review-edit" data-edit="' + row[2] + '">Edit</button>' +
                '<dd' + cls + '>' + text + '</dd>' +
                '</div>';
        }).join("");

        var warning = $("[data-doc-warning]", panel);
        if (warning) warning.hidden = selectedServices().indexOf("Document Review") === -1;
    }

    function escapeHtml(str) {
        return String(str)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;");
    }

    function showStep(step) {
        currentStep = step;

        $$("[data-pane]", panel).forEach(function (pane) {
            var id = pane.getAttribute("data-pane");
            var active = id === String(step);
            pane.classList.toggle("is-active", active);
        });

        $$("li", $("[data-wz-progress]", panel)).forEach(function (chip, idx) {
            chip.classList.toggle("is-active", idx + 1 === step);
            chip.classList.toggle("is-done", idx + 1 < step);
        });

        var count = $("[data-wz-count]", panel);
        if (count) count.textContent = "0" + step + " / 04";

        var back = $("[data-wz-back]", panel);
        var next = $("[data-wz-next]", panel);
        back.hidden = step === 1;
        next.hidden = step === 4;
        foot.hidden = false;

        if (step === 4) renderReview();

        if (step !== 1) updateConditionals();

        body.scrollTop = 0;

        var heading = $('[data-pane="' + step + '"] h2', panel);
        if (heading) {
            heading.setAttribute("tabindex", "-1");
            heading.focus({ preventScroll: true });
        }
    }

    function showResult(name) {
        $$("[data-pane]", panel).forEach(function (pane) {
            pane.classList.toggle("is-active", pane.getAttribute("data-pane") === name);
        });
        foot.hidden = true;
        body.scrollTop = 0;
        var pane = $('[data-pane="' + name + '"]', panel);
        var heading = pane ? pane.querySelector("h2") : null;
        if (heading) {
            heading.setAttribute("tabindex", "-1");
            heading.focus({ preventScroll: true });
        }
    }

    function openEnquiryWizard(serviceName) {
        if (!panel) return;
        lastTrigger = doc.activeElement;

        if (typeof serviceName === "string" && serviceName.trim()) {
            preselectService(serviceName.trim());
        }

        updateConditionals();
        wizard.hidden = false;
        backdrop.hidden = false;
        lockScroll();
        if (window.pauseHeroVideo) window.pauseHeroVideo();

        window.requestAnimationFrame(function () {
            wizard.classList.add("is-open");
            backdrop.classList.add("is-open");
        });

        showStep(1);

        window.setTimeout(function () {
            var first = $("#wz_name", panel);
            if (first && first.offsetParent !== null) first.focus({ preventScroll: true });
            else panel.focus({ preventScroll: true });
        }, 120);
    }

    function closeEnquiryWizard() {
        if (!panel || wizard.hidden) return;
        wizard.classList.remove("is-open");
        backdrop.classList.remove("is-open");
        unlockScroll();
        if (window.resumeHeroVideo) window.resumeHeroVideo();

        window.setTimeout(function () {
            wizard.hidden = true;
            backdrop.hidden = true;
        }, 380);

        if (lastTrigger && lastTrigger.focus && doc.contains(lastTrigger)) {
            lastTrigger.focus();
        }
    }

    function preselectService(name) {
        preselectedService = name;
        var lower = name.toLowerCase();
        var direct = SERVICE_OPTIONS.filter(function (opt) {
            return opt.toLowerCase() === lower;
        })[0];
        var target = direct || SERVICE_ALIASES[lower] || "Other";

        var inputs = $$('input[name="service"]', panel);
        inputs.forEach(function (input) {
            if (input.value === target) input.checked = true;
        });
        updateConditionals();
    }

    function handleSubmit(kind, button) {
        var data = collectData();

        if (kind === "whatsapp") {
            openWhatsAppEnquiry(data);
            return;
        }

        if (kind === "email") {
            sendByEmail(data);
            return;
        }

        var endpoint = GO_LEGALS_CONFIG.formspreeEndpoint;
        var configured = isConfigured(endpoint) && /^https?:\/\//i.test(endpoint);

        if (!configured) {
            var note = $("[data-error-note]", panel);
            if (note) {
                note.hidden = false;
                note.textContent = "Formspree is not configured yet — set formspreeEndpoint in js/script.js (see README) or use WhatsApp and email.";
            }
            showResult("error");
            return;
        }

        var payload = {
            full_name: data.name,
            phone: data.phone,
            email: data.email,
            preferred_contact: data.preferredContact,
            service: data.service,
            property_type: data.propertyType,
            transaction_stage: data.transactionStage,
            location: data.location,
            property_value: data.propertyValue,
            message: data.details,
            _subject: "GO LEGALS enquiry — " + (data.service || "Legal assistance"),
            _gotcha: ""
        };

        var original = button.innerHTML;
        button.disabled = true;
        button.innerHTML = '<span class="spinner" aria-hidden="true"></span> Sending…';

        fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(payload)
        }).then(function (response) {
            button.disabled = false;
            button.innerHTML = original;
            if (response.ok) {
                showResult("success");
            } else {
                throw new Error("Submission failed");
            }
        }).catch(function () {
            button.disabled = false;
            button.innerHTML = original;
            var note = $("[data-error-note]", panel);
            if (note) {
                note.hidden = false;
                note.textContent = "The form service did not accept the request. You can continue on WhatsApp or try again.";
            }
            showResult("error");
        });
    }

    function initServiceFilter() {
        var search = $("[data-svc-search]");
        var chips = $$("[data-filter]");
        var items = $$("[data-svc]");
        var blocks = $$("[data-cat-block]");
        var countEl = $("[data-svc-count]");
        var empty = $("[data-svc-empty]");
        if (!items.length) return;

        var activeCategory = "all";

        function apply() {
            var query = (search && search.value ? search.value : "").trim().toLowerCase();
            var visible = 0;

            items.forEach(function (item) {
                var category = item.getAttribute("data-category");
                var haystack = (item.textContent || "").toLowerCase();
                var matchCategory = activeCategory === "all" || category === activeCategory;
                var matchQuery = !query || haystack.indexOf(query) > -1;
                var show = matchCategory && matchQuery;
                item.hidden = !show;
                if (show) visible += 1;
            });

            blocks.forEach(function (block) {
                var shown = $$("[data-svc]", block).filter(function (i) {
                    return !i.hidden;
                }).length;
                block.hidden = shown === 0;
                var counter = $("[data-cat-count]", block);
                if (counter) counter.textContent = shown + (shown === 1 ? " service" : " services");
            });

            if (countEl) {
                countEl.textContent = "Showing " + visible + " of " + items.length + " services";
            }
            if (empty) empty.hidden = visible !== 0;
        }

        if (search) {
            search.addEventListener("input", apply);
            search.addEventListener("search", apply);
        }

        chips.forEach(function (chip) {
            chip.addEventListener("click", function () {
                activeCategory = chip.getAttribute("data-filter");
                chips.forEach(function (other) {
                    other.setAttribute("aria-pressed", other === chip ? "true" : "false");
                });
                apply();
            });
        });

        apply();
    }

    function initContactLinks() {
        $$("[data-wa-link]").forEach(function (link) {
            if (isConfigured(GO_LEGALS_CONFIG.whatsappNumber)) {
                link.setAttribute("href", "https://wa.me/" + GO_LEGALS_CONFIG.whatsappNumber);
            } else {
                link.setAttribute("href", "#");
                link.setAttribute("title", "WhatsApp number not configured yet");
            }
            link.addEventListener("click", function (event) {
                if (!isConfigured(GO_LEGALS_CONFIG.whatsappNumber)) {
                    event.preventDefault();
                    showToast("WhatsApp number is not configured yet. Set whatsappNumber in js/script.js (see README).");
                }
            });
        });

        $$("[data-tel-link]").forEach(function (link) {
            if (isConfigured(GO_LEGALS_CONFIG.callNumber)) {
                link.setAttribute("href", "tel:+" + GO_LEGALS_CONFIG.callNumber);
            } else {
                link.setAttribute("href", "#");
            }
            link.addEventListener("click", function (event) {
                if (!isConfigured(GO_LEGALS_CONFIG.callNumber)) {
                    event.preventDefault();
                    showToast("Phone number is not configured yet. Set callNumber in js/script.js (see README).");
                }
            });
        });

        $$("[data-mail-link]").forEach(function (link) {
            if (isConfigured(GO_LEGALS_CONFIG.emailAddress)) {
                link.setAttribute("href", "mailto:" + GO_LEGALS_CONFIG.emailAddress);
            }
            link.addEventListener("click", function (event) {
                if (!isConfigured(GO_LEGALS_CONFIG.emailAddress)) {
                    event.preventDefault();
                    showToast("Email address is not configured yet. Set emailAddress in js/script.js (see README).");
                }
            });
        });
    }

    function initEnquiryTriggers() {
        doc.addEventListener("click", function (event) {
            var trigger = event.target.closest("[data-enquiry]");
            if (!trigger) return;
            event.preventDefault();
            openEnquiryWizard(trigger.getAttribute("data-enquiry") || "");
        });
    }

    function initToast() {
        if (!$("[data-toast]")) {
            var el = doc.createElement("div");
            el.className = "toast";
            el.setAttribute("data-toast", "");
            el.setAttribute("role", "status");
            el.setAttribute("aria-live", "polite");
            doc.body.appendChild(el);
        }
    }

    function boot() {
        initToast();
        initHeader();
        initMobileNav();
        initHeroVideo();
        initReveal();
        initWizard();
        initEnquiryTriggers();
        initContactLinks();
        initServiceFilter();
    }

    window.openEnquiryWizard = openEnquiryWizard;
    window.openWhatsAppEnquiry = openWhatsAppEnquiry;
    window.GO_LEGALS_CONFIG = GO_LEGALS_CONFIG;

    if (doc.readyState === "loading") {
        doc.addEventListener("DOMContentLoaded", boot);
    } else {
        boot();
    }
})();
