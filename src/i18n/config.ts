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
                ai: "Artificial Intelligence & Data Science"
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
                ai: "Intelligence Artificielle et Science des Données"
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
                ai: "Inteligencia Artificial y Ciencia de Datos"
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
                ai: "Akili Bandia na Sayansi ya Data"
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
                ai: "ሰው ሰራሽ ብልህነት እና የመረጃ ሳይንስ"
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
                ai: "人工智能与数据科学"
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
