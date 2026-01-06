import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Complete translations for all 6 languages
const resources = {
    // ENGLISH
    en: {
        translation: {
            nav: {
                what_we_do: "What We Do",
                programs: "Our Programs",
                programs_desc: "Training and development initiatives",
                education_skills: "Education & Skills",
                education_desc: "World-class educational opportunities",
                youth_employment: "Youth Employment",
                employment_desc: "Career development and placements",
                tech_innovation: "Technology & Innovation",
                tech_desc: "Tech skills for the future",
                gender_equality: "Gender Equality",
                gender_desc: "Women in tech initiatives",
                research_reports: "Research & Reports",
                publications: "Publications",
                reports_desc: "Reports and research papers",
                data_statistics: "Data & Statistics",
                impact_metrics: "Impact metrics and analytics",
                annual_reports: "Annual Reports",
                yearly_achievements: "Yearly achievements",
                stories: "Stories",
                success_stories: "Success Stories",
                transformative_journeys: "Transformative journeys",
                blog: "Blog",
                latest_news: "Latest news and insights",
                impact_data: "Impact Data",
                impact_numbers: "See our impact in numbers",
                who_we_are: "Who We Are",
                our_mission: "Our Mission",
                vision_values: "Vision and values",
                team: "Team",
                meet_people: "Meet our people",
                partners: "Partners",
                orgs_work_with: "Organizations we work with",
                about_us: "About Us",
                learn_more: "Learn more about DirectEd Development Foundation",
                take_action: "Take Action",
                donate: "Donate",
                support_mission: "Support our mission",
                volunteer: "Volunteer",
                give_time: "Give your time",
                partner_with_us: "Partner With Us",
                collaborate: "Collaborate for impact",
                press_centre: "Press Centre",
                menu: "Menu",
                login: "Login",
                logout: "Logout"
            },
            hero: {
                slide1: {
                    title: "Empowering Africa's Next Generation of Tech Leaders",
                    subtitle: "World-class training and remote paid internships with US and European companies. Web development, UIX and Artificial Intelligence.",
                    cta: "Discover Our Programs"
                },
                slide2: {
                    title: "Connecting Talent with Global Opportunities",
                    subtitle: "We bridge the gap between high-potential talents and the world's best education to fill skill gaps in the global jobs market.",
                    cta: "Learn More"
                },
                slide3: {
                    title: "Transforming Lives Through Education",
                    subtitle: "A world in which any person can realise their full potential, regardless of their draw in the lottery of life.",
                    cta: "Join Our Mission"
                }
            },
            stats: {
                students_trained: "Students Trained",
                partner_schools: "Partner Schools",
                job_placements: "Job Placements",
                corporate_partners: "Corporate Partners"
            },
            mission: {
                badge: "Our Vision",
                title: "A World Where Potential Knows No Boundaries",
                description: "We believe that every person deserves the opportunity to realize their full potential, regardless of where they were born. Through world-class education and direct connections to global opportunities, we're breaking down barriers and building bridges to brighter futures.",
                cta: "Learn About Our Mission"
            },
            news: {
                title: "DirectEd Development Foundation, for Every Learner",
                subtitle: "Stay updated with our latest stories, research, and impact"
            },
            features: {
                badge: "Why Choose DirectEd",
                title: "Built for Impact. Designed for Success.",
                subtitle: "Our comprehensive approach ensures sustainable growth and real-world outcomes",
                proven_track_record: {
                    title: "Proven Track Record",
                    description: "Over 500 students trained with 200+ successful job placements in leading tech companies globally."
                },
                comprehensive_training: {
                    title: "Comprehensive Training",
                    description: "From 1-week intro courses to 4-month intensive bootcamps and 8-month paid internships."
                },
                career_growth: {
                    title: "Career Growth",
                    description: "Direct pathways to employment with US and European companies, bridging the global talent gap."
                }
            },
            spotlight: {
                badge: "Spotlight",
                title: "Our Focus Areas",
                subtitle: "Discover the key areas where DirectEd Development Foundation is making an impact",
                education: {
                    title: "Education & Skills Development",
                    description: "World-class technology education unlocking potential"
                },
                employment: {
                    title: "Youth Employment",
                    description: "Connecting talent with global opportunities"
                },
                gender: {
                    title: "Gender Equality in Tech",
                    description: "Promoting equal opportunities for women in tech"
                },
                explore: "Explore"
            },
            programs: {
                badge: "Our Approach",
                title: "From Training to Career: A Complete Journey",
                description: "Starting with a 1-week introductory course, followed by a 4-month intensive bootcamp, and then placement into 8-month paid internships. Our program is designed using insights from frontier scientific research and state-of-the-art technology trends.",
                cta: "Explore Our Programs",
                web_dev: "Web Development & Software Engineering",
                uiux: "UI/UX Design & Product Management",
                ai: "Artificial Intelligence & Data Science",
                hero_title: "Our Programs",
                hero_subtitle: "Discover our initiatives making a difference in communities around the world. Each program is designed to create lasting, sustainable impact.",
                all_programs: "All Programs",
                no_programs: "No programs available",
                check_back: "Check back soon for new programs and initiatives."
            },
            partners: {
                title: "Our Partners",
                subtitle: "Working together to create lasting impact"
            },
            cta: {
                title: "Join Us in Transforming Lives",
                description: "Whether you want to donate, volunteer, or partner with us, there are many ways to support our mission and help create opportunities for Africa's next generation.",
                get_involved: "Get Involved",
                learn_more: "Learn More"
            },
            footer: {
                description: "Empowering Africa's next generation of tech leaders through world-class education and global opportunities.",
                quick_links: "Quick Links",
                programs: "Programs",
                about_us: "About Us",
                contact: "Contact",
                legal: "Legal",
                privacy_policy: "Privacy Policy",
                terms_of_service: "Terms of Service",
                cookie_policy: "Cookie Policy",
                connect: "Connect",
                rights_reserved: "All rights reserved."
            },
            common: {
                loading: "Loading...",
                error: "An error occurred",
                save: "Save",
                cancel: "Cancel",
                edit: "Edit",
                delete: "Delete",
                submit: "Submit",
                search: "Search",
                view_all: "View All",
                read_more: "Read More",
                learn_more: "Learn more",
                back: "Back",
                next: "Next",
                previous: "Previous"
            },
            admin: {
                edit_mode: "Edit Mode",
                edit_mode_on: "Edit Mode: ON",
                edit_mode_off: "Edit Mode: OFF",
                save_changes: "Save Changes",
                discard_changes: "Discard Changes",
                changes_saved: "Changes saved successfully",
                changes_discarded: "Changes discarded",
                admin_controls: "Admin Controls",
                pending_changes: "pending changes"
            },
            auth: {
                welcome_back: "Welcome Back",
                create_account: "Create Account",
                sign_in: "Sign In",
                sign_up: "Sign Up",
                email: "Email",
                password: "Password",
                full_name: "Full Name",
                signing_in: "Signing in...",
                creating_account: "Creating account...",
                no_account: "Don't have an account? Sign up",
                have_account: "Already have an account? Sign in",
                sign_in_description: "Sign in to your account",
                sign_up_description: "Create a new account to get started"
            },
            // About page
            about: {
                hero_title: "Who We Are",
                hero_subtitle: "A mission-driven organization dedicated to empowering Africa's next generation of tech leaders.",
                our_vision: "Our Vision",
                vision_title: "A World Where Potential Knows No Boundaries",
                vision_desc_1: "We believe that every person deserves the opportunity to realize their full potential, regardless of where they were born. Our vision is a world where talent, not geography, determines success.",
                vision_desc_2: "Through world-class education and direct connections to global opportunities, we're breaking down barriers and building bridges to brighter futures.",
                our_values: "Our Values"
            },
            // Values
            values: {
                excellence: "Excellence",
                excellence_desc: "We strive for the highest standards in everything we do",
                compassion: "Compassion",
                compassion_desc: "We care deeply about the communities we serve",
                transparency: "Transparency",
                transparency_desc: "We operate with openness and accountability"
            },
            // What We Do page
            whatwedo: {
                hero_title: "What We Do",
                hero_subtitle: "We provide world-class education and career opportunities to talented individuals across Africa, connecting them with global companies and transforming lives through technology.",
                programs_title: "Our Programs",
                programs_subtitle: "Comprehensive training programs designed to prepare you for success in the global tech industry.",
                journey_title: "The Journey",
                journey_subtitle: "A structured path from learning to earning",
                web_dev: "Web Development",
                web_dev_desc: "Full-stack development training covering modern frameworks, best practices, and real-world project experience.",
                uiux: "UI/UX Design",
                uiux_desc: "User-centered design principles, prototyping tools, and creating compelling digital experiences.",
                ai: "Artificial Intelligence",
                ai_desc: "Machine learning fundamentals, data science, and practical AI application development.",
                leadership: "Leadership & Soft Skills",
                leadership_desc: "Communication, teamwork, and professional development for the global workplace.",
                step1_title: "Introductory Course",
                step1_duration: "1 Week",
                step1_desc: "Foundation skills assessment and orientation",
                step2_title: "Intensive Bootcamp",
                step2_duration: "4 Months",
                step2_desc: "Deep technical training with hands-on projects",
                step3_title: "Paid Internship",
                step3_duration: "8 Months",
                step3_desc: "Real work experience with global companies"
            },
            // Stories page
            stories: {
                hero_title: "Success Stories",
                hero_subtitle: "Discover the transformative journeys of DirectED students who are building brighter futures through technology education and career opportunities.",
                coming_soon: "Stories coming soon..."
            },
            // Take Action page
            takeaction: {
                hero_title: "Take Action",
                hero_subtitle: "Join us in creating opportunities for Africa's next generation of tech leaders. There are many ways to make a difference.",
                donate: "Donate",
                donate_desc: "Your contribution directly funds scholarships, training resources, and program expansion.",
                donate_cta: "Donate Now",
                volunteer: "Volunteer",
                volunteer_desc: "Share your expertise as a mentor, instructor, or career advisor for our students.",
                volunteer_cta: "Join as Volunteer",
                advocate: "Advocate",
                advocate_desc: "Help spread the word about our mission and the importance of tech education.",
                advocate_cta: "Become an Advocate",
                partner: "Partner",
                partner_desc: "Organizations can partner with us for internship placements and corporate sponsorship.",
                partner_cta: "Explore Partnership",
                cta_title: "Ready to Make a Difference?",
                cta_desc: "Every contribution, big or small, helps us expand our reach and transform more lives.",
                cta_primary: "Donate Now",
                cta_secondary: "Contact Us"
            },
            // Team page
            team: {
                hero_title: "Our Team",
                hero_subtitle: "Meet the dedicated professionals working tirelessly to transform lives through education and create opportunities for Africa's next generation of tech leaders.",
                leadership_badge: "Leadership",
                executive_leadership: "Executive Leadership",
                leadership_desc: "Visionary leaders guiding DirectEd Development Foundation's mission and strategic direction",
                dept_programs: "Programs",
                dept_programs_desc: "Delivering world-class training and student success",
                dept_partnerships: "Partnerships",
                dept_partnerships_desc: "Building bridges to global opportunities",
                dept_operations: "Operations",
                dept_operations_desc: "Ensuring organizational excellence",
                dept_technology: "Technology",
                dept_technology_desc: "Powering our learning platforms",
                join_team: "Join Our Team",
                join_desc: "We're always looking for talented, passionate individuals who want to make a difference. Join us in transforming lives through education.",
                view_positions: "View Open Positions",
                learn_working: "Learn About Working Here"
            },
            // Contact page
            contact: {
                hero_title: "Get in Touch",
                hero_subtitle: "Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.",
                email: "Email",
                phone: "Phone",
                location: "Location",
                send_message: "Send Us a Message",
                form_subtitle: "Fill out the form below and we'll get back to you shortly",
                full_name: "Full Name",
                name_placeholder: "John Doe",
                email_address: "Email Address",
                subject: "Subject",
                subject_placeholder: "How can we help you?",
                message: "Message",
                message_placeholder: "Tell us more about your inquiry...",
                send_btn: "Send Message",
                follow_us: "Follow Us",
                social_subtitle: "Stay connected on social media",
                map_coming_soon: "Map integration coming soon",
                toast_title: "Message Sent!",
                toast_desc: "Thank you for contacting us. We'll get back to you soon."
            },
            // Data Hub page
            datahub: {
                hero_title: "Data & Impact Statistics",
                hero_subtitle: "Transparent, data-driven insights into DirectEd Development Foundation's impact. Explore our key metrics, trends, and the tangible difference we're making in education and employment.",
                all_stats: "All Statistics",
                education: "Education",
                employment: "Employment",
                reach: "Reach",
                partnerships: "Partnerships",
                financial: "Financial",
                impact_stories: "Impact Stories",
                behind_numbers: "Behind the Numbers",
                stories_subtitle: "Real stories of transformation from our graduates",
                transparency_title: "Committed to Transparency",
                transparency_desc: "We believe in full transparency and accountability. All our data, impact metrics, and financial information are publicly available.",
                download_report: "Download Full Report",
                view_annual: "View Annual Reports"
            },
            // Partnerships page
            partnerships: {
                hero_title: "Our Partners",
                hero_subtitle: "DirectEd Development Foundation's impact is amplified through strategic partnerships with leading corporations, educational institutions, nonprofits, and government agencies committed to transforming lives through education.",
                all_partners: "All Partners",
                corporate: "Corporate",
                educational: "Educational",
                nonprofit: "Non-Profit",
                government: "Government",
                become_partner: "Become a Partner",
                become_partner_desc: "Join us in creating opportunities and transforming lives. Whether you're a corporation looking to hire talent, an educational institution seeking collaboration, or an organization aligned with our mission, we'd love to partner with you.",
                partner_btn: "Partner With Us"
            },
            // Publications page
            publications: {
                hero_title: "Publications & Reports",
                hero_subtitle: "Explore our research, annual reports, case studies, and impact analyses documenting DirectEd Development Foundation's work and the transformative power of education.",
                all: "All Publications",
                annual_reports: "Annual Reports",
                impact_reports: "Impact Reports",
                research_papers: "Research Papers",
                case_studies: "Case Studies",
                whitepapers: "Whitepapers",
                type_label: "Publication Type",
                year_label: "Year",
                no_publications: "No Publications Found",
                adjust_filters: "Try adjusting your filters to see more results.",
                reset_filters: "Reset Filters"
            },
            // Research page
            research: {
                hero_title: "Research & Reports",
                hero_subtitle: "Evidence-based insights driving our mission to transform tech education in Africa.",
                coming_soon: "Research publications coming soon..."
            },
            // Focus Area page
            focus: {
                not_found: "Focus Area Not Found",
                return: "Return to What We Do",
                badge: "Focus Area",
                overview: "Overview",
                our_approach: "Our Approach",
                challenges: "Challenges",
                what_addressing: "What We're Addressing",
                solutions: "Solutions",
                how_helping: "How We're Helping",
                impact: "Impact",
                making_difference: "Making a Difference",
                support_cause: "Support This Cause",
                explore_more: "Explore More Focus Areas"
            },
            // Program Detail page
            program: {
                back_to_programs: "Back to Programs",
                support_title: "Want to support this initiative?",
                support_desc: "Your contribution can help make a lasting difference in the lives of those we serve."
            },
            // 404 page
            notfound: {
                message: "Oops! Page not found",
                return_home: "Return to Home"
            }
        }
    },

    // FRENCH
    fr: {
        translation: {
            nav: {
                what_we_do: "Ce Que Nous Faisons",
                programs: "Nos Programmes",
                programs_desc: "Initiatives de formation et de développement",
                education_skills: "Éducation et Compétences",
                education_desc: "Opportunités éducatives de classe mondiale",
                youth_employment: "Emploi des Jeunes",
                employment_desc: "Développement de carrière et placements",
                tech_innovation: "Technologie et Innovation",
                tech_desc: "Compétences technologiques pour l'avenir",
                gender_equality: "Égalité des Genres",
                gender_desc: "Initiatives pour les femmes dans la technologie",
                research_reports: "Recherche et Rapports",
                publications: "Publications",
                reports_desc: "Rapports et documents de recherche",
                data_statistics: "Données et Statistiques",
                impact_metrics: "Métriques d'impact et analyses",
                annual_reports: "Rapports Annuels",
                yearly_achievements: "Réalisations annuelles",
                stories: "Histoires",
                success_stories: "Histoires de Réussite",
                transformative_journeys: "Parcours transformateurs",
                blog: "Blog",
                latest_news: "Dernières nouvelles et perspectives",
                impact_data: "Données d'Impact",
                impact_numbers: "Voir notre impact en chiffres",
                who_we_are: "Qui Nous Sommes",
                our_mission: "Notre Mission",
                vision_values: "Vision et valeurs",
                team: "Équipe",
                meet_people: "Rencontrez notre équipe",
                partners: "Partenaires",
                orgs_work_with: "Organisations avec lesquelles nous travaillons",
                about_us: "À Propos",
                learn_more: "En savoir plus sur DirectEd Development Foundation",
                take_action: "Agir",
                donate: "Faire un Don",
                support_mission: "Soutenez notre mission",
                volunteer: "Bénévolat",
                give_time: "Donnez de votre temps",
                partner_with_us: "Partenariat",
                collaborate: "Collaborez pour l'impact",
                press_centre: "Centre de Presse",
                menu: "Menu",
                login: "Connexion",
                logout: "Déconnexion"
            },
            hero: {
                slide1: {
                    title: "Autonomiser la Prochaine Génération de Leaders Tech d'Afrique",
                    subtitle: "Formation de classe mondiale et stages rémunérés à distance avec des entreprises américaines et européennes. Développement web, UIX et Intelligence Artificielle.",
                    cta: "Découvrir Nos Programmes"
                },
                slide2: {
                    title: "Connecter les Talents aux Opportunités Mondiales",
                    subtitle: "Nous comblons le fossé entre les talents à haut potentiel et la meilleure éducation mondiale pour répondre aux besoins en compétences du marché de l'emploi mondial.",
                    cta: "En Savoir Plus"
                },
                slide3: {
                    title: "Transformer des Vies par l'Éducation",
                    subtitle: "Un monde dans lequel chaque personne peut réaliser son plein potentiel, indépendamment de son tirage à la loterie de la vie.",
                    cta: "Rejoignez Notre Mission"
                }
            },
            stats: {
                students_trained: "Étudiants Formés",
                partner_schools: "Écoles Partenaires",
                job_placements: "Placements Professionnels",
                corporate_partners: "Partenaires Entreprises"
            },
            mission: {
                badge: "Notre Vision",
                title: "Un Monde Où le Potentiel Ne Connaît Pas de Frontières",
                description: "Nous croyons que chaque personne mérite l'opportunité de réaliser son plein potentiel, peu importe où elle est née. Grâce à une éducation de classe mondiale et des connexions directes aux opportunités mondiales, nous abattons les barrières et construisons des ponts vers des avenirs meilleurs.",
                cta: "En Savoir Plus sur Notre Mission"
            },
            news: {
                title: "DirectEd Development Foundation, pour Chaque Apprenant",
                subtitle: "Restez informé de nos dernières histoires, recherches et impacts"
            },
            features: {
                badge: "Pourquoi Choisir DirectEd",
                title: "Construit pour l'Impact. Conçu pour le Succès.",
                subtitle: "Notre approche globale assure une croissance durable et des résultats concrets",
                proven_track_record: {
                    title: "Bilan Éprouvé",
                    description: "Plus de 500 étudiants formés avec 200+ placements réussis dans des entreprises tech de premier plan."
                },
                comprehensive_training: {
                    title: "Formation Complète",
                    description: "De cours d'introduction d'1 semaine à des bootcamps intensifs de 4 mois et des stages rémunérés de 8 mois."
                },
                career_growth: {
                    title: "Évolution de Carrière",
                    description: "Voies directes vers l'emploi avec des entreprises américaines et européennes, comblant le déficit de talents mondial."
                }
            },
            spotlight: {
                badge: "Projecteur",
                title: "Nos Domaines d'Action",
                subtitle: "Découvrez les domaines clés où DirectEd Development Foundation fait la différence",
                education: {
                    title: "Éducation et Développement des Compétences",
                    description: "Éducation technologique de classe mondiale libérant le potentiel"
                },
                employment: {
                    title: "Emploi des Jeunes",
                    description: "Connecter les talents aux opportunités mondiales"
                },
                gender: {
                    title: "Égalité des Genres dans la Tech",
                    description: "Promouvoir l'égalité des chances pour les femmes dans la tech"
                },
                explore: "Explorer"
            },
            programs: {
                badge: "Notre Approche",
                title: "De la Formation à la Carrière: Un Parcours Complet",
                description: "Commençant par un cours d'introduction d'une semaine, suivi d'un bootcamp intensif de 4 mois, puis d'un placement en stage rémunéré de 8 mois. Notre programme est conçu en utilisant les dernières recherches scientifiques et les tendances technologiques de pointe.",
                cta: "Explorer Nos Programmes",
                web_dev: "Développement Web et Génie Logiciel",
                uiux: "Design UI/UX et Gestion de Produit",
                ai: "Intelligence Artificielle et Science des Données",
                hero_title: "Nos Programmes",
                hero_subtitle: "Découvrez nos initiatives qui font la différence dans les communautés du monde entier.",
                all_programs: "Tous les Programmes",
                no_programs: "Aucun programme disponible",
                check_back: "Revenez bientôt pour de nouveaux programmes."
            },
            partners: {
                title: "Nos Partenaires",
                subtitle: "Travailler ensemble pour créer un impact durable"
            },
            cta: {
                title: "Rejoignez-nous pour Transformer des Vies",
                description: "Que vous souhaitiez faire un don, devenir bénévole ou vous associer à nous, il existe de nombreuses façons de soutenir notre mission et d'aider à créer des opportunités pour la prochaine génération d'Afrique.",
                get_involved: "S'impliquer",
                learn_more: "En Savoir Plus"
            },
            footer: {
                description: "Autonomiser la prochaine génération de leaders tech d'Afrique grâce à une éducation de classe mondiale et des opportunités mondiales.",
                quick_links: "Liens Rapides",
                programs: "Programmes",
                about_us: "À Propos",
                contact: "Contact",
                legal: "Mentions Légales",
                privacy_policy: "Politique de Confidentialité",
                terms_of_service: "Conditions d'Utilisation",
                cookie_policy: "Politique des Cookies",
                connect: "Connecter",
                rights_reserved: "Tous droits réservés."
            },
            common: {
                loading: "Chargement...",
                error: "Une erreur s'est produite",
                save: "Enregistrer",
                cancel: "Annuler",
                edit: "Modifier",
                delete: "Supprimer",
                submit: "Soumettre",
                search: "Rechercher",
                view_all: "Voir Tout",
                read_more: "Lire Plus",
                back: "Retour",
                next: "Suivant",
                previous: "Précédent"
            },
            admin: {
                edit_mode: "Mode Édition",
                edit_mode_on: "Mode Édition: ACTIVÉ",
                edit_mode_off: "Mode Édition: DÉSACTIVÉ",
                save_changes: "Enregistrer les Modifications",
                discard_changes: "Annuler les Modifications",
                changes_saved: "Modifications enregistrées avec succès",
                changes_discarded: "Modifications annulées",
                admin_controls: "Contrôles Admin",
                pending_changes: "modifications en attente"
            },
            auth: {
                welcome_back: "Bon Retour",
                create_account: "Créer un Compte",
                sign_in: "Se Connecter",
                sign_up: "S'inscrire",
                email: "Email",
                password: "Mot de Passe",
                full_name: "Nom Complet",
                signing_in: "Connexion en cours...",
                creating_account: "Création du compte...",
                no_account: "Pas de compte? Inscrivez-vous",
                have_account: "Déjà un compte? Connectez-vous",
                sign_in_description: "Connectez-vous à votre compte",
                sign_up_description: "Créez un nouveau compte pour commencer"
            },
            about: {
                hero_title: "Qui Nous Sommes",
                hero_subtitle: "Une organisation axée sur la mission, dédiée à autonomiser la prochaine génération de leaders technologiques d'Afrique.",
                our_vision: "Notre Vision",
                vision_title: "Un Monde Où le Potentiel Ne Connaît Pas de Frontières",
                vision_desc_1: "Nous croyons que chaque personne mérite l'opportunité de réaliser son plein potentiel, peu importe où elle est née.",
                vision_desc_2: "Grâce à une éducation de classe mondiale et des connexions directes aux opportunités mondiales, nous abattons les barrières.",
                our_values: "Nos Valeurs"
            },
            values: {
                excellence: "Excellence",
                excellence_desc: "Nous visons les plus hauts standards dans tout ce que nous faisons",
                compassion: "Compassion",
                compassion_desc: "Nous nous soucions profondément des communautés que nous servons",
                transparency: "Transparence",
                transparency_desc: "Nous opérons avec ouverture et responsabilité"
            },
            whatwedo: {
                hero_title: "Ce Que Nous Faisons",
                hero_subtitle: "Nous offrons une éducation de classe mondiale et des opportunités de carrière aux talents d'Afrique.",
                programs_title: "Nos Programmes",
                programs_subtitle: "Programmes de formation complets conçus pour vous préparer au succès.",
                journey_title: "Le Parcours",
                journey_subtitle: "Un chemin structuré de l'apprentissage à l'emploi",
                web_dev: "Développement Web",
                web_dev_desc: "Formation développement full-stack couvrant les frameworks modernes.",
                uiux: "Design UI/UX",
                uiux_desc: "Principes de design centré utilisateur et outils de prototypage.",
                ai: "Intelligence Artificielle",
                ai_desc: "Fondamentaux de l'apprentissage automatique et science des données.",
                leadership: "Leadership et Compétences Interpersonnelles",
                leadership_desc: "Communication, travail d'équipe et développement professionnel.",
                step1_title: "Cours d'Introduction",
                step1_duration: "1 Semaine",
                step1_desc: "Évaluation des compétences et orientation",
                step2_title: "Bootcamp Intensif",
                step2_duration: "4 Mois",
                step2_desc: "Formation technique approfondie avec projets pratiques",
                step3_title: "Stage Rémunéré",
                step3_duration: "8 Mois",
                step3_desc: "Expérience de travail réelle avec des entreprises mondiales"
            },
            stories: {
                hero_title: "Histoires de Réussite",
                hero_subtitle: "Découvrez les parcours transformateurs des étudiants DirectED.",
                coming_soon: "Histoires à venir..."
            },
            takeaction: {
                hero_title: "Agir",
                hero_subtitle: "Rejoignez-nous pour créer des opportunités pour la prochaine génération de leaders tech d'Afrique.",
                donate: "Faire un Don",
                donate_desc: "Votre contribution finance directement les bourses et les ressources de formation.",
                donate_cta: "Faire un Don",
                volunteer: "Bénévolat",
                volunteer_desc: "Partagez votre expertise en tant que mentor ou conseiller.",
                volunteer_cta: "Devenir Bénévole",
                advocate: "Défenseur",
                advocate_desc: "Aidez à faire connaître notre mission.",
                advocate_cta: "Devenir Défenseur",
                partner: "Partenaire",
                partner_desc: "Les organisations peuvent s'associer à nous pour des stages.",
                partner_cta: "Explorer le Partenariat",
                cta_title: "Prêt à Faire la Différence?",
                cta_desc: "Chaque contribution nous aide à étendre notre impact.",
                cta_primary: "Faire un Don",
                cta_secondary: "Nous Contacter"
            },
            team: {
                hero_title: "Notre Équipe",
                hero_subtitle: "Rencontrez les professionnels dévoués qui travaillent pour transformer des vies par l'éducation.",
                leadership_badge: "Leadership",
                executive_leadership: "Direction Exécutive",
                leadership_desc: "Leaders visionnaires guidant la mission de DirectEd",
                dept_programs: "Programmes",
                dept_programs_desc: "Formation de classe mondiale et succès des étudiants",
                dept_partnerships: "Partenariats",
                dept_partnerships_desc: "Construire des ponts vers les opportunités mondiales",
                dept_operations: "Opérations",
                dept_operations_desc: "Assurer l'excellence organisationnelle",
                dept_technology: "Technologie",
                dept_technology_desc: "Alimenter nos plateformes d'apprentissage",
                join_team: "Rejoignez Notre Équipe",
                join_desc: "Nous recherchons des personnes talentueuses et passionnées.",
                view_positions: "Voir les Postes Ouverts",
                learn_working: "En Savoir Plus sur le Travail Ici"
            },
            contact: {
                hero_title: "Contactez-nous",
                hero_subtitle: "Des questions ? Nous serions ravis de vous entendre.",
                email: "Email",
                phone: "Téléphone",
                location: "Localisation",
                send_message: "Envoyez-nous un Message",
                form_subtitle: "Remplissez le formulaire ci-dessous",
                full_name: "Nom Complet",
                email_address: "Adresse Email",
                subject: "Sujet",
                message: "Message",
                send_btn: "Envoyer le Message",
                follow_us: "Suivez-nous",
                social_subtitle: "Restez connecté sur les réseaux sociaux"
            },
            datahub: {
                hero_title: "Données et Statistiques d'Impact",
                hero_subtitle: "Aperçus transparents et basés sur les données de l'impact de DirectEd.",
                all_stats: "Toutes les Statistiques",
                education: "Éducation",
                employment: "Emploi",
                reach: "Portée",
                partnerships: "Partenariats",
                financial: "Financier",
                impact_stories: "Histoires d'Impact",
                behind_numbers: "Derrière les Chiffres",
                stories_subtitle: "Vraies histoires de transformation de nos diplômés",
                transparency_title: "Engagé pour la Transparence",
                transparency_desc: "Nous croyons en la transparence et la responsabilité totales.",
                download_report: "Télécharger le Rapport Complet",
                view_annual: "Voir les Rapports Annuels"
            },
            partnerships: {
                hero_title: "Nos Partenaires",
                hero_subtitle: "L'impact de DirectEd est amplifié par des partenariats stratégiques.",
                all_partners: "Tous les Partenaires",
                corporate: "Entreprises",
                educational: "Éducatif",
                nonprofit: "Sans But Lucratif",
                government: "Gouvernement",
                become_partner: "Devenir Partenaire",
                become_partner_desc: "Rejoignez-nous pour créer des opportunités et transformer des vies.",
                partner_btn: "Partenariat"
            },
            publications: {
                hero_title: "Publications et Rapports",
                hero_subtitle: "Explorez nos recherches, rapports annuels et études de cas.",
                all: "Toutes les Publications",
                annual_reports: "Rapports Annuels",
                impact_reports: "Rapports d'Impact",
                research_papers: "Articles de Recherche",
                case_studies: "Études de Cas",
                whitepapers: "Livres Blancs",
                type_label: "Type de Publication",
                year_label: "Année",
                no_publications: "Aucune Publication Trouvée",
                adjust_filters: "Essayez d'ajuster vos filtres.",
                reset_filters: "Réinitialiser les Filtres"
            },
            research: {
                hero_title: "Recherche et Rapports",
                hero_subtitle: "Aperçus basés sur des preuves guidant notre mission.",
                coming_soon: "Publications de recherche à venir..."
            },
            focus: {
                not_found: "Domaine d'Action Non Trouvé",
                return: "Retour à Ce Que Nous Faisons",
                badge: "Domaine d'Action",
                overview: "Aperçu",
                our_approach: "Notre Approche",
                challenges: "Défis",
                what_addressing: "Ce Que Nous Abordons",
                solutions: "Solutions",
                how_helping: "Comment Nous Aidons",
                impact: "Impact",
                making_difference: "Faire la Différence",
                support_cause: "Soutenir Cette Cause",
                explore_more: "Explorer Plus de Domaines"
            },
            program: {
                back_to_programs: "Retour aux Programmes",
                support_title: "Voulez-vous soutenir cette initiative ?",
                support_desc: "Votre contribution peut faire une différence durable."
            },
            notfound: {
                message: "Oups ! Page non trouvée",
                return_home: "Retour à l'Accueil"
            }
        }
    },

    // SPANISH
    es: {
        translation: {
            nav: {
                what_we_do: "Qué Hacemos",
                programs: "Nuestros Programas",
                programs_desc: "Iniciativas de formación y desarrollo",
                education_skills: "Educación y Habilidades",
                education_desc: "Oportunidades educativas de clase mundial",
                youth_employment: "Empleo Juvenil",
                employment_desc: "Desarrollo profesional y colocaciones",
                tech_innovation: "Tecnología e Innovación",
                tech_desc: "Habilidades tecnológicas para el futuro",
                gender_equality: "Igualdad de Género",
                gender_desc: "Iniciativas para mujeres en tecnología",
                research_reports: "Investigación e Informes",
                publications: "Publicaciones",
                reports_desc: "Informes y documentos de investigación",
                data_statistics: "Datos y Estadísticas",
                impact_metrics: "Métricas de impacto y análisis",
                annual_reports: "Informes Anuales",
                yearly_achievements: "Logros anuales",
                stories: "Historias",
                success_stories: "Historias de Éxito",
                transformative_journeys: "Viajes transformadores",
                blog: "Blog",
                latest_news: "Últimas noticias y perspectivas",
                impact_data: "Datos de Impacto",
                impact_numbers: "Ver nuestro impacto en números",
                who_we_are: "Quiénes Somos",
                our_mission: "Nuestra Misión",
                vision_values: "Visión y valores",
                team: "Equipo",
                meet_people: "Conoce a nuestro equipo",
                partners: "Socios",
                orgs_work_with: "Organizaciones con las que trabajamos",
                about_us: "Sobre Nosotros",
                learn_more: "Conoce más sobre DirectEd Development Foundation",
                take_action: "Actuar",
                donate: "Donar",
                support_mission: "Apoya nuestra misión",
                volunteer: "Voluntariado",
                give_time: "Dona tu tiempo",
                partner_with_us: "Asóciate con Nosotros",
                collaborate: "Colabora para el impacto",
                press_centre: "Centro de Prensa",
                menu: "Menú",
                login: "Iniciar Sesión",
                logout: "Cerrar Sesión"
            },
            hero: {
                slide1: {
                    title: "Empoderando la Próxima Generación de Líderes Tecnológicos de África",
                    subtitle: "Formación de clase mundial y prácticas remuneradas remotas con empresas de EE.UU. y Europa. Desarrollo web, UIX e Inteligencia Artificial.",
                    cta: "Descubrir Nuestros Programas"
                },
                slide2: {
                    title: "Conectando Talento con Oportunidades Globales",
                    subtitle: "Cerramos la brecha entre talentos de alto potencial y la mejor educación mundial para cubrir las brechas de habilidades en el mercado laboral global.",
                    cta: "Saber Más"
                },
                slide3: {
                    title: "Transformando Vidas a Través de la Educación",
                    subtitle: "Un mundo en el que cualquier persona pueda realizar su máximo potencial, independientemente de su suerte en la lotería de la vida.",
                    cta: "Únete a Nuestra Misión"
                }
            },
            stats: {
                students_trained: "Estudiantes Formados",
                partner_schools: "Escuelas Asociadas",
                job_placements: "Colocaciones Laborales",
                corporate_partners: "Socios Corporativos"
            },
            mission: {
                badge: "Nuestra Visión",
                title: "Un Mundo Donde el Potencial No Conoce Fronteras",
                description: "Creemos que cada persona merece la oportunidad de realizar su máximo potencial, sin importar dónde nació. A través de educación de clase mundial y conexiones directas a oportunidades globales, derribamos barreras y construimos puentes hacia futuros más brillantes.",
                cta: "Conoce Nuestra Misión"
            },
            news: {
                title: "DirectEd Development Foundation, para Cada Aprendiz",
                subtitle: "Mantente actualizado con nuestras últimas historias, investigaciones e impacto"
            },
            features: {
                badge: "Por Qué Elegir DirectEd",
                title: "Construido para el Impacto. Diseñado para el Éxito.",
                subtitle: "Nuestro enfoque integral asegura crecimiento sostenible y resultados reales",
                proven_track_record: {
                    title: "Historial Probado",
                    description: "Más de 500 estudiantes formados con 200+ colocaciones exitosas en empresas tecnológicas líderes."
                },
                comprehensive_training: {
                    title: "Formación Integral",
                    description: "Desde cursos introductorios de 1 semana hasta bootcamps intensivos de 4 meses y prácticas remuneradas de 8 meses."
                },
                career_growth: {
                    title: "Crecimiento Profesional",
                    description: "Caminos directos al empleo con empresas estadounidenses y europeas, cerrando la brecha de talento global."
                }
            },
            spotlight: {
                badge: "Destacado",
                title: "Nuestras Áreas de Enfoque",
                subtitle: "Descubre las áreas clave donde DirectEd Development Foundation está generando impacto",
                education: {
                    title: "Educación y Desarrollo de Habilidades",
                    description: "Educación tecnológica de clase mundial desbloqueando potencial"
                },
                employment: {
                    title: "Empleo Juvenil",
                    description: "Conectando talento con oportunidades globales"
                },
                gender: {
                    title: "Igualdad de Género en Tech",
                    description: "Promoviendo igualdad de oportunidades para mujeres en tecnología"
                },
                explore: "Explorar"
            },
            programs: {
                badge: "Nuestro Enfoque",
                title: "De la Formación a la Carrera: Un Viaje Completo",
                description: "Comenzando con un curso introductorio de una semana, seguido de un bootcamp intensivo de 4 meses, y luego colocación en prácticas remuneradas de 8 meses. Nuestro programa está diseñado usando conocimientos de investigación científica de frontera y tendencias tecnológicas de vanguardia.",
                cta: "Explorar Nuestros Programas",
                web_dev: "Desarrollo Web e Ingeniería de Software",
                uiux: "Diseño UI/UX y Gestión de Producto",
                ai: "Inteligencia Artificial y Ciencia de Datos",
                hero_title: "Nuestros Programas",
                hero_subtitle: "Descubre nuestras iniciativas que marcan la diferencia en comunidades de todo el mundo.",
                all_programs: "Todos los Programas",
                no_programs: "No hay programas disponibles",
                check_back: "Vuelve pronto para nuevos programas."
            },
            partners: {
                title: "Nuestros Socios",
                subtitle: "Trabajando juntos para crear impacto duradero"
            },
            cta: {
                title: "Únete a Nosotros para Transformar Vidas",
                description: "Ya sea que quieras donar, ser voluntario o asociarte con nosotros, hay muchas formas de apoyar nuestra misión y ayudar a crear oportunidades para la próxima generación de África.",
                get_involved: "Involúcrate",
                learn_more: "Saber Más"
            },
            footer: {
                description: "Empoderando la próxima generación de líderes tecnológicos de África a través de educación de clase mundial y oportunidades globales.",
                quick_links: "Enlaces Rápidos",
                programs: "Programas",
                about_us: "Sobre Nosotros",
                contact: "Contacto",
                legal: "Legal",
                privacy_policy: "Política de Privacidad",
                terms_of_service: "Términos de Servicio",
                cookie_policy: "Política de Cookies",
                connect: "Conectar",
                rights_reserved: "Todos los derechos reservados."
            },
            common: {
                loading: "Cargando...",
                error: "Ocurrió un error",
                save: "Guardar",
                cancel: "Cancelar",
                edit: "Editar",
                delete: "Eliminar",
                submit: "Enviar",
                search: "Buscar",
                view_all: "Ver Todo",
                read_more: "Leer Más",
                back: "Atrás",
                next: "Siguiente",
                previous: "Anterior"
            },
            admin: {
                edit_mode: "Modo Edición",
                edit_mode_on: "Modo Edición: ACTIVADO",
                edit_mode_off: "Modo Edición: DESACTIVADO",
                save_changes: "Guardar Cambios",
                discard_changes: "Descartar Cambios",
                changes_saved: "Cambios guardados exitosamente",
                changes_discarded: "Cambios descartados",
                admin_controls: "Controles de Admin",
                pending_changes: "cambios pendientes"
            },
            auth: {
                welcome_back: "Bienvenido de Nuevo",
                create_account: "Crear Cuenta",
                sign_in: "Iniciar Sesión",
                sign_up: "Registrarse",
                email: "Correo Electrónico",
                password: "Contraseña",
                full_name: "Nombre Completo",
                signing_in: "Iniciando sesión...",
                creating_account: "Creando cuenta...",
                no_account: "¿No tienes cuenta? Regístrate",
                have_account: "¿Ya tienes cuenta? Inicia sesión",
                sign_in_description: "Inicia sesión en tu cuenta",
                sign_up_description: "Crea una nueva cuenta para comenzar"
            },
            about: {
                hero_title: "Quiénes Somos",
                hero_subtitle: "Una organización con misión dedicada a empoderar a la próxima generación de líderes tecnológicos de África.",
                our_vision: "Nuestra Visión",
                vision_title: "Un Mundo Donde el Potencial No Conoce Fronteras",
                vision_desc_1: "Creemos que cada persona merece la oportunidad de realizar su máximo potencial.",
                vision_desc_2: "A través de educación de clase mundial y conexiones directas a oportunidades globales.",
                our_values: "Nuestros Valores"
            },
            values: {
                excellence: "Excelencia",
                excellence_desc: "Buscamos los más altos estándares en todo lo que hacemos",
                compassion: "Compasión",
                compassion_desc: "Nos importan profundamente las comunidades que servimos",
                transparency: "Transparencia",
                transparency_desc: "Operamos con apertura y responsabilidad"
            },
            whatwedo: {
                hero_title: "Qué Hacemos",
                hero_subtitle: "Proporcionamos educación de clase mundial y oportunidades de carrera a talentos de África.",
                programs_title: "Nuestros Programas",
                programs_subtitle: "Programas de formación integrales diseñados para prepararte para el éxito.",
                journey_title: "El Viaje",
                journey_subtitle: "Un camino estructurado del aprendizaje al empleo",
                web_dev: "Desarrollo Web",
                web_dev_desc: "Formación en desarrollo full-stack cubriendo frameworks modernos.",
                uiux: "Diseño UI/UX",
                uiux_desc: "Principios de diseño centrado en el usuario y herramientas de prototipado.",
                ai: "Inteligencia Artificial",
                ai_desc: "Fundamentos de aprendizaje automático y ciencia de datos.",
                leadership: "Liderazgo y Habilidades Blandas",
                leadership_desc: "Comunicación, trabajo en equipo y desarrollo profesional.",
                step1_title: "Curso Introductorio",
                step1_duration: "1 Semana",
                step1_desc: "Evaluación de habilidades y orientación",
                step2_title: "Bootcamp Intensivo",
                step2_duration: "4 Meses",
                step2_desc: "Formación técnica profunda con proyectos prácticos",
                step3_title: "Prácticas Remuneradas",
                step3_duration: "8 Meses",
                step3_desc: "Experiencia laboral real con empresas globales"
            },
            stories: {
                hero_title: "Historias de Éxito",
                hero_subtitle: "Descubre los viajes transformadores de los estudiantes de DirectED.",
                coming_soon: "Historias próximamente..."
            },
            takeaction: {
                hero_title: "Actuar",
                hero_subtitle: "Únete a nosotros para crear oportunidades para la próxima generación de líderes tech de África.",
                donate: "Donar",
                donate_desc: "Tu contribución financia directamente becas y recursos de formación.",
                donate_cta: "Donar Ahora",
                volunteer: "Voluntariado",
                volunteer_desc: "Comparte tu experiencia como mentor o asesor.",
                volunteer_cta: "Ser Voluntario",
                advocate: "Defensor",
                advocate_desc: "Ayuda a difundir nuestra misión.",
                advocate_cta: "Ser Defensor",
                partner: "Socio",
                partner_desc: "Las organizaciones pueden asociarse con nosotros para prácticas.",
                partner_cta: "Explorar Asociación",
                cta_title: "¿Listo para Hacer la Diferencia?",
                cta_desc: "Cada contribución nos ayuda a expandir nuestro impacto.",
                cta_primary: "Donar Ahora",
                cta_secondary: "Contactarnos"
            },
            team: {
                hero_title: "Nuestro Equipo",
                hero_subtitle: "Conoce a los profesionales dedicados que trabajan para transformar vidas a través de la educación.",
                leadership_badge: "Liderazgo",
                executive_leadership: "Liderazgo Ejecutivo",
                leadership_desc: "Líderes visionarios guiando la misión de DirectEd",
                dept_programs: "Programas",
                dept_programs_desc: "Formación de clase mundial y éxito estudiantil",
                dept_partnerships: "Asociaciones",
                dept_partnerships_desc: "Construyendo puentes a oportunidades globales",
                dept_operations: "Operaciones",
                dept_operations_desc: "Asegurando la excelencia organizacional",
                dept_technology: "Tecnología",
                dept_technology_desc: "Impulsando nuestras plataformas de aprendizaje",
                join_team: "Únete a Nuestro Equipo",
                join_desc: "Buscamos personas talentosas y apasionadas.",
                view_positions: "Ver Posiciones Abiertas",
                learn_working: "Conoce Más Sobre Trabajar Aquí"
            },
            contact: {
                hero_title: "Contáctanos",
                hero_subtitle: "¿Tienes preguntas? Nos encantaría saber de ti.",
                email: "Correo",
                phone: "Teléfono",
                location: "Ubicación",
                send_message: "Envíanos un Mensaje",
                form_subtitle: "Completa el formulario a continuación",
                full_name: "Nombre Completo",
                email_address: "Correo Electrónico",
                subject: "Asunto",
                message: "Mensaje",
                send_btn: "Enviar Mensaje",
                follow_us: "Síguenos",
                social_subtitle: "Mantente conectado en redes sociales"
            },
            datahub: {
                hero_title: "Datos y Estadísticas de Impacto",
                hero_subtitle: "Información transparente y basada en datos sobre el impacto de DirectEd.",
                all_stats: "Todas las Estadísticas",
                education: "Educación",
                employment: "Empleo",
                reach: "Alcance",
                partnerships: "Asociaciones",
                financial: "Financiero",
                impact_stories: "Historias de Impacto",
                behind_numbers: "Detrás de los Números",
                stories_subtitle: "Historias reales de transformación de nuestros graduados",
                transparency_title: "Comprometidos con la Transparencia",
                transparency_desc: "Creemos en la transparencia y responsabilidad total.",
                download_report: "Descargar Informe Completo",
                view_annual: "Ver Informes Anuales"
            },
            partnerships: {
                hero_title: "Nuestros Socios",
                hero_subtitle: "El impacto de DirectEd se amplifica a través de asociaciones estratégicas.",
                all_partners: "Todos los Socios",
                corporate: "Corporativo",
                educational: "Educativo",
                nonprofit: "Sin Fines de Lucro",
                government: "Gobierno",
                become_partner: "Conviértete en Socio",
                become_partner_desc: "Únete a nosotros para crear oportunidades y transformar vidas.",
                partner_btn: "Asociarse"
            },
            publications: {
                hero_title: "Publicaciones e Informes",
                hero_subtitle: "Explora nuestras investigaciones, informes anuales y estudios de caso.",
                all: "Todas las Publicaciones",
                annual_reports: "Informes Anuales",
                impact_reports: "Informes de Impacto",
                research_papers: "Artículos de Investigación",
                case_studies: "Estudios de Caso",
                whitepapers: "Documentos Técnicos",
                type_label: "Tipo de Publicación",
                year_label: "Año",
                no_publications: "No Se Encontraron Publicaciones",
                adjust_filters: "Intenta ajustar tus filtros.",
                reset_filters: "Restablecer Filtros"
            },
            research: {
                hero_title: "Investigación e Informes",
                hero_subtitle: "Información basada en evidencia que guía nuestra misión.",
                coming_soon: "Publicaciones de investigación próximamente..."
            },
            focus: {
                not_found: "Área de Enfoque No Encontrada",
                return: "Volver a Qué Hacemos",
                badge: "Área de Enfoque",
                overview: "Visión General",
                our_approach: "Nuestro Enfoque",
                challenges: "Desafíos",
                what_addressing: "Lo Que Estamos Abordando",
                solutions: "Soluciones",
                how_helping: "Cómo Estamos Ayudando",
                impact: "Impacto",
                making_difference: "Haciendo la Diferencia",
                support_cause: "Apoyar Esta Causa",
                explore_more: "Explorar Más Áreas"
            },
            program: {
                back_to_programs: "Volver a Programas",
                support_title: "¿Quieres apoyar esta iniciativa?",
                support_desc: "Tu contribución puede hacer una diferencia duradera."
            },
            notfound: {
                message: "¡Ups! Página no encontrada",
                return_home: "Volver al Inicio"
            }
        }
    },

    // KISWAHILI
    sw: {
        translation: {
            nav: {
                what_we_do: "Tunachofanya",
                programs: "Programu Zetu",
                programs_desc: "Mipango ya mafunzo na maendeleo",
                education_skills: "Elimu na Ujuzi",
                education_desc: "Fursa za elimu za kiwango cha kimataifa",
                youth_employment: "Ajira ya Vijana",
                employment_desc: "Maendeleo ya kazi na uwekaji",
                tech_innovation: "Teknolojia na Ubunifu",
                tech_desc: "Ujuzi wa teknolojia kwa siku zijazo",
                gender_equality: "Usawa wa Kijinsia",
                gender_desc: "Mipango ya wanawake katika teknolojia",
                research_reports: "Utafiti na Ripoti",
                publications: "Machapisho",
                reports_desc: "Ripoti na karatasi za utafiti",
                data_statistics: "Data na Takwimu",
                impact_metrics: "Vipimo vya athari na uchambuzi",
                annual_reports: "Ripoti za Mwaka",
                yearly_achievements: "Mafanikio ya mwaka",
                stories: "Hadithi",
                success_stories: "Hadithi za Mafanikio",
                transformative_journeys: "Safari za mabadiliko",
                blog: "Blogu",
                latest_news: "Habari na maarifa ya hivi karibuni",
                impact_data: "Data ya Athari",
                impact_numbers: "Ona athari yetu kwa nambari",
                who_we_are: "Sisi Ni Nani",
                our_mission: "Dhamira Yetu",
                vision_values: "Maono na maadili",
                team: "Timu",
                meet_people: "Kutana na watu wetu",
                partners: "Washirika",
                orgs_work_with: "Mashirika tunayofanya nayo kazi",
                about_us: "Kuhusu Sisi",
                learn_more: "Jifunze zaidi kuhusu DirectEd Development Foundation",
                take_action: "Chukua Hatua",
                donate: "Toa Mchango",
                support_mission: "Saidia dhamira yetu",
                volunteer: "Kujitolea",
                give_time: "Toa muda wako",
                partner_with_us: "Shirikiana Nasi",
                collaborate: "Shirikiana kwa athari",
                press_centre: "Kituo cha Habari",
                menu: "Menyu",
                login: "Ingia",
                logout: "Ondoka"
            },
            hero: {
                slide1: {
                    title: "Kuwezesha Kizazi Kijacho cha Viongozi wa Teknolojia wa Afrika",
                    subtitle: "Mafunzo ya kiwango cha kimataifa na mafunzo ya kulipwa kutoka mbali na makampuni ya Marekani na Ulaya. Uendelezaji wa wavuti, UIX na Akili Bandia.",
                    cta: "Gundua Programu Zetu"
                },
                slide2: {
                    title: "Kuunganisha Vipaji na Fursa za Kimataifa",
                    subtitle: "Tunaziba pengo kati ya vipaji vyenye uwezo mkubwa na elimu bora zaidi duniani ili kujaza pengo la ujuzi katika soko la ajira la kimataifa.",
                    cta: "Jifunze Zaidi"
                },
                slide3: {
                    title: "Kubadilisha Maisha Kupitia Elimu",
                    subtitle: "Dunia ambayo mtu yeyote anaweza kutambua uwezo wake wote, bila kujali bahati yake katika bahati nasibu ya maisha.",
                    cta: "Jiunge na Dhamira Yetu"
                }
            },
            stats: {
                students_trained: "Wanafunzi Waliofunzwa",
                partner_schools: "Shule Washirika",
                job_placements: "Uwekaji wa Kazi",
                corporate_partners: "Washirika wa Kampuni"
            },
            mission: {
                badge: "Maono Yetu",
                title: "Dunia Ambapo Uwezo Haujui Mipaka",
                description: "Tunaamini kwamba kila mtu anastahili fursa ya kutambua uwezo wake wote, bila kujali mahali alipozaliwa. Kupitia elimu ya kiwango cha kimataifa na uhusiano wa moja kwa moja na fursa za kimataifa, tunavunja vizuizi na kujenga madaraja kuelekea siku zijazo angavu.",
                cta: "Jifunze Kuhusu Dhamira Yetu"
            },
            news: {
                title: "DirectEd Development Foundation, kwa Kila Mwanafunzi",
                subtitle: "Endelea kusasishwa na hadithi zetu za hivi karibuni, utafiti na athari"
            },
            features: {
                badge: "Kwa Nini Uchague DirectEd",
                title: "Iliyojengwa kwa Athari. Imeundwa kwa Mafanikio.",
                subtitle: "Mbinu yetu ya kina inahakikisha ukuaji endelevu na matokeo ya ulimwengu halisi",
                proven_track_record: {
                    title: "Rekodi Iliyothibitishwa",
                    description: "Zaidi ya wanafunzi 500 waliofunzwa na uwekaji wa kazi 200+ uliofanikiwa katika makampuni ya teknolojia yanayoongoza."
                },
                comprehensive_training: {
                    title: "Mafunzo Kamili",
                    description: "Kutoka kozi za utangulizi za wiki 1 hadi bootcamps makali za miezi 4 na mafunzo ya kulipwa ya miezi 8."
                },
                career_growth: {
                    title: "Ukuaji wa Kazi",
                    description: "Njia za moja kwa moja za ajira na makampuni ya Marekani na Ulaya, kuziba pengo la vipaji la kimataifa."
                }
            },
            spotlight: {
                badge: "Mwanga",
                title: "Maeneo Yetu ya Kulenga",
                subtitle: "Gundua maeneo muhimu ambapo DirectEd Development Foundation inafanya athari",
                education: {
                    title: "Elimu na Maendeleo ya Ujuzi",
                    description: "Elimu ya teknolojia ya kiwango cha kimataifa inayofungua uwezo"
                },
                employment: {
                    title: "Ajira ya Vijana",
                    description: "Kuunganisha vipaji na fursa za kimataifa"
                },
                gender: {
                    title: "Usawa wa Kijinsia katika Tech",
                    description: "Kukuza fursa sawa kwa wanawake katika teknolojia"
                },
                explore: "Gundua"
            },
            programs: {
                badge: "Mbinu Yetu",
                title: "Kutoka Mafunzo hadi Kazi: Safari Kamili",
                description: "Kuanza na kozi ya utangulizi ya wiki moja, ikifuatiwa na bootcamp makali ya miezi 4, na kisha uwekaji katika mafunzo ya kulipwa ya miezi 8. Programu yetu imeundwa kwa kutumia maarifa kutoka utafiti wa kisayansi wa kisasa na mwenendo wa teknolojia ya kisasa.",
                cta: "Gundua Programu Zetu",
                web_dev: "Uendelezaji wa Wavuti na Uhandisi wa Programu",
                uiux: "Muundo wa UI/UX na Usimamizi wa Bidhaa",
                ai: "Akili Bandia na Sayansi ya Data",
                hero_title: "Programu Zetu",
                hero_subtitle: "Gundua mipango yetu inayoleta mabadiliko katika jamii duniani kote.",
                all_programs: "Programu Zote",
                no_programs: "Hakuna programu zinazopatikana",
                check_back: "Rudi hivi karibuni kwa programu mpya."
            },
            partners: {
                title: "Washirika Wetu",
                subtitle: "Kufanya kazi pamoja kuunda athari ya kudumu"
            },
            cta: {
                title: "Jiunge Nasi Kubadilisha Maisha",
                description: "Iwe unataka kutoa mchango, kujitolea, au kushirikiana nasi, kuna njia nyingi za kusaidia dhamira yetu na kusaidia kuunda fursa kwa kizazi kijacho cha Afrika.",
                get_involved: "Jihusishe",
                learn_more: "Jifunze Zaidi"
            },
            footer: {
                description: "Kuwezesha kizazi kijacho cha viongozi wa teknolojia wa Afrika kupitia elimu ya kiwango cha kimataifa na fursa za kimataifa.",
                quick_links: "Viungo vya Haraka",
                programs: "Programu",
                about_us: "Kuhusu Sisi",
                contact: "Wasiliana",
                legal: "Kisheria",
                privacy_policy: "Sera ya Faragha",
                terms_of_service: "Masharti ya Huduma",
                cookie_policy: "Sera ya Kuki",
                connect: "Unganisha",
                rights_reserved: "Haki zote zimehifadhiwa."
            },
            common: {
                loading: "Inapakia...",
                error: "Hitilafu imetokea",
                save: "Hifadhi",
                cancel: "Ghairi",
                edit: "Hariri",
                delete: "Futa",
                submit: "Wasilisha",
                search: "Tafuta",
                view_all: "Tazama Zote",
                read_more: "Soma Zaidi",
                back: "Nyuma",
                next: "Ifuatayo",
                previous: "Iliyotangulia"
            },
            admin: {
                edit_mode: "Hali ya Kuhariri",
                edit_mode_on: "Hali ya Kuhariri: IMEWASHWA",
                edit_mode_off: "Hali ya Kuhariri: IMEZIMWA",
                save_changes: "Hifadhi Mabadiliko",
                discard_changes: "Acha Mabadiliko",
                changes_saved: "Mabadiliko yamehifadhiwa kwa mafanikio",
                changes_discarded: "Mabadiliko yameachwa",
                admin_controls: "Vidhibiti vya Admin",
                pending_changes: "mabadiliko yanayosubiri"
            },
            auth: {
                welcome_back: "Karibu Tena",
                create_account: "Tengeneza Akaunti",
                sign_in: "Ingia",
                sign_up: "Jisajili",
                email: "Barua Pepe",
                password: "Nenosiri",
                full_name: "Jina Kamili",
                signing_in: "Inaingia...",
                creating_account: "Inatengeneza akaunti...",
                no_account: "Huna akaunti? Jisajili",
                have_account: "Una akaunti tayari? Ingia",
                sign_in_description: "Ingia kwenye akaunti yako",
                sign_up_description: "Tengeneza akaunti mpya kuanza"
            },
            about: {
                hero_title: "Sisi Ni Nani",
                hero_subtitle: "Shirika lenye dhamira kuwezesha kizazi kijacho cha viongozi wa teknolojia wa Afrika.",
                our_vision: "Maono Yetu",
                vision_title: "Dunia Ambapo Uwezo Haujui Mipaka",
                vision_desc_1: "Tunaamini kila mtu anastahili fursa ya kutambua uwezo wake kamili.",
                vision_desc_2: "Kupitia elimu ya kiwango cha kimataifa na uhusiano wa moja kwa moja na fursa za kimataifa.",
                our_values: "Maadili Yetu"
            },
            values: {
                excellence: "Ubora",
                excellence_desc: "Tunajitahidi kufikia viwango vya juu katika kila tunachofanya",
                compassion: "Huruma",
                compassion_desc: "Tunajali sana jamii tunazozihudumia",
                transparency: "Uwazi",
                transparency_desc: "Tunafanya kazi kwa uwazi na uwajibikaji"
            },
            whatwedo: {
                hero_title: "Tunachofanya",
                hero_subtitle: "Tunatoa elimu ya kiwango cha kimataifa na fursa za kazi kwa vipaji vya Afrika.",
                programs_title: "Programu Zetu",
                programs_subtitle: "Programu za mafunzo kamili zilizoundwa kukuandaa kwa mafanikio.",
                journey_title: "Safari",
                journey_subtitle: "Njia iliyopangwa kutoka kujifunza hadi kupata kazi",
                web_dev: "Uendelezaji wa Wavuti",
                web_dev_desc: "Mafunzo ya uendelezaji wa full-stack yanayoshughulikia mifumo ya kisasa.",
                uiux: "Muundo wa UI/UX",
                uiux_desc: "Kanuni za muundo unaozingatia mtumiaji na zana za kutengeneza mfano.",
                ai: "Akili Bandia",
                ai_desc: "Misingi ya ujifunzaji wa mashine na sayansi ya data.",
                leadership: "Uongozi na Ujuzi Laini",
                leadership_desc: "Mawasiliano, kufanya kazi kwa timu na maendeleo ya kitaaluma.",
                step1_title: "Kozi ya Utangulizi",
                step1_duration: "Wiki 1",
                step1_desc: "Tathmini ya ujuzi na mwelekeo",
                step2_title: "Bootcamp Makali",
                step2_duration: "Miezi 4",
                step2_desc: "Mafunzo ya kina ya kiufundi na miradi ya vitendo",
                step3_title: "Mafunzo ya Kulipwa",
                step3_duration: "Miezi 8",
                step3_desc: "Uzoefu wa kazi halisi na makampuni ya kimataifa"
            },
            stories: {
                hero_title: "Hadithi za Mafanikio",
                hero_subtitle: "Gundua safari za mabadiliko za wanafunzi wa DirectED.",
                coming_soon: "Hadithi zinakuja hivi karibuni..."
            },
            takeaction: {
                hero_title: "Chukua Hatua",
                hero_subtitle: "Jiunge nasi kuunda fursa kwa kizazi kijacho cha viongozi wa teknolojia wa Afrika.",
                donate: "Toa Mchango",
                donate_desc: "Mchango wako unafadhili moja kwa moja ufadhili na rasilimali za mafunzo.",
                donate_cta: "Toa Sasa",
                volunteer: "Kujitolea",
                volunteer_desc: "Shiriki ujuzi wako kama mshauri au mwongozi.",
                volunteer_cta: "Kuwa Mtetezi",
                advocate: "Mtetezi",
                advocate_desc: "Saidia kueneza ujumbe kuhusu dhamira yetu.",
                advocate_cta: "Kuwa Mtetezi",
                partner: "Mshirika",
                partner_desc: "Mashirika yanaweza kushirikiana nasi kwa ajili ya mafunzo.",
                partner_cta: "Gundua Ushirikiano",
                cta_title: "Uko Tayari Kuleta Mabadiliko?",
                cta_desc: "Kila mchango unatusaidia kupanua athari yetu.",
                cta_primary: "Toa Sasa",
                cta_secondary: "Wasiliana Nasi"
            },
            team: {
                hero_title: "Timu Yetu",
                hero_subtitle: "Kutana na wataalamu waliojitoa wanaofanya kazi kubadilisha maisha kupitia elimu.",
                leadership_badge: "Uongozi",
                executive_leadership: "Uongozi wa Juu",
                leadership_desc: "Viongozi wenye maono wanaoongoza dhamira ya DirectEd",
                dept_programs: "Programu",
                dept_programs_desc: "Mafunzo ya kiwango cha kimataifa na mafanikio ya wanafunzi",
                dept_partnerships: "Ushirikiano",
                dept_partnerships_desc: "Kujenga madaraja kwa fursa za kimataifa",
                dept_operations: "Uendeshaji",
                dept_operations_desc: "Kuhakikisha ubora wa shirika",
                dept_technology: "Teknolojia",
                dept_technology_desc: "Kuwezesha majukwaa yetu ya kujifunza",
                join_team: "Jiunge na Timu Yetu",
                join_desc: "Tunatafuta watu wenye vipaji na shauku.",
                view_positions: "Tazama Nafasi Zilizo Wazi",
                learn_working: "Jifunze Kuhusu Kufanya Kazi Hapa"
            },
            contact: {
                hero_title: "Wasiliana Nasi",
                hero_subtitle: "Una maswali? Tungependa kusikia kutoka kwako.",
                email: "Barua Pepe",
                phone: "Simu",
                location: "Mahali",
                send_message: "Tutumie Ujumbe",
                form_subtitle: "Jaza fomu hapa chini",
                full_name: "Jina Kamili",
                email_address: "Anwani ya Barua Pepe",
                subject: "Mada",
                message: "Ujumbe",
                send_btn: "Tuma Ujumbe",
                follow_us: "Tufuate",
                social_subtitle: "Baki umeunganishwa kwenye mitandao ya kijamii"
            },
            datahub: {
                hero_title: "Data na Takwimu za Athari",
                hero_subtitle: "Maarifa ya uwazi yanayoonyesha athari ya DirectEd.",
                all_stats: "Takwimu Zote",
                education: "Elimu",
                employment: "Ajira",
                reach: "Kufikia",
                partnerships: "Ushirikiano",
                financial: "Fedha",
                impact_stories: "Hadithi za Athari",
                behind_numbers: "Nyuma ya Nambari",
                stories_subtitle: "Hadithi halisi za mabadiliko kutoka kwa wahitimu wetu",
                transparency_title: "Tumejitolea kwa Uwazi",
                transparency_desc: "Tunaamini katika uwazi na uwajibikaji kamili.",
                download_report: "Pakua Ripoti Kamili",
                view_annual: "Tazama Ripoti za Mwaka"
            },
            partnerships: {
                hero_title: "Washirika Wetu",
                hero_subtitle: "Athari ya DirectEd inakuzwa kupitia ushirikiano wa kimkakati.",
                all_partners: "Washirika Wote",
                corporate: "Kampuni",
                educational: "Elimu",
                nonprofit: "Bila Faida",
                government: "Serikali",
                become_partner: "Kuwa Mshirika",
                become_partner_desc: "Jiunge nasi kuunda fursa na kubadilisha maisha.",
                partner_btn: "Shirikiana Nasi"
            },
            publications: {
                hero_title: "Machapisho na Ripoti",
                hero_subtitle: "Gundua utafiti wetu, ripoti za mwaka na masomo ya kesi.",
                all: "Machapisho Yote",
                annual_reports: "Ripoti za Mwaka",
                impact_reports: "Ripoti za Athari",
                research_papers: "Karatasi za Utafiti",
                case_studies: "Masomo ya Kesi",
                whitepapers: "Karatasi Nyeupe",
                type_label: "Aina ya Chapisho",
                year_label: "Mwaka",
                no_publications: "Hakuna Machapisho Yaliyopatikana",
                adjust_filters: "Jaribu kurekebisha vichujio vyako.",
                reset_filters: "Weka Upya Vichujio"
            },
            research: {
                hero_title: "Utafiti na Ripoti",
                hero_subtitle: "Maarifa yanayoongozwa na ushahidi yanayoongoza dhamira yetu.",
                coming_soon: "Machapisho ya utafiti yanakuja hivi karibuni..."
            },
            focus: {
                not_found: "Eneo la Kuzingatia Halijapatikana",
                return: "Rudi kwenye Tunachofanya",
                badge: "Eneo la Kuzingatia",
                overview: "Muhtasari",
                our_approach: "Mbinu Yetu",
                challenges: "Changamoto",
                what_addressing: "Tunachoshughulikia",
                solutions: "Suluhisho",
                how_helping: "Jinsi Tunavyosaidia",
                impact: "Athari",
                making_difference: "Kuleta Mabadiliko",
                support_cause: "Saidia Jambo Hili",
                explore_more: "Gundua Maeneo Zaidi"
            },
            program: {
                back_to_programs: "Rudi kwenye Programu",
                support_title: "Unataka kusaidia mpango huu?",
                support_desc: "Mchango wako unaweza kuleta mabadiliko ya kudumu."
            },
            notfound: {
                message: "Lo! Ukurasa haujapatikana",
                return_home: "Rudi Nyumbani"
            }
        }
    },

    // AMHARIC
    am: {
        translation: {
            nav: {
                what_we_do: "የምንሰራው ስራ",
                programs: "የእኛ ፕሮግራሞች",
                programs_desc: "የስልጠና እና የልማት ተነሳሽነቶች",
                education_skills: "ትምህርት እና ክህሎቶች",
                education_desc: "የዓለም ደረጃ የትምህርት እድሎች",
                youth_employment: "የወጣቶች ስራ",
                employment_desc: "የሙያ ልማት እና ምደባዎች",
                tech_innovation: "ቴክኖሎጂ እና ፈጠራ",
                tech_desc: "ለወደፊቱ የቴክኖሎጂ ክህሎቶች",
                gender_equality: "የፆታ እኩልነት",
                gender_desc: "በቴክኖሎጂ ውስጥ የሴቶች ተነሳሽነቶች",
                research_reports: "ምርምር እና ሪፖርቶች",
                publications: "ህትመቶች",
                reports_desc: "ሪፖርቶች እና የምርምር ወረቀቶች",
                data_statistics: "መረጃ እና ስታቲስቲክስ",
                impact_metrics: "የተፅእኖ መለኪያዎች እና ትንታኔዎች",
                annual_reports: "ዓመታዊ ሪፖርቶች",
                yearly_achievements: "ዓመታዊ ስኬቶች",
                stories: "ታሪኮች",
                success_stories: "የስኬት ታሪኮች",
                transformative_journeys: "ለውጥ አምጪ ጉዞዎች",
                blog: "ብሎግ",
                latest_news: "የቅርብ ጊዜ ዜናዎች እና ግንዛቤዎች",
                impact_data: "የተፅእኖ መረጃ",
                impact_numbers: "ተፅእኖአችንን በቁጥሮች ይመልከቱ",
                who_we_are: "እኛ ማን ነን",
                our_mission: "ተልእኮአችን",
                vision_values: "ራዕይ እና እሴቶች",
                team: "ቡድን",
                meet_people: "ሰዎቻችንን ይገናኙ",
                partners: "አጋሮች",
                orgs_work_with: "የምንሰራባቸው ድርጅቶች",
                about_us: "ስለ እኛ",
                learn_more: "ስለ DirectEd Development Foundation የበለጠ ይወቁ",
                take_action: "እርምጃ ውሰድ",
                donate: "ልገሳ",
                support_mission: "ተልእኮአችንን ደግፉ",
                volunteer: "በፈቃደኝነት",
                give_time: "ጊዜዎን ይስጡ",
                partner_with_us: "ከእኛ ጋር ይሻረኩ",
                collaborate: "ለተፅእኖ ይተባበሩ",
                press_centre: "የፕሬስ ማዕከል",
                menu: "ምናሌ",
                login: "ግባ",
                logout: "ውጣ"
            },
            hero: {
                slide1: {
                    title: "የአፍሪካን ቀጣይ የቴክኖሎጂ መሪዎች ማብቃት",
                    subtitle: "በአሜሪካ እና በአውሮፓ ኩባንያዎች ከፍተኛ ጥራት ያለው ስልጠና እና የሩቅ የተከፈለ ኢንተርንሺፕ። የድር ልማት፣ UIX እና ሰው ሰራሽ ብልህነት።",
                    cta: "ፕሮግራሞቻችንን ያግኙ"
                },
                slide2: {
                    title: "ተሰጥኦን ከዓለም አቀፍ እድሎች ጋር ማገናኘት",
                    subtitle: "በዓለም አቀፍ የስራ ገበያ ውስጥ ያለውን የክህሎት ክፍተት ለመሙላት ከፍተኛ አቅም ያላቸውን ተሰጥኦዎች ከዓለም ምርጥ ትምህርት ጋር እናገናኛለን።",
                    cta: "የበለጠ ይወቁ"
                },
                slide3: {
                    title: "ህይወትን በትምህርት መቀየር",
                    subtitle: "ማንኛውም ሰው ሙሉ አቅሙን ሊገነዘብ የሚችልበት ዓለም፣ በህይወት ዕድል ላይ ያለውን ሳያሳስብ።",
                    cta: "ተልእኮአችንን ይቀላቀሉ"
                }
            },
            stats: {
                students_trained: "የሰለጠኑ ተማሪዎች",
                partner_schools: "አጋር ትምህርት ቤቶች",
                job_placements: "የስራ ምደባዎች",
                corporate_partners: "የኮርፖሬት አጋሮች"
            },
            mission: {
                badge: "ራዕያችን",
                title: "አቅም ወሰን የማያውቅበት ዓለም",
                description: "ማንኛውም ሰው የተወለደበት ቦታ ምንም ይሁን ምን ሙሉ አቅሙን የማሳካት እድል እንደሚገባው እናምናለን። በዓለም ደረጃ ትምህርት እና ከዓለም አቀፍ እድሎች ጋር ቀጥተኛ ግንኙነት፣ መሰናክሎችን እያፈረስን እና ወደ ብሩህ የወደፊት ድልድዮችን እየገነባን ነው።",
                cta: "ስለ ተልእኮአችን ይወቁ"
            },
            news: {
                title: "DirectEd Development Foundation፣ ለእያንዳንዱ ተማሪ",
                subtitle: "በቅርብ ጊዜ ታሪኮቻችን፣ ምርምሮቻችን እና ተፅእኖአችን ላይ ወቅታዊ መረጃ ይቆዩ"
            },
            features: {
                badge: "DirectEdን ለምን ይምረጡ",
                title: "ለተፅእኖ የተገነባ። ለስኬት የተዘጋጀ።",
                subtitle: "አጠቃላይ አቀራረባችን ዘላቂ እድገት እና የእውነተኛ ዓለም ውጤቶችን ያረጋግጣል",
                proven_track_record: {
                    title: "የተረጋገጠ የስኬት ታሪክ",
                    description: "ከ500 በላይ ተማሪዎች ሰልጥነዋል፣ 200+ የተሳካ የስራ ምደባዎች በዓለም ቴክ ኩባንያዎች።"
                },
                comprehensive_training: {
                    title: "ሁሉን አቀፍ ስልጠና",
                    description: "ከ1 ሳምንት መግቢያ ኮርሶች እስከ 4 ወር ጠንካራ ቡትካምፖች እና 8 ወር የተከፈለ ኢንተርንሺፖች።"
                },
                career_growth: {
                    title: "የሙያ እድገት",
                    description: "ከአሜሪካ እና አውሮፓ ኩባንያዎች ጋር ቀጥተኛ የስራ መስመሮች፣ የዓለም አቀፍ ተሰጥኦ ክፍተትን መሙላት።"
                }
            },
            spotlight: {
                badge: "ብርሃን",
                title: "የትኩረት ቦታዎቻችን",
                subtitle: "DirectEd Development Foundation ተፅእኖ እያደረገ ያለባቸውን ዋና ዋና ቦታዎች ያግኙ",
                education: {
                    title: "ትምህርት እና የክህሎት ልማት",
                    description: "አቅምን የሚከፍት የዓለም ደረጃ የቴክኖሎጂ ትምህርት"
                },
                employment: {
                    title: "የወጣቶች ስራ",
                    description: "ተሰጥኦን ከዓለም አቀፍ እድሎች ጋር ማገናኘት"
                },
                gender: {
                    title: "በቴክኖሎጂ ውስጥ የፆታ እኩልነት",
                    description: "በቴክኖሎጂ ውስጥ ለሴቶች እኩል እድሎችን ማስተዋወቅ"
                },
                explore: "ያስሱ"
            },
            programs: {
                badge: "አቀራረባችን",
                title: "ከስልጠና እስከ ሙያ፡ ሙሉ ጉዞ",
                description: "በአንድ ሳምንት መግቢያ ኮርስ በመጀመር፣ በ4 ወር ጠንካራ ቡትካምፕ ተከትሎ፣ ከዚያም በ8 ወር የተከፈለ ኢንተርንሺፕ ውስጥ መቀመጥ። ፕሮግራማችን በቅርብ ጊዜ የሳይንሳዊ ምርምር ግንዛቤዎች እና የቴክኖሎጂ አዝማሚያዎችን በመጠቀም የተዘጋጀ ነው።",
                cta: "ፕሮግራሞቻችንን ያስሱ",
                web_dev: "የድር ልማት እና የሶፍትዌር ኢንጂነሪንግ",
                uiux: "UI/UX ዲዛይን እና የምርት አስተዳደር",
                ai: "ሰው ሰራሽ ብልህነት እና የመረጃ ሳይንስ",
                hero_title: "ፕሮግራሞቻችን",
                hero_subtitle: "በዓለም ዙሪያ ባሉ ማህበረሰቦች ውስጥ ለውጥ የሚያመጡ ተነሳሽነቶቻችንን ያግኙ።",
                all_programs: "ሁሉም ፕሮግራሞች",
                no_programs: "ምንም ፕሮግራሞች አይገኙም",
                check_back: "ለአዳዲስ ፕሮግራሞች በቅርቡ ይመልከቱ።"
            },
            partners: {
                title: "አጋሮቻችን",
                subtitle: "ዘላቂ ተፅእኖ ለመፍጠር አብረን መስራት"
            },
            cta: {
                title: "ህይወትን ለመቀየር ይቀላቀሉን",
                description: "ልገሳ ማድረግ፣ በፈቃደኝነት መስራት ወይም ከእኛ ጋር መሻረክ ቢፈልጉ፣ ተልእኮአችንን ለመደገፍ እና ለአፍሪካ ቀጣይ ትውልድ እድሎችን ለመፍጠር ብዙ መንገዶች አሉ።",
                get_involved: "ተሳተፉ",
                learn_more: "የበለጠ ይወቁ"
            },
            footer: {
                description: "በዓለም ደረጃ ትምህርት እና ዓለም አቀፍ እድሎች የአፍሪካን ቀጣይ የቴክኖሎጂ መሪዎች ማብቃት።",
                quick_links: "ፈጣን ሊንኮች",
                programs: "ፕሮግራሞች",
                about_us: "ስለ እኛ",
                contact: "ያግኙን",
                legal: "ህጋዊ",
                privacy_policy: "የግላዊነት መመሪያ",
                terms_of_service: "የአገልግሎት ውሎች",
                cookie_policy: "የኩኪ መመሪያ",
                connect: "ያገናኙ",
                rights_reserved: "ሁሉም መብቶች የተጠበቁ ናቸው።"
            },
            common: {
                loading: "በመጫን ላይ...",
                error: "ስህተት ተፈጥሯል",
                save: "አስቀምጥ",
                cancel: "ሰርዝ",
                edit: "አርትዕ",
                delete: "ሰርዝ",
                submit: "አስገባ",
                search: "ፈልግ",
                view_all: "ሁሉንም ይመልከቱ",
                read_more: "ተጨማሪ አንብብ",
                back: "ተመለስ",
                next: "ቀጣይ",
                previous: "ቀዳሚ"
            },
            admin: {
                edit_mode: "የአርትዕ ሁነታ",
                edit_mode_on: "የአርትዕ ሁነታ፡ በርቷል",
                edit_mode_off: "የአርትዕ ሁነታ፡ ጠፍቷል",
                save_changes: "ለውጦችን አስቀምጥ",
                discard_changes: "ለውጦችን ተው",
                changes_saved: "ለውጦች በተሳካ ሁኔታ ተቀምጠዋል",
                changes_discarded: "ለውጦች ተወግደዋል",
                admin_controls: "የአስተዳዳሪ መቆጣጠሪያዎች",
                pending_changes: "በመጠባበቅ ላይ ያሉ ለውጦች"
            },
            auth: {
                welcome_back: "እንኳን ደህና ተመለሱ",
                create_account: "አካውንት ይፍጠሩ",
                sign_in: "ግባ",
                sign_up: "ይመዝገቡ",
                email: "ኢሜይል",
                password: "የይለፍ ቃል",
                full_name: "ሙሉ ስም",
                signing_in: "በመግባት ላይ...",
                creating_account: "አካውንት በመፍጠር ላይ...",
                no_account: "አካውንት የለዎትም? ይመዝገቡ",
                have_account: "አካውንት አለዎት? ይግቡ",
                sign_in_description: "ወደ አካውንትዎ ይግቡ",
                sign_up_description: "ለመጀመር አዲስ አካውንት ይፍጠሩ"
            },
            about: {
                hero_title: "እኛ ማን ነን",
                hero_subtitle: "የአፍሪካን ቀጣይ የቴክኖሎጂ መሪዎች ለማብቃት የተሰጠ ተልእኮ ያለው ድርጅት።",
                our_vision: "ራዕያችን",
                vision_title: "አቅም ወሰን የማያውቅበት ዓለም",
                vision_desc_1: "ማንኛውም ሰው የተወለደበት ቦታ ምንም ይሁን ምን ሙሉ አቅሙን የማሳካት እድል እንደሚገባው እናምናለን።",
                vision_desc_2: "በዓለም ደረጃ ትምህርት እና ከዓለም አቀፍ እድሎች ጋር ቀጥተኛ ግንኙነት።",
                our_values: "እሴቶቻችን"
            },
            values: {
                excellence: "ብቃት",
                excellence_desc: "በምናደርገው ሁሉ ከፍተኛ ደረጃዎችን እንፈልጋለን",
                compassion: "ርህራሄ",
                compassion_desc: "ለምናገለግላቸው ማህበረሰቦች በጥልቀት እንጨነቃለን",
                transparency: "ግልጽነት",
                transparency_desc: "በግልጽነት እና በተጠያቂነት እንሰራለን"
            },
            whatwedo: {
                hero_title: "የምንሰራው ስራ",
                hero_subtitle: "ለአፍሪካ ተሰጥኦዎች የዓለም ደረጃ ትምህርት እና የሙያ እድሎችን እናቀርባለን።",
                programs_title: "ፕሮግራሞቻችን",
                programs_subtitle: "ለስኬት ለማዘጋጀት የተነደፉ አጠቃላይ የስልጠና ፕሮግራሞች።",
                journey_title: "ጉዞው",
                journey_subtitle: "ከመማር እስከ ገቢ ማግኘት የተቀመጠ መንገድ",
                web_dev: "የድር ልማት",
                web_dev_desc: "ዘመናዊ ማዕቀፎችን የሚሸፍን የ full-stack ልማት ስልጠና።",
                uiux: "UI/UX ዲዛይን",
                uiux_desc: "በተጠቃሚ ላይ ያተኮረ ዲዛይን መርሆዎች እና የፕሮቶታይፕ መሳሪያዎች።",
                ai: "ሰው ሰራሽ ብልህነት",
                ai_desc: "የማሽን ትምህርት መሰረታዊ ነገሮች እና የመረጃ ሳይንስ።",
                leadership: "አመራር እና ለስላሳ ክህሎቶች",
                leadership_desc: "ግንኙነት፣ የቡድን ስራ እና ሙያዊ ልማት።",
                step1_title: "የመግቢያ ኮርስ",
                step1_duration: "1 ሳምንት",
                step1_desc: "የክህሎት ግምገማ እና አቅጣጫ",
                step2_title: "ጠንካራ ቡትካምፕ",
                step2_duration: "4 ወር",
                step2_desc: "ጥልቅ ቴክኒካዊ ስልጠና ከተግባራዊ ፕሮጀክቶች ጋር",
                step3_title: "የሚከፈል ኢንተርንሺፕ",
                step3_duration: "8 ወር",
                step3_desc: "ከዓለም አቀፍ ኩባንያዎች ጋር እውነተኛ የስራ ልምድ"
            },
            stories: {
                hero_title: "የስኬት ታሪኮች",
                hero_subtitle: "የDirectED ተማሪዎችን ለውጥ አምጪ ጉዞዎች ያግኙ።",
                coming_soon: "ታሪኮች በቅርቡ ይመጣሉ..."
            },
            takeaction: {
                hero_title: "እርምጃ ውሰድ",
                hero_subtitle: "ለአፍሪካ ቀጣይ ትውልድ የቴክኖሎጂ መሪዎች እድሎችን ለመፍጠር ይቀላቀሉን።",
                donate: "ልገሳ",
                donate_desc: "መዋጮዎ በቀጥታ ስኮላርሺፖችን እና የስልጠና ግብዓቶችን ይደግፋል።",
                donate_cta: "አሁን ይለግሱ",
                volunteer: "በፈቃደኝነት",
                volunteer_desc: "እንደ አማካሪ ወይም አማካሪ ልምድዎን ያጋሩ።",
                volunteer_cta: "በፈቃደኝነት ይስሩ",
                advocate: "ተሟጋች",
                advocate_desc: "ስለ ተልእኮአችን ቃል ለማስፋፋት ያግዙ።",
                advocate_cta: "ተሟጋች ይሁኑ",
                partner: "አጋር",
                partner_desc: "ድርጅቶች ለኢንተርንሺፕ ከእኛ ጋር መሻረክ ይችላሉ።",
                partner_cta: "ሽርክና ያስሱ",
                cta_title: "ለውጥ ለማምጣት ዝግጁ ነዎት?",
                cta_desc: "እያንዳንዱ መዋጮ ተፅእኖአችንን ለማስፋት ይረዳናል።",
                cta_primary: "አሁን ይለግሱ",
                cta_secondary: "ያግኙን"
            },
            team: {
                hero_title: "ቡድናችን",
                hero_subtitle: "በትምህርት ህይወትን ለመለወጥ የሚሰሩ ታታሪ ባለሙያዎችን ያግኙ።",
                leadership_badge: "አመራር",
                executive_leadership: "ሥራ አስፈፃሚ አመራር",
                leadership_desc: "የDirectEd ተልእኮን የሚመሩ ራዕይ ያላቸው መሪዎች",
                dept_programs: "ፕሮግራሞች",
                dept_programs_desc: "የዓለም ደረጃ ስልጠና እና የተማሪ ስኬት",
                dept_partnerships: "ሽርክናዎች",
                dept_partnerships_desc: "ወደ ዓለም አቀፍ እድሎች ድልድዮችን መገንባት",
                dept_operations: "ስራዎች",
                dept_operations_desc: "ድርጅታዊ ብቃትን ማረጋገጥ",
                dept_technology: "ቴክኖሎጂ",
                dept_technology_desc: "የመማሪያ መድረኮቻችንን ማብቃት",
                join_team: "ቡድናችንን ይቀላቀሉ",
                join_desc: "ችሎታ ያላቸው እና ጉጉት ያላቸው ሰዎችን እንፈልጋለን።",
                view_positions: "ክፍት ቦታዎችን ይመልከቱ",
                learn_working: "እዚህ ስለ መስራት ይወቁ"
            },
            contact: {
                hero_title: "ያግኙን",
                hero_subtitle: "ጥያቄዎች አሉዎት? ከእርስዎ መስማት እንወዳለን።",
                email: "ኢሜይል",
                phone: "ስልክ",
                location: "ቦታ",
                send_message: "መልእክት ይላኩልን",
                form_subtitle: "ከዚህ በታች ያለውን ቅጽ ይሙሉ",
                full_name: "ሙሉ ስም",
                email_address: "ኢሜይል አድራሻ",
                subject: "ርዕሰ ጉዳይ",
                message: "መልእክት",
                send_btn: "መልእክት ይላኩ",
                follow_us: "ይከተሉን",
                social_subtitle: "በማህበራዊ ሚዲያ ላይ ተገናኙ"
            },
            datahub: {
                hero_title: "መረጃ እና የተፅእኖ ስታቲስቲክስ",
                hero_subtitle: "የDirectEd ተፅእኖን የሚያሳዩ ግልጽ መረጃዎች።",
                all_stats: "ሁሉም ስታቲስቲክስ",
                education: "ትምህርት",
                employment: "ስራ",
                reach: "ተደራሽነት",
                partnerships: "ሽርክናዎች",
                financial: "ፋይናንሺያል",
                impact_stories: "የተፅእኖ ታሪኮች",
                behind_numbers: "ከቁጥሮች በስተጀርባ",
                stories_subtitle: "ከተመረቁ ሰዎች እውነተኛ የለውጥ ታሪኮች",
                transparency_title: "ለግልጽነት ቁርጠኛ",
                transparency_desc: "በሙሉ ግልጽነት እና ተጠያቂነት እናምናለን።",
                download_report: "ሙሉ ሪፖርት አውርድ",
                view_annual: "ዓመታዊ ሪፖርቶችን ይመልከቱ"
            },
            partnerships: {
                hero_title: "አጋሮቻችን",
                hero_subtitle: "የDirectEd ተፅእኖ በስትራቴጂካዊ ሽርክናዎች ይጨምራል።",
                all_partners: "ሁሉም አጋሮች",
                corporate: "ኮርፖሬት",
                educational: "ትምህርታዊ",
                nonprofit: "ያለትርፍ",
                government: "መንግስት",
                become_partner: "አጋር ይሁኑ",
                become_partner_desc: "እድሎችን ለመፍጠር እና ህይወትን ለመለወጥ ይቀላቀሉን።",
                partner_btn: "አጋር ይሁኑ"
            },
            publications: {
                hero_title: "ህትመቶች እና ሪፖርቶች",
                hero_subtitle: "ምርምራችንን፣ ዓመታዊ ሪፖርቶችን እና የጉዳይ ጥናቶችን ያስሱ።",
                all: "ሁሉም ህትመቶች",
                annual_reports: "ዓመታዊ ሪፖርቶች",
                impact_reports: "የተፅእኖ ሪፖርቶች",
                research_papers: "የምርምር ወረቀቶች",
                case_studies: "የጉዳይ ጥናቶች",
                whitepapers: "ነጭ ወረቀቶች",
                type_label: "የህትመት አይነት",
                year_label: "ዓመት",
                no_publications: "ምንም ህትመቶች አልተገኙም",
                adjust_filters: "ፊልተሮችዎን ለማስተካከል ይሞክሩ።",
                reset_filters: "ፊልተሮችን ዳግም አስጀምር"
            },
            research: {
                hero_title: "ምርምር እና ሪፖርቶች",
                hero_subtitle: "ተልእኮአችንን የሚመሩ በማስረጃ ላይ የተመሰረቱ ግንዛቤዎች።",
                coming_soon: "የምርምር ህትመቶች በቅርቡ ይመጣሉ..."
            },
            focus: {
                not_found: "የትኩረት ቦታ አልተገኘም",
                return: "ወደ ምንሰራው ተመለስ",
                badge: "የትኩረት ቦታ",
                overview: "አጠቃላይ እይታ",
                our_approach: "አቀራረባችን",
                challenges: "ተግዳሮቶች",
                what_addressing: "የምንፈታው",
                solutions: "መፍትሄዎች",
                how_helping: "እንዴት እንደምንረዳ",
                impact: "ተፅእኖ",
                making_difference: "ልዩነት ማምጣት",
                support_cause: "ይህን ጉዳይ ይደግፉ",
                explore_more: "ተጨማሪ ቦታዎችን ያስሱ"
            },
            program: {
                back_to_programs: "ወደ ፕሮግራሞች ተመለስ",
                support_title: "ይህን ተነሳሽነት መደገፍ ይፈልጋሉ?",
                support_desc: "መዋጮዎ ዘላቂ ለውጥ ሊያመጣ ይችላል።"
            },
            notfound: {
                message: "ወይ! ገጹ አልተገኘም",
                return_home: "ወደ መነሻ ተመለስ"
            }
        }
    },

    // CHINESE (Simplified)
    zh: {
        translation: {
            nav: {
                what_we_do: "我们的工作",
                programs: "我们的项目",
                programs_desc: "培训和发展计划",
                education_skills: "教育与技能",
                education_desc: "世界一流的教育机会",
                youth_employment: "青年就业",
                employment_desc: "职业发展和就业安置",
                tech_innovation: "技术与创新",
                tech_desc: "面向未来的技术技能",
                gender_equality: "性别平等",
                gender_desc: "科技领域女性倡议",
                research_reports: "研究与报告",
                publications: "出版物",
                reports_desc: "报告和研究论文",
                data_statistics: "数据与统计",
                impact_metrics: "影响力指标和分析",
                annual_reports: "年度报告",
                yearly_achievements: "年度成就",
                stories: "故事",
                success_stories: "成功故事",
                transformative_journeys: "改变人生的旅程",
                blog: "博客",
                latest_news: "最新新闻和见解",
                impact_data: "影响力数据",
                impact_numbers: "用数字看我们的影响力",
                who_we_are: "关于我们",
                our_mission: "我们的使命",
                vision_values: "愿景和价值观",
                team: "团队",
                meet_people: "认识我们的团队",
                partners: "合作伙伴",
                orgs_work_with: "我们合作的组织",
                about_us: "关于我们",
                learn_more: "了解更多关于DirectEd发展基金会",
                take_action: "采取行动",
                donate: "捐赠",
                support_mission: "支持我们的使命",
                volunteer: "志愿服务",
                give_time: "贡献您的时间",
                partner_with_us: "与我们合作",
                collaborate: "合作创造影响",
                press_centre: "新闻中心",
                menu: "菜单",
                login: "登录",
                logout: "退出"
            },
            hero: {
                slide1: {
                    title: "赋能非洲下一代技术领导者",
                    subtitle: "与美国和欧洲公司合作提供世界一流的培训和远程带薪实习。网页开发、UIX和人工智能。",
                    cta: "探索我们的项目"
                },
                slide2: {
                    title: "将人才与全球机会连接",
                    subtitle: "我们弥合高潜力人才与世界最佳教育之间的差距，填补全球就业市场的技能缺口。",
                    cta: "了解更多"
                },
                slide3: {
                    title: "通过教育改变生活",
                    subtitle: "一个让任何人都能发挥全部潜力的世界，无论他们在人生抽签中的结果如何。",
                    cta: "加入我们的使命"
                }
            },
            stats: {
                students_trained: "培训学生",
                partner_schools: "合作学校",
                job_placements: "就业安置",
                corporate_partners: "企业合作伙伴"
            },
            mission: {
                badge: "我们的愿景",
                title: "一个潜力无限的世界",
                description: "我们相信每个人都应该有机会发挥全部潜力，无论他们出生在哪里。通过世界一流的教育和与全球机会的直接联系，我们正在打破障碍，为更光明的未来架起桥梁。",
                cta: "了解我们的使命"
            },
            news: {
                title: "DirectEd发展基金会，为每一位学习者",
                subtitle: "了解我们最新的故事、研究和影响"
            },
            features: {
                badge: "为什么选择DirectEd",
                title: "为影响力而生。为成功而设计。",
                subtitle: "我们的综合方法确保可持续增长和实际成果",
                proven_track_record: {
                    title: "经过验证的记录",
                    description: "培训超过500名学生，200+成功就业于全球领先科技公司。"
                },
                comprehensive_training: {
                    title: "全面培训",
                    description: "从1周入门课程到4个月密集训练营，再到8个月带薪实习。"
                },
                career_growth: {
                    title: "职业发展",
                    description: "与美国和欧洲公司直接就业通道，弥合全球人才缺口。"
                }
            },
            spotlight: {
                badge: "聚焦",
                title: "我们的重点领域",
                subtitle: "了解DirectEd发展基金会正在产生影响的关键领域",
                education: {
                    title: "教育与技能发展",
                    description: "释放潜力的世界级技术教育"
                },
                employment: {
                    title: "青年就业",
                    description: "将人才与全球机会连接"
                },
                gender: {
                    title: "科技领域性别平等",
                    description: "促进科技领域女性平等机会"
                },
                explore: "探索"
            },
            programs: {
                badge: "我们的方法",
                title: "从培训到职业：完整的旅程",
                description: "从一周的入门课程开始，接着是4个月的密集训练营，然后是8个月的带薪实习安置。我们的项目使用前沿科学研究和最先进技术趋势的洞察来设计。",
                cta: "探索我们的项目",
                web_dev: "网页开发与软件工程",
                uiux: "UI/UX设计与产品管理",
                ai: "人工智能与数据科学",
                hero_title: "我们的项目",
                hero_subtitle: "发现我们在世界各地社区产生影响的倡议。",
                all_programs: "所有项目",
                no_programs: "暂无项目",
                check_back: "请稍后再来查看新项目。"
            },
            partners: {
                title: "我们的合作伙伴",
                subtitle: "携手创造持久影响"
            },
            cta: {
                title: "加入我们改变生活",
                description: "无论您想捐赠、志愿服务还是与我们合作，都有很多方式支持我们的使命，帮助为非洲下一代创造机会。",
                get_involved: "参与其中",
                learn_more: "了解更多"
            },
            footer: {
                description: "通过世界一流的教育和全球机会赋能非洲下一代技术领导者。",
                quick_links: "快速链接",
                programs: "项目",
                about_us: "关于我们",
                contact: "联系我们",
                legal: "法律",
                privacy_policy: "隐私政策",
                terms_of_service: "服务条款",
                cookie_policy: "Cookie政策",
                connect: "连接",
                rights_reserved: "版权所有。"
            },
            common: {
                loading: "加载中...",
                error: "发生错误",
                save: "保存",
                cancel: "取消",
                edit: "编辑",
                delete: "删除",
                submit: "提交",
                search: "搜索",
                view_all: "查看全部",
                read_more: "阅读更多",
                back: "返回",
                next: "下一个",
                previous: "上一个"
            },
            admin: {
                edit_mode: "编辑模式",
                edit_mode_on: "编辑模式：开启",
                edit_mode_off: "编辑模式：关闭",
                save_changes: "保存更改",
                discard_changes: "放弃更改",
                changes_saved: "更改已成功保存",
                changes_discarded: "更改已放弃",
                admin_controls: "管理员控制",
                pending_changes: "待处理更改"
            },
            auth: {
                welcome_back: "欢迎回来",
                create_account: "创建账户",
                sign_in: "登录",
                sign_up: "注册",
                email: "电子邮件",
                password: "密码",
                full_name: "全名",
                signing_in: "登录中...",
                creating_account: "创建账户中...",
                no_account: "没有账户？注册",
                have_account: "已有账户？登录",
                sign_in_description: "登录您的账户",
                sign_up_description: "创建新账户开始使用"
            },
            about: {
                hero_title: "关于我们",
                hero_subtitle: "一个致力于赋能非洲下一代技术领导者的使命驱动型组织。",
                our_vision: "我们的愿景",
                vision_title: "一个潜力无限的世界",
                vision_desc_1: "我们相信每个人都应该有机会发挥全部潜力，无论他们出生在哪里。",
                vision_desc_2: "通过世界一流的教育和与全球机会的直接联系。",
                our_values: "我们的价值观"
            },
            values: {
                excellence: "卓越",
                excellence_desc: "我们在所做的一切中追求最高标准",
                compassion: "同情",
                compassion_desc: "我们深切关心我们服务的社区",
                transparency: "透明",
                transparency_desc: "我们以开放和负责的态度运营"
            },
            whatwedo: {
                hero_title: "我们的工作",
                hero_subtitle: "我们为非洲人才提供世界一流的教育和职业机会。",
                programs_title: "我们的项目",
                programs_subtitle: "为成功做好准备的综合培训项目。",
                journey_title: "旅程",
                journey_subtitle: "从学习到就业的结构化路径",
                web_dev: "网页开发",
                web_dev_desc: "涵盖现代框架的全栈开发培训。",
                uiux: "UI/UX设计",
                uiux_desc: "以用户为中心的设计原则和原型工具。",
                ai: "人工智能",
                ai_desc: "机器学习基础和数据科学。",
                leadership: "领导力与软技能",
                leadership_desc: "沟通、团队合作和职业发展。",
                step1_title: "入门课程",
                step1_duration: "1周",
                step1_desc: "技能评估和入职指导",
                step2_title: "密集训练营",
                step2_duration: "4个月",
                step2_desc: "深入的技术培训和实践项目",
                step3_title: "带薪实习",
                step3_duration: "8个月",
                step3_desc: "与全球公司的真实工作经验"
            },
            stories: {
                hero_title: "成功故事",
                hero_subtitle: "了解DirectED学生的变革性旅程。",
                coming_soon: "故事即将推出..."
            },
            takeaction: {
                hero_title: "采取行动",
                hero_subtitle: "加入我们，为非洲下一代技术领导者创造机会。",
                donate: "捐赠",
                donate_desc: "您的贡献直接资助奖学金和培训资源。",
                donate_cta: "立即捐赠",
                volunteer: "志愿服务",
                volunteer_desc: "作为导师或顾问分享您的专业知识。",
                volunteer_cta: "成为志愿者",
                advocate: "倡导者",
                advocate_desc: "帮助传播我们的使命。",
                advocate_cta: "成为倡导者",
                partner: "合作伙伴",
                partner_desc: "组织可以与我们合作进行实习安置。",
                partner_cta: "探索合作",
                cta_title: "准备好做出改变了吗？",
                cta_desc: "每一份贡献都帮助我们扩大影响力。",
                cta_primary: "立即捐赠",
                cta_secondary: "联系我们"
            },
            team: {
                hero_title: "我们的团队",
                hero_subtitle: "认识那些致力于通过教育改变生活的专业人士。",
                leadership_badge: "领导层",
                executive_leadership: "高管领导",
                leadership_desc: "引导DirectEd使命的有远见的领导者",
                dept_programs: "项目",
                dept_programs_desc: "世界一流的培训和学生成功",
                dept_partnerships: "合作伙伴关系",
                dept_partnerships_desc: "搭建通往全球机会的桥梁",
                dept_operations: "运营",
                dept_operations_desc: "确保组织卓越",
                dept_technology: "技术",
                dept_technology_desc: "支持我们的学习平台",
                join_team: "加入我们的团队",
                join_desc: "我们正在寻找有才华和热情的人。",
                view_positions: "查看空缺职位",
                learn_working: "了解更多关于在这里工作"
            },
            contact: {
                hero_title: "联系我们",
                hero_subtitle: "有问题吗？我们很想听到您的声音。",
                email: "邮箱",
                phone: "电话",
                location: "地点",
                send_message: "给我们发消息",
                form_subtitle: "填写下面的表格",
                full_name: "全名",
                email_address: "邮箱地址",
                subject: "主题",
                message: "消息",
                send_btn: "发送消息",
                follow_us: "关注我们",
                social_subtitle: "在社交媒体上保持联系"
            },
            datahub: {
                hero_title: "数据与影响统计",
                hero_subtitle: "透明的、数据驱动的DirectEd影响力洞察。",
                all_stats: "所有统计",
                education: "教育",
                employment: "就业",
                reach: "覆盖范围",
                partnerships: "合作伙伴关系",
                financial: "财务",
                impact_stories: "影响故事",
                behind_numbers: "数字背后",
                stories_subtitle: "来自我们毕业生的真实转变故事",
                transparency_title: "致力于透明",
                transparency_desc: "我们相信完全的透明和问责。",
                download_report: "下载完整报告",
                view_annual: "查看年度报告"
            },
            partnerships: {
                hero_title: "我们的合作伙伴",
                hero_subtitle: "DirectEd的影响力通过战略合作伙伴关系得到放大。",
                all_partners: "所有合作伙伴",
                corporate: "企业",
                educational: "教育",
                nonprofit: "非营利",
                government: "政府",
                become_partner: "成为合作伙伴",
                become_partner_desc: "加入我们，共同创造机会和改变生活。",
                partner_btn: "合作"
            },
            publications: {
                hero_title: "出版物与报告",
                hero_subtitle: "探索我们的研究、年度报告和案例研究。",
                all: "所有出版物",
                annual_reports: "年度报告",
                impact_reports: "影响报告",
                research_papers: "研究论文",
                case_studies: "案例研究",
                whitepapers: "白皮书",
                type_label: "出版物类型",
                year_label: "年份",
                no_publications: "未找到出版物",
                adjust_filters: "尝试调整您的筛选条件。",
                reset_filters: "重置筛选"
            },
            research: {
                hero_title: "研究与报告",
                hero_subtitle: "以证据为基础的洞察引导我们的使命。",
                coming_soon: "研究出版物即将推出..."
            },
            focus: {
                not_found: "未找到重点领域",
                return: "返回我们的工作",
                badge: "重点领域",
                overview: "概述",
                our_approach: "我们的方法",
                challenges: "挑战",
                what_addressing: "我们正在解决的问题",
                solutions: "解决方案",
                how_helping: "我们如何帮助",
                impact: "影响",
                making_difference: "创造不同",
                support_cause: "支持这项事业",
                explore_more: "探索更多领域"
            },
            program: {
                back_to_programs: "返回项目",
                support_title: "想支持这项倡议吗？",
                support_desc: "您的贡献可以带来持久的改变。"
            },
            notfound: {
                message: "哎呀！页面未找到",
                return_home: "返回首页"
            }
        }
    }
};

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: 'en',
        debug: false,
        interpolation: {
            escapeValue: false
        },
        detection: {
            order: ['localStorage', 'navigator', 'htmlTag'],
            caches: ['localStorage'],
            lookupLocalStorage: 'directed_language_preference'
        }
    });

export default i18n;
