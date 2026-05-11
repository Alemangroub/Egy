/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import * as React from 'react';
import { useState, useMemo } from 'react';
import { 
  Search, 
  User, 
  Menu, 
  ChevronRight, 
  ShoppingBag, 
  Car, 
  Briefcase, 
  Heart, 
  ShieldCheck, 
  Scale, 
  Users, 
  Home as HomeIcon, 
  Zap, 
  ExternalLink,
  Phone,
  HelpCircle,
  Bell,
  Globe
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import SocialHousingService from './components/SocialHousingService';

const services = [
  { 
    id: 1, 
    title: 'التموين', 
    description: 'إصدار أو تفعيل بطاقة التموين، إضافة أفراد الأسرة وغيره.', 
    icon: ShoppingBag, 
    color: 'bg-orange-100 text-orange-600',
    slug: 'tamween'
  },
  { 
    id: 2, 
    title: 'المرور', 
    description: 'تجديد رخصة القيادة، تظلمات مخالفات المرور وخدمات أخرى.', 
    icon: Car, 
    color: 'bg-blue-100 text-blue-600',
    slug: 'traffic'
  },
  { 
    id: 3, 
    title: 'الأحوال المدنية', 
    description: 'استخراج شهادة ميلاد، بطاقة رقم قومي، وثيقة زواج أو طلاق.', 
    icon: Users, 
    color: 'bg-green-100 text-green-600',
    slug: 'civil-status'
  },
  { 
    id: 4, 
    title: 'التوثيق', 
    description: 'عمل توكيلات عامة أو خاصة أو توثيق عقود البيع والسيارات.', 
    icon: ShieldCheck, 
    color: 'bg-purple-100 text-purple-600',
    slug: 'notary'
  },
  { 
    id: 5, 
    title: 'السجل التجاري', 
    description: 'طلب مستخرج سجل تجاري أو تحديث بيانات المنشأة.', 
    icon: Briefcase, 
    color: 'bg-indigo-100 text-indigo-600',
    slug: 'commercial-register'
  },
  { 
    id: 6, 
    title: 'المحاكم', 
    description: 'متابعة القضايا، الاستعلام عن الرول، وخدمات النيابة العامة.', 
    icon: Scale, 
    color: 'bg-red-100 text-red-600',
    slug: 'courts'
  },
  { 
    id: 7, 
    title: 'التأمينات الاجتماعية', 
    description: 'الاستعلام عن مدد الاشتراك والأجور والمعاشات.', 
    icon: ShieldCheck, 
    color: 'bg-teal-100 text-teal-600',
    slug: 'social-insurance'
  },
  { 
    id: 8, 
    title: 'الإسكان الاجتماعي', 
    description: 'تقديم طلبات الحصول على وحدات سكنية مدعومة.', 
    icon: HomeIcon, 
    color: 'bg-yellow-100 text-yellow-600',
    slug: 'social-housing'
  },
  { 
    id: 9, 
    title: 'الكهرباء', 
    description: 'شحن العدادات، دفع الفواتير والاستعلام عن الاستهلاك.', 
    icon: Zap, 
    color: 'bg-amber-100 text-amber-600',
    slug: 'electricity'
  },
  { 
    id: 10, 
    title: 'الصحة', 
    description: 'خدمات التأمين الصحي الشامل وحجز المواعيد.', 
    icon: Heart, 
    color: 'bg-pink-100 text-pink-600',
    slug: 'health'
  },
];

const stats = [
  { label: 'إجمالي المستخدمين', value: '+15 مليون' },
  { label: 'عدد الخدمات الرقمية', value: '160+' },
  { label: 'المعاملات اليومية', value: '250 ألف' },
  { label: 'نقاط الخدمة المتاحة', value: '4500+' },
];

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeServiceSlug, setActiveServiceSlug] = useState<string | null>(null);

  const filteredServices = useMemo(() => 
    services.filter(service => 
      service.title.includes(searchTerm) || service.description.includes(searchTerm)
    ), [searchTerm]);

  const handleServiceClick = (slug: string) => {
    setActiveServiceSlug(slug);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-primary selection:text-white" dir="rtl">
      {/* Navbar */}
      <Header 
        isMobileMenuOpen={isMobileMenuOpen} 
        setIsMobileMenuOpen={setIsMobileMenuOpen} 
        onHomeClick={() => setActiveServiceSlug(null)}
      />

      <main>
        <AnimatePresence mode="wait">
          {!activeServiceSlug ? (
            <motion.div
              key="landing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Hero Section */}
              <Hero searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

              {/* Categories / Services Grid */}
              <section id="services" className="py-16 md:py-24 container mx-auto px-4 lg:px-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                  <div className="max-w-2xl">
                    <Badge variant="secondary" className="mb-4 text-secondary font-bold px-3 py-1">الخدمات الرقمية</Badge>
                    <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 leading-tight">
                      تصفح جميع الخدمات المتاحة
                    </h2>
                    <p className="text-slate-600 text-lg">
                      نوفر لك أكثر من 160 خدمة حكومية إلكترونية لتوفير الوقت والجهد، متاحة على مدار الساعة.
                    </p>
                  </div>
                  <Button variant="outline" className="hidden md:flex border-primary text-primary hover:bg-primary/5 font-bold">
                    عرض كل الخدمات <ChevronRight className="mr-2 h-4 w-4 rotate-180" />
                  </Button>
                </div>

                <motion.div 
                  layout
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6"
                >
                  <AnimatePresence mode='popLayout'>
                    {filteredServices.map((service, index) => (
                      <ServiceCard 
                        key={service.id} 
                        service={service} 
                        index={index} 
                        onClick={() => handleServiceClick(service.slug)}
                      />
                    ))}
                  </AnimatePresence>
                </motion.div>

                {filteredServices.length === 0 && (
                  <div className="py-20 text-center">
                    <p className="text-slate-500 text-xl font-medium">لم يتم العثور على خدمات تطابق بحثك.</p>
                    <Button variant="link" onClick={() => setSearchTerm('')} className="mt-2 text-primary">إعادة تعيين البحث</Button>
                  </div>
                )}
              </section>

              {/* Stats Section */}
              <Stats />

              {/* Help & FAQ */}
              <section id="help" className="py-20 bg-white border-y border-slate-200">
                <div className="container mx-auto px-4 lg:px-8">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    <div>
                      <h2 className="text-3xl font-black text-slate-900 mb-6">الأسئلة الشائعة</h2>
                      <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1">
                          <AccordionTrigger className="text-right text-lg font-bold">كيف يمكنني التسجيل في المنصة؟</AccordionTrigger>
                          <AccordionContent className="text-slate-600 leading-relaxed text-right">
                            يمكنك التسجيل باستخدام رقمك القومي، ورقم المصنع المطبوع على البطاقة، ورقم هاتفك المحمول المسجل باسمك لدى إحدى شركات الاتصالات.
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                          <AccordionTrigger className="text-right text-lg font-bold">ما هي وسائل الدفع المتاحة؟</AccordionTrigger>
                          <AccordionContent className="text-slate-600 leading-relaxed text-right">
                            تتوفر عدة وسائل للدفع تشمل البطاقات البنكية (ميزة، فيزا، ماستركارد)، ومحافظ الهاتف المحمول، وشركات التحصيل الإلكتروني مثل فوري وأمان.
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3">
                          <AccordionTrigger className="text-right text-lg font-bold">هل الخدمات متاحة للمصريين في الخارج؟</AccordionTrigger>
                          <AccordionContent className="text-slate-600 leading-relaxed text-right">
                            نعم، المنصة تهدف تدريجياً لتوفير الخدمات لكل المصريين في الداخل والخارج عبر بوابتها الإلكترونية.
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </div>
                    <div className="bg-primary/5 rounded-3xl p-8 md:p-12 border border-primary/10">
                      <h3 className="text-2xl font-black text-slate-900 mb-4">تحتاج لمساعدة إضافية؟</h3>
                      <p className="text-slate-600 mb-8 text-lg">نحن هنا للإجابة على استفساراتك على مدار الساعة من خلال قنوات التواصل الرسمية.</p>
                      <div className="space-y-6">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white shrink-0 shadow-lg shadow-primary/20">
                            <Phone className="w-6 h-6" />
                          </div>
                          <div>
                            <p className="text-sm text-slate-500 font-bold">اتصل بنا على</p>
                            <p className="text-xl font-black text-primary">15999</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-white shrink-0 shadow-lg shadow-secondary/20">
                            <HelpCircle className="w-6 h-6" />
                          </div>
                          <div>
                            <p className="text-sm text-slate-500 font-bold">مركز الدعم</p>
                            <p className="text-lg font-black text-slate-800">مساعدة فنية مباشرة</p>
                          </div>
                        </div>
                      </div>
                      <Button className="w-full mt-10 bg-primary hover:bg-primary/90 text-white font-bold h-12 text-lg">
                        تواصل معنا الآن
                      </Button>
                    </div>
                  </div>
                </div>
              </section>
            </motion.div>
          ) : (
            <motion.div
              key="service-view"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="pt-10"
            >
              {activeServiceSlug === 'social-housing' ? (
                <SocialHousingService onBack={() => setActiveServiceSlug(null)} />
              ) : (
                <div className="container mx-auto px-4 py-20 text-center">
                  <h2 className="text-3xl font-black mb-4">هذه الخدمة قريباً</h2>
                  <p className="text-slate-600 mb-8">نحن نعمل بجد لتوفير خدمة {services.find(s => s.slug === activeServiceSlug)?.title} إلكترونياً.</p>
                  <Button onClick={() => setActiveServiceSlug(null)}>العودة للرئيسية</Button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

function Header({ isMobileMenuOpen, setIsMobileMenuOpen, onHomeClick }: { isMobileMenuOpen: boolean, setIsMobileMenuOpen: (v: boolean) => void, onHomeClick: () => void }) {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-8 md:gap-12">
            <button onClick={onHomeClick} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <div className="w-11 h-8 flex items-center justify-center overflow-hidden rounded-md shadow-lg shadow-primary/20">
                <img src="https://upload.wikimedia.org/wikipedia/commons/f/fe/Flag_of_Egypt.svg" className="w-full h-full object-cover" alt="Egypt Logo" referrerPolicy="no-referrer" />
              </div>
              <div className="flex flex-col text-right">
                <span className="text-lg font-black text-slate-900 leading-none">مصر الرقمية</span>
                <span className="text-[10px] text-slate-400 font-bold tracking-[0.2em] uppercase mt-1">Digital Egypt</span>
              </div>
            </button>
            
            <div className="hidden lg:flex items-center gap-8">
              <button onClick={onHomeClick} className="text-slate-600 hover:text-primary font-bold transition-colors">الرئيسية</button>
              <a href="#services" onClick={(e) => {
                if (window.location.pathname === '/') {
                  onHomeClick();
                }
              }} className="text-slate-600 hover:text-primary font-bold transition-colors">الخدمات</a>
              <a href="#help" className="text-slate-600 hover:text-primary font-bold transition-colors">المساعدة</a>
            </div>
          </div>

          <div className="flex items-center gap-3 md:gap-4">
            <Button variant="ghost" size="icon" className="text-slate-500">
              <Bell className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-slate-500">
              <Globe className="w-5 h-5" />
            </Button>
            <div className="h-6 w-px bg-slate-200 mx-1 hidden md:block"></div>
            <Button className="hidden md:flex bg-primary hover:bg-primary/90 text-white font-bold px-6 border-none shadow-md shadow-primary/20">
              <User className="ml-2 h-4 w-4" /> دخول / حساب جديد
            </Button>
            <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              <Menu className="w-6 h-6 text-slate-700" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}

function Hero({ searchTerm, setSearchTerm }: { searchTerm: string, setSearchTerm: (v: string) => void }) {
  return (
    <section className="relative overflow-hidden pt-20 pb-32 bg-slate-900">
      {/* Background patterns */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary rounded-full blur-[128px] -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary rounded-full blur-[128px] translate-x-1/2 translate-y-1/2"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-white/80 border border-white/20 mb-8 backdrop-blur-sm animate-pulse">
            <span className="w-2 h-2 rounded-full bg-green-400"></span>
            <span className="text-sm font-bold">بوابة الخدمات الحكومية الرسمية متاحة الآن</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-8 leading-[1.1] tracking-tight">
            مستقبلك الرقمي <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-l from-secondary via-secondary/80 to-white">بين يديك الآن</span>
          </h1>
          
          <p className="text-slate-300 text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
            أنجز معاملاتك الحكومية بكل سهولة وأمان من مكانك، بوابتك الموحدة للحصول على الخدمات الرقمية في جمهورية مصر العربية.
          </p>

          <div className="max-w-2xl mx-auto relative group">
            <Search className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 h-6 w-6 group-focus-within:text-primary transition-colors" />
            <Input 
              placeholder="عن ماذا تبحث اليوم؟ (مثال: تجديد رخصة، شهادة ميلاد...)" 
              className="h-16 pr-14 pl-6 text-lg rounded-2xl border-none bg-white shadow-2xl text-slate-900 focus-visible:ring-4 focus-visible:ring-primary/20"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="hidden md:flex absolute left-3 top-1/2 -translate-y-1/2 items-center gap-2 bg-slate-100 rounded-xl px-3 py-1.5 border border-slate-200">
              <span className="text-xs font-black text-slate-400">⌘ + K</span>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-3 text-white/60 text-sm">
            <span className="font-bold">البحث الشائع:</span>
            {['تجديد رخصة', 'شهادة ميلاد', 'توكيل', 'تموين'].map(tag => (
              <button key={tag} onClick={() => setSearchTerm(tag)} className="hover:text-secondary transition-colors underline underline-offset-4 decoration-white/20 decoration-dotted">
                {tag}
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ServiceCard({ service, index, onClick }: { service: any, index: number, onClick: () => void, key?: any }) {
  const Icon = service.icon;
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ delay: index * 0.05 }}
    >
      <Card 
        onClick={onClick}
        className="h-full border-none shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group cursor-pointer overflow-hidden bg-white"
      >
        <CardContent className="p-8">
          <div className={`w-14 h-14 rounded-2xl ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}>
            <Icon className="w-7 h-7" />
          </div>
          <h3 className="text-xl font-black text-slate-900 mb-3 group-hover:text-primary transition-colors">{service.title}</h3>
          <p className="text-slate-500 text-sm leading-relaxed mb-6">
            {service.description}
          </p>
          <div className="flex items-center text-primary font-black text-sm group/btn">
            ابدأ الخدمة
            <ChevronRight className="mr-1 h-4 w-4 rotate-180 group-hover/btn:mr-2 transition-all" />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function Stats() {
  return (
    <section className="bg-primary py-16">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
          {stats.map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-2">{stat.value}</div>
              <div className="text-white/70 text-sm md:text-base font-bold">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 pt-20 pb-10">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-11 h-8 flex items-center justify-center overflow-hidden rounded-md border border-white/20">
                <img src="https://upload.wikimedia.org/wikipedia/commons/f/fe/Flag_of_Egypt.svg" className="w-full h-full object-cover" alt="Egypt Logo" referrerPolicy="no-referrer" />
              </div>
              <div className="flex flex-col text-right">
                <span className="text-lg font-black text-white leading-none">مصر الرقمية</span>
                <span className="text-[10px] text-white/50 font-bold tracking-[0.2em] uppercase mt-1">Digital Egypt</span>
              </div>
            </div>
            <p className="text-slate-400 leading-relaxed mb-6 font-medium text-right">
              البوابة الإلكترونية الرسمية لجميع الخدمات الحكومية في جمهورية مصر العربية، نهدف لتقديم تجربة سهلة ومريحة لكل مواطن.
            </p>
            <div className="flex items-center gap-4">
              <Button size="icon" variant="ghost" className="rounded-full bg-white/5 hover:bg-white/10 border border-white/10">
                <Globe className="w-5 h-5 text-white" />
              </Button>
              <Button size="icon" variant="ghost" className="rounded-full bg-white/5 hover:bg-white/10 border border-white/10">
                <ExternalLink className="w-5 h-5 text-white" />
              </Button>
            </div>
          </div>

          <div className="text-right">
            <h4 className="text-white font-black text-lg mb-6">روابط سريعة</h4>
            <ul className="space-y-4 font-bold">
              <li><a href="#" className="hover:text-secondary transition-colors">عن المنصة</a></li>
              <li><a href="#" className="hover:text-secondary transition-colors">خريطة الخدمات</a></li>
              <li><a href="#" className="hover:text-secondary transition-colors">الأماكن المتاحة</a></li>
              <li><a href="#" className="hover:text-secondary transition-colors">سياسة الخصوصية</a></li>
            </ul>
          </div>

          <div className="text-right">
            <h4 className="text-white font-black text-lg mb-6">أبرز الخدمات</h4>
            <ul className="space-y-4 font-bold">
              <li><a href="#" className="hover:text-secondary transition-colors">خدمات التموين</a></li>
              <li><a href="#" className="hover:text-secondary transition-colors">خدمات المرور</a></li>
              <li><a href="#" className="hover:text-secondary transition-colors">خدمات التوثيق</a></li>
              <li><a href="#" className="hover:text-secondary transition-colors">خدمات المحاكم</a></li>
            </ul>
          </div>

          <div className="text-right">
            <h4 className="text-white font-black text-lg mb-6">النشرة الإخبارية</h4>
            <p className="mb-6 text-sm font-medium">اشترك لتصلك أحدث الخدمات المضافة للمنصة فور صدورها.</p>
            <div className="flex gap-2">
              <Input placeholder="البريد الإلكتروني" className="bg-white/5 border-white/10 text-white placeholder:text-slate-600 focus-visible:ring-secondary/50 text-right" />
              <Button className="bg-secondary hover:bg-secondary/90 text-white font-black">اشترك</Button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/5 pt-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-sm font-bold text-right order-2 md:order-1">© {new Date().getFullYear()} جميع الحقوق محفوظة لـ <span className="text-white">منصة مصر الرقمية</span></p>
          <div className="flex items-center gap-3 order-1 md:order-2">
             <img src="https://upload.wikimedia.org/wikipedia/commons/f/fe/Flag_of_Egypt.svg" className="h-6 w-auto rounded shadow-sm" alt="Egypt Flag" referrerPolicy="no-referrer" />
             <span className="text-xs font-bold uppercase tracking-widest text-white/30 italic">Built for the future</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

