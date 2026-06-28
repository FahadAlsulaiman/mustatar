import { Scale, FileText, Lightbulb, ShieldCheck, Handshake, Languages } from 'lucide-react'

export const translations = {
  ar: {
    dir: 'rtl',
    nav: {
      home: 'الرئيسية',
      about: 'من نحن',
      services: 'خدماتنا',
      team: 'الهيكل التنظيمي',
      clients: 'عملاؤنا',
      contact: 'تواصل معنا',
      cta: 'طلب خدمة أو استشارة',
    },
    brand: {
      name: 'مُـسـتـطـر',
      sub: 'مـحـامـون ومـسـتـشـارون',
    },
    hero: {
      tagline: 'مستطر محامون و مستشارون هي شركة مساهمة مبسطة مهنية تقدم خدمات قانونية.',
      cta: 'تعرف علينا',
    },
    about: {
      title: 'نبذة عن مُستطر',
      intro:
        'أُسست الشركة لتقديم خدمات قانونية متخصصة تهدف إلى دعم القطاع العام و الخاص بتوفير خدمات قانونية بخبرة ومهنية متكاملة.',
      cards: [
        {
          title: 'رؤيتنا',
          text: 'أن نكون قامة متأصلة في قطاع تقديم الخدمات القانونية بالتواكب الزمني و احتياج سوق العمل بتوفير عدد كبير من المحامين و الشركاء المتخصصين كل بحسب مجاله القانوني.',
        },
        {
          title: 'قيمنا',
          text: 'نلتزم بأعلى معايير المهنية والنزاهة والسرية في تقديم خدماتنا القانونية، ونسعى للتميز في كل تفصيل لخدمة عملائنا وتحقيق مصالحهم.',
        },
      ],
    },
    services: {
      title: 'خدماتنا',
      items: [
        { title: 'خدمات المحاماة', desc: 'تمثيل العملاء في التفاوض و المطالبة و الدفاع في كافة درجات التقاضي وفي جميع الإختصاصات القضائية.' },
        { title: 'خدمات العقود و الإستشارات', desc: 'تقديم الاستشارات و الدراسات القانونية في المجالات النظامية و القانونية، وصياغة ومراجعة العقود والاتفاقيات وإعداد كافة مستندات التعاملات المالية.' },
        { title: 'خدمات الملكية الفكرية', desc: 'دعم المنشآت التجارية و الأفراد بتقديم كافة خدمات الملكية الفكرية (العلامات التجارية، حقوق المؤلف، الأصناف النباتية، النماذج الصناعية، الدارات المتكاملة، براءات الاختراع).' },
        { title: 'خدمات الحوكمة', desc: 'كافة إجراءات حوكمة الشركات ومنها عقود الشركاء و الأنظمة الأساسية والجمعيات العامة و الخاصة و لوائح المجلس و مستندات أمانة المجلس.' },
        { title: 'خدمات المساندة', desc: 'التوثيق (توثيق الوكالات، الإفراغات العقارية، إقرارات الديون)، واعتماد لوائح تنظيم العمل في منصة قوى، والتسجيل العيني العقاري.' },
        { title: 'اللغة الإنجليزية', desc: 'تقدم كافة الخدمات القانونية باللغة الإنجليزية.' },
      ],
    },
    team: {
      title: 'الهيكل التنظيمي',
      subtitle: 'نخبة من الشركاء والمحامين المتخصصين في مختلف المجالات القانونية.',
      members: [
        {
          name: 'عبدالعزيز خالد الجفن',
          role: 'شريك مدير | محامي',
          points: [
            'شريك مؤسس ومدير الشركة.',
            'محامي بخبرة تفوق (9) سنوات في مهنة المحاماة.',
            'مختص وممارس حالي في الاستشارة القانونية وصياغة العقود وحوكمة المنشآت التجارية.',
            'مدير خدمات الحوكمة وخدمات الاستشارات والعقود في الشركة.',
            'مرخص من وزارة العدل في مهنة المحاماة برقم (42/206).',
            'عضو أساسي في الهيئة السعودية للمحامين.',
          ],
        },
        {
          name: 'خالد بن عبدالله بن شايع',
          role: 'شريك | محامي',
          points: [
            'شريك مؤسس، ومحامي بخبرة تفوق (6) سنوات في مهنة المحاماة.',
            'مختص وممارس لجميع خدمات التمثيل القضائي وخاصة في القضاء التجاري.',
            'مدير خدمات التقاضي التجاري وخدمات الملكية الفكرية في الشركة.',
            'مرخص من وزارة العدل في مهنة المحاماة برقم (44/1796).',
            'مرخص من الهيئة السعودية للملكية الفكرية برقم (ALN202501180).',
            'عضو أساسي في الهيئة السعودية للمحامين.',
          ],
        },
        {
          name: 'عبدالعزيز عبدالله اليحيى',
          role: 'شريك | محامي',
          points: [
            'شريك، ومحامي بخبرة تفوق (4) سنوات في مهنة المحاماة.',
            'مختص وممارس لجميع خدمات التمثيل القضائي وخاصة في القضاء الجنائي.',
            'مدير خدمات التقاضي الجنائي في الشركة.',
            'مرخص من وزارة العدل في مهنة المحاماة برقم (44/3562).',
            'عضو أساسي في الهيئة السعودية للمحامين.',
          ],
        },
      ],
    },
    clients: {
      title: 'عملاؤنا',
      items: [
        'شركة مدد الأعمال لتقنية نظم المعلومات',
        'شركة مصنع العنوان الأول للمياه المعدنية',
        'شركة مستشفى علي بن محمد بن محفر بن علي الطبي',
        'شركة قامات العقارية',
        'الثروة الصناعية للمقاولات',
        'أربعة طرق لتنظيم المعارض والمؤتمرات',
        'الناقل العربي للتخليص الجمركي',
        'شركة ترانس ورلد السعودية للخدمات اللوجستية',
        'صالح الهنداس للتجارة',
      ],
    },
    request: {
      title: 'طلب خدمة',
      titleLabel: 'عنوان الخدمة',
      titlePlaceholder: 'أدخل عنوان الخدمة',
      detailsLabel: 'تفاصيل الخدمة',
      detailsPlaceholder: 'أدخل تفاصيل الخدمة',
      submit: 'إرسال الطلب',
      success: 'تم إرسال طلبك بنجاح، سنتواصل معك قريباً.',
    },
    contact: {
      title: 'تواصل معنا',
      heading: 'تواصل معنا',
      desc: 'نحن نتطلع للتواصل معك. تواصل معنا باستخدام المعلومات أدناه.',
      address: 'المملكة العربية السعودية - الرياض، الدائري الجنوبي الفرعي - مخرج 24',
      email: 'Info@mustatar.com.sa',
      website: 'mustatar.com.sa',
      phone: '050 3379 688',
      cr: 'السجل التجاري 1009099133',
      viewOnMap: 'فتح في خرائط Google',
    },
    footer: {
      about: 'شركة مساهمة مبسطة مهنية تقدم خدمات قانونية متخصصة بخبرة ومهنية متكاملة.',
      quickLinks: 'روابط سريعة',
      servicesTitle: 'خدماتنا',
      contactTitle: 'معلومات الاتصال',
      rights: 'جميع الحقوق محفوظة © 2025 لدى مُستطر',
    },
    langButton: 'E',
  },

  en: {
    dir: 'ltr',
    nav: {
      home: 'Home',
      about: 'About',
      services: 'Services',
      team: 'Our Team',
      clients: 'Clients',
      contact: 'Contact',
      cta: 'Request a Service',
    },
    brand: {
      name: 'MUSTATAR',
      sub: 'Lawyers & Consultants',
    },
    hero: {
      tagline: 'Mustatar Lawyers & Consultants is a professional simplified joint-stock company providing legal services.',
      cta: 'Learn More',
    },
    about: {
      title: 'About Mustatar',
      intro:
        'The firm was established to deliver specialized legal services aimed at supporting both the public and private sectors with experienced and fully professional legal solutions.',
      cards: [
        {
          title: 'Our Vision',
          text: 'To become a deeply rooted pillar in the legal services sector, keeping pace with the times and market demands by providing a large team of lawyers and specialized partners, each within their own legal field.',
        },
        {
          title: 'Our Values',
          text: 'We are committed to the highest standards of professionalism, integrity, and confidentiality in delivering our legal services, striving for excellence in every detail to serve our clients and protect their interests.',
        },
      ],
    },
    services: {
      title: 'Our Services',
      items: [
        { title: 'Litigation Services', desc: 'Representing clients in negotiation, claims, and defense across all levels of litigation and in all judicial jurisdictions.' },
        { title: 'Contracts & Advisory', desc: 'Providing legal consultations and studies in regulatory and legal matters, drafting and reviewing contracts and agreements, and preparing all financial transaction documents.' },
        { title: 'Intellectual Property', desc: 'Supporting businesses and individuals with all IP services (trademarks, copyrights, plant varieties, industrial designs, integrated circuits, and patents).' },
        { title: 'Corporate Governance', desc: 'All corporate governance procedures, including partner agreements, bylaws, general and special assemblies, board regulations, and board secretariat documents.' },
        { title: 'Support Services', desc: 'Notarization (powers of attorney, real estate releases, debt acknowledgments), approval of work regulations on the Qiwa platform, and real estate registration.' },
        { title: 'English Language', desc: 'All legal services are provided in English.' },
      ],
    },
    team: {
      title: 'Our Team',
      subtitle: 'A select group of partners and lawyers specialized in various legal fields.',
      members: [
        {
          name: 'Abdulaziz Khalid Aljafn',
          role: 'Managing Partner | Lawyer',
          points: [
            'Founding partner and managing director of the firm.',
            'Lawyer with over 9 years of experience in the legal profession.',
            'Specialist and active practitioner in legal advisory, contract drafting, and corporate governance.',
            'Director of Governance and of Advisory & Contracts services at the firm.',
            'Licensed by the Ministry of Justice in law practice (No. 42/206).',
            'Active member of the Saudi Bar Association.',
          ],
        },
        {
          name: 'Khalid Abdullah Bin Shaya',
          role: 'Partner | Lawyer',
          points: [
            'Founding partner with over 6 years of experience in the legal profession.',
            'Specialist and practitioner in all judicial representation services, especially commercial litigation.',
            'Director of Commercial Litigation and Intellectual Property services at the firm.',
            'Licensed by the Ministry of Justice in law practice (No. 44/1796).',
            'Licensed by the Saudi Authority for Intellectual Property (No. ALN202501180).',
            'Active member of the Saudi Bar Association.',
          ],
        },
        {
          name: 'Abdulaziz Abdullah Alyahya',
          role: 'Partner | Lawyer',
          points: [
            'Partner with over 4 years of experience in the legal profession.',
            'Specialist and practitioner in all judicial representation services, especially criminal litigation.',
            'Director of Criminal Litigation services at the firm.',
            'Licensed by the Ministry of Justice in law practice (No. 44/3562).',
            'Active member of the Saudi Bar Association.',
          ],
        },
      ],
    },
    clients: {
      title: 'Our Clients',
      items: [
        'Madad Al-Amal Information Systems Technology Co.',
        'Al-Onwan Al-Awwal Mineral Water Factory Co.',
        'Ali bin Mohammed bin Mahfar bin Ali Medical Hospital Co.',
        'Qamat Real Estate Co.',
        'Industrial Wealth Contracting',
        'Four Roads for Exhibitions & Conferences',
        'Arab Carrier for Customs Clearance',
        'Trans World Saudi Logistics Services Co.',
        'Saleh Al-Hindas Trading',
      ],
    },
    request: {
      title: 'Request a Service',
      titleLabel: 'Service Title',
      titlePlaceholder: 'Enter the service title',
      detailsLabel: 'Service Details',
      detailsPlaceholder: 'Enter the service details',
      submit: 'Submit Request',
      success: 'Your request has been submitted successfully. We will contact you soon.',
    },
    contact: {
      title: 'Contact Us',
      heading: 'Get in Touch',
      desc: 'We look forward to hearing from you. Reach out using the information below.',
      address: 'Saudi Arabia - Riyadh, Southern Ring Branch Road - Exit 24',
      email: 'Info@mustatar.com.sa',
      website: 'mustatar.com.sa',
      phone: '050 3379 688',
      cr: 'C.R. 1009099133',
      viewOnMap: 'Open in Google Maps',
    },
    footer: {
      about: 'A professional simplified joint-stock company providing specialized legal services with full expertise and professionalism.',
      quickLinks: 'Quick Links',
      servicesTitle: 'Our Services',
      contactTitle: 'Contact Info',
      rights: 'All rights reserved © 2025 Mustatar',
    },
    langButton: 'ع',
  },
}

// Icons stay constant across languages (matched by index to services.items)
export const serviceIcons = [Scale, FileText, Lightbulb, ShieldCheck, Handshake, Languages]
