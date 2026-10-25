/* ==========================================================================
   شركة إبصار الإعمار للمقاولات - ملف التفاعلات والوظائف الشامل (main.js)
   --------------------------------------------------------------------------
   يقرأ البيانات تلقائياً من ملف الإعدادات الموحد: (js/config.js)
   ويقوم بتطبيقها وتحديث كافة الروابط، أرقام الواتساب، والعدادات ديناميكياً.
   ========================================================================== */

// التحقق من وجود ملف الإعدادات config.js أو استخدام القيم الافتراضية
const CONFIG = (typeof COMPANY_CONFIG !== 'undefined') ? COMPANY_CONFIG : {
  whatsappNumber: '966500000000',
  phoneDisplay: '+966 50 000 0000',
  email: 'info@ibsaralemaar.com',
  address: 'المملكة العربية السعودية - الرياض',
  workingHours: 'السبت - الخميس: 8:00 ص - 6:00 م',
  companyName: 'شركة إبصار الإعمار للمقاولات',
  statistics: {
    completedProjects: 120,
    yearsOfExperience: 15,
    clientSatisfaction: 98,
    specializedEngineers: 85
  },
  socialLinks: {
    twitter: '#',
    linkedin: '#',
    instagram: '#'
  },
  projects: []
};

/**
 * دالة مساعدة لفتح الواتساب برسالة مخصصة ومشفرة بأمان
 * @param {string} messageText 
 */
function openWhatsApp(messageText) {
  const cleanPhone = (CONFIG.whatsappNumber || '966500000000').replace(/[^0-9]/g, '');
  const encoded = encodeURIComponent(messageText);
  const url = `https://wa.me/${cleanPhone}?text=${encoded}`;
  window.open(url, '_blank', 'noopener,noreferrer');
}

/**
 * طلب عرض سعر لخدمة محددة عبر واتساب
 * @param {string} serviceName 
 */
function requestServiceWhatsApp(serviceName) {
  const msg = `السلام عليكم ورحمة الله وبركاته،\nأرغب في الاستفسار وطلب عرض سعر بخصوص: *${serviceName}* لدى شركة إبصار الإعمار للمقاولات.\n\nنأمل التكرم بموافاتي بالتفاصيل والخطوات اللازمة.`;
  openWhatsApp(msg);
}

/**
 * طلب استفسار بخصوص مشروع معين من المعرض
 * @param {string} projectName 
 */
function requestProjectWhatsApp(projectName) {
  const msg = `السلام عليكم ورحمة الله،\nأود الاستفسار عن تفاصيل تنفيذ مشروع مماثل لمشروع: *${projectName}* المعروض على موقع شركة إبصار الإعمار للمقاولات.`;
  openWhatsApp(msg);
}

/**
 * تحديث البيانات المعروضة في الصفحة تلقائياً من ملف config.js
 */
function syncConfigWithDOM() {
  // 1. تحديث أرقام الهواتف المعروضة وروابط الاتصال
  document.querySelectorAll('a[href^="tel:"]').forEach(link => {
    link.href = `tel:+${CONFIG.whatsappNumber}`;
    if (!link.classList.contains('btn')) {
      link.textContent = CONFIG.phoneDisplay;
    }
  });

  // 2. تحديث البريد الإلكتروني
  document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
    link.href = `mailto:${CONFIG.email}`;
    if (!link.classList.contains('btn')) {
      link.textContent = CONFIG.email;
    }
  });

  // 3. تحديث العنوان وساعات العمل
  document.querySelectorAll('.company-address').forEach(el => {
    el.textContent = CONFIG.address;
  });
  document.querySelectorAll('.company-hours').forEach(el => {
    el.textContent = CONFIG.workingHours;
  });

  // 4. تحديث روابط التواصل الاجتماعي
  if (CONFIG.socialLinks) {
    document.querySelectorAll('.social-icon[aria-label="تويتر"]').forEach(a => {
      if (CONFIG.socialLinks.twitter && CONFIG.socialLinks.twitter !== '#') a.href = CONFIG.socialLinks.twitter;
    });
    document.querySelectorAll('.social-icon[aria-label="لينكدإن"]').forEach(a => {
      if (CONFIG.socialLinks.linkedin && CONFIG.socialLinks.linkedin !== '#') a.href = CONFIG.socialLinks.linkedin;
    });
    document.querySelectorAll('.social-icon[aria-label="انستغرام"]').forEach(a => {
      if (CONFIG.socialLinks.instagram && CONFIG.socialLinks.instagram !== '#') a.href = CONFIG.socialLinks.instagram;
    });
  }

  // 5. تحديث أرقام الإحصائيات إذا تم تخصيصها
  if (CONFIG.statistics) {
    const statCards = document.querySelectorAll('.stat-number');
    if (statCards.length >= 4) {
      statCards[0].setAttribute('data-target', CONFIG.statistics.completedProjects || 120);
      statCards[1].setAttribute('data-target', CONFIG.statistics.yearsOfExperience || 15);
      statCards[2].setAttribute('data-target', CONFIG.statistics.clientSatisfaction || 98);
      statCards[3].setAttribute('data-target', CONFIG.statistics.specializedEngineers || 85);
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {

  // مزامنة فورية للبيانات من config.js
  syncConfigWithDOM();

  // ==========================================================================
  // 1. شريط التنقل وتأثير التمرير (Navbar Scroll & Active State)
  // ==========================================================================
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }
  }, { passive: true });

  // ==========================================================================
  // 2. قائمة الهواتف الذكية الجانبية (Mobile Drawer Menu)
  // ==========================================================================
  const mobileToggle = document.querySelector('.mobile-toggle');
  const mobileBackdrop = document.querySelector('.mobile-nav-backdrop');
  const mobileDrawer = document.querySelector('.mobile-nav-drawer');
  const mobileClose = document.querySelector('.mobile-nav-close');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  function openMobileNav() {
    mobileBackdrop?.classList.add('active');
    mobileDrawer?.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileNav() {
    mobileBackdrop?.classList.remove('active');
    mobileDrawer?.classList.remove('active');
    document.body.style.overflow = '';
  }

  mobileToggle?.addEventListener('click', openMobileNav);
  mobileClose?.addEventListener('click', closeMobileNav);
  mobileBackdrop?.addEventListener('click', closeMobileNav);

  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMobileNav);
  });

  // ==========================================================================
  // 3. أنيميشن التمرير السلس (Scroll Reveal Animation)
  // ==========================================================================
  const revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.08,
      rootMargin: '0px 0px -20px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('active'));
  }

  // ==========================================================================
  // 4. عداد الإحصائيات والأرقام عند الوصول إليها (Animated Stats Counter)
  // ==========================================================================
  const statNumbers = document.querySelectorAll('.stat-number');
  let statsTriggered = false;

  function runCounters() {
    if (statsTriggered || statNumbers.length === 0) return;

    statNumbers.forEach(stat => {
      const target = +stat.getAttribute('data-target') || 0;
      const isPercent = stat.innerHTML.includes('%');
      const duration = 1800;
      const startTime = performance.now();

      function updateNumber(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        const currentVal = Math.floor(easeProgress * target);

        stat.innerHTML = `${currentVal}<span>${isPercent ? '%' : '+'}</span>`;

        if (progress < 1) {
          requestAnimationFrame(updateNumber);
        } else {
          stat.innerHTML = `${target}<span>${isPercent ? '%' : '+'}</span>`;
        }
      }

      requestAnimationFrame(updateNumber);
    });

    statsTriggered = true;
  }

  if (statNumbers.length > 0 && 'IntersectionObserver' in window) {
    const statsObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        runCounters();
        statsObserver.disconnect();
      }
    }, { threshold: 0.15 });

    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
      statsObserver.observe(statsSection);
    }
  }

  // ==========================================================================
  // 5. تصفية المشاريع في معرض الأعمال (Portfolio Filter Logic)
  // ==========================================================================
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-item');

  if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        projectCards.forEach(card => {
          const category = card.getAttribute('data-category');
          if (filter === 'all' || category === filter) {
            card.style.display = 'flex';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, 30);
          } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(15px)';
            setTimeout(() => {
              card.style.display = 'none';
            }, 250);
          }
        });
      });
    });
  }

  // ==========================================================================
  // 6. النافذة المنبثقة لتفاصيل المشروع (Project Details Lightbox Modal)
  // ==========================================================================
  const modalOverlay = document.getElementById('projectModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');

  window.openProjectModal = function(projectId) {
    // البحث أولاً في مصفوفة المشاريع داخل config.js
    let data = null;
    if (CONFIG.projects && Array.isArray(CONFIG.projects)) {
      data = CONFIG.projects.find(p => p.id === projectId);
    }

    if (!data || !modalOverlay) return;

    document.getElementById('modalImg').src = data.image;
    document.getElementById('modalImg').alt = data.title;
    document.getElementById('modalTitle').textContent = data.title;
    document.getElementById('modalCategory').textContent = data.category;
    document.getElementById('modalArea').textContent = data.area;
    document.getElementById('modalCity').textContent = data.city;
    document.getElementById('modalDuration').textContent = data.duration;
    document.getElementById('modalDesc').textContent = data.description;

    const scopeList = document.getElementById('modalScope');
    if (scopeList) {
      scopeList.innerHTML = '';
      if (Array.isArray(data.scope)) {
        data.scope.forEach(item => {
          const li = document.createElement('li');
          li.innerHTML = `<i class="fas fa-check-circle text-secondary"></i> ${item}`;
          scopeList.appendChild(li);
        });
      }
    }

    const whatsappBtn = document.getElementById('modalWhatsAppBtn');
    if (whatsappBtn) {
      whatsappBtn.onclick = () => requestProjectWhatsApp(data.title);
    }

    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  window.closeProjectModal = function() {
    modalOverlay?.classList.remove('active');
    document.body.style.overflow = '';
  };

  modalCloseBtn?.addEventListener('click', window.closeProjectModal);
  modalOverlay?.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      window.closeProjectModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay?.classList.contains('active')) {
      window.closeProjectModal();
    }
  });

  // ==========================================================================
  // 7. معالجة وتدقيق نموذج التواصل (Contact Form Handler)
  // ==========================================================================
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('cName')?.value.trim();
      const phone = document.getElementById('cPhone')?.value.trim();
      const service = document.getElementById('cService')?.value || 'غير محدد';
      const city = document.getElementById('cCity')?.value.trim() || 'غير محدد';
      const message = document.getElementById('cMessage')?.value.trim();

      if (!name || name.length < 3) {
        alert('يرجى إدخال الاسم الكريم بشكل صحيح (3 أحرف على الأقل).');
        document.getElementById('cName')?.focus();
        return;
      }

      const phoneRegex = /^[0-9+() -]{9,16}$/;
      if (!phone || !phoneRegex.test(phone)) {
        alert('يرجى إدخال رقم جوال صحيح للتواصل.');
        document.getElementById('cPhone')?.focus();
        return;
      }

      if (!message || message.length < 5) {
        alert('يرجى كتابة نبذة توضيحية عن طلبك أو مشروعك.');
        document.getElementById('cMessage')?.focus();
        return;
      }

      const formattedMessage = `السلام عليكم ورحمة الله،\n*طلب تواصل جديد من موقع شركة إبصار الإعمار للمقاولات*\n\n` +
        `👤 *الاسم الكريم:* ${name}\n` +
        `📱 *رقم الجوال:* ${phone}\n` +
        `🏗️ *نوع الخدمة المطلوبة:* ${service}\n` +
        `📍 *المدينة / الموقع:* ${city}\n` +
        `📝 *تفاصيل الطلب:*\n${message}\n\n` +
        `_تم الإرسال عبر النموذج المباشر لموقع الشركة._`;

      openWhatsApp(formattedMessage);
      contactForm.reset();
    });
  }

  // ==========================================================================
  // 8. معالج حاسبة ونموذج طلب عرض السعر متعدد الخطوات (Quote Wizard)
  // ==========================================================================
  const wizardForm = document.getElementById('quoteWizardForm');
  if (wizardForm) {
    let currentStep = 1;
    const totalSteps = 3;

    const wizardPanes = document.querySelectorAll('.wizard-pane');
    const wizardStepHeaders = document.querySelectorAll('.wizard-step');
    const nextBtn = document.getElementById('wizardNextBtn');
    const prevBtn = document.getElementById('wizardPrevBtn');
    const submitBtn = document.getElementById('wizardSubmitBtn');

    // تحديد بطاقات الخيارات التفاعلية
    const optionCards = document.querySelectorAll('.option-card');
    optionCards.forEach(card => {
      card.addEventListener('click', () => {
        const groupName = card.getAttribute('data-group');
        document.querySelectorAll(`.option-card[data-group="${groupName}"]`).forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        const radio = card.querySelector('input[type="radio"]');
        if (radio) radio.checked = true;
      });
    });

    function showStep(step) {
      wizardPanes.forEach(pane => {
        pane.classList.remove('active');
        if (+pane.getAttribute('data-step') === step) {
          pane.classList.add('active');
        }
      });

      wizardStepHeaders.forEach(header => {
        const stepNum = +header.getAttribute('data-step');
        header.classList.remove('active', 'completed');
        if (stepNum === step) {
          header.classList.add('active');
        } else if (stepNum < step) {
          header.classList.add('completed');
        }
      });

      if (prevBtn) {
        prevBtn.style.display = step === 1 ? 'none' : 'inline-flex';
      }

      if (nextBtn && submitBtn) {
        if (step === totalSteps) {
          nextBtn.style.display = 'none';
          submitBtn.style.display = 'inline-flex';
        } else {
          nextBtn.style.display = 'inline-flex';
          submitBtn.style.display = 'none';
        }
      }

      document.querySelector('.wizard-container')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    function validateStep(step) {
      if (step === 1) {
        const selectedOption = document.querySelector('input[name="project_type"]:checked');
        if (!selectedOption) {
          alert('يرجى اختيار نوع المشروع للمتابعة.');
          return false;
        }
        return true;
      } else if (step === 2) {
        const area = document.getElementById('qArea')?.value.trim();
        const city = document.getElementById('qCity')?.value.trim();

        if (!area || isNaN(area) || +area <= 0) {
          alert('يرجى إدخال المساحة التقريبية للمشروع بالمتر المربع (أرقام فقط).');
          document.getElementById('qArea')?.focus();
          return false;
        }

        if (!city || city.length < 2) {
          alert('يرجى إدخال مدينة المشروع.');
          document.getElementById('qCity')?.focus();
          return false;
        }
        return true;
      }
      return true;
    }

    nextBtn?.addEventListener('click', () => {
      if (validateStep(currentStep)) {
        if (currentStep < totalSteps) {
          currentStep++;
          showStep(currentStep);
        }
      }
    });

    prevBtn?.addEventListener('click', () => {
      if (currentStep > 1) {
        currentStep--;
        showStep(currentStep);
      }
    });

    wizardForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('qName')?.value.trim();
      const phone = document.getElementById('qPhone')?.value.trim();
      const projectType = document.querySelector('input[name="project_type"]:checked')?.value || 'غير محدد';
      const area = document.getElementById('qArea')?.value.trim() || 'غير محدد';
      const city = document.getElementById('qCity')?.value.trim() || 'غير محدد';
      const budget = document.getElementById('qBudget')?.value || 'غير محددة';
      const timeframe = document.getElementById('qTimeframe')?.value || 'غير محدد';
      const hasBlueprints = document.querySelector('input[name="has_blueprints"]:checked')?.value || 'غير محدد';
      const notes = document.getElementById('qNotes')?.value.trim() || 'لا توجد ملاحظات إضافية';

      if (!name || name.length < 3) {
        alert('يرجى إدخال الاسم الكريم بشكل صحيح.');
        document.getElementById('qName')?.focus();
        return;
      }

      const phoneRegex = /^[0-9+() -]{9,16}$/;
      if (!phone || !phoneRegex.test(phone)) {
        alert('يرجى إدخال رقم جوال صحيح للتواصل ومشاركتكم عرض السعر.');
        document.getElementById('qPhone')?.focus();
        return;
      }

      const summaryMessage = `السلام عليكم ورحمة الله وبركاته،\n*طلب تسعير وعرض سعر جديد من معالج موقع إبصار الإعمار للمقاولات*\n\n` +
        `📋 *بيانات المشروع:*\n` +
        `• *نوع المشروع:* ${projectType}\n` +
        `• *المساحة التقريبية:* ${area} م²\n` +
        `• *المدينة / الحي:* ${city}\n` +
        `• *نطاق الميزانية التقديرية:* ${budget}\n` +
        `• *الجدول الزمني المستهدف:* ${timeframe}\n` +
        `• *توفر مخططات هندسية:* ${hasBlueprints}\n\n` +
        `📝 *المتطلبات والملاحظات:*\n${notes}\n\n` +
        `👤 *بيانات العميل:*\n` +
        `• *الاسم:* ${name}\n` +
        `• *رقم الجوال:* ${phone}\n\n` +
        `_أرجو مراجعة البيانات وتزويدي بعرض سعر مبدئي وتفاصيل التواصل._`;

      openWhatsApp(summaryMessage);

      const successModal = document.getElementById('wizardSuccessModal');
      if (successModal) {
        successModal.classList.add('active');
      } else {
        alert('تم تجهيز طلب عرض السعر بنجاح، وسيتم فتح تطبيق واتساب فوراً لإرسال التفاصيل لفريقنا الهندسي.');
      }
    });

    showStep(1);
  }

  // ==========================================================================
  // 9. الأسئلة الشائعة القابلة للطي (FAQ Accordion)
  // ==========================================================================
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    question?.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
          const otherAnswer = otherItem.querySelector('.faq-answer');
          if (otherAnswer) otherAnswer.style.maxHeight = null;
        }
      });

      if (!isActive) {
        item.classList.add('active');
        if (answer) answer.style.maxHeight = answer.scrollHeight + 'px';
      } else {
        item.classList.remove('active');
        if (answer) answer.style.maxHeight = null;
      }
    });
  });

  // ==========================================================================
  // 10. زر الواتساب العائم (Floating WhatsApp Quick Action)
  // ==========================================================================
  const whatsappFloat = document.querySelector('.whatsapp-float-btn');
  whatsappFloat?.addEventListener('click', (e) => {
    e.preventDefault();
    const generalMsg = `السلام عليكم ورحمة الله،\nأتواصل معكم من خلال موقع شركة إبصار الإعمار للمقاولات للاستفسار عن خدماتكم الإنشائية وطلب استشارة هندسية.`;
    openWhatsApp(generalMsg);
  });

  // ==========================================================================
  // 11. تفاعلات معرض صور صفحة تفاصيل المشروع (Project Gallery Thumbnails Switcher)
  // ==========================================================================
  const mainProjectImg = document.getElementById('projectMainImg');
  const projectThumbs = document.querySelectorAll('.project-thumb-btn');

  if (mainProjectImg && projectThumbs.length > 0) {
    projectThumbs.forEach(thumb => {
      thumb.addEventListener('click', () => {
        const fullSrc = thumb.getAttribute('data-img-src') || thumb.querySelector('img')?.src;
        if (fullSrc) {
          mainProjectImg.style.opacity = '0.35';
          setTimeout(() => {
            mainProjectImg.src = fullSrc;
            mainProjectImg.style.opacity = '1';
          }, 150);
          projectThumbs.forEach(t => t.classList.remove('active'));
          thumb.classList.add('active');
        }
      });
    });
  }

});
