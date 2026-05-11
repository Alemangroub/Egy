/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import * as React from 'react';
import { useState } from 'react';
import { 
  ArrowRight, 
  CheckCircle2, 
  FileText, 
  Home as HomeIcon, 
  MapPin, 
  Info,
  Clock,
  ShieldCheck,
  Building2,
  Calendar,
  CreditCard,
  User,
  Upload
} from 'lucide-react';
import { motion } from 'motion/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface SocialHousingServiceProps {
  onBack: () => void;
}

export default function SocialHousingService({ onBack }: SocialHousingServiceProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [view, setView] = useState<'default' | 'booklet' | 'success' | 'payment'>('default');
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [paymentStep, setPaymentStep] = useState<'method' | 'processing' | 'done'>('method');
  const [uploadedFiles, setUploadedFiles] = useState<Record<string, string>>({});
  const [selectedSize, setSelectedSize] = useState('90');

  const downPaymentLabel = (selectedSize === '110' || selectedSize === '120') ? '١٠٠,٠٠٠' : '٧٠,٠٠٠';
  const totalPaymentLabel = (selectedSize === '110' || selectedSize === '120') ? '١٠٠,٧٥٠' : '٧٠,٧٥٠';
  const rawDownPaymentLabel = (selectedSize === '110' || selectedSize === '120') ? '100,000' : '70,000';

  const installmentLabel = 
    selectedSize === '75' ? '٦,٠٠٠' : 
    selectedSize === '85' ? '٧,٠٠٠' :
    selectedSize === '90' ? '٨,٠٠٠' :
    selectedSize === '110' ? '١٢,٠٠٠' : 
    selectedSize === '120' ? '١٥,٠٠٠' : '٨,٠٠٠';

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFiles(prev => ({ ...prev, [key]: file.name }));
    }
  };

  const projects = [
    { id: 1, name: 'حدائق العاصمة', location: 'مدينة بدر', price: '310,000 ج.م', status: 'متاح للتقديم' },
    { id: 4, name: 'حدائق أكتوبر القاهرة', location: '6 أكتوبر', price: '340,000 ج.م', status: 'متاح للتقديم' },
    { id: 2, name: 'سكن مصر', location: 'القاهرة الجديدة', price: '450,000 ج.م', status: 'متاح للتقديم' },
    { id: 3, name: 'دار مصر', location: '6 أكتوبر', price: '580,000 ج.م', status: 'قريباً' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setView('success');
  };

  if (view === 'success') {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl mx-auto py-20 text-center"
      >
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
          <CheckCircle2 className="w-12 h-12 text-green-600" />
        </div>
        <h2 className="text-3xl font-black text-slate-900 mb-4">تم تسجيل الطلب</h2>
        <p className="text-slate-600 mb-8 text-lg font-bold">
          يرجى التوجه لسداد جدية الحجز عبر منصة مصر الرقمية إلكترونياً من خلال فوري أو المحافظ الإلكترونية أو البطاقات البنكيه. رقم الطلب الخاص بك هو <span className="text-primary">#SH-2026-8842</span>.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={onBack} variant="outline" className="font-bold h-12 px-8">العودة للرئيسية</Button>
        </div>
      </motion.div>
    );
  }

  if (view === 'payment') {
    return (
      <div className="container mx-auto px-4 py-8 lg:px-8" dir="rtl">
        <Button 
          variant="ghost" 
          onClick={() => setView('success')} 
          className="mb-8 hover:bg-slate-100 font-bold gap-2"
        >
          <ArrowRight className="w-4 h-4" /> العودة للطلب
        </Button>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-6">
              <Card className="border-slate-200">
                <CardHeader>
                  <CardTitle className="text-2xl font-black">سداد مقدم جدية الحجز</CardTitle>
                  <CardDescription>اختر وسيلة الدفع المناسبة لك لإتمام عملية حجز الوحدة</CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    <button className="p-4 border-2 border-primary rounded-2xl bg-primary/5 text-center transition-all">
                      <CreditCard className="w-8 h-8 text-primary mx-auto mb-2" />
                      <p className="text-sm font-bold">بطاقة بنكية</p>
                    </button>
                    <button className="p-4 border-2 border-slate-100 rounded-2xl hover:border-slate-200 text-center transition-all">
                      <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center text-orange-600 mx-auto mb-2">
                        <span className="font-bold text-xs">F</span>
                      </div>
                      <p className="text-sm font-bold">فوري</p>
                    </button>
                    <button className="p-4 border-2 border-slate-100 rounded-2xl hover:border-slate-200 text-center transition-all">
                      <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center text-green-600 mx-auto mb-2">
                        <span className="font-bold text-xs">M</span>
                      </div>
                      <p className="text-sm font-bold">محفظة إلكترونية</p>
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label className="font-bold">رقم البطاقة</Label>
                      <div className="relative">
                        <Input className="h-12 border-slate-200 pr-10" placeholder="**** **** **** ****" />
                        <CreditCard className="w-5 h-5 absolute right-3 top-3.5 text-slate-400" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="font-bold">تاريخ الانتهاء</Label>
                        <Input className="h-12 border-slate-200" placeholder="MM/YY" />
                      </div>
                      <div className="space-y-2">
                        <Label className="font-bold">رمز التحقق (CVV)</Label>
                        <Input className="h-12 border-slate-200" placeholder="***" type="password" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="font-bold">اسم صاحب البطاقة</Label>
                      <Input className="h-12 border-slate-200" placeholder="الاسم كما هو مدون على البطاقة" />
                    </div>
                  </div>

                  <Button 
                    className="w-full h-16 bg-slate-900 text-white text-xl font-black hover:bg-slate-800 shadow-xl"
                    onClick={() => setShowReceipt(true)}
                  >
                    تأكيد دفع {downPaymentLabel} ج.م
                  </Button>

                  <div className="flex items-center justify-center gap-4 text-slate-400">
                    <ShieldCheck className="w-5 h-5" />
                    <span className="text-xs font-bold uppercase tracking-widest">تشفير بيانات آمن 256-bit</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="border-slate-200 bg-slate-50">
                <CardHeader>
                  <CardTitle className="text-lg font-black">ملخص المعاملة</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500 font-bold">رقم الطلب:</span>
                    <span className="text-slate-900 font-black">#SH-2026-8842</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500 font-bold">المشروع:</span>
                    <span className="text-slate-900 font-black">حدائق أكتوبر القاهرة</span>
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">مقدم الحجز</span>
                      <span className="text-slate-900 font-bold">{downPaymentLabel} ج.م</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">رسوم إدارية</span>
                      <span className="text-slate-900 font-bold">٧٥٠ ج.م</span>
                    </div>
                  </div>
                  <Separator className="bg-slate-200" />
                  <div className="flex justify-between items-center">
                    <span className="text-slate-900 font-black">الإجمالي:</span>
                    <span className="text-2xl font-black text-primary">{totalPaymentLabel} ج.م</span>
                  </div>
                </CardContent>
              </Card>

              <div className="p-4 bg-blue-50 border border-blue-100 rounded-2xl">
                <p className="text-xs text-blue-800 leading-relaxed font-bold">
                  * سيتم خصم المبلغ وتحديث حالة طلبك فوراً. يمكنك تحميل إيصال السداد بصيغة PDF بعد إتمام العملية.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (view === 'booklet') {
    return (
      <div className="container mx-auto px-4 py-8 lg:px-8 border-none" dir="rtl">
        <Button 
          variant="ghost" 
          onClick={() => setView('default')} 
          className="mb-8 hover:bg-slate-100 font-bold gap-2"
        >
          <ArrowRight className="w-4 h-4" /> العودة للتفاصيل
        </Button>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="bg-slate-900 p-8 md:p-12 text-center text-white relative">
               <div className="absolute top-0 right-0 p-8 opacity-5">
                 <Building2 className="w-32 h-32" />
               </div>
               <Badge className="bg-secondary text-white mb-4 px-4 py-1">إصدار مايو 2026</Badge>
               <h1 className="text-3xl md:text-5xl font-black mb-4">كراسة شروط حجز وحدات الإسكان</h1>
               <p className="text-slate-400 text-lg">مشروع سكن لكل المصريين - المبادرة الرئاسية</p>
            </div>

            <Tabs defaultValue="terms" className="w-full">
               <TabsList className="w-full bg-slate-50 border-b rounded-none h-16">
                 <TabsTrigger value="terms" className="flex-1 font-black text-lg">١. الشروط العامة</TabsTrigger>
                 <TabsTrigger value="form" className="flex-1 font-black text-lg">٢. استمارة البيانات</TabsTrigger>
               </TabsList>
               
               <TabsContent value="terms" className="p-8 md:p-12 space-y-8">
                  <section>
                    <h3 className="text-2xl font-black text-slate-900 mb-6 border-r-4 border-secondary pr-4">أولاً: شروط الحجز</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                        <User className="w-8 h-8 text-secondary mb-4" />
                        <h4 className="font-bold text-lg mb-2">جنسية المتقدم</h4>
                        <p className="text-slate-600 text-sm leading-relaxed">أن يكون المتقدم شخصاً طبيعياً مصري الجنسية، وليس شخصاً معنوياً (شركة أو مؤسسة).</p>
                      </div>
                      <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                        <Calendar className="w-8 h-8 text-secondary mb-4" />
                        <h4 className="font-bold text-lg mb-2">السن القانوني</h4>
                        <p className="text-slate-600 text-sm leading-relaxed">ألا يقل سن المتقدم عن 21 عاماً في تاريخ نهاية الإعلان، وألا يزيد عن 50 عاماً.</p>
                      </div>
                    </div>
                  </section>

                  <section>
                    <h3 className="text-2xl font-black text-slate-900 mb-6 border-r-4 border-secondary pr-4">ثانياً: المستندات المطلوبة</h3>
                    <div className="space-y-4">
                      {[
                        'صورة من بطاقة الرقم القومي للمتقدم وزوجه (سارية).',
                        'شهادة بإثبات صافي الدخل السنوي أو الشهري بالنسبة للأعزب أو الزوج والزوجة.',
                        'أي مستندات خاصة بمصادر الدخل الإضافية (عمل إضافي - أملاك - أراضي).',
                        'إيصال مرافق حديث لمحل السكن الحالي (كهرباء أو غاز أو مياه).'
                      ].map((doc, i) => (
                        <div key={i} className="flex items-center gap-4 p-4 hover:bg-slate-50 transition-colors rounded-xl border border-transparent hover:border-slate-100">
                          <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                          <span className="text-slate-700 font-medium">{doc}</span>
                        </div>
                      ))}
                    </div>
                  </section>

                  <div className="pt-8 border-t">
                    <Button 
                      className="w-full h-16 bg-primary text-xl font-black hover:bg-primary/90 shadow-xl shadow-primary/20"
                      onClick={() => {
                        const tabsList = document.querySelector('[role="tablist"]');
                        const formTrigger = tabsList?.querySelector('[value="form"]') as HTMLElement;
                        formTrigger?.click();
                      }}
                    >
                      موافق، انتقل لملء استمارة البيانات
                    </Button>
                  </div>
               </TabsContent>

               <TabsContent value="form" className="p-8 md:p-12">
                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="text-center mb-10">
                      <h3 className="text-2xl font-black text-slate-900">استمارة بيانات الحجز الإلكترونية</h3>
                      <p className="text-slate-500">يرجى تحري الدقة عند إدخال البيانات</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                       <div className="space-y-3">
                         <Label className="text-slate-700 font-bold">المشروع المطلوب</Label>
                         <Select defaultValue="1">
                           <SelectTrigger className="h-12 border-slate-200">
                             <SelectValue placeholder="اختر المشروع" />
                           </SelectTrigger>
                           <SelectContent>
                             <SelectItem value="1">حدائق العاصمة - مدينة بدر</SelectItem>
                             <SelectItem value="2">سكن مصر - القاهرة الجديدة</SelectItem>
                             <SelectItem value="6">حدائق أكتوبر القاهرة</SelectItem>
                             <SelectItem value="7">محافظة الغربية - طلخا الجديدة</SelectItem>
                             <SelectItem value="8">محافظة قنا - مدينة نجع حمادي</SelectItem>
                             <SelectItem value="9">محافظة الشرقية - مدينة كفر صقر</SelectItem>
                             <SelectItem value="3">أسيوط الجديدة</SelectItem>
                             <SelectItem value="4">سوهاج الجديدة</SelectItem>
                             <SelectItem value="5">المنيا الجديدة</SelectItem>
                           </SelectContent>
                         </Select>
                       </div>
                       
                       <div className="space-y-3">
                         <Label className="text-slate-700 font-bold">نوع الوحدة</Label>
                         <Select value={selectedSize} onValueChange={setSelectedSize}>
                           <SelectTrigger className="h-12 border-slate-200">
                             <SelectValue placeholder="اختر المساحة" />
                           </SelectTrigger>
                           <SelectContent>
                             <SelectItem value="75">وحدة غرفتين وصالة (٧٥م)</SelectItem>
                             <SelectItem value="85">وحدة ٣ غرف وصالة (٨٥م)</SelectItem>
                             <SelectItem value="90">وحدة ٣ غرف وصالة (٩٠م)</SelectItem>
                             <SelectItem value="110">وحدة سكنية متميزة (١١٠م)</SelectItem>
                             <SelectItem value="120">وحدة سكنية واسعة (١٢٠م)</SelectItem>
                           </SelectContent>
                         </Select>
                         <div className="flex justify-between items-center bg-primary/10 p-3 rounded-xl border border-primary/20">
                            <span className="text-sm font-bold text-slate-600">مقدم جدية الحجز لهذه الوحدة:</span>
                            <span className="text-lg font-black text-primary">{downPaymentLabel} ج.م</span>
                         </div>
                         <div className="flex justify-between items-center bg-slate-50 p-4 rounded-2xl border border-slate-200">
                            <div className="flex flex-col text-right">
                              <span className="text-xs font-bold text-slate-500">نظام التقسيط المتوقع:</span>
                              <span className="text-sm font-black text-slate-800">قسط متوقع كل ٤ أشهر</span>
                            </div>
                            <span className="text-xl font-black text-slate-900">{installmentLabel} ج.م</span>
                         </div>
                       </div>

                       <div className="space-y-3">
                         <Label className="text-slate-700 font-bold">الاسم بالكامل</Label>
                         <Input className="h-12 border-slate-200" placeholder="الاسم رباعي" required />
                       </div>

                       <div className="space-y-3">
                         <Label className="text-slate-700 font-bold">الرقم القومي</Label>
                         <Input className="h-12 border-slate-200" maxLength={14} placeholder="14 رقم" required />
                       </div>

                       <div className="space-y-3">
                         <Label className="text-slate-700 font-bold">الحالة الاجتماعية</Label>
                         <Select required>
                           <SelectTrigger className="h-12 border-slate-200">
                             <SelectValue placeholder="اختر الحالة الاجتماعية" />
                           </SelectTrigger>
                           <SelectContent>
                             <SelectItem value="single">أعزب / آنسة</SelectItem>
                             <SelectItem value="married">متزوج / متزوجة</SelectItem>
                             <SelectItem value="divorced">مطلق / مطلقة</SelectItem>
                             <SelectItem value="widow">أرمل / أرملة</SelectItem>
                           </SelectContent>
                         </Select>
                       </div>

                       <div className="space-y-3">
                         <Label className="text-slate-700 font-bold">الاسم الأول للأم</Label>
                         <Input className="h-12 border-slate-200" placeholder="الاسم الأول للأم" required />
                       </div>

                       <div className="space-y-3">
                         <Label className="text-slate-700 font-bold">محل الإقامة (المحافظة)</Label>
                         <Input className="h-12 border-slate-200" placeholder="المحافظة الحالية" required />
                       </div>

                       <div className="space-y-3">
                         <Label className="text-slate-700 font-bold">جهة العمل / الوظيفة</Label>
                         <Input className="h-12 border-slate-200" placeholder="الوظيفة الحالية" required />
                       </div>

                       <div className="space-y-3 md:col-span-2">
                         <Label className="text-slate-700 font-bold">صافي الدخل الشهري</Label>
                         <Input type="number" className="h-12 border-slate-200" placeholder="مبلغ الدخل بالجنيه" required />
                       </div>

                       <div className="space-y-3">
                         <Label className="text-slate-700 font-bold">رقم التواصل الأساسي</Label>
                         <Input className="h-12 border-slate-200" placeholder="رقم الموبايل الأساسي" required />
                       </div>
                       <div className="space-y-3">
                         <Label className="text-slate-700 font-bold">رقم آخر للتواصل (اختياري)</Label>
                         <Input className="h-12 border-slate-200" placeholder="رقم موبايل آخر" />
                       </div>
                    </div>

                    <Separator />

                    <div className="space-y-6">
                      <Label className="text-slate-900 font-black text-xl flex items-center gap-2">
                         <Upload className="w-5 h-5 text-primary" /> المستندات المطلوبة (المرفقات)
                      </Label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        <div 
                          onClick={() => document.getElementById('id-upload')?.click()}
                          className={`p-6 border-2 border-dashed ${uploadedFiles.id ? 'border-green-500 bg-green-50/50' : 'border-slate-200 bg-slate-50 hover:bg-slate-50/50 hover:border-primary'} rounded-3xl text-center transition-all cursor-pointer group`}
                        >
                          <input 
                            type="file" 
                            id="id-upload" 
                            className="hidden" 
                            accept="image/*,.pdf" 
                            onChange={(e) => handleFileChange(e, 'id')}
                          />
                          {uploadedFiles.id ? (
                            <>
                              <CheckCircle2 className="w-10 h-10 text-green-500 mx-auto mb-3" />
                              <p className="text-sm font-black text-green-800 mb-1">تم الرفع</p>
                              <p className="text-xs text-green-600 font-bold truncate px-2">{uploadedFiles.id}</p>
                            </>
                          ) : (
                            <>
                              <User className="w-10 h-10 text-slate-300 group-hover:text-primary mx-auto mb-3" />
                              <p className="text-sm font-black text-slate-800 mb-1">صورة البطاقة</p>
                              <p className="text-xs text-slate-500 font-bold">وجه وخلف الرقم القومي</p>
                            </>
                          )}
                        </div>
                        <div 
                          onClick={() => document.getElementById('birth-upload')?.click()}
                          className={`p-6 border-2 border-dashed ${uploadedFiles.birth ? 'border-green-500 bg-green-50/50' : 'border-slate-200 bg-slate-50 hover:bg-slate-50/50 hover:border-primary'} rounded-3xl text-center transition-all cursor-pointer group`}
                        >
                          <input 
                            type="file" 
                            id="birth-upload" 
                            className="hidden" 
                            accept="image/*,.pdf" 
                            onChange={(e) => handleFileChange(e, 'birth')}
                          />
                          {uploadedFiles.birth ? (
                            <>
                              <CheckCircle2 className="w-10 h-10 text-green-500 mx-auto mb-3" />
                              <p className="text-sm font-black text-green-800 mb-1">تم الرفع</p>
                              <p className="text-xs text-green-600 font-bold truncate px-2">{uploadedFiles.birth}</p>
                            </>
                          ) : (
                            <>
                              <FileText className="w-10 h-10 text-slate-300 group-hover:text-primary mx-auto mb-3" />
                              <p className="text-sm font-black text-slate-800 mb-1">صورة شهادة الميلاد</p>
                              <p className="text-xs text-slate-500 font-bold">شهادة ميلاد مميكنة</p>
                            </>
                          )}
                        </div>
                        <div 
                          onClick={() => document.getElementById('utility-upload')?.click()}
                          className={`p-6 border-2 border-dashed ${uploadedFiles.utility ? 'border-green-500 bg-green-50/50' : 'border-slate-200 bg-slate-50 hover:bg-slate-50/50 hover:border-primary'} rounded-3xl text-center transition-all cursor-pointer group`}
                        >
                          <input 
                            type="file" 
                            id="utility-upload" 
                            className="hidden" 
                            accept="image/*,.pdf" 
                            onChange={(e) => handleFileChange(e, 'utility')}
                          />
                          {uploadedFiles.utility ? (
                            <>
                              <CheckCircle2 className="w-10 h-10 text-green-500 mx-auto mb-3" />
                              <p className="text-sm font-black text-green-800 mb-1">تم الرفع</p>
                              <p className="text-xs text-green-600 font-bold truncate px-2">{uploadedFiles.utility}</p>
                            </>
                          ) : (
                            <>
                              <Building2 className="w-10 h-10 text-slate-300 group-hover:text-primary mx-auto mb-3" />
                              <p className="text-sm font-black text-slate-800 mb-1">صورة إيصال مرافق</p>
                              <p className="text-xs text-slate-500 font-bold">كهرباء أو مياه أو غاز حديث</p>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div className="p-6 bg-amber-50 rounded-2xl border border-amber-100 flex gap-4">
                      <Checkbox id="confirm-terms" className="mt-1" required />
                      <Label htmlFor="confirm-terms" className="text-amber-900 text-sm leading-relaxed cursor-pointer font-bold">
                        أؤكد قراءتي لكافة شروط كراسة المواصفات وأتعهد بصحة البيانات، كما أقر بعدم حصولي على أي دعم سكني سابق من الدولة.
                      </Label>
                    </div>

                    <Button type="submit" className="w-full h-16 bg-primary text-xl font-black hover:bg-primary/90 shadow-2xl shadow-primary/30">
                      إرسال الطلب وحجز الوحدة
                    </Button>
                  </form>
               </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 lg:px-8" dir="rtl">
      <Button 
        variant="ghost" 
        onClick={onBack} 
        className="mb-8 hover:bg-slate-100 font-bold gap-2"
      >
        <ArrowRight className="w-4 h-4" /> العودة للخدمات
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-yellow-100 rounded-2xl flex items-center justify-center text-yellow-600">
                <HomeIcon className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-3xl font-black text-slate-900">الإسكان الاجتماعي</h1>
                <p className="text-slate-500 font-medium">تقديم طلب الحصول على وحدة سكنية مدعومة</p>
              </div>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="w-full bg-slate-100 p-1 mb-8">
                <TabsTrigger value="overview" className="flex-1 font-bold">نظرة عامة</TabsTrigger>
                <TabsTrigger value="apply" className="flex-1 font-bold">نموذج التقديم</TabsTrigger>
                <TabsTrigger value="projects" className="flex-1 font-bold">المشاريع المتاحة</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-8">
                <section>
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Info className="w-5 h-5 text-primary" /> عن الخدمة
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    تتيح هذه الخدمة للمواطنين من محدودي ومتوسطي الدخل التقديم للحصول على وحدة سكنية ضمن مبادرات التمويل العقاري التي تطرحها الدولة، بأسعار مدعومة وفترات سداد ممتدة تصل إلى 30 عاماً.
                  </p>
                </section>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border border-slate-100 bg-slate-50 rounded-2xl">
                    <h4 className="font-bold mb-2 flex items-center gap-2">
                      <Clock className="w-4 h-4 text-primary" /> مدة المعالجة
                    </h4>
                    <p className="text-sm text-slate-500">من 3 إلى 4 أشهر للمراجعة والبت في الطلب.</p>
                  </div>
                  <div className="p-4 border border-slate-100 bg-slate-50 rounded-2xl">
                    <h4 className="font-bold mb-2 flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-primary" /> الرسوم الدراسية
                    </h4>
                    <p className="text-sm text-slate-500">400 جنيه مصري رسوم استعلام وتدقيق.</p>
                  </div>
                </div>

                <section>
                  <h3 className="text-xl font-bold mb-4">شروط التقديم</h3>
                  <ul className="space-y-3">
                    {[
                      'أن يكون المتقدم شخصاً طبيعياً مصري الجنسية.',
                      'ألا يقل السن عن 21 عاماً ولا يزيد عن 50 عاماً.',
                      'عدم الحصول على وحدة سكنية سابقة من الإسكان الاجتماعي.',
                      'أن يكون المتقدم من أبناء المحافظة أو المقيمين بها أو المرتبط بها عملاً.'
                    ].map((idx, i) => (
                      <li key={i} className="flex gap-3 text-slate-600">
                        <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                        <span>{idx}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              </TabsContent>

              <TabsContent value="apply">
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="fullname">الاسم الرباعي (كما هو ببطاقة الرقم القومي)</Label>
                      <Input id="fullname" placeholder="محمود أحمد محمد علي" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="nationalId">رقم البطاقة (14 رقم)</Label>
                      <Input id="nationalId" maxLength={14} placeholder="29001010000000" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">رقم الهاتف المحمول</Label>
                      <Input id="phone" placeholder="01xxxxxxxxx" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="status">الحالة الاجتماعية</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="اختر الحالة" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="single">أعزب / آنسة</SelectItem>
                          <SelectItem value="married">متزوج / متزوجة</SelectItem>
                          <SelectItem value="divorced">مطلق / مطلقة</SelectItem>
                          <SelectItem value="widow">أرمل / أرملة</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h4 className="font-bold text-lg">بيانات الدخل</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="income">صافي الدخل الشهري (ج.م)</Label>
                        <Input id="income" type="number" placeholder="5000" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="work">جهة العمل</Label>
                        <Input id="work" placeholder="اسم الشركة أو الجهة" />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h4 className="font-bold text-lg">المستندات المطلوبة (رفع صور)</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="p-6 border-2 border-dashed border-slate-200 rounded-2xl text-center hover:border-primary transition-colors cursor-pointer group">
                        <FileText className="w-8 h-8 text-slate-300 group-hover:text-primary mx-auto mb-2" />
                        <p className="text-xs font-bold text-slate-500">صورة بطاقة الرقم القومي</p>
                      </div>
                      <div className="p-6 border-2 border-dashed border-slate-200 rounded-2xl text-center hover:border-primary transition-colors cursor-pointer group">
                        <Building2 className="w-8 h-8 text-slate-300 group-hover:text-primary mx-auto mb-2" />
                        <p className="text-xs font-bold text-slate-500">مفردات مرتب حديثة</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 space-x-reverse bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <Checkbox id="terms" required />
                    <Label htmlFor="terms" className="text-sm text-slate-600 leading-relaxed cursor-pointer">
                      أقر بأن كافة البيانات المدخلة صحيحة وعلى مسؤوليتي الشخصية، وأوافق على كافة الشروط والأحكام الخاصة بمبادرة الإسكان الاجتماعي.
                    </Label>
                  </div>

                  <Button type="submit" className="w-full h-14 text-lg font-black bg-primary hover:bg-primary/90 text-white shadow-xl shadow-primary/20">
                    إرسال طلب التقديم
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="projects" className="space-y-6">
                {projects.map((project) => (
                  <Card key={project.id} className="overflow-hidden border-slate-200 hover:border-primary/50 transition-colors">
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-48 bg-slate-100 flex items-center justify-center p-8">
                        <HomeIcon className="w-12 h-12 text-slate-300" />
                      </div>
                      <CardContent className="flex-1 p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h4 className="text-xl font-black text-slate-900">{project.name}</h4>
                            <div className="flex items-center gap-1 text-slate-500 text-sm mt-1">
                              <MapPin className="w-4 h-4" /> {project.location}
                            </div>
                          </div>
                          <Badge variant={project.status === 'قريباً' ? 'outline' : 'secondary'} className={project.status === 'قريباً' ? '' : 'bg-green-100 text-green-700'}>
                            {project.status}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between mt-6">
                          <div>
                            <p className="text-xs font-bold text-slate-400">يبدأ السعر من</p>
                            <p className="text-lg font-black text-primary">{project.price}</p>
                          </div>
                          <Button size="sm" variant={project.status === 'قريباً' ? 'ghost' : 'default'} disabled={project.status === 'قريباً'}>
                            تفاصيل المشروع
                          </Button>
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Sidebar info */}
        <div className="space-y-6">
          <Card className="border-none shadow-sm bg-primary text-white overflow-hidden relative">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <ShieldCheck className="w-24 h-24" />
            </div>
            <CardHeader>
              <CardTitle className="text-xl font-black">حالة التقديم</CardTitle>
              <CardDescription className="text-primary-foreground/70">تتبع طلباتك السابقة</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-4 bg-white/10 rounded-2xl border border-white/10 mb-6">
                <p className="text-sm font-bold opacity-80 mb-1">لا توجد طلبات جارية</p>
                <p className="text-xs opacity-60">ابدأ التقديم الآن للحصول على وحدة سكنية</p>
              </div>
              <Button className="w-full bg-white text-primary hover:bg-slate-50 font-bold border-none">
                تم تسجيل الدخول يرجى المتابعة
              </Button>
            </CardContent>
          </Card>

          <Card className="border-slate-200">
            <CardHeader>
              <CardTitle className="text-lg font-black">أبرز الاختيارات</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">بدأ كراسة الشروط</p>
                    <p className="text-xs text-slate-500">متاحة الآن (مايو 2026)</p>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  className="w-full justify-between hover:bg-orange-50 border-orange-200 text-orange-700 font-bold h-11"
                  onClick={() => setView('booklet')}
                >
                  فتح كراسة الشروط <FileText className="w-4 h-4" />
                </Button>
              </div>

              <Separator />

              <div className="space-y-3">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                    <CreditCard className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">سداد مقدم جدية الحجز</p>
                    <p className="text-xs text-slate-500">حتى 30 يونيو 2026</p>
                  </div>
                </div>
                <Button 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold h-11 shadow-md shadow-blue-200"
                  onClick={() => {
                    setShowPaymentDialog(true);
                  }}
                >
                  سداد مقدم الحجز الآن
                </Button>
              </div>

              <Separator />

              <div className="flex gap-4 opacity-50">
                <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center shrink-0">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">إعلان القرعة العلنية</p>
                  <p className="text-xs text-slate-500">أغسطس 2026</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200 overflow-hidden group cursor-pointer">
            <div className="aspect-video bg-slate-900 flex items-center justify-center relative">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-white backdrop-blur-md group-hover:scale-110 transition-transform">
                <ArrowRight className="rotate-180 fill-current" />
              </div>
              <p className="absolute bottom-4 right-4 text-white text-sm font-bold">شرح فيديو بالخطوات</p>
            </div>
          </Card>
        </div>
      </div>

      <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
        <DialogContent className="sm:max-w-md text-right bg-white" dir="rtl">
          <DialogHeader>
            <DialogTitle className="text-xl font-black text-slate-900 border-b pb-4">تعليمات السداد</DialogTitle>
          </DialogHeader>
          <div className="py-6 space-y-6">
            <div className="p-4 bg-primary/5 border border-primary/10 rounded-2xl">
              <p className="text-lg leading-relaxed text-slate-700">
                يرجى توريد المبلغ لحساب الإسكان الاجتماعي عبر <span className="font-bold text-primary">فوري</span> أو <span className="font-bold text-primary">المحافظ الإلكترونية</span> على حساب رقم:
              </p>
              <div className="mt-4 p-4 bg-white border-2 border-primary rounded-xl text-center select-all cursor-copy group relative">
                <span className="text-2xl font-black tracking-widest text-primary">5078086726803484</span>
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] px-2 py-0.5 rounded-full font-bold opacity-0 group-hover:opacity-100 transition-opacity">اضغط للنسخ</div>
              </div>
            </div>
            
            <div className="flex gap-4 items-start bg-orange-50 p-4 rounded-2xl border border-orange-100">
              <Info className="w-6 h-6 text-orange-600 shrink-0 mt-1" />
              <p className="text-sm font-bold text-orange-800 leading-relaxed">
                تنبيه هام: لا تغلق هذه الصفحة بعد إتمام عملية الدفع حتى تتمكن من الحصول على ما يفيد بالسداد ورفعه في الخطوة التالية.
              </p>
            </div>
          </div>
          <div className="flex justify-center">
            <Button onClick={() => {
              setShowPaymentDialog(false);
              setShowReceipt(true);
            }} className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold h-12">
              فهمت، جاري السداد
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showReceipt} onOpenChange={setShowReceipt}>
        <DialogContent className="w-[95vw] sm:max-w-md max-h-[92vh] overflow-y-auto text-right bg-white p-0" dir="rtl">
          <div className="bg-slate-50 p-6 border-b flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-8 h-6 flex items-center justify-center overflow-hidden rounded-sm shadow-sm scale-75">
                <img src="https://upload.wikimedia.org/wikipedia/commons/f/fe/Flag_of_Egypt.svg" className="w-full h-full object-cover" alt="Egypt Logo" referrerPolicy="no-referrer" />
              </div>
              <span className="font-black text-slate-900 text-sm">منصة مصر الرقمية</span>
            </div>
            <Badge className="bg-green-100 text-green-700 hover:bg-green-100">تم الدفع بنجاح</Badge>
          </div>
          
          <div className="p-8 space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-black text-slate-900">إيصال سداد إلكتروني</h2>
              <p className="text-slate-500 font-bold mt-1">صندوق الإسكان الاجتماعي ودعم التمويل العقاري</p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-slate-500 font-bold">قيمة المدفوع:</span>
                <span className="text-2xl font-black text-primary">{rawDownPaymentLabel} ج.م</span>
              </div>
              <Separator className="bg-slate-200" />
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-slate-400 font-bold mb-1">تاريخ المعاملة</p>
                  <p className="text-slate-900 font-black">شهر ٥ ٢٠٢٦</p>
                </div>
                <div>
                  <p className="text-slate-400 font-bold mb-1">رقم المرجعي</p>
                  <p className="text-slate-900 font-black">REF-5078086726</p>
                </div>
                <div>
                  <p className="text-slate-400 font-bold mb-1">طريقة السداد</p>
                  <p className="text-slate-900 font-black">محفظة إلكترونية</p>
                </div>
                <div>
                  <p className="text-slate-400 font-bold mb-1">نوع الخدمة</p>
                  <p className="text-slate-900 font-black">مقدم جدية حجز</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-full h-16 bg-[url('https://www.transparenttextures.com/patterns/barcode.png')] opacity-20 mb-2"></div>
              <p className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">DIGITAL-EGYPT-VERIFIED-AUTH-8842</p>
            </div>

            <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
              <p className="text-xs text-blue-800 leading-relaxed font-bold text-center">
                هذا المستند معتمد إلكترونياً، يرجى الاحتفاظ بنسخة منه لرفعها مع المستندات المطلوبة.
              </p>
            </div>

            <div className="bg-green-50 p-5 rounded-2xl border border-green-100 text-center space-y-4 relative overflow-hidden min-h-[160px] flex flex-col justify-center">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-35 pointer-events-none transform -rotate-12 border-[6px] border-primary rounded-full p-2 flex items-center justify-center w-48 h-48">
                <div className="border-[3px] border-primary rounded-full w-full h-full flex flex-col items-center justify-center text-[10px] font-black text-primary text-center leading-tight p-2">
                  <span className="mb-1">جمهورية مصر العربية</span>
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Coat_of_arms_of_Egypt_%28Official%29.svg/2000px-Coat_of_arms_of_Egypt_%28Official%29.svg.png" className="w-14 h-14 my-1 grayscale brightness-0" alt="Seal Eagle" referrerPolicy="no-referrer" />
                  <span className="mt-1">صندوق الإسكان الاجتماعي</span>
                  <span className="font-bold underline text-2xl mt-1 tracking-tighter">مـعـتـمـد</span>
                </div>
              </div>
              <div className="relative z-10 space-y-2">
                <p className="text-green-800 font-black text-lg">تم سداد المبلغ بنجاح وتم تسجيل الطلب</p>
                <p className="text-green-700 text-sm font-bold leading-relaxed max-w-[280px] mx-auto">
                  نحيط بسيادتكم بالرد خلال ثلاث اشهر إلى اربعة اشهر يرجى تفقد الهاتف الخاص بكم خلال تلك الفتره
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 sm:p-6 bg-slate-50 border-t flex flex-col sm:flex-row gap-3">
             <Button className="w-full sm:flex-1 bg-primary font-black h-12" onClick={() => window.print()}>
               تحميل PDF
             </Button>
             <Button variant="outline" className="w-full sm:flex-1 font-black h-12" onClick={() => setShowReceipt(false)}>
               إغلاق
             </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
