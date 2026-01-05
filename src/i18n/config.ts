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
                research_reports: "Research & Reports",
                stories: "Stories",
                who_we_are: "Who We Are",
                take_action: "Take Action",
                donate: "Donate",
                press_centre: "Press Centre",
                menu: "Menu"
            },
            hero: {
                slide1: {
                    title: "Empowering Africa's Next Generation of Tech Leaders",
                    subtitle: "World-class training and remote paid internships with US and European companies.",
                    cta: "Discover Our Programs"
                }
            }
        }
    },

    // FRENCH
    fr: {
        translation: {
            nav: {
                what_we_do: "Ce Que Nous Faisons",
                programs: "Nos Programmes",
                research_reports: "Recherche et Rapports",
                stories: "Histoires",
                who_we_are: "Qui Nous Sommes",
                take_action: "Agir",
                donate: "Faire un Don",
                press_centre: "Centre de Presse",
                menu: "Menu"
            },
            hero: {
                slide1: {
                    title: "Autonomiser la Prochaine Génération de Leaders Tech d'Afrique",
                    subtitle: "Formation de classe mondiale et stages rémunérés à distance avec des entreprises américaines et européennes.",
                    cta: "Découvrir Nos Programmes"
                }
            }
        }
    },

    // SPANISH
    es: {
        translation: {
            nav: {
                what_we_do: "Qué Hacemos",
                programs: "Nuestros Programas",
                research_reports: "Investigación e Informes",
                stories: "Historias",
                who_we_are: "Quiénes Somos",
                take_action: "Actuar",
                donate: "Donar",
                press_centre: "Centro de Prensa",
                menu: "Menú"
            },
            hero: {
                slide1: {
                    title: "Empoderando la Próxima Generación de Líderes Tecnológicos de África",
                    subtitle: "Formación de clase mundial y prácticas remuneradas remotas con empresas de EE.UU. y Europa.",
                    cta: "Descubrir Nuestros Programas"
                }
            }
        }
    },

    // KISWAHILI
    sw: {
        translation: {
            nav: {
                what_we_do: "Tunachofanya",
                programs: "Programu Zetu",
                research_reports: "Utafiti na Ripoti",
                stories: "Hadithi",
                who_we_are: "Sisi Ni Nani",
                take_action: "Chukua Hatua",
                donate: "Toa Mchango",
                press_centre: "Kituo cha Habari",
                menu: "Menyu"
            },
            hero: {
                slide1: {
                    title: "Kuwezesha Kizazi Kijacho cha Viongozi wa Teknolojia wa Afrika",
                    subtitle: "Mafunzo ya kiwango cha kimataifa na mafunzo ya kulipwa kutoka mbali na makampuni ya Marekani na Ulaya.",
                    cta: "Gundua Programu Zetu"
                }
            }
        }
    },

    // AMHARIC
    am: {
        translation: {
            nav: {
                what_we_do: "የምንሰራው ስራ",
                programs: "የእኛ ፕሮግራሞች",
                research_reports: "ምርምር እና ሪፖርቶች",
                stories: "ታሪኮች",
                who_we_are: "እኛ ማን ነን",
                take_action: "እርምጃ ውሰድ",
                donate: "ልገሳ",
                press_centre: "የፕሬስ ማዕከል",
                menu: "ምናሌ"
            },
            hero: {
                slide1: {
                    title: "የአፍሪካን ቀጣይ የቴክኖሎጂ መሪዎች ማብቃት",
                    subtitle: "በአሜሪካ እና በአውሮፓ ኩባንያዎች ከፍተኛ ጥራት ያለው ስልጠና እና የሩቅ የተከፈለ ኢንተርንሺፕ።",
                    cta: "ፕሮግራሞቻችንን ያግኙ"
                }
            }
        }
    },

    // CHINESE (Simplified)
    zh: {
        translation: {
            nav: {
                what_we_do: "我们的工作",
                programs: "我们的项目",
                research_reports: "研究与报告",
                stories: "故事",
                who_we_are: "关于我们",
                take_action: "采取行动",
                donate: "捐赠",
                press_centre: "新闻中心",
                menu: "菜单"
            },
            hero: {
                slide1: {
                    title: "赋能非洲下一代技术领导者",
                    subtitle: "与美国和欧洲公司合作提供世界一流的培训和远程带薪实习。",
                    cta: "探索我们的项目"
                }
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
        }
    });

export default i18n;
