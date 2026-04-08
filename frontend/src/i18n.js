import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: false,
    interpolation: { escapeValue: false },
    resources: {
      en: {
        translation: {
          nav: {
            home: 'Home', about: 'About LEI', services: 'Services',
            gallery: 'Gallery', career: 'Career', contact: 'Contact Us',
            consult: 'Consult Experts', specialized: 'Specialized Solutions'
          },
          brand: { name: 'LASER EXPERTS', tagline: 'SERVICE FIRST' },
          hero: {
            tag: "India's #1 Laser Machine Service Provider",
            title1: 'PRECISION', title2: 'LASER', title3: 'SOLUTIONS',
            subtitle: "Delivering OEM-quality service, repair, retrofitting and automation for CO₂ and Fiber Laser machines across India. Trusted by 4000+ industrial clients since 2017.",
            cta: 'Explore Services', aboutCta: 'About LEI',
            stat1: 'Machines Serviced', stat2: 'Years Experience', stat3: 'Success Rate'
          },
          about: {
            tag: 'Who We Are', title: 'About Laser Experts India',
            desc: "Founded in 2017, LEI has built a reputation as India's most trusted laser machine service company with 40+ years combined CNC experience and 10+ years in CO₂ & Fiber Laser services — serving 4000+ machines across India and UAE.",
            talkExpert: 'Talk to an Expert', learnMore: 'Learn More',
            metric1: 'Machines Serviced', metric2: 'CNC Experience',
            metric3: 'Repeat Customers', metric4: 'Service Branches',
            rootsTag: 'Our Roots', rootsTitle: 'Over 40 Years of',
            rootsTitle2: 'Combined CNC Expertise',
            rootsDesc1: "Laser Experts India (LEI) was founded with a single mission: to provide Indian industrial manufacturers with world-class, OEM-quality laser machine services at a fraction of the cost.",
            rootsDesc2: "Since our inception in 2017, we have expanded our reach to serve over 4,000 machines across India and the UAE, becoming a trusted name for specialized CO2 and Fiber laser solutions.",
            visionTag: 'Our Vision', visionTitle: 'Driving the Future of',
            visionTitle2: 'Laser Automation',
            visionDesc: "We aim to empower small and large scale manufacturers by providing them the tools to upgrade their legacy systems, ensuring zero downtime and maximum production efficiency."
          },
          stats: {
            machines: '4000+', machinesLabel: 'Machines Serviced',
            experience: '10+', experienceLabel: 'Years Experience',
            success: '98%', successLabel: 'Success Rate',
            global: '3+', globalLabel: 'Service Branches'
          },
          process: {
            tag: 'HOW WE WORK', title1: 'Our Service', title2: 'Process',
            subtitle: 'A systematic, expert-driven approach ensuring zero-downtime and peak laser performance.',
            step1Title: 'Consultation', step1Desc: 'Detailed analysis and mapping of your specific laser requirement or issue.',
            step2Title: 'Diagnosis', step2Desc: 'Technical evaluation to identify root causes using specialized diagnostic tools.',
            step3Title: 'Execution', step3Desc: 'Precision repair, calibration, or retrofit performed by certified laser engineers.',
            step4Title: 'Optimization', step4Desc: 'Testing and fine-tuning to ensure peak speed, stability, and zero downtime.'
          },
          services: {
            tag: 'What We Do', title1: 'Precision', title2: 'Laser Services',
            viewAll: 'View All Services', learnMore: 'Learn More',
            'field-service': { title: 'CNC & Laser Field Service', desc: 'Fast on-site service — diagnosis, repair, calibration and preventive maintenance for maximum uptime.' },
            'maintenance': { title: 'CO₂ & Fiber Laser Maintenance', desc: 'Expert maintenance and repair for CO₂ and fiber laser machines. Accurate alignment, optimal performance.' },
            'retrofit': { title: 'CO₂ to Fiber Laser Retrofit', desc: 'Upgrade to fiber laser — 3x faster cutting, 65% energy savings, extended machine life at lower cost.' },
            'remanufacturing': { title: 'Remanufacturing & Upgrades', desc: 'Component-level remanufacturing — Turbo Blower, Fanuc Vacuum Pump, Adaptive Optics.' },
            'amc': { title: 'Annual Maintenance Contracts', desc: 'Scheduled preventive care, priority breakdown support and discounted spare parts for zero downtime.' },
            'spares': { title: 'Laser Spares & Consumables', desc: 'Genuine lenses, nozzles, protective windows — 24–48 hr pan-India delivery guaranteed.' }
          },
          brands: {
            tag: 'Trusted Partners', title1: 'Brands We', title2: 'Service & Support',
            genuineService: 'Genuine Service', industrialPartner: 'Industrial Partner'
          },
          gallery: {
            tag: 'Our Work', title1: 'Project', title2: 'Gallery',
            viewFull: 'View Full Gallery', zoomIn: 'Zoom In',
            filterAll: 'All', filterMachines: 'Machines', filterTeam: 'Field Work', filterSpares: 'Spares'
          },
          contact: {
            tag: 'Get In Touch', title: 'Ready to Resolve Your',
            titleHighlight: 'Downtime?',
            desc: 'Contact us for any laser machine service, repair, or retrofitting inquiries. Our experts are available 24/7 for emergency fault diagnosis.',
            address: 'Hosur, Tamil Nadu — India (Head Office)',
            phone: '+91 73050 54043', email: 'info@laserxprts.com',
            formName: 'Full Name', formEmail: 'Email Address',
            formPhone: 'Phone Number', formSubject: 'Subject',
            formMessage: 'How can we help?', formSubmit: 'Send Message',
            formRequired: 'required',
            networkTag: 'Global Presence', networkTitle: 'Our Service',
            networkTitle2: 'Network — India & Beyond',
            networkDesc: 'LEI operates across all major Indian manufacturing hubs and extends its reach to the UAE, ensuring you always have an expert nearby.',
            mapTitle: 'PAN-GLOBAL NETWORK',
            clickToOpen: 'CLICK TO OPEN LOCATION',
            pageTitle: 'CONTACT', pageSubtitle: 'CONTACT US',
            pageDesc: "India's First CO2 & Fiber Laser Service Experts at Your Fingertips."
          },
          reviews: {
            tag: 'Testimonials', title1: 'Client', title2: 'Success Stories',
            viewReview: 'View review on Google'
          },
          careers: {
            tag: 'Join Our Team', title1: 'Work with', title2: 'The Experts',
            apply: 'Apply Now', viewJd: 'View JD',
            step1: 'INFO', step2: 'ROLE', step3: 'TEST', step4: 'DONE',
            pageTitle: 'WORK STATION', pageDesc: 'The Future of Laser Automation is Built Here.',
            primaryDetails: 'Primary Details', availableRoles: 'Available Roles',
            proceedRole: 'Proceed to Role Selection →',
            fullName: 'Full Name', emailId: 'Email ID', resume: 'Resume (Max 5MB)',
            openPosition: 'OPEN POSITION', backToInfo: '← Back to info',
            mandatoryEval: 'MANDATORY EVALUATION', finishSubmit: '✅ Finish & Submit',
            evaluatingMsg: '⏳ Evaluating...',
            successTag: '🎉 TEST SUBMITTED SUCCESSFULLY',
            evalComplete: 'Evaluation', evalCompleteHL: 'Complete!',
            successMsg: 'Your assessment has been recorded and is under review.',
            contactMsg: 'Our team will contact you if your score and profile match our requirements.',
            backHome: '← Back to Home', applyAnother: 'Apply for Another Role'
          },
          zeroDowntime: {
            tag: 'Zero Downtime Promise',
            title1: 'Built for',
            title2: 'Maximum Uptime',
            subtitle: 'Every service we offer is engineered to eliminate unplanned stoppages and keep your production line moving.',
            card1Title: 'Emergency Response',
            card1Desc: 'Critical fault team mobilized within hours, not days.',
            card2Title: '24/7 Support',
            card2Desc: 'Round-the-clock technical assistance and remote diagnostics.',
            card3Title: 'Certified Engineers',
            card3Desc: 'OEM-trained specialists for all major laser machine brands.',
            card4Title: 'Spare Parts Ready',
            card4Desc: 'Stocked inventory for 24-48 hour pan-India delivery.',
            radarLabel: 'LIVE MONITORING'
          },
          footer: {
            platform: 'PLATFORM', solutions: 'SOLUTIONS', reach: 'REACH OUT',
            rights: 'All rights reserved.', tagline: 'PRECISION · PERFORMANCE · RELIABILITY',
            desc: 'India\'s most trusted laser machine service and automation company since 2017.',
            quickLinks: 'Quick Links', getInTouch: 'Get In Touch'
          },
          page: {
            home: 'Home', about: 'About', services: 'Services',
            gallery: 'Gallery', career: 'Career', contact: 'Contact'
          }
        }
      },
      hi: {
        translation: {
          nav: {
            home: 'होम', about: 'LEI के बारे में', services: 'सेवाएं',
            gallery: 'गैलरी', career: 'करियर', contact: 'संपर्क करें',
            consult: 'एक्सपर्ट सलाह', specialized: 'विशेष समाधान'
          },
          brand: { name: 'लेजर एक्सपर्ट्स', tagline: 'सर्विस फर्स्ट' },
          hero: {
            tag: 'भारत का #1 लेजर मशीन सर्विस प्रदाता',
            title1: 'सटीकता', title2: 'लेजर', title3: 'समाधान',
            subtitle: 'भारत में CO₂ और फाइबर लेजर मशीनों के लिए OEM-गुणवत्ता सेवा, मरम्मत और रेट्रोफिटिंग। 2017 से 4000+ औद्योगिक ग्राहकों का विश्वास।',
            cta: 'सेवाएं देखें', aboutCta: 'LEI के बारे में',
            stat1: 'मशीनें सर्विस', stat2: 'वर्ष अनुभव', stat3: 'सफलता दर'
          },
          about: {
            tag: 'हम कौन हैं', title: 'लेजर एक्सपर्ट्स इंडिया के बारे में',
            desc: '2017 में स्थापित, LEI भारत की सबसे विश्वसनीय लेजर मशीन सर्विस कंपनी है।',
            talkExpert: 'एक्सपर्ट से बात करें', learnMore: 'और जानें',
            metric1: 'मशीनें सर्विस', metric2: 'CNC अनुभव',
            metric3: 'रिपीट ग्राहक', metric4: 'सर्विस शाखाएं',
            rootsTag: 'हमारी जड़ें', rootsTitle: '40+ वर्षों का',
            rootsTitle2: 'CNC विशेषज्ञता',
            rootsDesc1: 'लेजर एक्सपर्ट्स इंडिया (LEI) की स्थापना एक मिशन के साथ हुई: भारतीय निर्माताओं को विश्व स्तरीय लेजर सेवाएं प्रदान करना।',
            rootsDesc2: '2017 से अब तक हमने भारत और UAE में 4,000+ मशीनों को सेवा दी है।',
            visionTag: 'हमारा विजन', visionTitle: 'लेजर ऑटोमेशन का',
            visionTitle2: 'भविष्य बनाना',
            visionDesc: 'हम छोटे और बड़े निर्माताओं को उनके सिस्टम को अपग्रेड करने के उपकरण प्रदान करना चाहते हैं।'
          },
          stats: {
            machines: '4000+', machinesLabel: 'मशीनें सर्विस',
            experience: '10+', experienceLabel: 'वर्ष अनुभव',
            success: '98%', successLabel: 'सफलता दर',
            global: '3+', globalLabel: 'सर्विस शाखाएं'
          },
          process: {
            tag: 'हम कैसे काम करते हैं', title1: 'हमारी सर्विस', title2: 'प्रक्रिया',
            subtitle: 'एक व्यवस्थित, विशेषज्ञ-संचालित दृष्टिकोण जो शून्य डाउनटाइम और अधिकतम प्रदर्शन सुनिश्चित करता है।',
            step1Title: 'परामर्श', step1Desc: 'आपकी लेजर आवश्यकता का विस्तृत विश्लेषण।',
            step2Title: 'निदान', step2Desc: 'विशेष उपकरणों से तकनीकी मूल्यांकन।',
            step3Title: 'क्रियान्वयन', step3Desc: 'प्रमाणित इंजीनियरों द्वारा सटीक मरम्मत और कैलिब्रेशन।',
            step4Title: 'अनुकूलन', step4Desc: 'अधिकतम गति और शून्य डाउनटाइम के लिए परीक्षण।'
          },
          services: {
            tag: 'हम क्या करते हैं', title1: 'सटीक', title2: 'लेजर सेवाएं',
            viewAll: 'सभी देखें', learnMore: 'और जानें',
            'field-service': { title: 'फील्ड सर्विस', desc: 'CO2 / फाइबर लेजर के लिए कैलिब्रेशन और रखरखाव।' },
            'maintenance': { title: 'लेजर रखरखाव', desc: 'CO₂ और फाइबर मशीनों के लिए विशेषज्ञ रखरखाव।' },
            'retrofit': { title: 'रेट्रोफिटिंग', desc: 'CO2 को फाइबर लेजर स्रोत में अपग्रेड करें।' },
            'remanufacturing': { title: 'री-मैन्युफैक्चरिंग', desc: 'टर्बो ब्लोअर, फैनक वैक्यूम पंप की री-मैन्युफैक्चरिंग।' },
            'amc': { title: 'AMC कॉन्ट्रैक्ट्स', desc: 'प्राथमिकता आपातकालीन प्रतिक्रिया और निर्धारित रखरखाव।' },
            'spares': { title: 'स्पेयर पार्ट्स', desc: '24-48 घंटों के भीतर अखिल भारतीय डिलीवरी।' }
          },
          brands: {
            tag: 'विश्वसनीय भागीदार', title1: 'ब्रांड जिन्हें हम', title2: 'सर्विस करते हैं',
            genuineService: 'असली सेवा', industrialPartner: 'औद्योगिक भागीदार'
          },
          contact: {
            tag: 'संपर्क करें', title: 'अपना डाउनटाइम हल करें',
            titleHighlight: 'अभी!',
            desc: 'लेजर मशीन सर्विस, मरम्मत या रेट्रोफिटिंग के लिए हमसे संपर्क करें।',
            address: 'होसुर, तमिलनाडु — भारत (मुख्यालय)',
            phone: '+91 73050 54043', email: 'info@laserxprts.com',
            formName: 'पूरा नाम', formEmail: 'ईमेल पता',
            formPhone: 'फ़ोन नंबर', formSubject: 'विषय',
            formMessage: 'हम कैसे मदद कर सकते हैं?', formSubmit: 'संदेश भेजें',
            formRequired: 'आवश्यक',
            networkTag: 'वैश्विक उपस्थिति', networkTitle: 'हमारा सर्विस',
            networkTitle2: 'नेटवर्क — भारत और विदेश',
            networkDesc: 'LEI सभी प्रमुख भारतीय विनिर्माण केंद्रों में और UAE तक संचालित होता है।',
            pageTitle: 'संपर्क', pageSubtitle: 'हमसे संपर्क करें',
            pageDesc: 'भारत के पहले CO2 और फाइबर लेजर सर्विस विशेषज्ञ।',
            clickToOpen: 'स्थान खोलने के लिए क्लिक करें'
          },
          reviews: {
            tag: 'प्रशंसापत्र', title1: 'ग्राहक', title2: 'सफलता की कहानियां',
            viewReview: 'गूगल पर समीक्षा देखें'
          },
          careers: {
            tag: 'हमारी टीम में शामिल हों', title1: 'विशेषज्ञों के साथ', title2: 'काम करें',
            apply: 'अभी आवेदन करें', viewJd: 'JD देखें',
            step1: 'जानकारी', step2: 'भूमिका', step3: 'परीक्षण', step4: 'पूर्ण',
            pageTitle: 'वर्क स्टेशन', pageDesc: 'लेजर ऑटोमेशन का भविष्य यहाँ बनाया जाता है।',
            primaryDetails: 'प्राथमिक विवरण', availableRoles: 'उपलब्ध भूमिकाएं',
            proceedRole: 'भूमिका चयन की ओर आगे बढ़ें →',
            openPosition: 'खुली पोजीशन', backToInfo: '← जानकारी पर वापस जाएं',
            backHome: '← होम पर वापस जाएं', applyAnother: 'दूसरी भूमिका के लिए आवेदन करें'
          },
          zeroDowntime: {
            tag: 'शून्य डाउनटाइम वादा', title1: 'अधिकतम', title2: 'अपटाइम के लिए निर्मित',
            subtitle: 'हमारी हर सेवा अनियोजित रुकावटों को समाप्त करने के लिए डिज़ाइन की गई है।',
            card1Title: 'आपातकालीन प्रतिक्रिया', card1Desc: 'घंटों में टीम तैनात।',
            card2Title: '24/7 सहायता', card2Desc: 'चौबीसों घंटे तकनीकी सहायता।',
            card3Title: 'प्रमाणित इंजीनियर', card3Desc: 'OEM-प्रशिक्षित विशेषज्ञ।',
            card4Title: 'स्पेयर पार्ट्स तैयार', card4Desc: '24-48 घंटे में डिलीवरी।',
            radarLabel: 'लाइव मॉनिटरिंग'
          },
          footer: {
            platform: 'प्लेटफॉर्म', solutions: 'समाधान', reach: 'संपर्क करें',
            rights: 'सर्वाधिकार सुरक्षित।', tagline: 'सटीकता · प्रदर्शन · विश्वसनीयता',
            desc: '2017 से भारत की सबसे विश्वसनीय लेजर मशीन सर्विस कंपनी।',
            quickLinks: 'त्वरित लिंक', getInTouch: 'संपर्क करें'
          },
          page: {
            home: 'होम', about: 'के बारे में', services: 'सेवाएं',
            gallery: 'गैलरी', career: 'करियर', contact: 'संपर्क'
          }
        }
      },
      ar: {
        translation: {
          nav: {
            home: 'الرئيسية', about: 'عن الشركة', services: 'الخدمات',
            gallery: 'المعرض', career: 'الوظائف', contact: 'اتصل بنا',
            consult: 'استشر الخبراء', specialized: 'حلول متخصصة'
          },
          brand: { name: 'خبراء الليزر', tagline: 'الخدمة أولاً' },
          hero: {
            tag: 'مزود خدمة ليزر رقم 1 في الهند',
            title1: 'دقة', title2: 'ليزر', title3: 'حلول',
            subtitle: 'تقديم خدمات OEM عالية الجودة وإصلاح وتحديث لآلات الليزر CO₂ والألياف في الهند. موثوق من أكثر من 4000 عميل صناعي منذ 2017.',
            cta: 'اكتشف الخدمات', aboutCta: 'عن الشركة',
            stat1: 'آلة تمت خدمتها', stat2: 'سنوات خبرة', stat3: 'معدل النجاح'
          },
          about: {
            tag: 'من نحن', title: 'عن خبراء الليزر الهند',
            desc: 'تأسست LEI عام 2017 وهي شركة الليزر الأكثر ثقة في الهند بخبرة 40+ سنة.',
            talkExpert: 'تحدث مع خبير', learnMore: 'اعرف المزيد',
            metric1: 'آلة تمت خدمتها', metric2: 'خبرة CNC',
            metric3: 'عملاء متكررون', metric4: 'فروع الخدمة',
            rootsTag: 'جذورنا', rootsTitle: 'أكثر من 40 عاماً من',
            rootsTitle2: 'خبرة CNC المشتركة',
            rootsDesc1: 'تأسست LEI برسالة واحدة: تزويد المصنّعين الهنود بخدمات ليزر عالمية المستوى.',
            rootsDesc2: 'منذ 2017، نخدم أكثر من 4000 آلة في الهند والإمارات.',
            visionTag: 'رؤيتنا', visionTitle: 'قيادة مستقبل',
            visionTitle2: 'أتمتة الليزر',
            visionDesc: 'نهدف إلى تمكين المصنّعين لترقية أنظمتهم وضمان صفر توقف وأقصى كفاءة إنتاج.'
          },
          stats: {
            machines: '+4000', machinesLabel: 'آلة تمت خدمتها',
            experience: '+10', experienceLabel: 'سنوات خبرة',
            success: '98%', successLabel: 'معدل النجاح',
            global: '+3', globalLabel: 'فروع الخدمة'
          },
          process: {
            tag: 'كيف نعمل', title1: 'عملية', title2: 'خدمتنا',
            subtitle: 'نهج منهجي يضمن صفر توقف وأداء ليزر مثالي.',
            step1Title: 'استشارة', step1Desc: 'تحليل تفصيلي لمتطلباتك.',
            step2Title: 'تشخيص', step2Desc: 'تقييم تقني لتحديد الأسباب الجذرية.',
            step3Title: 'تنفيذ', step3Desc: 'إصلاح دقيق بواسطة مهندسين معتمدين.',
            step4Title: 'تحسين', step4Desc: 'اختبار ودقة لضمان أقصى أداء.'
          },
          services: {
            tag: 'ماذا نفعل', title1: 'خدمات', title2: 'ليزر دقيقة',
            viewAll: 'عرض الكل', learnMore: 'اعرف المزيد',
            'field-service': { title: 'الخدمة الميدانية', desc: 'المعايرة والصيانة لليزر CO2 والألياف.' },
            'maintenance': { title: 'صيانة الليزر', desc: 'صيانة وإصلاح متخصص للآلات.' },
            'retrofit': { title: 'تحديث النظام', desc: 'ترقية مصادر CO2 إلى ليزر الألياف.' },
            'remanufacturing': { title: 'إعادة التصنيع', desc: 'إعادة تصنيع على مستوى المكونات.' },
            'amc': { title: 'عقود AMC', desc: 'رعاية وقائية مجدولة ودعم أولوية.' },
            'spares': { title: 'قطع الغيار', desc: 'توصيل في 24-48 ساعة.' }
          },
          brands: {
            tag: 'شركاؤنا الموثوقون', title1: 'العلامات التي', title2: 'نخدمها ندعمها',
            genuineService: 'خدمة أصلية', industrialPartner: 'شريك صناعي'
          },
          contact: {
            tag: 'تواصل معنا', title: 'هل أنت مستعد لحل',
            titleHighlight: 'التوقف؟',
            desc: 'اتصل بنا لأي استفسارات خدمة أو إصلاح الليزر. خبراؤنا متاحون 24/7.',
            address: 'هوسور، تاميل نادو — الهند (المقر الرئيسي)',
            phone: '+91 73050 54043', email: 'info@laserxprts.com',
            formName: 'الاسم الكامل', formEmail: 'عنوان البريد الإلكتروني',
            formPhone: 'رقم الهاتف', formSubject: 'الموضوع',
            formMessage: 'كيف يمكننا مساعدتك؟', formSubmit: 'إرسال الرسالة',
            formRequired: 'مطلوب',
            networkTag: 'الحضور العالمي', networkTitle: 'شبكة',
            networkTitle2: 'خدمتنا — الهند وما وراءها',
            networkDesc: 'تعمل LEI في جميع أنحاء الهند والإمارات.',
            pageTitle: 'اتصل', pageSubtitle: 'اتصل بنا',
            pageDesc: 'أول خبراء خدمة الليزر CO2 والألياف في الهند.',
            clickToOpen: 'انقر لفتح الموقع'
          },
          reviews: {
            tag: 'آراء العملاء', title1: 'قصص', title2: 'نجاح العملاء',
            viewReview: 'عرض المراجعة على جوجل'
          },
          careers: {
            tag: 'انضم لفريقنا', title1: 'اعمل مع', title2: 'الخبراء',
            apply: 'قدم الآن', viewJd: 'عرض JD',
            step1: 'معلومات', step2: 'دور', step3: 'اختبار', step4: 'تم',
            pageTitle: 'محطة العمل', pageDesc: 'مستقبل أتمتة الليزر يُبنى هنا.',
            primaryDetails: 'التفاصيل الأساسية', availableRoles: 'الأدوار المتاحة',
            proceedRole: 'المضي قدماً لاختيار الدور ←',
            openPosition: 'وظيفة مفتوحة', backToInfo: '← العودة للمعلومات',
            backHome: '← العودة للرئيسية', applyAnother: 'التقدم لدور آخر'
          },
          zeroDowntime: {
            tag: 'وعد صفر توقف', title1: 'مبني من أجل', title2: 'أقصى وقت تشغيل',
            subtitle: 'كل خدمة نقدمها مصممة للقضاء على التوقفات غير المخطط لها.',
            card1Title: 'استجابة طارئة', card1Desc: 'تعبئة الفريق خلال ساعات.',
            card2Title: 'دعم 24/7', card2Desc: 'مساعدة تقنية على مدار الساعة.',
            card3Title: 'مهندسون معتمدون', card3Desc: 'متخصصون مدربون من OEM.',
            card4Title: 'قطع غيار جاهزة', card4Desc: 'توصيل في 24-48 ساعة.',
            radarLabel: 'مراقبة مباشرة'
          },
          footer: {
            platform: 'المنصة', solutions: 'الحلول', reach: 'تواصل معنا',
            rights: 'جميع الحقوق محفوظة.', tagline: 'الدقة · الأداء · الموثوقية',
            desc: 'شركة خدمة وأتمتة الليزر الأكثر ثقة في الهند منذ 2017.',
            quickLinks: 'روابط سريعة', getInTouch: 'تواصل معنا'
          },
          page: {
            home: 'الرئيسية', about: 'عن', services: 'الخدمات',
            gallery: 'المعرض', career: 'الوظائف', contact: 'اتصل'
          }
        }
      }
    }
  });

export default i18n;
